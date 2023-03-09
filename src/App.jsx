import { Route,Routes } from "react-router-dom"
import Connect from "./pages/Connect";
import Form from "./pages/Form";
import './App.css'
import Rdvs from "./pages/Rdvs";

function App(){

    return (<>
    <Routes>
        <Route path="/" element={<Connect/>} />        
        <Route path="/form" element={<Form/>} />              
        <Route path="/rdvs" element={<Rdvs/>} />
    </Routes>
    </>)
}

export default App;