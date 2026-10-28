package com.rpm;
import java.util.List;
public record ArtistaResposta(String id, String nome, List<AlbumResposta> albuns, List<MusicaResposta> musicas,
                              String categoria, String genero, String origem, String periodoAtivo, String ouvintesMensais,
                              Long ouvintesMensaisNum, String foto, String legendaFoto, String resumo, String biografia,
                              String citacao) {
}

record AlbumResposta(String titulo, String ano, String faixas,
                     String reproducoes, Long streams, String capa) {
}

record MusicaResposta(String titulo, String album, String ano, String reproducoes, String capa, Long streams){

}
