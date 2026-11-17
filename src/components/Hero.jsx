import { Link } from "react-router-dom";
import { formatearFecha } from "../utils/fechas";

export default function Hero({ evento }) {
  if (!evento) return null;
  return (
    <section
      className="hero"
      style={evento.imagen ? { backgroundImage: `linear-gradient(transparent, #000c), url(${evento.imagen})` } : undefined}
    >
      <span className="badge">DESTACADO</span>
      <h1>{evento.artista}: {evento.nombre}</h1>
      <p>
        {formatearFecha(evento.fecha)} · {evento.recinto}
      </p>
      <Link to={`/evento/${evento.id}`} className="btn">
        Ver boleto →
      </Link>
    </section>
  );
}