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
SPI spi(PA_7, PA_6, PA_5); // mosi, miso, sclk
DigitalOut cs(PB_6);


int main()
{
    int error = 0;
    

    // Initialise the digital pin LED1 as an output
    DigitalOut led(LED1);

    

    while (true) {
         error = dht.readData();
         if (0 == error){

             int temperature = dht.ReadTemperature(CELCIUS);
             int humidity = dht.ReadHumidity();
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
