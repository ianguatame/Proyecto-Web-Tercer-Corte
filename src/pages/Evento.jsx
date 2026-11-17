import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { rangoPrecios } from "../data/zonas";
import { formatearCOP } from "../utils/moneda";
import { formatearFechaLarga, formatearHora } from "../utils/fechas";
import MapaEvento from "../components/MapaEvento";
import ClimaEvento from "../components/ClimaEvento";
import ArtistaInfo from "../components/ArtistaInfo";
import { cargarEvento } from "../services/eventos";
import FestivoAviso from "../components/FestivoAviso";



export default function Evento() {
  const { id } = useParams();
  const [estado, setEstado] = useState({ id: null, evento: null, error: false });

  useEffect(() => {
    let activo = true;

    cargarEvento(id)
      .then((evento) => {
        if (activo) setEstado({ id, evento, error: false });
      })
      .catch(() => {
        if (activo) setEstado({ id, evento: null, error: true });
      });

    return () => {
      activo = false;
    };
  }, [id]);

  const cargando = estado.id !== id;
  const { evento, error } = estado;

  if (cargando) return <p className="suave">Cargando evento...</p>;

  if (error || !evento) {
    return (
      <div>
        <Link to="/" className="volver">← Volver</Link>
        <p className="error">No encontramos este evento.</p>
      </div>
    );
  }

  const { desde, hasta } = rangoPrecios();
  const hora = formatearHora(evento.hora);

  return (
    <div>
      <Link to="/" className="volver">← Volver</Link>

      <div className="evento-layout">
        <section>
          <div
            className="evento-img"
            style={evento.imagen ? { backgroundImage: `url(${evento.imagen})` } : undefined}
          >
            {!evento.imagen && <span>🎶</span>}
          </div>

          <span className="pill">{evento.genero || evento.categoria}</span>
          <h1 className="evento-titulo">{evento.nombre}</h1>
          <p className="suave">{evento.artista}</p>

          <ul className="datos">
            <li>📅 {formatearFechaLarga(evento.fecha)}</li>
            {hora && <li>🕖 Puertas {hora}</li>}
            <li>
              📍 {evento.recinto}
              {evento.ciudad ? `, ${evento.ciudad}` : ""}
            </li>
          </ul>
          <FestivoAviso fecha={evento.fecha} />

          <div className="compra">
            <p>
              Boletos desde <strong>{formatearCOP(desde)}</strong> hasta{" "}
              <strong>{formatearCOP(hasta)}</strong>
            </p>
            <Link to={`/zonas/${evento.id}`} className="btn">
              Comprar boletos →
            </Link>
          </div>
        </section>

        <aside>
          <div className="panel">
            <h3>Ubicación</h3>
            <MapaEvento lat={evento.lat} lon={evento.lon} recinto={evento.recinto} />
          </div>
          <div className="panel">
            <h3>Clima previsto</h3>
            <ClimaEvento lat={evento.lat} lon={evento.lon} fecha={evento.fecha} />
          </div>
          <div className="panel">
            <h3>Sobre el artista</h3>
            <ArtistaInfo nombre={evento.artista} />
          </div>
        </aside>
      </div>
    </div>
  );
}