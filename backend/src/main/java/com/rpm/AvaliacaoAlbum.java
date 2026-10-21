package com.rpm;
import jakarta.validation.constraints.NotBlank;

public class AvaliacaoAlbum extends Avaliacao {
    @NotBlank(message="Album obrigatorio")
    private String albumId;

    public String getAlbumId(){
        return this.albumId;
    }

    public void setAlbumId(String albumId){
        this.albumId=albumId;
    }
}
