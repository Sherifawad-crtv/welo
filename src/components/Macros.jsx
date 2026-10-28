export default function Macros({ macros }) {
  return (
    <section>
      <h2 className="h2">Macros</h2>
      <div className="macros">
        {macros.map((m) => (
          <div className="macro" key={m.id}>
            <div className="macro-label">{m.label}</div>
            <div className={`macro-value${m.water ? ' water' : ''}`}>{m.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
