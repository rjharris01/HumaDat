import React from 'react'
import { Carousel } from 'react-bootstrap'


const Slider = () => {
    return (
      
<Carousel>
  <Carousel.Item>
    <img
      className="w-100"
      src={require("../../images/slide1.png")}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>Step 1: Collect The Data</h3>
      <b>The HumaDat device is conifgured </b><br/>
      <b>to collect a range of sensor data.</b>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="w-100"
      src={require("../../images/slide2.png")}
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Step 2: Stream and Store</h3>
      <b>Use the device to collect data to the removable storage </b><br/>
      <b>or live stream the data over BLE (or both!).</b>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className=" w-100"
      src={require("../../images/slide3.png")}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Step 3: Analyse</h3>
      <b>Use the analysis portal to select and view insights on collected data </b><br/>
      <b>aswell as to download the raw data.</b>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    )

}
export default Slider