/* mbed Microcontroller Library
 * Copyright (c) 2019 ARM Limited
 * SPDX-License-Identifier: Apache-2.0
 */

#include "mbed.h"
#include "DHT.h"
#include "ADXL345.h"
#include "algorithm.h"
#include "MAX30102.h"
#include "BlockDevice.h"
#include "FATFileSystem.h"
#include <cstdio>
#include <string>



// Polling rate in milliseconds
#define POLLING_RATE     1s
#define DHTTYPE DHT11

#define MAX_BRIGHTNESS 255

#define BUFFER_MAX_LEN 10 
#define FORCE_REFORMAT = true;

EventQueue queue(32 * EVENTS_EVENT_SIZE);
Thread t;


BlockDevice *bd = BlockDevice::get_default_instance();
FATFileSystem fs("sd");

DHT dht(PA_1,DHTTYPE);
ADXL345 accelerometer(PA_7, PA_6,PB_3,PB_6); //PinName mosi, PinName miso, PinName sck, PinName cs
DigitalIn INT(PC_7);  //pin PC_7 connects to the interrupt output pin of the MAX30102
BufferedSerial serial_port(PA_9, PA_10); 
DigitalOut led(LED1); 


InterruptIn button(PC_13);


bool enableDataCap = false;
                 
uint32_t aun_ir_buffer[500]; //IR LED sensor data
int32_t n_ir_buffer_length;    //data length
uint32_t aun_red_buffer[500];    //Red LED sensor data
int32_t n_sp02; //SPO2 value
int8_t ch_spo2_valid;   //indicator to show if the SP02 calculation is valid
int32_t n_heart_rate;   //heart rate value
int8_t  ch_hr_valid;    //indicator to show if the heart rate calculation is valid
uint8_t uch_dummy;

//accelerometer data
int accReadings[3] = {0, 0, 0};

//sd
int err;


//HEART BEAT//
uint32_t un_min, un_max, un_prev_data;  //variables to calculate the on-board LED brightness that reflects the heartbeats
uint16_t  i = 0;
int32_t n_brightness;
float f_temp;

//Enviromental Sensor//
uint16_t  temperature;
uint16_t  humidity;
uint16_t  errorEnviromentals = 0;

char deviceName[] = "HumaDat1";

void updateBLE(int HR,int RL,int IR, int SP02,int VALIDHR,int VALIDSP02, int X, int Y, int Z,int HUM, int TEMP){
    
    if (HR > 220){
        HR =0;
    }

    char msg[64];

    if (VALIDHR == 1 && VALIDSP02 == 1){
        snprintf(msg,64,"<%d,%d,%d,%d,%d,%d,%d,%d,%d,%d>",HR,RL,IR,SP02,VALIDHR,X,Y,Z,HUM,TEMP);
        serial_port.write(msg, sizeof(msg));
    }

    else if(VALIDHR > 0 && VALIDSP02 == 0 ) {
        snprintf(msg,64,"<%d,%d,%d,%d,%d,%d,%d,%d,%d,%d>",HR,RL,IR,0,2,X,Y,Z,HUM,TEMP);
        serial_port.write(msg, sizeof(msg));
    }

    else if(VALIDSP02 > 0 && VALIDHR == 0 ) {
        snprintf(msg,64,"<%d,%d,%d,%d,%d,%d,%d,%d,%d,%d>",0,RL,IR,SP02,3,X,Y,Z,HUM,TEMP);
        serial_port.write(msg, sizeof(msg));
    }

    else {
        snprintf(msg,64,"<%d,%d,%d,%d,%d,%d,%d,%d,%d,%d>",0,RL,IR,0,4,X,Y,Z,HUM,TEMP);
        serial_port.write(msg, sizeof(msg));
    }

    

}



void setup(){
    //Serial 
    serial_port.set_baud(9600);
    serial_port.set_format(
        /* bits */ 8,
        /* parity */ BufferedSerial::None,
        /* stop bit */ 1
    );
  


    //Accelerometer

    printf("Accelerometer Device ID is: 0x%02x\n", accelerometer.getDevId());

    //Go into standby mode to configure the device.
    accelerometer.setPowerControl(0x00);
 
    //Full resolution, +/-16g, 4mg/LSB.
    accelerometer.setDataFormatControl(0x0B);
    
    //3.2kHz data rate.
    accelerometer.setDataRate(ADXL345_3200HZ);
 
    //Measurement mode.
    accelerometer.setPowerControl(0x08);


    //HR
    n_brightness=0;
    un_min=0x3FFFF;
    un_max=0;
    n_ir_buffer_length=500; //buffer length of 100 stores 5 seconds of samples running at 100sps

    maxim_max30102_reset(); //resets the MAX30102
    ThisThread::sleep_for(1s);
    maxim_max30102_read_reg(0,&uch_dummy);
    maxim_max30102_init();  //initializes the MAX30102
    
    
    //read the first 500 samples, and determine the signal range
    for(i=0;i<n_ir_buffer_length;i++)
    {
        while(INT.read()==1);   //wait until the interrupt pin asserts
        
        maxim_max30102_read_fifo((aun_red_buffer+i), (aun_ir_buffer+i));  //read from MAX30102 FIFO
            
        if(un_min>aun_red_buffer[i])
            un_min=aun_red_buffer[i];    //update signal min
        if(un_max<aun_red_buffer[i])
            un_max=aun_red_buffer[i];    //update signal max
        //printf("red=");
        //printf("%i", aun_red_buffer[i]);
        //printf(", ir=");
        //printf("%i\n\r", aun_ir_buffer[i]);
    }
    un_prev_data=aun_red_buffer[i];

    //calculate heart rate and SpO2 after first 500 samples (first 5 seconds of samples)
    maxim_heart_rate_and_oxygen_saturation(aun_ir_buffer, n_ir_buffer_length, aun_red_buffer, &n_sp02, &ch_spo2_valid, &n_heart_rate, &ch_hr_valid); 

    printf("setup complete\n");
    
}


void calcPPG(){
                //HEART BEAT//
                //dumping the first 100 sets of samples in the memory and shift the last 400 sets of samples to the top
                for(i=100;i<500;i++)
                {
                    aun_red_buffer[i-100]=aun_red_buffer[i];
                    aun_ir_buffer[i-100]=aun_ir_buffer[i];
                        
                        //update the signal min and max
                    if(un_min>aun_red_buffer[i])
                        un_min=aun_red_buffer[i];
                    if(un_max<aun_red_buffer[i])
                        un_max=aun_red_buffer[i];
                }

                //take 100 sets of samples before calculating the heart rate.
                for(i=400;i<500;i++)
                {
                    un_prev_data=aun_red_buffer[i-1];
                    while(INT.read()==1);
                    maxim_max30102_read_fifo((aun_red_buffer+i), (aun_ir_buffer+i));
        

                    
                }
                maxim_heart_rate_and_oxygen_saturation(aun_ir_buffer, n_ir_buffer_length, aun_red_buffer, &n_sp02, &ch_spo2_valid, &n_heart_rate, &ch_hr_valid);
                
}

void printDataSerial(){
            printf("red=%i", aun_red_buffer[i]);
            printf("ir=%i", aun_ir_buffer[i]);
            printf(", HR=%i, ", n_heart_rate); 
            printf("HRvalid=%i, ", ch_hr_valid);
            printf("SpO2=%i, ", n_sp02);
            printf("SPO2Valid=%i ", ch_spo2_valid);
            printf("Temp = %d ",temperature);
            printf("Hum %d %% ",humidity);
            printf("x=%i, y=%i, z=%i \n", (int16_t)accReadings[0], (int16_t)accReadings[1], (int16_t)accReadings[2]);  
}

void getSensorReadings(){
        calcPPG();
        errorEnviromentals = dht.readData();
        accelerometer.getOutput(accReadings);
        temperature = dht.ReadTemperature(CELCIUS);
        humidity = dht.ReadHumidity();

        

}

void dataCap(void)
{   
    
    if (!enableDataCap){
         enableDataCap = true;
         err = fs.mount(bd);
    }

    else if (enableDataCap){
        err = fs.unmount();
        enableDataCap = false;
        

    }
}

void sdFile()
{

    // Try to mount the filesystem
    printf("Mounting the filesystem... ");
    fflush(stdout);
    err = fs.mount(bd);
    printf("%s\n", (err ? "Fail :(" : "OK"));
    if (err) {
        // Reformat if we can't mount the filesystem
        printf("formatting... ");
        fflush(stdout);
        err = fs.reformat(bd);
        printf("%s\n", (err ? "Fail :(" : "OK"));
        if (err) {
            error("error: %s (%d)\n", strerror(-err), err);
        }
    }
}


void writeToSD(){
    fflush(stdout);
    FILE *f = fopen("/sd/data.hum", "r+");

    printf("%s\n", (!f ? "Fail :(" : "OK"));
    if (!f) {
        // Create the data file if it doesn't exist
        printf("No file found, creating a new file... ");
        fflush(stdout);
        f = fopen("/sd/data.hum", "w+");
        printf("%s\n", (!f ? "Fail :(" : "OK"));
        if (!f) {
            error("error: %s (%d)\n", strerror(errno), -errno);   
        }
    }
    
    fseek(f, 0,SEEK_END);
    fflush(stdout);

    int HR = n_heart_rate;
    if (HR > 220){
        HR =0;
    }

    if (ch_hr_valid == 1 && ch_spo2_valid == 1){
        err = fprintf(f,"%s,time,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d\n",deviceName,HR,n_sp02,aun_ir_buffer[i],aun_red_buffer[i],1,temperature,humidity,(int16_t)accReadings[0],(int16_t)accReadings[1],(int16_t)accReadings[2]);
    }

    else if (ch_hr_valid == 0 && ch_spo2_valid == 1){
        err = fprintf(f,"%s,time,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d\n",deviceName,0,n_sp02,aun_ir_buffer[i],aun_red_buffer[i],2,temperature,humidity,(int16_t)accReadings[0],(int16_t)accReadings[1],(int16_t)accReadings[2]);
    }

    else  if (ch_hr_valid == 1 && ch_spo2_valid == 0){
        err = fprintf(f,"%s,time,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d\n",deviceName,HR,0,aun_ir_buffer[i],aun_red_buffer[i],1,temperature,humidity,(int16_t)accReadings[0],(int16_t)accReadings[1],(int16_t)accReadings[2]);
    }
    
    else  if (ch_hr_valid == 0 && ch_spo2_valid == 0){
         err = fprintf(f,"%s,time,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d\n",deviceName,0,0,aun_ir_buffer[i],aun_red_buffer[i],1,temperature,humidity,(int16_t)accReadings[0],(int16_t)accReadings[1],(int16_t)accReadings[2]);
    }



    if (err < 0) {
        printf("Fail :(\n");
        error("error: %s (%d)\n", strerror(errno), -errno);
    }

    else{  // Close the file which also flushes any cached writes
        printf("Closing \"/sd/data.hum\"... ");
        fflush(stdout);
        err = fclose(f);

        printf("%s\n", (err < 0 ? "Fail :(" : "OK"));
        if (err < 0) {
            error("error: %s (%d)\n", strerror(errno), -errno);
        }
    }
}




int main()
{

    t.start(callback(&queue, &EventQueue::dispatch_forever));
  

    setup();

    sdFile();

    

    //Ticker logger;

    //logger.attach(&blink,1000ms);
    button.rise(queue.event(dataCap));
 

    while (true) {

        getSensorReadings();
        printDataSerial();   
        updateBLE(n_heart_rate,aun_red_buffer[i],aun_ir_buffer[i],n_sp02,ch_hr_valid,ch_spo2_valid,(int16_t)accReadings[0],(int16_t)accReadings[1],(int16_t)accReadings[2],humidity,temperature);
        

        led.write(enableDataCap);


        if(enableDataCap)
        {
            writeToSD();
        }
        
        //
       
        // if (0 == errorEnviromentals){
        
        //send samples and calculation result to terminal program through UART      
        //  else {
        //    printf("Error: with Enviromental sensor %d\n", errorEnviromentals)
        //   }
    }
}
