import './App.css'
import { Outlet } from 'react-router-dom';
import Nav from "../src/components/Nav"
import Footer from './components/Footer';

function App() {

return (

  <div className='min-h-screen bg-gray-100'>
    <Nav />
    <Outlet />
  </div>

  )
}

export default App
