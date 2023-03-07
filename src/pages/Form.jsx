import Select from "react-dropdown-select";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../../firebase.config";
import { useEffect, useState } from "react";
function Form() {
  const [doctor, setDoctor] = useState(null);
  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  const [value, loadingDoctor, errorDoctor] = useCollectionOnce(
    collection(firestore, "doctor"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  //   const [doctorList, setDoctorList] = useState([]);
  console.log(value, loadingDoctor, errorDoctor);
  console.log(doctor);

  //   useEffect(() => {
  //     async function fetchData() {
  //       const query = await getDocs(collection(firestore, "doctor"));
  //       console.log(query.docs);
  //       setDoctorList(query);
  //     }
  //     fetchData();
  //   }, []);

  const options = [{ value: 1, label: "test" }];
  return (
    <>
      {!loadingAuth && user != null ? user.email : "Not auth"}{" "}
      {
        /* {!loadingAuth && value != null ? value.docs : ""} */
        value && (
          <Select
            options={value.docs.map((value) => {
              return { value: value.id, label: value.data().name };
            })}
            onChange={(doctor) => setDoctor(doctor)}
          />
        )
      }
    </>
  );
}

export default Form;
