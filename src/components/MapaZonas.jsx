import { zonas } from "../data/zonas";

const FORMAS = {
  vip: { x: 150, y: 52, w: 100, h: 50 },
  preferencial: { x: 100, y: 112, w: 200, h: 50 },
  general: { x: 60, y: 172, w: 280, h: 52 },
  graderia: { x: 30, y: 234, w: 340, h: 52 },
};

export default function MapaZonas({ seleccionada, onSeleccionar }) {
  return (
    <svg viewBox="0 0 400 300" className="plano" role="img" aria-label="Plano de zonas">
      <rect x="130" y="10" width="140" height="28" rx="6" fill="#3a3a44" />
      <text x="200" y="29" textAnchor="middle" fill="#f2f2f2" fontSize="12">
        ESCENARIO
      </text>

      {zonas.map((z) => {
        const f = FORMAS[z.id];
        const activa = seleccionada === z.id;
        return (
          <g
            key={z.id}
            onClick={() => z.disponible && onSeleccionar(z.id)}
            style={{ cursor: z.disponible ? "pointer" : "not-allowed" }}
            opacity={z.disponible ? 1 : 0.35}
          >
            <rect
              x={f.x}
              y={f.y}
              width={f.w}
              height={f.h}
              rx="10"
              fill={z.color}
              stroke={activa ? "#fff" : "none"}
              strokeWidth="3"
            />
            <text
              x={f.x + f.w / 2}
              y={f.y + f.h / 2 + 5}
              textAnchor="middle"
              fill="#000"
              fontSize="14"
              fontWeight="700"
            >
              {z.nombre}
            </text>
          </g>
        );
      })}
    </svg>
  );
}