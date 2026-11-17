export default function Categorias({ categorias, activa, onCambiar }) {
  return (
    <div className="categorias">
      {categorias.map((c) => (
        <button
          key={c.id}
          className={`cat ${activa === c.id ? "activa" : ""}`}
          onClick={() => onCambiar(c.id)}
        >
          <span className="cat-icono">{c.icono}</span>
          {c.nombre}
        </button>
      ))}
    </div>
  );
}