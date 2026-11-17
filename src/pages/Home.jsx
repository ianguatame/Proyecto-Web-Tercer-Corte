import { useEffect, useState } from "react";
import { getEventos, hayKey } from "../services/ticketmaster";
import { eventosDemo } from "../data/eventosDemo";
import Hero from "../components/Hero";
import Categorias from "../components/Categorias";
import EventoCard from "../components/EventoCard";

const CATEGORIAS = [
  { id: "music", nombre: "Música", icono: "🎵", filtro: { categoria: "music" } },
  { id: "festivales", nombre: "Festivales", icono: "🎪", filtro: { palabra: "festival" } },
  { id: "teatro", nombre: "Teatro", icono: "🎭", filtro: { categoria: "Arts & Theatre" } },
  { id: "deportes", nombre: "Deportes", icono: "🏆", filtro: { categoria: "Sports" } },
];

export default function Home() {
  const [categoria, setCategoria] = useState("music");
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    let activo = true;
    const cat = CATEGORIAS.find((c) => c.id === categoria);

    const carga = hayKey
      ? getEventos({ ...cat.filtro, size: 12 })
      : Promise.resolve(eventosDemo.filter((e) => e.catId === categoria));

    carga
      .then((lista) => {
        if (!activo) return;
        setEventos(lista);
        setError("");
      })
      .catch(() => {
        if (!activo) return;
        setEventos([]);
        setError("No pudimos cargar los eventos. Intenta de nuevo.");
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, [categoria]);

  function cambiarCategoria(id) {
    setCargando(true);
    setCategoria(id);
  }

  const texto = busqueda.toLowerCase();
  const visibles = eventos.filter((e) =>
    `${e.nombre} ${e.artista} ${e.recinto}`.toLowerCase().includes(texto)
  );

  return (
    <div>
      <input
        className="buscador"
        placeholder="Buscar artistas, eventos o recintos..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <Hero evento={visibles[0]} />
      <Categorias categorias={CATEGORIAS} activa={categoria} onCambiar={cambiarCategoria} />

      <h2 className="titulo-seccion">Sugeridos para ti</h2>
      {cargando && <p className="suave">Cargando eventos...</p>}
      {error && <p className="error">{error}</p>}
      {!cargando && !error && visibles.length === 0 && (
        <p className="suave">No encontramos eventos con ese filtro.</p>
      )}

      <div className="grid">
        {visibles.map((e) => (
          <EventoCard key={e.id} evento={e} />
        ))}
      </div>
    </div>
  );
}