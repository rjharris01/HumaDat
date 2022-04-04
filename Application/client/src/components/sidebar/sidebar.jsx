import TimelineIcon from '@mui/icons-material/Timeline';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HealingIcon from '@mui/icons-material/Healing';
import "../styles.css"
export default function Sidebar(){
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="logo">
                    <a href='/' className="nav-link">
                        <HealingIcon/>
                        <span className="link-text">HumaDat</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href='/ble' className="nav-link">
                        <BluetoothIcon/>
                        <span className="link-text">Bluetooth</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href='#' className="nav-link">
                        <TimelineIcon/>
                        <span className="link-text">Analytics</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href='#' className="nav-link">
                        <ImportExportIcon/>
                        <span className="link-text">Data</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href='#' className="nav-link">
                        <PersonOutlineIcon/>
                        <span className="link-text">Account</span>
                    </a>
                </li>

            </ul>
        </nav>

    )
}