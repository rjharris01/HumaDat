import React from 'react';
import Sidebar from "../components/sidebar/sidebar"
import {Col, Row, } from 'react-bootstrap'
import Slider from '../components/Slider/Slider.jsx';
import { Container } from '@mui/material';

import background from '../images/background.png'



const HomeScreen = () => {
    

    return (
        <div style={{ backgroundImage: "url(" + background + ")",height: "100vh",
        width: "100vw" }}>
       
        <Sidebar/>
        <Row>
        <Col  md={{span:4, offset:4}}>
        <h2>The HumaDat Platform</h2>
        </Col>
        </Row>
        <Container>
        <Slider/>
        <Row>
            <Col>
            <h4>The <br/> Platform</h4>
            <p>Utilising several powerful IoT sensors, the HumaDat device and platform provides users the ability to collect and analyse several physiological and environmental data points. The device provides raw data access for the following metrics: 
            <br/>
            - Blood Oxygen Levels
            <br/> 
            - Heart Beats Per Minute
            <br/>
            - Ambient Humidity
            <br/>
            - Ambient Temperature 
            <br/>
            - 3-Axis Accelerometer (Movement)</p>
            </Col>

            <Col>
            <h4>Data Journey & Technologies</h4>
            <p>Data is polled from the various sensors by a micro control unit running Arm’s Mbed OS, the sensors are connected with a mixture of communication protocols (i2c, SPI, and serial). The raw data from these sensors is stored on a removable micro SD card in its most granular form allowing for additional data analysis to be 
               performed with other software. Data can be streamed live over a BLE connection to a MERN (MongoDB, Express, React, Node Js) Web application.</p>
            </Col>


            <Col>
            <h4>Unique <br/>Selling Point</h4>
            <p> What sets the HumaDat platform apart from other wearable technologies is the direct access to raw data, allowing users to export collected data to the data science tool of their choice, whereas other wearables only provide pre-analyzed outputs.</p>
            </Col>
        </Row>
        </Container>
       
        </div>
    );
}

export default HomeScreen