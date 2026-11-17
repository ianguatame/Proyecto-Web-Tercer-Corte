import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cargarEvento } from "../services/eventos";
import { zonas } from "../data/zonas";
import { formatearCOP } from "../utils/moneda";
import MapaZonas from "../components/MapaZonas";

const MAX_BOLETOS = 4;

export default function Zonas() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [estado, setEstado] = useState({ id: null, evento: null });
  const [cantidad, setCantidad] = useState(2);
  const [zonaId, setZonaId] = useState(null);

  useEffect(() => {
    let activo = true;

    cargarEvento(id)
      .then((evento) => {
        if (activo) setEstado({ id, evento });
      })
      .catch(() => {
        if (activo) setEstado({ id, evento: null });
      });

    return () => {
      activo = false;
    };
  }, [id]);

  if (estado.id !== id) return <p className="suave">Cargando...</p>;

  if (!estado.evento) {
    return (
      <div>
        <Link to="/" className="volver">← Volver</Link>
        <p className="error">No encontramos este evento.</p>
      </div>
    );
  }

  const zona = zonas.find((z) => z.id === zonaId);
  const total = zona ? zona.precio * cantidad : 0;

  function continuar() {
    navigate(`/pago/${id}`, { state: { zonaId, cantidad } });
  }

  return (
    <div>
      <Link to={`/evento/${id}`} className="volver">← Volver al evento</Link>
      <h1 className="zonas-titulo">Selección de zonas</h1>
      <p className="suave">{estado.evento.nombre}</p>

      <div className="zonas-layout">
        <section className="panel">
          <MapaZonas seleccionada={zonaId} onSeleccionar={setZonaId} />
          <p className="suave centrado">Haz clic en una zona para elegirla.</p>
        </section>

        <aside>
          <div className="panel">
            <h3>¿Cuántos boletos?</h3>
            <div className="contador">
              <button onClick={() => setCantidad((c) => Math.max(1, c - 1))}>−</button>
              <strong>{cantidad}</strong>
              <button onClick={() => setCantidad((c) => Math.min(MAX_BOLETOS, c + 1))}>+</button>
              <span className="suave">(Máx. {MAX_BOLETOS})</span>
            </div>
          </div>

          <div className="zonas-lista">
            {zonas.map((z) => (
              <button
                key={z.id}
                className={`zona-card ${zonaId === z.id ? "activa" : ""}`}
                disabled={!z.disponible}
                onClick={() => setZonaId(z.id)}
              >
                <span className="punto" style={{ background: z.color }} />
                <span>
                  <strong>{z.nombre}</strong>
                  <br />
                  <small className="suave">
                    {z.disponible ? formatearCOP(z.precio) : "Agotado"}
                  </small>
                </span>
              </button>
            ))}
          </div>

          <div className="panel resumen">
            <p>
              {cantidad} {cantidad === 1 ? "boleto" : "boletos"}
              {zona ? ` · Zona ${zona.nombre}` : ""}
            </p>
            <p className="total">{zona ? formatearCOP(total) : "Elige una zona"}</p>
            <button className="btn btn-bloque" disabled={!zona} onClick={continuar}>
              Continuar al pago →
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}