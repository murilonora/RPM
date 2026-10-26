import { Link } from "react-router-dom";
import { AvaliacaoVinil } from "../AvaliacaoVinil";
import { ImagemComFallback } from "../ImagemComFallback";
import { itemParaAvaliar } from "./itensColecao";

// Ficha de uma obra avaliada: capa, nota em vinis, resenha e ações
export function CartaoFicha({ item, ehFavorito, aoTornarFavorito, aoAvaliar }) {
  return (
    <div className={`ficha-card-item cartao-com-link ${ehFavorito ? "card-favorito-ativo" : ""}`}>
      <div className="ficha-card-header">
        <span className="ficha-card-tipo">
          {item.tipo === "album" ? "LP // ÁLBUM" : "FAIXA // SINGLE"}
        </span>
        {ehFavorito ? (
          <span className="ficha-card-ouro-badge">★ FAVORITO SUPREMO</span>
        ) : (
          <span className="ficha-card-ano">{item.ano || "RPM"}</span>
        )}
      </div>

      <div className="ficha-card-body">
        <div className="ficha-capa-wrap">
          {item.capa ? (
            <ImagemComFallback
              src={item.capa}
              alt={item.titulo}
              className="ficha-capa-img w-full h-full"
              tamanho={250}
            />
          ) : (
            <div className="ficha-capa-vazia">LP</div>
          )}
        </div>

        <div className="ficha-titulos-box">
          <span className="ficha-card-artista">{item.artista.nome}</span>
          <h3 className="ficha-card-titulo">
            <Link to={`/artista/${item.artista.id}`} className="cartao-link">
              {item.titulo}
            </Link>
          </h3>
        </div>
      </div>

      {item.comentario && <div className="ficha-card-comentario">"{item.comentario}"</div>}

      <div className="ficha-card-footer">
        <div className="ficha-vinis-rating">
          <AvaliacaoVinil chaveItem={item.chave} tamanho="pequeno" apenasLeitura />
        </div>

        <div className="ficha-botoes-acoes">
          <button
            type="button"
            className={`btn-ficha-coroar ${ehFavorito ? "ativo" : ""}`}
            onClick={() => aoTornarFavorito(item.chave)}
            title={ehFavorito ? "Favorito Supremo Ativo" : "Definir como Favorito Supremo"}
          >
            {ehFavorito ? "★ OURO" : "TORNAR FAVORITO"}
          </button>

          {aoAvaliar && (
            <button
              type="button"
              className="btn-ficha-editar"
              onClick={() => aoAvaliar(itemParaAvaliar(item))}
              title="Editar nota e comentário"
            >
              EDITAR
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
