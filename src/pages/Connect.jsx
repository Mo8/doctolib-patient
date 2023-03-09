import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../firebase.config";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";

function Connect() {
  const [login, setLogin] = useState("juliancautela@gmail.com");
  const [password, setPassword] = useState("123456");

  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  const navigate = useNavigate();
  const handleConnect = async function () {
    try {
      console.log(login, password);
      var credential = await signInWithEmailAndPassword(auth, login, password);
      console.log(credential);
      if (credential.user) {
        var patient = await getDoc(
          doc(firestore, "patient", credential.user.uid)
        );
        if (patient.exists()) {
          navigate("/form");
        } else {
          window.navigator?.vibrate?.(200);
          console.log("not a patient");
          auth.signOut();
        }
      }
    } catch (e) {
      window.navigator?.vibrate?.(200);
      console.log(`Failed with error code: ${e.code}`);
      console.log(e.message);
    }
  };
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
      <button
        onClick={(_) => {
          handleConnect();
        }}
      >
        Connect
      </button>
    </div>
  );
}

export default Connect;
