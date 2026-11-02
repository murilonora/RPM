package com.rpm;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

// Tabela avaliacao_musica. Cada usuario tem no maximo uma avaliacao por musica:
// a combinacao (usuario, artista, titulo) nao pode se repetir.
@Entity
@Table(name = "avaliacao_musica",
        uniqueConstraints = @UniqueConstraint(columnNames = {"usuario_id", "artista_id", "titulo_musica"}))
public class AvaliacaoMusica extends Avaliacao {
    @NotBlank(message="Musica obrigatoria")
    @Column(name = "titulo_musica", nullable = false)
    private String tituloMusica;

    public String getTituloMusica(){
        return this.tituloMusica;
    }

    public void setTituloMusica(String tituloMusica){
        this.tituloMusica=tituloMusica;
    }

}
