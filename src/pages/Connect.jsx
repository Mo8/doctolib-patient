import { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useNavigate } from "react-router-dom";



function Connect() {
  const [login, setLogin] = useState("juliancautela@gmail.com");
  const [password, setPassword] = useState("123456");
  const navigate = useNavigate();
  const handleConnect = async function() {
    try {
      console.log(login, password);
      var credential = await signInWithEmailAndPassword(auth, login, password);
      console.log(credential);
      navigate("/form")
    } catch (e) {
      console.log(`Failed with error code: ${e.code}`);
      console.log(e.message);
    }
  }
  // onAuthStateChanged(auth,(currentUser)=>{
  //   console.log("auth changed " , currentUser);
  // });

  return (
    <div>
      Pwa doctolib
      <div>
        login
        <input
          type={"text"}
          onChange={(event) => {
            setLogin(event.target.value);
          }}
        />
      </div>
      <div>
        password
        <input
          type={"text"}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <button onClick={(_) => handleConnect()}>Connect</button>
    </div>
  );
}

export default Connect;
