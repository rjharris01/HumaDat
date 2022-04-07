import React, { useState, useEffect } from 'react';
import Sidebar from "../components/sidebar/sidebar"

import {Image} from 'react-bootstrap'


const HomeScreen = (props) => {

    return (
        <div>
        <Sidebar/>
            <div className="container">
                <Image src={require("../images/background.png")} fluid center/>
            </div>
        </div>
    );
}

export default HomeScreen