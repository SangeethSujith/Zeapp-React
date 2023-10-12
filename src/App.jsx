import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import toasterConfig from "../src/common/renderToaster"


import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import CareerEVT from './pages/CareerEVT/CareerEVT'
import ReasoningTest from './pages/ReasoningTest/ReasoningTest';

function App() {
  return (
    // <Dashboard/>
    // <Login/>
    <>
    <ToastContainer theme="colored" {...toasterConfig} />
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/career-evaluation' element={<CareerEVT />} />
      <Route path='/reasoning-test' element={<ReasoningTest/>}/>
    </Routes>
    </>
    // <CareerEVT/>
    )
}

export default App
