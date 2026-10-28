package com.rpm;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/artistas")
public class ArtistaController {

    // 1. os repositories que o controller usa
    private final ArtistaRepository artistaRepository;
    private final AlbumRepository albumRepository;
    private final MusicaRepository musicaRepository;

    // 2. injeção de dependência: o Spring entrega os três prontos
    public ArtistaController(ArtistaRepository artistaRepository, AlbumRepository albumRepository,
                             MusicaRepository musicaRepository) {
        this.artistaRepository = artistaRepository;
        this.albumRepository = albumRepository;
        this.musicaRepository = musicaRepository;
    }

    // 3. GET /api/artistas: o catálogo inteiro, cada artista com seus álbuns e músicas
    @GetMapping
    public List<ArtistaResposta> listar() {
        List<ArtistaResposta> resposta = new ArrayList<>();

        for (Artista artista : artistaRepository.findAll()) {
            // a) álbuns deste artista, convertidos para AlbumResposta
            List<AlbumResposta> albuns = new ArrayList<>();
            for (Album album : albumRepository.findByArtistaId(artista.getId())) {
                albuns.add(paraResposta(album));
            }

            // b) músicas deste artista, convertidas para MusicaResposta
            List<MusicaResposta> musicas = new ArrayList<>();
            for (Musica musica : musicaRepository.findByArtistaId(artista.getId())) {
                musicas.add(paraResposta(musica));
            }

            // c) monta o artista na ordem dos campos do record:
            //    id, nome, albuns, musicas, categoria, genero, origem, periodoAtivo,
            //    ouvintesMensais, ouvintesMensaisNum, foto, legendaFoto, resumo, biografia, citacao
            resposta.add(new ArtistaResposta(
                    artista.getId(),
                    artista.getNome(),
                    albuns,
                    musicas,
                    artista.getCategoria(),
                    artista.getGenero(),
                    artista.getOrigem(),
                    artista.getPeriodoAtivo(),
                    artista.getOuvintesMensais(),
                    artista.getOuvintesMensaisNum(),
                    artista.getFoto(),
                    artista.getLegendaFoto(),
                    artista.getResumo(),
                    artista.getBiografia(),
                    artista.getCitacao()));
        }

        return resposta;
    }

    // 4. conversões entidade → record (o Java escolhe qual chamar pelo tipo do parâmetro)

    // ordem do AlbumResposta: titulo, ano, faixas, reproducoes, streams, capa
    private AlbumResposta paraResposta(Album album) {
        return new AlbumResposta(album.getTitulo(), album.getAno(), album.getFaixas(),
                album.getReproducoes(), album.getStreams(), album.getCapa());
    }

    // ordem do MusicaResposta: titulo, album, ano, reproducoes, capa, streams
    private MusicaResposta paraResposta(Musica musica) {
        return new MusicaResposta(musica.getTitulo(), musica.getAlbum(), musica.getAno(),
                musica.getReproducoes(), musica.getCapa(), musica.getStreams());
    }
}
