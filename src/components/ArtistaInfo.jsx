import { useEffect, useState } from "react";
import { buscarArtista } from "../services/audiodb";

export default function ArtistaInfo({ nombre }) {
  const [res, setRes] = useState({ nombre: null, artista: null });

  useEffect(() => {
    let activo = true;

    buscarArtista(nombre)
      .then((artista) => {
        if (activo) setRes({ nombre, artista });
      })
      .catch(() => {
        if (activo) setRes({ nombre, artista: null });
      });

    return () => {
      activo = false;
    };
  }, [nombre]);

  if (res.nombre !== nombre) return <p className="suave">Cargando artista...</p>;

  const a = res.artista;
  if (!a) return <p className="suave">No encontramos información de este artista.</p>;

  const bio = a.strBiographyES || a.strBiographyEN || "";

  return (
    <div className="artista">
      {a.strArtistThumb && <img src={a.strArtistThumb} alt={a.strArtist} />}
      <div>
        <h4>{a.strArtist}</h4>
        <p className="suave">{[a.strGenre, a.strCountry].filter(Boolean).join(" · ")}</p>
        {bio && <p className="bio">{bio.length > 350 ? `${bio.slice(0, 350)}…` : bio}</p>}
      </div>
    </div>
  );
}