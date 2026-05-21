import { useEffect, useState } from "react";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const verificarSesion = onAuthStateChanged(auth, (usuarioActual) => {
      setUsuario(usuarioActual);
      setCargando(false);
    });

    return () => verificarSesion();
  }, []);

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <h1 className="text-2xl font-bold">Cargando...</h1>
      </div>
    );
  }

  return (
    <>
      {usuario ? (
        <Dashboard usuario={usuario} setUsuario={setUsuario} />
      ) : (
        <Login setUsuario={setUsuario} />
      )}
    </>
  );
}

export default App;