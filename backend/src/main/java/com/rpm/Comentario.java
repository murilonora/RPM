package com.rpm;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class Comentario {
    private Long id;

    private Long usuarioId;

    // Música e álbum não têm id no front, então o item comentado é identificado por artista + tipo + título
    @NotBlank(message="Artista obrigatorio")
    private String artistaId;          // ex.: "matue"

    @NotBlank(message="Tipo obrigatorio")
    @Pattern(regexp="MUSICA|ALBUM", message="Tipo deve ser MUSICA ou ALBUM")
    private String tipo;               // necessário: há músicas e álbuns com o mesmo título (ex.: "Thriller")

    @NotBlank(message="Titulo obrigatorio")
    private String titulo;             // ex.: "Maquina do Tempo"

    @NotBlank(message="Comentario nao pode ser vazio")
    @Size(max=500, message="Comentario deve ter no maximo 500 caracteres")
    private String texto;

    public Long getId(){
        return this.id;
    }

    public Long getUsuarioId(){
        return this.usuarioId;
    }

    public String getArtistaId(){
        return this.artistaId;
    }

    public String getTipo(){
        return this.tipo;
    }

    public String getTitulo(){
        return this.titulo;
    }

    public String getTexto(){
        return this.texto;
    }

    public void setId(Long id){
        this.id=id;
    }

    public void setUsuarioId(Long usuarioId){
        this.usuarioId=usuarioId;
    }

    public void setArtistaId(String artistaId){
        this.artistaId=artistaId;
    }

    public void setTipo(String tipo){
        this.tipo=tipo;
    }

    public void setTitulo(String titulo){
        this.titulo=titulo;
    }

    public void setTexto(String texto){
        this.texto=texto;
    }
}
