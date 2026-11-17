const KEY = import.meta.env.VITE_AUDIODB_KEY;

export async function buscarArtista(nombre) {
  const url = `https://www.theaudiodb.com/api/v1/json/${KEY}/search.php?s=${encodeURIComponent(nombre)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("No se pudo obtener el artista");
  const data = await res.json();
  return data.artists?.[0] ?? null;
}