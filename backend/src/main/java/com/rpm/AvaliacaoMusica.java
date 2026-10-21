package com.rpm;
import jakarta.validation.constraints.NotBlank;

public class AvaliacaoMusica extends Avaliacao {
    @NotBlank(message="Musica obrigatoria")
    private String musicaId;

    public String getMusicaId(){
        return this.musicaId;
    }

    public void setMusicaId(String musicaId){
        this.musicaId=musicaId;
    }

}
