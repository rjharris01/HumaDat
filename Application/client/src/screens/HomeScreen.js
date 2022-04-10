import React, { useState, useEffect } from 'react';
import Sidebar from "../components/sidebar/sidebar"

import {Col, Image, } from 'react-bootstrap'


const HomeScreen = (props) => {

    return (
        <div>
        <Sidebar/>
       
        <Image src={require("../images/background.png")} fluid center/>
       
        </div>
    );
}

export default HomeScreen