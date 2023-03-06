import { useState } from 'react'
import './Connect.css'

function log(login,password){
console.log(login,password)
}

function Connect() {
  const [login,setLogin] = useState("");
  const [password,setPassword] = useState("");

  return (
    <div>
    Pwa doctolib
    <div>login <input type={"text"} onChange={event => {setLogin(event.target.value);}}/>  
   </div>
    <div>password <input type={"text"} onChange={event => {setPassword(event.target.value);}}/>   </div>
    <button onClick={_ => log(login,password)}>Connect</button>
    </div >
  )
}

export default Connect
