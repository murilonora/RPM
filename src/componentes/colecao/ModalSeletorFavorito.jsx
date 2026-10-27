import { imagemNoTamanho, tratarErroImagem } from "../../utilitarios/imagens";

// Modal para escolher qual obra avaliada ocupa o pedestal do Disco de Ouro
export function ModalSeletorFavorito({ itens, chaveAtual, aoEscolher, aoFechar }) {
  return (
    <div className="modal-overlay" onClick={aoFechar}>
      <div
        className="modal-conteudo modal-brutal-seletor"
        role="dialog"
        aria-modal="true"
        aria-labelledby="seletor-favorito-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-fechar" onClick={aoFechar} aria-label="Fechar">
          ✕
        </button>

        <span className="modal-seletor-tag">RPM_ARCHIVE // TROCA_DE_FAVORITO</span>
        <h2 id="seletor-favorito-titulo" className="modal-titulo modal-seletor-titulo">
          Escolha seu Disco de Ouro
        </h2>
        <p className="modal-seletor-sub">
          Selecione o registro que ficará gravado no pedestal da sua coleção:
        </p>

        <div className="seletor-lista-itens">
          {itens.map((item) => {
            const selecionado = item.chave === chaveAtual;

            return (
              <button
                type="button"
                key={item.chave}
                className={`seletor-card-item brutal-item ${selecionado ? "selecionado" : ""}`}
                aria-pressed={selecionado}
                onClick={() => aoEscolher(item.chave)}
              >
                <img
                  src={imagemNoTamanho(item.capa, 250) || "/assets/rpm-mark.svg"}
                  alt=""
                  className="seletor-item-capa"
                  onError={tratarErroImagem}
                />
                <span className="seletor-item-textos">
                  <strong>{item.titulo}</strong>
                  <span>
                    {item.artista.nome} · {item.nota}/5 VINIS
                  </span>
                </span>
                {selecionado ? (
                  <span className="seletor-check-badge">★ ATUAL</span>
                ) : (
                  <span className="seletor-btn-escolher">[ SELECIONAR ]</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
