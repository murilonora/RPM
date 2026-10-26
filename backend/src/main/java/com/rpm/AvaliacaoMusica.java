package com.rpm;
import jakarta.validation.constraints.NotBlank;

public class AvaliacaoMusica extends Avaliacao {
    @NotBlank(message="Musica obrigatoria")
    private String tituloMusica;

    public String getTituloMusica(){
        return this.tituloMusica;
    }

    public void setTituloMusica(String tituloMusica){
        this.tituloMusica=tituloMusica;
    }

}
