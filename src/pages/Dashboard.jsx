import { useState } from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import GestionApis from "../components/GestionApis";

function Dashboard({ usuario, setUsuario }) {
  const [modoOscuro, setModoOscuro] = useState(true);

  const cerrarSesion = async () => {
    await signOut(auth);
    setUsuario(null);
  };

  return (
    <div
      className={
        modoOscuro
          ? "min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white p-6 transition-all"
          : "min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 text-slate-900 p-6 transition-all"
      }
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div
          className={
            modoOscuro
              ? "bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl"
              : "bg-white/80 backdrop-blur-xl border border-slate-200 p-6 rounded-3xl shadow-2xl"
          }
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
            <div>
              <p className="text-sm uppercase tracking-widest text-blue-400 font-bold">
                Panel Principal
              </p>

              <h1 className="text-4xl font-extrabold mt-1">
                Dashboard
              </h1>

              <p className={modoOscuro ? "text-slate-300 mt-2" : "text-slate-600 mt-2"}>
                Bienvenido, {usuario?.nombre || usuario?.email} 👋
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setModoOscuro(!modoOscuro)}
                className="w-12 h-12 rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-xl shadow-lg transition"
              >
                {modoOscuro ? "☀️" : "🌙"}
              </button>

              <button
                onClick={cerrarSesion}
                className="px-5 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg transition"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>

        {/* TARJETAS */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="bg-blue-500/90 p-6 rounded-3xl shadow-xl text-white">
            <p className="text-sm opacity-90">API Clima</p>
            <h2 className="text-3xl font-extrabold mt-2">Tiempo real</h2>
            <p className="mt-2 opacity-90">Consulta con ubicación actual.</p>
          </div>

          <div className="bg-green-500/90 p-6 rounded-3xl shadow-xl text-white">
            <p className="text-sm opacity-90">API Perros</p>
            <h2 className="text-3xl font-extrabold mt-2">Imágenes</h2>
            <p className="mt-2 opacity-90">Muestra perros aleatorios.</p>
          </div>

          <div className="bg-yellow-400 p-6 rounded-3xl shadow-xl text-slate-900">
            <p className="text-sm opacity-80">API Pokémon</p>
            <h2 className="text-3xl font-extrabold mt-2">Buscador</h2>
            <p className="mt-2 opacity-80">Consulta datos e imagen.</p>
          </div>
        </div>

        {/* APIS */}
        <GestionApis />

      </div>
    </div>
  );
}

export default Dashboard;