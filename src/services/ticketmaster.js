const KEY = import.meta.env.VITE_TICKETMASTER_KEY;
const BASE = "https://app.ticketmaster.com/discovery/v2";
const PAIS = "US"; // cuando tengas la key, prueba "CO" y mira si hay resultados

export const hayKey = Boolean(KEY) && KEY.length >= 20;

export function normalizarEvento(e) {
  const venue = e._embedded?.venues?.[0];
  const clasif = e.classifications?.[0];
  const img = [...(e.images ?? [])].sort((a, b) => b.width - a.width)[0];
  return {
    id: e.id,
    nombre: e.name,
    artista: e._embedded?.attractions?.[0]?.name ?? e.name,
    imagen: img?.url ?? null,
    fecha: e.dates?.start?.localDate ?? null,
    hora: e.dates?.start?.localTime ?? null,
    recinto: venue?.name ?? "Recinto por confirmar",
    ciudad: venue?.city?.name ?? "",
    lat: venue?.location ? Number(venue.location.latitude) : null,
    lon: venue?.location ? Number(venue.location.longitude) : null,
    categoria: clasif?.segment?.name ?? "Evento",
    genero: clasif?.genre?.name ?? "",
    url: e.url ?? null,
  };
}

export async function getEventos({ categoria = "", palabra = "", size = 12 } = {}) {
  const params = new URLSearchParams({
    apikey: KEY,
    countryCode: PAIS,
    size,
    sort: "date,asc",
  });
  if (categoria) params.set("classificationName", categoria);
  if (palabra) params.set("keyword", palabra);

  const res = await fetch(`${BASE}/events.json?${params}`);
  if (!res.ok) throw new Error("Error al consultar Ticketmaster");
  const data = await res.json();
  return (data._embedded?.events ?? []).map(normalizarEvento);
}

export async function getEvento(id) {
  const res = await fetch(`${BASE}/events/${id}.json?apikey=${KEY}`);
  if (!res.ok) throw new Error("Evento no encontrado");
  return normalizarEvento(await res.json());
}