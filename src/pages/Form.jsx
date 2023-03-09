import Select from "react-dropdown-select";
import { collection, getDocs, addDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../../firebase.config";
import { useState } from "react";
import DateTimePicker from "react-datetime-picker";

import { saveAs } from "file-saver";
import * as ics from "ics";
function Form() {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  const [datePicker, setDatePicker] = useState(null);
  const [doctorCollection, loadingDoctor, errorDoctor] = useCollectionOnce(
    collection(firestore, "doctor"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  //   const [rdvsCollection, loadingRdv, errorRdv] = useCollectionOnce(
  //     collection(firestore, "rdvs"),
  //     {
  //       snapshotListenOptions: { includeMetadataChanges: true },
  //     }
  //   );
  //   const [doctorList, setDoctorList] = useState([]);
  console.log(doctorCollection, loadingDoctor, errorDoctor);
  console.log(doctor, doctorCollection && doctorCollection.docs);

  //   useEffect(() => {
  //     async function fetchData() {
  //       const query = await getDocs(collection(firestore, "doctor"));
  //       console.log(query.docs);
  //       setDoctorList(query);
  //     }
  //     fetchData();
  //   }, []);

  return (
    <>
      {!loadingAuth && user != null ? user.email : "Not auth"}
      <button onClick={() => navigate("/rdvs")}>Voir rdvs</button>
      {doctorCollection && (
        <>
          <Select
            options={doctorCollection.docs.map((value) => {
              console.log(value);
              return { value: value.id, label: value.data().name };
            })}
            onChange={(doctor) => setDoctor(doctor[0].value)}
          />
          <DateTimePicker onChange={setDatePicker} value={datePicker} />
          {/* {doctorCollection && doctor && (
            <>
              {console.log(
                rdvsCollection.docs
                  .filter((value) => value.data().doctor.id == doctor)
                  .map((value) => new Date(value.data().horaire.seconds * 1000))
              )}
            </>
          )} */}
          <button
            disabled={datePicker == null || doctor == null}
            onClick={async () => {
              console.log("send rdvs");
              let doctorDoc = doctorCollection.docs.find(
                (value) => value.id == doctor
              );
              await addDoc(collection(firestore, "rdvs"), {
                doctor: doctorDoc.ref,
                patient: (
                  await getDocs(collection(firestore, "patient"))
                ).docs.find((value) => value.id == auth.currentUser.uid).ref,
                horaire: datePicker,
              });
              // Créer un événement de calendrier
              let date = new Date(datePicker);
              const event = {
                title: "Rdv",
                description: `Rdv avec ${doctorDoc.data().name}` ,
                start: [
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate(),
                  date.getHours(),
                  date.getMinutes(),
                ],
                duration: { hours: 1 },
              };
              ics.createEvent(event, (error, value) => {
                const blob = new Blob([value], {
                  type: "text/plain;charset=utf-8",
                });
                saveAs(blob, "event-schedule.ics");
              });
            }}
          >
            Send
          </button>
        </>
      )}
    </>
  );
}

export default Form;
