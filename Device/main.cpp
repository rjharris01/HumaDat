/* mbed Microcontroller Library
 * Copyright (c) 2019 ARM Limited
 * SPDX-License-Identifier: Apache-2.0
 */

#include "mbed.h"
#include "DHT.h"
#include "ADXL345.h"

// Blinking rate in milliseconds
#define POLLING_RATE     2s
#define DHTTYPE DHT11


DHT dht(PA_1,DHTTYPE);
ADXL345 accelerometer(PA_7, PA_6,PB_3,PB_6); //PinName mosi, PinName miso, PinName sck, PinName cs
                 
                 
                 



int main()
{
    int error = 0;

    int accReadings[3] = {0, 0, 0};

    printf("Device ID is: 0x%02x\n", accelerometer.getDevId());

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
         error = dht.readData();
         if (0 == error){

             int temperature = dht.ReadTemperature(CELCIUS);
             int humidity = dht.ReadHumidity();
             accelerometer.getOutput(accReadings);
             printf("%i, %i, %i\n", (int16_t)accReadings[0], (int16_t)accReadings[1], (int16_t)accReadings[2]);

             printf("%d\n",temperature);
             printf("%d %% \n",humidity);
             ThisThread::sleep_for(POLLING_RATE);

         }
         
         else {
            printf("Error: %d\n", error);
            ThisThread::sleep_for(POLLING_RATE);
         }
    }
}
