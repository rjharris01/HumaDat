import TimelineIcon from '@mui/icons-material/Timeline';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HealingIcon from '@mui/icons-material/Healing';
import "../styles.css"
export default function Sidebar(){
    return (
        <nav class="navbar">
            <ul class="navbar-nav">
                <li class="logo">
                    <a href='#' class="nav-link">
                        <HealingIcon/>
                        <span class="link-text">HumaDat</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href='#' class="nav-link">
                        <BluetoothIcon/>
                        <span class="link-text">Bluetooth</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href='#' class="nav-link">
                        <TimelineIcon/>
                        <span class="link-text">Analytics</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href='#' class="nav-link">
                        <ImportExportIcon/>
                        <span class="link-text">Data</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href='#' class="nav-link">
                        <PersonOutlineIcon/>
                        <span class="link-text">Account</span>
                    </a>
                </li>

            </ul>
        </nav>

    )
}