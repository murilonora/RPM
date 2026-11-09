package com.rpm;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AvaliacaoMusicaRepository extends JpaRepository<AvaliacaoMusica, Long> {
    // a avaliacao que este usuario ja fez para esta musica, se existir
    Optional<AvaliacaoMusica> findByUsuarioIdAndArtistaIdAndTituloMusica(Long usuarioId, String artistaId, String tituloMusica);
    // lista com todas as avaliacoes de musica feitas por este usuario
    List<AvaliacaoMusica> findByUsuarioId(Long usuarioId);
}
