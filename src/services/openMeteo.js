export async function getClima(lat, lon, fecha) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=16`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("No se pudo obtener el clima");
  const data = await res.json();

  const i = data.daily.time.indexOf(fecha); // fecha en formato "2026-11-20"
  if (i === -1) return null; // el evento está muy lejos para tener pronóstico

  return {
    max: data.daily.temperature_2m_max[i],
    min: data.daily.temperature_2m_min[i],
    lluvia: data.daily.precipitation_probability_max[i],
  };
}