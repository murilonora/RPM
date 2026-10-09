package com.rpm;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class Avaliacao {
    private Long id;

    private Long usuarioId;

    // Música e álbum não têm id no front, então o item avaliado é identificado por artista + tipo + título
    @NotBlank(message="Artista obrigatorio")
    private String artistaId;          // ex.: "matue"

    @NotBlank(message="Tipo obrigatorio")
    @Pattern(regexp="MUSICA|ALBUM", message="Tipo deve ser MUSICA ou ALBUM")
    private String tipo;               // necessário: há músicas e álbuns com o mesmo título (ex.: "Thriller")

    @NotBlank(message="Titulo obrigatorio")
    private String titulo;             // ex.: "Maquina do Tempo"

    @NotNull(message="Nota obrigatoria")
    @Min(value=0, message="Nota minima e 0")
    @Max(value=5, message="Nota maxima e 5")
    private Integer nota;

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

    public Integer getNota(){
        return this.nota;
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

    public void setNota(Integer nota){
        this.nota=nota;
    }
}
