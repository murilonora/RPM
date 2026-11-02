package com.rpm;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

// Tabela avaliacao_album. Cada usuario tem no maximo uma avaliacao por album:
// a combinacao (usuario, artista, titulo) nao pode se repetir.
@Entity
@Table(name = "avaliacao_album",
        uniqueConstraints = @UniqueConstraint(columnNames = {"usuario_id", "artista_id", "titulo_album"}))
public class AvaliacaoAlbum extends Avaliacao {
    @NotBlank(message="Album obrigatorio")
    @Column(name = "titulo_album", nullable = false)
    private String tituloAlbum;

    public String getTituloAlbum(){
        return this.tituloAlbum;
    }

    public void setTituloAlbum(String tituloAlbum){
        this.tituloAlbum=tituloAlbum;
    }
}
