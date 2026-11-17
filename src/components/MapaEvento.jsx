export default function MapaEvento({ lat, lon, recinto }) {
  if (lat == null || lon == null) {
    return <p className="suave">Ubicación no disponible.</p>;
  }

  const d = 0.008;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - d},${lat - d},${lon + d},${lat + d}&layer=mapnik&marker=${lat},${lon}`;
  const enlace = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=16/${lat}/${lon}`;

  return (
    <div>
      <iframe className="mapa" title={`Mapa de ${recinto}`} src={src} loading="lazy" />
      <a href={enlace} target="_blank" rel="noreferrer" className="enlace">
        Ver en mapa ↗
      </a>
    </div>
  );
}