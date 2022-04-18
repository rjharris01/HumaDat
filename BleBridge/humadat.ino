/*
    Based on Neil Kolban example for IDF: https://github.com/nkolban/esp32-snippets/blob/master/cpp_utils/tests/BLE%20Tests/SampleServer.cpp
    Ported to Arduino ESP32 by Evandro Copercini
    updates by chegewara
*/

#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <SoftwareSerial.h>

// See the following for generating UUIDs:
// https://www.uuidgenerator.net/

#define HR_SERVICE_UUID "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define ACC_SERVICE_UUID "4294aef4-91ab-11ec-b909-0242ac120002"
#define HUM_SERVICE_UUID "4294b20a-91ab-11ec-b909-0242ac120002"
#define TEMP_SERVICE_UUID "4294c394-91ab-11ec-b909-0242ac120002"
#define VALID_SERIVCE_UUID "b07f7d8e-95ae-11ec-b909-0242ac120002"

#define HR_BPM_CHARACTERISTIC_UUID "42949770-91ab-11ec-b909-0242ac120002"
#define HR_RED_CHARACTERISTIC_UUID "42949a36-91ab-11ec-b909-0242ac120002"
#define HR_IR_CHARACTERISTIC_UUID "42949a37-91ab-11ec-b909-0242ac120002"
#define HR_VALID_CHARACTERISTIC_UUID "4294a0da-91ab-11ec-b909-0242ac120002"
#define HR_SPO2_CHARACTERISTIC_UUID "4294aa4e-91ab-11ec-b909-0242ac120002"

#define ACC_X_CHARACTERISTIC_UUID "4294a27e-91ab-11ec-b909-0242ac120002"
#define ACC_Y_CHARACTERISTIC_UUID "4294a404-91ab-11ec-b909-0242ac120002"
#define ACC_Z_CHARACTERISTIC_UUID "4294a580-91ab-11ec-b909-0242ac120002"

#define HUM_CHARACTERISTIC_UUID "4294a71a-91ab-11ec-b909-0242ac120002"
#define TEMP_CHARACTERISTIC_UUID "4294a8a0-91ab-11ec-b909-0242ac120002"

#define MYPORT_TX 17
#define MYPORT_RX 16

const byte numChars = 64;
char receivedChars[numChars]; // an array to store the received data
int serialDataInt = 0;
boolean newData = false; 

SoftwareSerial dataLogger (MYPORT_RX,MYPORT_TX);


BLECharacteristic HR_BPM_Characteristic(HR_BPM_CHARACTERISTIC_UUID,BLECharacteristic::PROPERTY_READ| BLECharacteristic::PROPERTY_NOTIFY);
BLEDescriptor hrBPMCharacteristicDescriptor(BLEUUID((uint16_t)0x2902));      

BLECharacteristic HR_RED_Characteristic(HR_RED_CHARACTERISTIC_UUID,BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY); 
BLEDescriptor hrRedCharacteristicDescriptor(BLEUUID((uint16_t)0x2902));      
                                 
BLECharacteristic HR_IR_Characteristic(HR_IR_CHARACTERISTIC_UUID,BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY);
BLEDescriptor hrIRCharacteristicDescriptor(BLEUUID((uint16_t)0x2902));                                   
BLECharacteristic HR_VALID_Characteristic(HR_VALID_CHARACTERISTIC_UUID,BLECharacteristic::PROPERTY_READ| BLECharacteristic::PROPERTY_NOTIFY);  
BLEDescriptor hrValidCharacteristicDescriptor(BLEUUID((uint16_t)0x2902));     
BLECharacteristic HR_SPO2_Characteristic(HR_SPO2_CHARACTERISTIC_UUID,BLECharacteristic::PROPERTY_READ| BLECharacteristic::PROPERTY_NOTIFY); 
BLEDescriptor hrSp02CharacteristicDescriptor(BLEUUID((uint16_t)0x2902));   
   
BLECharacteristic ACC_X_Characteristic(ACC_X_CHARACTERISTIC_UUID,BLECharacteristic::PROPERTY_READ| BLECharacteristic::PROPERTY_NOTIFY);
BLEDescriptor accXCharacteristicDescriptor(BLEUUID((uint16_t)0x2902));   
BLECharacteristic ACC_Y_Characteristic(ACC_Y_CHARACTERISTIC_UUID,BLECharacteristic::PROPERTY_READ| BLECharacteristic::PROPERTY_NOTIFY);
BLEDescriptor accYCharacteristicDescriptor(BLEUUID((uint16_t)0x2902));     
BLECharacteristic ACC_Z_Characteristic(ACC_Z_CHARACTERISTIC_UUID,BLECharacteristic::PROPERTY_READ| BLECharacteristic::PROPERTY_NOTIFY); 
BLEDescriptor accZCharacteristicDescriptor(BLEUUID((uint16_t)0x2902));   

BLECharacteristic HUM_Characteristic(HUM_CHARACTERISTIC_UUID,BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY);
BLEDescriptor humCharacteristicDescriptor(BLEUUID((uint16_t)0x2902));
   
BLECharacteristic TEMP_Characteristic(TEMP_CHARACTERISTIC_UUID,BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY); 
BLEDescriptor tempCharacteristicDescriptor(BLEUUID((uint16_t)0x2902));

  


void setup() {
  Serial.begin(9600);
  delay(2000);
  Serial.println("\n");
  Serial.println("Starting BLE work!");
  
  dataLogger.begin(9600);
  delay(2000);
  
  
  int default_value = 0;

  BLEDevice::init("Humadat");
  BLEServer *pServer = BLEDevice::createServer();
  
  BLEService *hrService = pServer->createService(HR_SERVICE_UUID);
  BLEService *accService = pServer->createService(ACC_SERVICE_UUID);
  BLEService *humService = pServer->createService(HUM_SERVICE_UUID);
  BLEService *tempService = pServer->createService(TEMP_SERVICE_UUID);
  BLEService *validService = pServer->createService(VALID_SERIVCE_UUID);
  
  hrService->addCharacteristic(&HR_RED_Characteristic);
  hrRedCharacteristicDescriptor.setValue("PPG Red Value");
  HR_RED_Characteristic.setValue(default_value);
  HR_RED_Characteristic.addDescriptor(&hrRedCharacteristicDescriptor);


  hrService->addCharacteristic(&HR_BPM_Characteristic);
  hrBPMCharacteristicDescriptor.setValue("BPM Value");
  HR_BPM_Characteristic.setValue(default_value);
  HR_BPM_Characteristic.addDescriptor(&hrBPMCharacteristicDescriptor);
  
  hrService->addCharacteristic(&HR_IR_Characteristic);
  hrIRCharacteristicDescriptor.setValue("PPG Infa Red Value");
  HR_IR_Characteristic.setValue(default_value);
  HR_IR_Characteristic.addDescriptor(&hrIRCharacteristicDescriptor);
  
  validService->addCharacteristic(&HR_VALID_Characteristic);
  hrValidCharacteristicDescriptor.setValue("PPG Valid Value");
  HR_VALID_Characteristic.setValue(default_value);
  HR_VALID_Characteristic.addDescriptor(&hrValidCharacteristicDescriptor);
  
  hrService->addCharacteristic(&HR_SPO2_Characteristic);
  hrSp02CharacteristicDescriptor.setValue("PPG Sp02 Value");
  HR_SPO2_Characteristic.setValue(default_value);
  HR_SPO2_Characteristic.addDescriptor(&hrSp02CharacteristicDescriptor);


  accService->addCharacteristic(&ACC_X_Characteristic);
  accXCharacteristicDescriptor.setValue("Accelerometer X Value");
  ACC_X_Characteristic.setValue(default_value);
  ACC_X_Characteristic.addDescriptor(&accXCharacteristicDescriptor);
  
  accService->addCharacteristic(&ACC_Y_Characteristic);
  accYCharacteristicDescriptor.setValue("Accelerometer Y Value");
  ACC_Y_Characteristic.setValue(default_value);
  ACC_Y_Characteristic.addDescriptor(&accYCharacteristicDescriptor);
  
  accService->addCharacteristic(&ACC_Z_Characteristic);
  accZCharacteristicDescriptor.setValue("Accelerometer Z Value");
  ACC_Z_Characteristic.setValue(default_value);
  ACC_Z_Characteristic.addDescriptor(&accZCharacteristicDescriptor);
  
  humService->addCharacteristic(&HUM_Characteristic);
  humCharacteristicDescriptor.setValue("Humidity (%)");
  HUM_Characteristic.setValue(default_value);
  HUM_Characteristic.addDescriptor(&humCharacteristicDescriptor);
 
  
  tempService->addCharacteristic(&TEMP_Characteristic);
  tempCharacteristicDescriptor.setValue("temperature (Celsius)");
  TEMP_Characteristic.setValue(default_value);
  TEMP_Characteristic.addDescriptor(&tempCharacteristicDescriptor);
  
                                       
                                                                                                       


  
  hrService->start();
  accService->start();
  humService->start();
  tempService->start();
  validService->start();
  
  // BLEAdvertising *pAdvertising = pServer->getAdvertising();  // this still is working for backward compatibility
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  
  pAdvertising->addServiceUUID(HR_SERVICE_UUID);
  pAdvertising->addServiceUUID(ACC_SERVICE_UUID);
  pAdvertising->addServiceUUID(HUM_SERVICE_UUID);
  pAdvertising->addServiceUUID(TEMP_SERVICE_UUID);
  
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);  // functions that help with iPhone connections issue
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();
  Serial.println("Characteristic defined! Now you can read it in your phone!");
}
void serialRead(){
    while (dataLogger.available()) {  //wait for data at software serial
    Serial.write(dataLogger.read()); //Send data recived from software serial to hardware serial   
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  recvWithStartEndMarkers();
  updateBleData();
  
 
  
 
}




void recvWithStartEndMarkers() {
    static boolean recvInProgress = false;
    static byte ndx = 0;
    char startMarker = '<';
    char endMarker = '>';
    char rc;
 
 // if (Serial.available() > 0) {
    while (dataLogger.available() > 0 && newData == false) {
        rc = dataLogger.read();

        if (recvInProgress == true) {
            if (rc != endMarker) {
                receivedChars[ndx] = rc;
                ndx++;
                if (ndx >= numChars) {
                    ndx = numChars - 1;
                }
            }
            else {
                receivedChars[ndx] = '\0'; // terminate the string
                recvInProgress = false;
                ndx = 0;
                newData = true;
            }
        }

        else if (rc == startMarker) {
            recvInProgress = true;
        }
    }
}

void updateBleData() {
    char * strtokIndx; // this is used by strtok() as an i
    if (newData == true) {
      
        strtokIndx = strtok(receivedChars,",");
        serialDataInt = atoi(strtokIndx); 
        HR_BPM_Characteristic.setValue(serialDataInt);
        HR_BPM_Characteristic.notify();
       
        
        strtokIndx = strtok(NULL, ","); 
        serialDataInt = atoi(strtokIndx);  
        HR_RED_Characteristic.setValue(serialDataInt);
        HR_RED_Characteristic.notify();
       

        strtokIndx = strtok(NULL, ","); 
        serialDataInt = atoi(strtokIndx);  
        HR_IR_Characteristic.setValue(serialDataInt);
        HR_IR_Characteristic.notify();

        strtokIndx = strtok(NULL, ","); 
        serialDataInt = atoi(strtokIndx);  
        HR_SPO2_Characteristic.setValue(serialDataInt);
        HR_SPO2_Characteristic.notify(); 
         

        strtokIndx = strtok(NULL, ","); 
        serialDataInt = atoi(strtokIndx);  
        HR_VALID_Characteristic.setValue(serialDataInt);
        HR_VALID_Characteristic.notify();     

        strtokIndx = strtok(NULL, ","); 
        serialDataInt = atoi(strtokIndx);
        ACC_X_Characteristic.setValue(serialDataInt); 
        ACC_X_Characteristic.notify(); 

        strtokIndx = strtok(NULL, ","); 
        serialDataInt = atoi(strtokIndx);
        ACC_Y_Characteristic.setValue(serialDataInt); 
        ACC_Y_Characteristic.notify(); 

        strtokIndx = strtok(NULL, ","); 
        serialDataInt = atoi(strtokIndx);
        ACC_Z_Characteristic.setValue(serialDataInt);
        ACC_Z_Characteristic.notify(); 

        strtokIndx = strtok(NULL, ","); 
        serialDataInt = atoi(strtokIndx); 
        HUM_Characteristic.setValue(serialDataInt);
        HUM_Characteristic.notify();

        strtokIndx = strtok(NULL, ","); 
        serialDataInt = atoi(strtokIndx);
        TEMP_Characteristic.setValue(serialDataInt);
        TEMP_Characteristic.notify();
        
        
        newData = false;
        Serial.println("data updated");
    }
   
}
