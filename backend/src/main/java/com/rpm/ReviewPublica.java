package com.rpm;

import java.time.LocalDateTime;

// Avaliacao vista por qualquer pessoa (pagina do artista e perfil publico).
// So tem o nome e o id do autor: o email nunca sai aqui.
// tipo: "album" ou "musica"; obra: o titulo do album ou da musica.
public record ReviewPublica(Long id, Long usuarioId, String nomeUsuario, String artistaId,
                            String tipo, String obra, Integer nota, String texto,
                            LocalDateTime dataAvaliacao) {

    public static ReviewPublica de(AvaliacaoAlbum avaliacao) {
        return new ReviewPublica(avaliacao.getId(), avaliacao.getUsuario().getId(), avaliacao.getUsuario().getNome(),
                avaliacao.getArtistaId(), "album", avaliacao.getTituloAlbum(), avaliacao.getNota(),
                avaliacao.getTexto(), avaliacao.getDataAvaliacao());
    }

    public static ReviewPublica de(AvaliacaoMusica avaliacao) {
        return new ReviewPublica(avaliacao.getId(), avaliacao.getUsuario().getId(), avaliacao.getUsuario().getNome(),
                avaliacao.getArtistaId(), "musica", avaliacao.getTituloMusica(), avaliacao.getNota(),
                avaliacao.getTexto(), avaliacao.getDataAvaliacao());
    }
}
