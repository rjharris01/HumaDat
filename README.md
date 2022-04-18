# Comp3000
Richard Harris Final Year Project

HumaDat Platform 


Developed for medical researchers where the capture of human physiological data is required to facilitate a study. The 'HumaDat' is a data capture device that utilises various sensors to capture human physiological data at a granular level over a period of a day. Data can then be transferred to the companion application. Data will be processed on the companion application to provided initial data analytics alongside the raw data to the user. This device is different from devices like smart watches as it's design will allow access to raw data channels alongside pre-processed ones allowing researchers to perform more additional analytics where the sensors can provide further data. This contrasts with many smart watches where the raw data is often obscured from the customer.


To run the project

Clone the repo

Then:

in client folder 
run "npm install" to install all packages
then "npm start"  to launch the react webserver

in the server folder
run "npm install" to install all packages
then "node index.js"  to launch the node backend server

launch the docker file "docker-compose.yml" to start the mongodb service
using "docker-compose up -d" 

adjust the .env to enable connection between node server and the mongo server


build the mbed prodject (Device) using MBED studio or CLI : 
https://os.mbed.com/docs/mbed-os/v6.15/build-tools/compile.html
to the nucleo f401re


upload the Arduino file "BleBridge/humadat.ino" to the nodeMCU

connect to the device using putty ("https://www.putty.org/") with baudrate =9600
and set the current date.


To enable data logging to the sd card press the onboard button, when the light is green data is being logged to the sd card.