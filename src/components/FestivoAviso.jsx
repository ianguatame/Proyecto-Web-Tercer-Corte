import { useEffect, useState } from "react";
import { getFestivo } from "../services/nager";

export default function FestivoAviso({ fecha }) {
  const [res, setRes] = useState({ fecha: null, festivo: null });

  useEffect(() => {
    if (!fecha) return;
    let activo = true;

    getFestivo(fecha)
      .then((festivo) => {
        if (activo) setRes({ fecha, festivo });
      })
      .catch(() => {
        if (activo) setRes({ fecha, festivo: null });
      });

    return () => {
      activo = false;
    };
  }, [fecha]);

  if (!fecha || res.fecha !== fecha) return null;
  if (!res.festivo) return <p className="suave">📆 Ese día no es festivo en Colombia.</p>;
  return <p className="aviso">🎉 Ese día es festivo en Colombia: {res.festivo.localName}</p>;
}