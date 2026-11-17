import { getEvento } from "./ticketmaster";
import { eventosDemo } from "../data/eventosDemo";

export async function cargarEvento(id) {
  if (id.startsWith("demo-")) {
    const demo = eventosDemo.find((e) => e.id === id);
    if (!demo) throw new Error("Evento no encontrado");
    return demo;
  }
  return getEvento(id);
}