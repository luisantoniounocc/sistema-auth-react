import { useState } from "react";
import { auth, db } from "../firebase/config";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";

function Login({ setUsuario }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const registrar = async () => {
    try {
      const usuario = await createUserWithEmailAndPassword(
        auth,
        correo,
        password
      );

      await addDoc(collection(db, "usuarios"), {
        nombre: nombre,
        correo: correo,
        uid: usuario.user.uid
      });

      alert("Usuario registrado");

      setUsuario({
        ...usuario.user,
        nombre: nombre
      });

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("El correo ya está registrado");
      } else if (error.code === "auth/weak-password") {
        alert("La contraseña debe tener mínimo 6 caracteres");
      } else {
        alert(error.message);
      }
    }
  };

  const login = async () => {
    try {
      const usuario = await signInWithEmailAndPassword(
        auth,
        correo,
        password
      );

      const consulta = query(
        collection(db, "usuarios"),
        where("uid", "==", usuario.user.uid)
      );

      const resultado = await getDocs(consulta);

      let nombreUsuario = "";

      resultado.forEach((doc) => {
        nombreUsuario = doc.data().nombre;
      });

      alert("Bienvenido");

      setUsuario({
        ...usuario.user,
        nombre: nombreUsuario
      });

    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        alert("Correo o contraseña incorrectos");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-10 rounded-2xl shadow-2xl w-[400px]">
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Sistema Auth
        </h1>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          className="w-full mb-4 p-3 rounded-lg bg-slate-700 text-white outline-none"
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo"
          value={correo}
          className="w-full mb-4 p-3 rounded-lg bg-slate-700 text-white outline-none"
          onChange={(e) => setCorreo(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          className="w-full mb-6 p-3 rounded-lg bg-slate-700 text-white outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={registrar}
          className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-bold transition mb-4"
        >
          Registrarse
        </button>

        <button
          onClick={login}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-bold transition"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}

export default Login;