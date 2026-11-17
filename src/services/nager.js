export async function getFestivo(fecha) {
  const anio = fecha.slice(0, 4);
  const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${anio}/CO`);
  if (!res.ok) throw new Error("No se pudieron obtener los festivos");
  const lista = await res.json();
  return lista.find((f) => f.date === fecha) ?? null;
}