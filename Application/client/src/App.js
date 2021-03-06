import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import BleScreen from "./screens/BleScreen"
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import FileUploadScreen from './screens/FileUploadScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';
import RegisterScreen from './screens/RegisterScreen';




function App() {
  return (
    <Router>
      <div className="App">
        
          <Routes>
            <Route path='/file/upload'element={<FileUploadScreen/>} exact/>
            <Route path='/profile' element={<ProfileScreen/>} exact/>
            <Route path='/login' element={<LoginScreen/>} exact/>
            <Route path='/' element={<HomeScreen/>} exact/>
            <Route path='/ble' element={<BleScreen/>} exact/>
            <Route path='/analytics' element={<AnalyticsScreen/>} exact/>
            <Route path='/register' element={<RegisterScreen/>} exact/>
          </Routes>
        
      </div>
    </Router>
  );
}

export default App;