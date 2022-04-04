import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {Container} from 'react-bootstrap'

import BleScreen from "./screens/BleScreen"
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';




function App() {
  return (
    <Router>
      <div className="App">
        
          <Routes>
            <Route path='/profile' element={<ProfileScreen/>} exact/>
            <Route path='/login' element={<LoginScreen/>} exact/>
            <Route path='/' element={<HomeScreen/>} exact/>
            <Route path='/ble' element={<BleScreen/>} exact/>
          </Routes>
        
      </div>
    </Router>
  );
}

export default App;