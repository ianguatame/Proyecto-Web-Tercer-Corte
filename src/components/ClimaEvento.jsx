import { useEffect, useState } from "react";
import { getClima } from "../services/openMeteo";

export default function ClimaEvento({ lat, lon, fecha }) {
  const [res, setRes] = useState({ clave: "", datos: null });

  const sinDatos = lat == null || lon == null || !fecha;
  const clave = `${lat}|${lon}|${fecha}`;

  useEffect(() => {
    if (lat == null || lon == null || !fecha) return;
    let activo = true;
    const claveActual = `${lat}|${lon}|${fecha}`;

    getClima(lat, lon, fecha)
      .then((datos) => {
        if (activo) setRes({ clave: claveActual, datos });
      })
      .catch(() => {
        if (activo) setRes({ clave: claveActual, datos: null });
      });

    return () => {
      activo = false;
    };
  }, [lat, lon, fecha]);

  if (sinDatos) return <p className="suave">Sin datos de clima.</p>;
  if (res.clave !== clave) return <p className="suave">Consultando clima...</p>;
  if (!res.datos) {
    return <p className="suave">Pronóstico aún no disponible para esa fecha.</p>;
  }

  return (
    <div className="clima">
      <p>🌡️ {Math.round(res.datos.min)}° – {Math.round(res.datos.max)}°C</p>
      <p>🌧️ {res.datos.lluvia}% de probabilidad de lluvia</p>
    </div>
  );
}