package com.rpm;

import org.springframework.data.jpa.repository.JpaRepository;

// JpaRepository<Entidade, TipoDoId>. O Spring gera a implementação sozinho:
// save, saveAll, findById, findAll, count, deleteById...
public interface ArtistaRepository extends JpaRepository<Artista, String> {
}
