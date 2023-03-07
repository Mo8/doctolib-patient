import { Route,Routes } from "react-router-dom"
import Connect from "./pages/Connect";
import Form from "./pages/Form";
import './App.css'

function App(){

    return (<>
    <Routes>
        <Route path="/" element={<Connect/>} />        
        <Route path="/form" element={<Form/>} />
    </Routes>
    </>)
}

export default App;