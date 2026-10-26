import { contarDoisDigitos } from "./itensColecao";

// Cabeçalho da coleção: identificação do crítico e as quatro métricas
export function FichaCritico({ usuario, totalAvaliacoes, mediaAvaliacoes, totalObrasPrimas, totalResenhas }) {
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
    </section>
  );
}
