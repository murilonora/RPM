package com.rpm;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ComentarioMusica extends AvaliacaoMusica{
    @NotBlank(message="Comentario nao pode ser vazio")
    @Size(max=800,message="Comentario deve ter no maximo 800 caracteres")
    private String texto;

    public String getTexto(){
        return this.texto;
    }

    public void setTexto(String texto){
        this.texto=texto;
    }

}
