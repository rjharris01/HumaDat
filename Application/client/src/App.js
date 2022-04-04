import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import BleScreen from "./screens/BleScreen"
import LoginScreen from './screens/LoginScreen'
import Sidebar from "./components/sidebar/sidebar"




function App() {
  return (
    <Router>
      <Sidebar/>
      <div className="App">
        <Container>
          <Routes>
            <Route path='/login' element={<LoginScreen/>} exact/>
            <Route path='/ble' element={<BleScreen/>} exact/>
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;