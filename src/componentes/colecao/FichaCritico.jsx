import { contarDoisDigitos } from "./itensColecao";

// O que mais aparece numa lista (ex.: a vertente mais avaliada) e quantas vezes
function maisFrequente(valores) {
  const contagem = new Map();
  for (const valor of valores) if (valor) contagem.set(valor, (contagem.get(valor) || 0) + 1);
  return [...contagem].sort((a, b) => b[1] - a[1])[0] || null;
}

// "1 OBRA AVALIADA" / "3 OBRAS AVALIADAS"
const obrasAvaliadas = (total) => `${total} ${total === 1 ? "OBRA AVALIADA" : "OBRAS AVALIADAS"}`;

// Retrato do crítico: quantas obras levaram cada nota (barras), a vertente e o artista mais avaliados
function RetratoCritico({ itens }) {
  const porNota = [5, 4, 3, 2, 1].map((nota) => ({ nota, total: itens.filter((i) => i.nota === nota).length }));
  const maior = Math.max(1, ...porNota.map((n) => n.total));
  const vertente = maisFrequente(itens.map((i) => i.artista?.categoria));
  const artista = maisFrequente(itens.map((i) => i.artista?.nome));

  return (
    <div className="retrato-critico">
      <div className="retrato-notas" role="img" aria-label={porNota.map((n) => `${n.total} com nota ${n.nota}`).join(", ")}>
        <span className="metrica-mono-tag">DISTRIBUIÇÃO_DAS_NOTAS</span>
        {porNota.map(({ nota, total }) => (
          <div key={nota} className="retrato-barra-linha">
            <span className="retrato-barra-nota">{nota}</span>
            <span className="retrato-barra-trilho">
              <span className="retrato-barra" style={{ width: `${(total / maior) * 100}%` }} />
            </span>
            <span className="retrato-barra-total">{total}</span>
          </div>
        ))}
      </div>
      <div className="metrica-quadro">
        <span className="metrica-mono-tag">VERTENTE_FAVORITA</span>
        <strong className="retrato-destaque">{vertente ? vertente[0] : "—"}</strong>
        <span className="metrica-mono-sub">{vertente ? obrasAvaliadas(vertente[1]) : "SEM DADOS"}</span>
      </div>
      <div className="metrica-quadro">
        <span className="metrica-mono-tag">ARTISTA_MAIS_AVALIADO</span>
        <strong className="retrato-destaque">{artista ? artista[0] : "—"}</strong>
        <span className="metrica-mono-sub">{artista ? obrasAvaliadas(artista[1]) : "SEM DADOS"}</span>
      </div>
    </div>
  );
}

// Cabeçalho da coleção: identificação do crítico, as quatro métricas e o retrato do gosto
export function FichaCritico({ usuario, itens = [], totalAvaliacoes, mediaAvaliacoes, totalObrasPrimas, totalResenhas }) {
  return (
    <section className="arquivo-ficha-critico">
      <div className="ficha-topo-grid">
        <div className="ficha-identificacao">
          <div className="ficha-codigo-linha">
            <span className="ficha-label-mono">ARQUIVO_RPM // FICHA_CRÍTICO</span>
            <span className="ficha-serial">ID: #{usuario.id.slice(0, 10).toUpperCase()}</span>
          </div>
          <h1 className="ficha-nome-critico">{usuario.nome}</h1>
          <p className="ficha-credencial">
            CREDENTIAL: <code>{usuario.email || usuario.id}</code> · STATUS: ATIVO
          </p>
        </div>

        <div className="ficha-selo-caixa">
          <div className="selo-caixa-topo">COLEÇÃO_CERTIFICADA</div>
          <div className="selo-caixa-corpo">
            <span className="selo-ano-gravacao">RPM·2026</span>
            <strong className="selo-grau">CRÍTICO OURO</strong>
          </div>
        </div>
      </div>

      <div className="ficha-metricas-grid">
        <div className="metrica-quadro">
          <span className="metrica-mono-tag">TOTAL_AVALIADO</span>
          <strong className="metrica-mono-num">{contarDoisDigitos(totalAvaliacoes)}</strong>
          <span className="metrica-mono-sub">OBRAS CATALOGADAS</span>
        </div>
        <div className="metrica-quadro metrica-destaque-red">
          <span className="metrica-mono-tag">MÉDIA_VINIS</span>
          <strong className="metrica-mono-num">{mediaAvaliacoes}</strong>
          <span className="metrica-mono-sub">DE 5.0 ESTRELAS</span>
        </div>
        <div className="metrica-quadro">
          <span className="metrica-mono-tag">OBRAS_PRIMAS</span>
          <strong className="metrica-mono-num">{contarDoisDigitos(totalObrasPrimas)}</strong>
          <span className="metrica-mono-sub">GRAU MÁXIMO (5/5)</span>
        </div>
        <div className="metrica-quadro">
          <span className="metrica-mono-tag">RESENHAS_TXT</span>
          <strong className="metrica-mono-num">{contarDoisDigitos(totalResenhas)}</strong>
          <span className="metrica-mono-sub">CRÍTICAS ESCRITAS</span>
        </div>
      </div>

      {itens.length > 0 && <RetratoCritico itens={itens} />}
    </section>
  );
}
