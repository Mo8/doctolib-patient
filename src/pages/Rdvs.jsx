import { auth, firestore } from "../../firebase.config";
import { collection, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
function Rdvs() {
  const navigate = useNavigate();
  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  const [rdvsCollection, loadingRdv, errorRdv] = useCollectionOnce(
    collection(firestore, "rdvs"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [rdvs, setRdvs] = useState([]);
  console.log(rdvs);
  useEffect(() => {
    if (rdvsCollection) {
      Promise.all(
        rdvsCollection.docs
          .filter((value) => value.data().patient.id == user.uid)
          .map(async (value) => {
            console.log(value.ref);

            return {
              ref: value,
              doctor: (await getDoc(value.data().doctor)).data().name,
              horaires: new Date(value.data().horaire.seconds * 1000),
            };
          })
      ).then((value) => setRdvs(value));
    }
  }, [rdvsCollection]);
  return (
    <>
      <div>
        Liste des rdvs
        <button onClick={() => navigate("/form")}>Prendre rdvs</button>
      </div>
      {rdvs.length > 0
        ? rdvs.map((value) => (
            <div key={value.ref.id}>
              {value.doctor} {value.horaires.toLocaleString()}
            </div>
          ))
        : ""}
    </>
  );
}
export default Rdvs;
