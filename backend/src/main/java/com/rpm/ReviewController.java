package com.rpm;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

// Rotas publicas de leitura de avaliacoes (nao exigem login).
@RestController
public class ReviewController {

    private static final int LIMITE = 20;

    private final AvaliacaoAlbumRepository avaliacaoAlbumRepository;
    private final AvaliacaoMusicaRepository avaliacaoMusicaRepository;

    public ReviewController(AvaliacaoAlbumRepository avaliacaoAlbumRepository,
                            AvaliacaoMusicaRepository avaliacaoMusicaRepository) {
        this.avaliacaoAlbumRepository = avaliacaoAlbumRepository;
        this.avaliacaoMusicaRepository = avaliacaoMusicaRepository;
    }

    // GET /api/artistas/{id}/avaliacoes: ultimas reviews com comentario sobre o artista
    // (albuns e musicas juntos, mais recentes primeiro, no maximo 20)
    @GetMapping("/api/artistas/{id}/avaliacoes")
    public List<ReviewPublica> reviewsDoArtista(@PathVariable String id) {
        List<ReviewPublica> reviews = new ArrayList<>();
        for (AvaliacaoAlbum avaliacao : avaliacaoAlbumRepository.findTop20ByArtistaIdAndTextoIsNotNullOrderByDataAvaliacaoDesc(id)) {
            reviews.add(ReviewPublica.de(avaliacao));
        }
        for (AvaliacaoMusica avaliacao : avaliacaoMusicaRepository.findTop20ByArtistaIdAndTextoIsNotNullOrderByDataAvaliacaoDesc(id)) {
            reviews.add(ReviewPublica.de(avaliacao));
        }

        // junta as duas listas (ate 20 + 20), ordena por data e fica com as 20 mais recentes
        reviews.sort(Comparator.comparing(ReviewPublica::dataAvaliacao).reversed());
        return reviews.size() > LIMITE ? reviews.subList(0, LIMITE) : reviews;
    }
}
