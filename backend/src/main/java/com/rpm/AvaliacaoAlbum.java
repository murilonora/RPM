package com.rpm;
import jakarta.validation.constraints.NotBlank;

public class AvaliacaoAlbum extends Avaliacao {
    @NotBlank(message="Album obrigatorio")
    private String tituloAlbum;

    public String getTituloAlbum(){
        return this.tituloAlbum;
    }

    public void setTituloAlbum(String tituloAlbum){
        this.tituloAlbum=tituloAlbum;
    }
}
