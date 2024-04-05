import './App.css'
import Login from "./pages/Login"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Tasks from "./pages/Tasks"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {

  return (
      <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/getalltasks" element={<Tasks />} />
          </Routes>
      </Router>


  )
}

export default App
