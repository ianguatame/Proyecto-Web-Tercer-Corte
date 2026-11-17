import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { cargarEvento } from "../services/eventos";
import { zonas } from "../data/zonas";
import { formatearCOP } from "../utils/moneda";
import { formatearFechaLarga } from "../utils/fechas";

const METODOS = [
  { id: "tarjeta", nombre: "Tarjeta de crédito (ejemplo ···· 4321)" },
  { id: "billetera", nombre: "Apple Pay / Google Pay" },
  { id: "paypal", nombre: "PayPal" },
];

const TIEMPO_RESERVA = 600; // 10 minutos

function formatearTiempo(seg) {
  const m = String(Math.floor(seg / 60)).padStart(2, "0");
  const s = String(seg % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export default function Pago() {
  const { id } = useParams();
  const { state } = useLocation();

  const [estado, setEstado] = useState({ id: null, evento: null });
  const [segundos, setSegundos] = useState(TIEMPO_RESERVA);
  const [metodo, setMetodo] = useState("tarjeta");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [acepta, setAcepta] = useState(false);
  const [error, setError] = useState("");
  const [orden, setOrden] = useState(null);

  const zona = zonas.find((z) => z.id === state?.zonaId);
  const cantidad = state?.cantidad ?? 0;
  const total = zona ? zona.precio * cantidad : 0;

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

  useEffect(() => {
    if (orden) return;
    const t = setInterval(() => setSegundos((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [orden]);

  function confirmar() {
    if (!nombre.trim()) {
      setError("Escribe tu nombre.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Escribe un correo válido.");
      return;
    }
    if (!acepta) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }
    setError("");
    const codigo = "EV-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setOrden({ codigo });
  }

  if (estado.id !== id) return <p className="suave">Cargando...</p>;

  const evento = estado.evento;

  if (!evento || !zona || cantidad < 1) {
    return (
      <div>
        <Link to="/" className="volver">← Volver</Link>
        <p className="error">No hay una compra en curso. Elige primero tus boletos.</p>
        <Link to={`/zonas/${id}`} className="btn">Elegir zona →</Link>
      </div>
    );
  }

  if (orden) {
    return (
      <div className="confirmacion">
        <div className="check">✓</div>
        <h1>¡Compra confirmada!</h1>
        <p className="suave">
          Te enviaremos los boletos a <strong>{email}</strong> (simulación).
        </p>

        <div className="panel">
          <p className="codigo">{orden.codigo}</p>
          <p><strong>{evento.nombre}</strong></p>
          <p className="suave">{formatearFechaLarga(evento.fecha)} · {evento.recinto}</p>
          <p>
            {cantidad} {cantidad === 1 ? "boleto" : "boletos"} · Zona {zona.nombre}
          </p>
          <p className="total">{formatearCOP(total)}</p>
        </div>

        <Link to="/" className="btn">Volver al inicio</Link>
      </div>
    );
  }

  if (segundos === 0) {
    return (
      <div className="confirmacion">
        <h1>Tu reserva expiró</h1>
        <p className="suave">Pasaron los 10 minutos y los boletos se liberaron.</p>
        <Link to={`/zonas/${id}`} className="btn">Elegir de nuevo →</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to={`/zonas/${id}`} className="volver">← Volver a zonas</Link>
      <h1 className="zonas-titulo">Paso 3 de 3: Pago</h1>

      <div className="reserva">
        ⏱️ Tus boletos están reservados por <strong>{formatearTiempo(segundos)}</strong> minutos
      </div>

      <div className="zonas-layout">
        <section>
          <div className="panel">
            <h3>Método de pago</h3>
            {METODOS.map((m) => (
              <label key={m.id} className="opcion">
                <input
                  type="radio"
                  name="metodo"
                  checked={metodo === m.id}
                  onChange={() => setMetodo(m.id)}
                />
                {m.nombre}
              </label>
            ))}
            <p className="suave nota">Pago simulado: no se realiza ningún cobro.</p>
          </div>

          <div className="panel">
            <h3>Datos de facturación</h3>
            <input
              className="campo"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              className="campo"
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="opcion">
              <input
                type="checkbox"
                checked={acepta}
                onChange={(e) => setAcepta(e.target.checked)}
              />
              Acepto los términos y condiciones
            </label>
          </div>
        </section>

        <aside>
          <div className="panel">
            <h3>Resumen de orden</h3>
            <p><strong>{evento.nombre}</strong></p>
            <p className="suave">{formatearFechaLarga(evento.fecha)}</p>
            <div className="fila">
              <span>Boletos ({cantidad})</span>
              <span>{formatearCOP(zona.precio)} c/u</span>
            </div>
            <div className="fila">
              <span>Zona</span>
              <span>{zona.nombre}</span>
            </div>
            <div className="fila total-fila">
              <span>Total</span>
              <span>{formatearCOP(total)}</span>
            </div>

            {error && <p className="error">{error}</p>}
            <button className="btn btn-bloque" onClick={confirmar}>
              Confirmar pago seguro · {formatearCOP(total)}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}