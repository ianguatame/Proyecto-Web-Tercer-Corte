import { Link } from "react-router-dom";
import { formatearFecha } from "../utils/fechas";

export default function EventoCard({ evento }) {
  return (
    <Link to={`/evento/${evento.id}`} className="card">
      <div
        className="card-img"
        style={evento.imagen ? { backgroundImage: `url(${evento.imagen})` } : undefined}
      >
        {!evento.imagen && <span>🎶</span>}
      </div>
      <div className="card-info">
        <span className="pill">{evento.genero || evento.categoria}</span>
        <h3>{evento.nombre}</h3>
        <p>{formatearFecha(evento.fecha)}</p>
        <p className="suave">📍 {evento.recinto}</p>
      </div>
    </Link>
  );
}