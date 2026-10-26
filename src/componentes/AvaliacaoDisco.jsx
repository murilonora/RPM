import { useState } from "react";
import { useUsuario } from "../contextos/ContextoUsuario";
import { tocarCliqueVinil } from "../utilitarios/somVinil";
import { DiscoSVG } from "./DiscoSVG";

// Avaliação com o visual criado pela Mell: pílula "Sua nota:" com 5 discos que
// acendem no hover e na nota escolhida. Por baixo usa o mesmo sistema do site
// (login, Coleção e envio ao backend). obra = { tipo, artistaId, titulo, ... }
// escuro: versão para fundos pretos (estante de álbuns)
export function AvaliacaoDisco({ chaveItem, obra, rotulo = "Sua nota", aoPedirLogin, escuro = false }) {
  const { estaLogado, obterAvaliacao, avaliarItem } = useUsuario();
  const [hover, setHover] = useState(0);
  const { nota = 0, comentario } = obterAvaliacao(chaveItem);

  function salvarNota(novaNota) {
    if (!estaLogado) {
      aoPedirLogin?.();
      return;
    }
    tocarCliqueVinil();
    // Clicar na nota já dada desmarca
    avaliarItem(chaveItem, novaNota === nota ? 0 : novaNota, comentario, obra);
  }

  return (
    <div
      className={`avaliacao-disco ${escuro ? "avaliacao-disco--escuro" : ""}`}
      role="group"
      aria-label={rotulo}
      onClick={(evento) => evento.stopPropagation()}
    >
      <span className="avaliacao-disco-rotulo">Sua nota:</span>
      <div className="avaliacao-disco-lista">
        {[1, 2, 3, 4, 5].map((estrela) => (
          <button
            key={estrela}
            type="button"
            onClick={() => salvarNota(estrela)}
            onMouseEnter={() => setHover(estrela)}
            onMouseLeave={() => setHover(0)}
            className={`avaliacao-disco-botao ${estrela <= (hover || nota) ? "aceso" : ""}`}
            title={estaLogado ? `Dar nota ${estrela}` : "Entre para avaliar"}
            aria-label={`${estrela} ${estrela > 1 ? "vinis" : "vinil"}`}
            aria-pressed={estrela === nota}
          >
            <DiscoSVG />
          </button>
        ))}
      </div>
    </div>
  );
}
