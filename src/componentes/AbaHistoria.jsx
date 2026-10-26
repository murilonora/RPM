// Biografia e história editorial do artista
export function AbaHistoria({ biografia = [], citacao = "", resumo = "" }) {
  const paragrafos = Array.isArray(biografia) ? biografia : [biografia];

  return (
    <article className="story">
      {resumo && <p className="story-lead">{resumo}</p>}

      <div className="story-columns">
        {paragrafos.map((paragrafo, indice) => (
          <p key={indice}>{paragrafo}</p>
        ))}
      </div>

      {citacao && <blockquote>{citacao}</blockquote>}
    </article>
  );
}
