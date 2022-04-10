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




// Blinking rate in milliseconds
#define POLLING_RATE     2s
#define DHTTYPE DHT11

#define MAX_BRIGHTNESS 255

#define BUFFER_MAX_LEN 10 
#define FORCE_REFORMAT = true;

BlockDevice *bd = BlockDevice::get_default_instance();
FATFileSystem fs("sd");

DHT dht(PA_1,DHTTYPE);
ADXL345 accelerometer(PA_7, PA_6,PB_3,PB_6); //PinName mosi, PinName miso, PinName sck, PinName cs
DigitalIn INT(PC_7);  //pin PC_7 connects to the interrupt output pin of the MAX30102
                 
                 
                 
uint32_t aun_ir_buffer[500]; //IR LED sensor data
int32_t n_ir_buffer_length;    //data length
uint32_t aun_red_buffer[500];    //Red LED sensor data
int32_t n_sp02; //SPO2 value
int8_t ch_spo2_valid;   //indicator to show if the SP02 calculation is valid
int32_t n_heart_rate;   //heart rate value
int8_t  ch_hr_valid;    //indicator to show if the heart rate calculation is valid
uint8_t uch_dummy;




int main()
{
    uint32_t un_min, un_max, un_prev_data;  //variables to calculate the on-board LED brightness that reflects the heartbeats
    int i;
    int32_t n_brightness;
    float f_temp;

    //Check the sd card//
    int err = fs.mount(bd);
    printf("%s\r\n", (err ? "SD card Fail :(" : "SD card OK"));  
    if(err)
    {
        return 0;
    }
    //Check the sd card//

    maxim_max30102_reset(); //resets the MAX30102
    ThisThread::sleep_for(1s);
    maxim_max30102_read_reg(0,&uch_dummy);
    maxim_max30102_init();  //initializes the MAX30102

    n_brightness=0;
    un_min=0x3FFFF;
    un_max=0;
  
    n_ir_buffer_length=500; //buffer length of 100 stores 5 seconds of samples running at 100sps

    int error = 0;

    int accReadings[3] = {0, 0, 0};
    printf("Device ID is: 0x%02x\n", accelerometer.getDevId());

    //HEART BEAT//
    
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
    //HEART BEAT//




     //Go into standby mode to configure the device.
    accelerometer.setPowerControl(0x00);
 
    //Full resolution, +/-16g, 4mg/LSB.
    accelerometer.setDataFormatControl(0x0B);
    
    //3.2kHz data rate.
    accelerometer.setDataRate(ADXL345_3200HZ);
 
    //Measurement mode.
    accelerometer.setPowerControl(0x08);

    

    // Initialise the digital pin LED1 as an output
    DigitalOut led(LED1);

    

    while (true) {

        

        //HEART BEAT//
        i=0;
        un_min=0x3FFFF;
        un_max=0;
        //HEART BEAT//

       


        error = dht.readData();
        if (0 == error){
             //HEART BEAT//
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
                
                    if(aun_red_buffer[i]>un_prev_data)
                    {
                        f_temp=aun_red_buffer[i]-un_prev_data;
                        f_temp/=(un_max-un_min);
                        f_temp*=MAX_BRIGHTNESS;
                        n_brightness-=(int)f_temp;
                        if(n_brightness<0)
                            n_brightness=0;
                    }
                    else
                    {
                        f_temp=un_prev_data-aun_red_buffer[i];
                        f_temp/=(un_max-un_min);
                        f_temp*=MAX_BRIGHTNESS;
                        n_brightness+=(int)f_temp;
                        if(n_brightness>MAX_BRIGHTNESS)
                            n_brightness=MAX_BRIGHTNESS;
                    }

                    led.write(1-(float)n_brightness/256);
                    
                   

                    

                    

                }

            //send samples and calculation result to terminal program through UART
            printf("red=");
            printf("%i", aun_red_buffer[i]);
            printf(", ir=");
            printf("%i", aun_ir_buffer[i]);
            printf(", HR=%i, ", n_heart_rate); 
            printf("HRvalid=%i, ", ch_hr_valid);
            printf("SpO2=%i, ", n_sp02);
            printf("SPO2Valid=%i\n\r", ch_spo2_valid);
            //HEART BEAT//
            accelerometer.getOutput(accReadings);
            int temperature = dht.ReadTemperature(CELCIUS);
            int humidity = dht.ReadHumidity();

            printf("%d\n",temperature);
            printf("%d %% \n",humidity);
            ThisThread::sleep_for(POLLING_RATE);

             printf("%i, %i, %i\n", (int16_t)accReadings[0], (int16_t)accReadings[1], (int16_t)accReadings[2]);   
                
               

         }
         
        else {
            printf("Error: %d\n", error);
            ThisThread::sleep_for(POLLING_RATE);
         }
         maxim_heart_rate_and_oxygen_saturation(aun_ir_buffer, n_ir_buffer_length, aun_red_buffer, &n_sp02, &ch_spo2_valid, &n_heart_rate, &ch_hr_valid); 
    }
}
