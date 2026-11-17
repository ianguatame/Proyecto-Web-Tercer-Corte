const base = { imagen: null, moneda: "COP", url: null, ciudad: "Bogotá", lat: 4.6486, lon: -74.0777 };

export const eventosDemo = [
  { ...base, id: "demo-1", catId: "music", nombre: "Gira Mundial", artista: "Coldplay", fecha: "2026-11-28", hora: "20:00:00", recinto: "Movistar Arena", categoria: "Music", genero: "Pop Rock" },
  { ...base, id: "demo-2", catId: "music", nombre: "Noche de Rock", artista: "Foo Fighters", fecha: "2026-12-05", hora: "19:30:00", recinto: "Estadio El Campín", categoria: "Music", genero: "Rock" },
  { ...base, id: "demo-3", catId: "festivales", nombre: "Festival Estéreo Picnic", artista: "Varios artistas", fecha: "2026-12-12", hora: "14:00:00", recinto: "Parque Simón Bolívar", categoria: "Music", genero: "Festival" },
  { ...base, id: "demo-4", catId: "festivales", nombre: "Rock al Parque", artista: "Varios artistas", fecha: "2026-12-19", hora: "12:00:00", recinto: "Parque Simón Bolívar", categoria: "Music", genero: "Festival" },
  { ...base, id: "demo-5", catId: "teatro", nombre: "El Rey León", artista: "Compañía Nacional", fecha: "2026-11-25", hora: "18:00:00", recinto: "Teatro Colsubsidio", categoria: "Arts & Theatre", genero: "Musical" },
  { ...base, id: "demo-6", catId: "teatro", nombre: "Noche de Comedia", artista: "Elenco invitado", fecha: "2026-12-02", hora: "20:00:00", recinto: "Teatro Mayor", categoria: "Arts & Theatre", genero: "Comedia" },
  { ...base, id: "demo-7", catId: "deportes", nombre: "Clásico Capitalino", artista: "Millonarios vs Santa Fe", fecha: "2026-11-22", hora: "17:00:00", recinto: "Estadio El Campín", categoria: "Sports", genero: "Fútbol" },
  { ...base, id: "demo-8", catId: "deportes", nombre: "Final de Voleibol", artista: "Selección Colombia", fecha: "2026-12-08", hora: "16:00:00", recinto: "Coliseo El Campín", categoria: "Sports", genero: "Voleibol" },
];
