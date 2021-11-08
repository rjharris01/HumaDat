import "./sidebar.css"
import LineStyleIcon from '@mui/icons-material/LineStyle';
import TimelineIcon from '@mui/icons-material/Timeline';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import ImportExportIcon from '@mui/icons-material/ImportExport';

export default function Sidebar(){
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle"> HumaDat Dashboard</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <LineStyleIcon/>
                            Home
                        </li>
                        <li className="sidebarListItem">
                            <TimelineIcon/>
                            Data Analytics
                        </li>
                        <li className="sidebarListItem">
                            <BluetoothIcon/>
                            Bluetooth Connect
                        </li>
                        <li className="sidebarListItem">
                            <ImportExportIcon/>
                            Data Export
                        </li>

                    </ul>
                </div>
            </div>
        </div>

    )
}