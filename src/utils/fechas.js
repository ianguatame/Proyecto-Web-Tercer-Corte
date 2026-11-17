export function formatearFecha(fecha) {
  if (!fecha) return "Fecha por confirmar";
  return new Date(`${fecha}T00:00:00`).toLocaleDateString("es-CO", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function formatearFechaLarga(fecha) {
  if (!fecha) return "Fecha por confirmar";
  return new Date(`${fecha}T00:00:00`).toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatearHora(hora) {
  return hora ? hora.slice(0, 5) : null;
}