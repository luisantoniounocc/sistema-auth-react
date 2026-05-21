import { useState } from "react";

function GestionApis() {
  const [clima, setClima] = useState(null);
  const [perro, setPerro] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [nombrePokemon, setNombrePokemon] = useState("pikachu");
  const [cargandoClima, setCargandoClima] = useState(false);
  const [cargandoPerro, setCargandoPerro] = useState(false);
  const [cargandoPokemon, setCargandoPokemon] = useState(false);
  const obtenerDescripcionClima = (codigo) => {

  if (codigo === 0) return "☀️ Soleado";

  if (codigo >= 1 && codigo <= 3)
    return "⛅ Parcialmente nublado";

  if (codigo >= 45 && codigo <= 48)
    return "🌫️ Neblina";

  if (codigo >= 51 && codigo <= 67)
    return "🌧️ Lluvia";

  if (codigo >= 71 && codigo <= 77)
    return "❄️ Nieve";

  if (codigo >= 80 && codigo <= 99)
    return "⛈️ Tormenta";

  return "Clima desconocido";

};

  const obtenerClima = () => {
    setCargandoClima(true);

    if (!navigator.geolocation) {
      alert("Tu navegador no permite obtener ubicación.");
      setCargandoClima(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (posicion) => {
        try {
          const latitud = posicion.coords.latitude;
          const longitud = posicion.coords.longitude;

          const respuesta = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current_weather=true`
          );

          const datos = await respuesta.json();
          setClima(datos.current_weather);
        } catch (error) {
          alert("No se pudo consultar el clima.");
          console.log(error);
        } finally {
          setCargandoClima(false);
        }
      },
      (error) => {
        alert("Permite la ubicación para consultar el clima real.");
        console.log(error);
        setCargandoClima(false);
      }
    );
  };

  const obtenerPerro = async () => {
    try {
      setCargandoPerro(true);

      const respuesta = await fetch("https://dog.ceo/api/breeds/image/random");
      const datos = await respuesta.json();

      setPerro(datos.message);
    } catch (error) {
      alert("No se pudo consultar la API de perros.");
      console.log(error);
    } finally {
      setCargandoPerro(false);
    }
  };

  const obtenerPokemon = async () => {
    try {
      setCargandoPokemon(true);

      const respuesta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase().trim()}`
      );

      if (!respuesta.ok) {
        alert("Pokémon no encontrado");
        setPokemon(null);
        return;
      }

      const datos = await respuesta.json();
      setPokemon(datos);
    } catch (error) {
      alert("Error al consultar Pokémon");
      console.log(error);
    } finally {
      setCargandoPokemon(false);
    }
  };

  return (
    <div className="mt-8 grid lg:grid-cols-3 gap-6">

      {/* API CLIMA */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-blue-300 font-bold uppercase tracking-widest">
              Open-Meteo
            </p>
            <h2 className="text-2xl font-extrabold">API de Clima</h2>
          </div>

          <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
            🌤️
          </div>
        </div>

        <p className="text-slate-300 mb-5">
          Consulta la temperatura actual usando tu ubicación real.
        </p>

        <button
          onClick={obtenerClima}
          className="w-full bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-2xl font-bold shadow-lg transition"
        >
          {cargandoClima ? "Consultando..." : "Consultar Clima"}
        </button>

        {clima && (
          <div className="mt-5 space-y-4">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-5 rounded-3xl text-white shadow-lg">
              <p className="text-sm opacity-90">Temperatura actual</p>

              <h3 className="text-5xl font-extrabold mt-2">
  {clima.temperature}°C
</h3>

<p className="mt-2 text-lg font-bold">
  {obtenerDescripcionClima(clima.weathercode)}
</p>
              

              <div className="mt-4 bg-white/30 rounded-full h-3">
                <div
                  className="bg-white h-3 rounded-full"
                  style={{
                    width: `${Math.min(Math.max(clima.temperature * 3, 10), 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-700/80 p-4 rounded-2xl">
                <p className="text-slate-300 text-sm">Viento</p>
                <h4 className="text-2xl font-bold">
                  {clima.windspeed} km/h
                </h4>
              </div>

              <div className="bg-slate-700/80 p-4 rounded-2xl">
                <p className="text-slate-300 text-sm">Dirección</p>
                <h4 className="text-2xl font-bold">
                  {clima.winddirection}°
                </h4>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* API PERROS */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-green-300 font-bold uppercase tracking-widest">
              Dog CEO
            </p>
            <h2 className="text-2xl font-extrabold">API de Perros</h2>
          </div>

          <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
            🐶
          </div>
        </div>

        <p className="text-slate-300 mb-5">
          Muestra imágenes aleatorias obtenidas desde una API real.
        </p>

        <button
          onClick={obtenerPerro}
          className="w-full bg-green-500 hover:bg-green-600 px-5 py-3 rounded-2xl font-bold shadow-lg transition"
        >
          {cargandoPerro ? "Cargando..." : "Ver Perro"}
        </button>

        {perro && (
          <div className="mt-5 bg-slate-700/80 p-3 rounded-3xl">
            <img
              src={perro}
              alt="Perro aleatorio"
              className="w-full h-56 object-cover rounded-2xl shadow-lg"
            />

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-green-500/20 p-3 rounded-2xl">
                <p className="text-green-300 text-sm">Estado</p>
                <h4 className="font-bold">Imagen cargada</h4>
              </div>

              <div className="bg-green-500/20 p-3 rounded-2xl">
                <p className="text-green-300 text-sm">Formato</p>
                <h4 className="font-bold">URL API</h4>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* API POKEMON */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-yellow-300 font-bold uppercase tracking-widest">
              PokéAPI
            </p>
            <h2 className="text-2xl font-extrabold">API Pokémon</h2>
          </div>

          <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
            ⚡
          </div>
        </div>

        <p className="text-slate-300 mb-5">
          Busca un Pokémon y muestra sus datos principales.
        </p>

        <input
          type="text"
          value={nombrePokemon}
          onChange={(e) => setNombrePokemon(e.target.value)}
          className="w-full p-3 rounded-2xl bg-slate-700/80 text-white outline-none mb-4"
          placeholder="Ejemplo: pikachu"
        />

        <button
          onClick={obtenerPokemon}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-5 py-3 rounded-2xl font-bold shadow-lg transition"
        >
          {cargandoPokemon ? "Buscando..." : "Buscar Pokémon"}
        </button>

        {pokemon && (
          <div className="mt-5 bg-gradient-to-br from-yellow-300 to-orange-400 p-5 rounded-3xl text-slate-900 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase opacity-80">
                  Resultado
                </p>

                <h3 className="text-3xl font-extrabold capitalize">
                  {pokemon.name}
                </h3>
              </div>

              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-28 h-28 object-contain drop-shadow-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-white/50 p-3 rounded-2xl">
                <p className="text-sm font-bold opacity-70">Altura</p>
                <h4 className="text-2xl font-extrabold">
                  {pokemon.height}
                </h4>
              </div>

              <div className="bg-white/50 p-3 rounded-2xl">
                <p className="text-sm font-bold opacity-70">Peso</p>
                <h4 className="text-2xl font-extrabold">
                  {pokemon.weight}
                </h4>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default GestionApis;