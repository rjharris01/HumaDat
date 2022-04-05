import TimelineIcon from '@mui/icons-material/Timeline';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HealingIcon from '@mui/icons-material/Healing';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import "../styles.css"
import {useDispatch,useSelector} from 'react-redux'
import { logout } from '../../actions/userActions'

export default function Sidebar(){

    const logoutHandler = () => {
        dispatch(logout())
    }
    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()

    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="logo">
                    <a href='/' className="nav-link">
                        <HealingIcon/>
                        <span className="link-text">HumaDat</span>
                    </a>
                </li>
               
                
                {userInfo ? (
                    <>
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
                    <a href='/file/upload' className="nav-link">
                        <ImportExportIcon/>
                        <span className="link-text">Data</span>
                    </a>
                </li>
                    <li className="nav-item">
                    <a href='/profile' className="nav-link">
                        <PersonOutlineIcon/>
                        <span className="link-text">Account</span>
                    </a>
                    </li>

                    
                    <li className="nav-item">
                        <a href='/login' className="nav-link" onClick={logoutHandler}>
                            <LogoutIcon/>
                            <span className="link-text">Log out</span>
                        </a>
                    </li>
                    </>
                ): <li className="nav-item">
                <a href='/login' className="nav-link">
                    <LoginIcon/>
                    <span className="link-text">Log In</span>
                </a>
            </li>} 
                    
                    
                   

            </ul> 

            
        </nav>

    )
}