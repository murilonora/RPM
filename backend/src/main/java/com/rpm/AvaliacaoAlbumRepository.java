package com.rpm;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AvaliacaoAlbumRepository extends JpaRepository<AvaliacaoAlbum, Long> {
    // a avaliacao que este usuario ja fez para este album, se existir
    Optional<AvaliacaoAlbum> findByUsuarioIdAndArtistaIdAndTituloAlbum(Long usuarioId, String artistaId, String tituloAlbum);
    List<AvaliacaoAlbum> findByUsuarioId(Long usuarioId);
}
