import { Route, Routes } from "react-router-dom";
import Connect from "./pages/Connect";
import Form from "./pages/Form";
import "./App.css";
import Rdvs from "./pages/Rdvs";
import { useEffect, useState } from "react";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  useEffect(() => {
    window.addEventListener(
      "beforeinstallprompt",
      (e) => {
        setDeferredPrompt(e);
      },
      []
    );
  });
  return (
    <div>
      <div>
        {deferredPrompt ? (
          <button
            onClick={async () => {
              if (deferredPrompt !== null) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === "accepted") {
                  deferredPrompt = null;
                }
              }
            }}
          >
            Install
          </button>
        ) : (
          "No install possible"
        )}
      </div>
      <Routes>
        <Route path="/" element={<Connect />} />
        <Route path="/form" element={<Form />} />
        <Route path="/rdvs" element={<Rdvs />} />
      </Routes>
    </div>
  );
}

export default App;
