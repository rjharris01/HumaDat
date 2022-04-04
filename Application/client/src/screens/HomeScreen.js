import React, { useState, useEffect } from 'react';
import { blue } from '@mui/material/colors';
import {IconButton, requirePropFactory} from '@mui/material';
import BluetoothConnectedIcon from '@mui/icons-material/BluetoothConnected';
import Chart from '../components/chart/chart';
import { useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
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