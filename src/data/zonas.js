export const zonas = [
  { id: "vip", nombre: "VIP", color: "#b6f500", precio: 450000, disponible: true },
  { id: "preferencial", nombre: "Preferencial", color: "#2ea8ff", precio: 360000, disponible: true },
  { id: "general", nombre: "General", color: "#ff9a1f", precio: 120000, disponible: true },
  { id: "graderia", nombre: "Gradería", color: "#8a8a94", precio: 80000, disponible: false },
];

export function rangoPrecios() {
  const precios = zonas.filter((z) => z.disponible).map((z) => z.precio);
  return { desde: Math.min(...precios), hasta: Math.max(...precios) };
}