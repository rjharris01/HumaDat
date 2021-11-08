import React from 'react'
import "./topbar.css"

import PersonIcon from '@mui/icons-material/Person';

export default function Topbar(){
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topleft">
                    <span className="logo">HumaDat</span>
                </div>
                <div className="topright">
                    <div className="topbarIconContainer">
                        <PersonIcon/>
                    </div>
                    
                </div>
            </div>
        </div>
        )
}