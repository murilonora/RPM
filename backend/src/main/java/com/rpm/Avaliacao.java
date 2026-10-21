package com.rpm;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public abstract class Avaliacao {
    private Long id;
    private Usuario usuario;

    @NotNull(message="Nota obrigatoria")
    @Min(value=1,message="Nota minima é 1")
    @Max(value=5,message="O maximo é 5")
    private Integer nota;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private LocalDateTime dataAvaliacao;

    public Avaliacao(){
        this.dataAvaliacao = LocalDateTime.now();
    }
    public Usuario getUsuario(){
        return this.usuario;
    }

    public void setUsuario(Usuario usuario){
        this.usuario=usuario;
    }

    public Long getId(){
        return this.id;
    }

    public void setId(Long id){
        this.id=id;
    }

    public Integer getNota(){
        return this.nota;
    }

    public void setNota(Integer nota){
        this.nota=nota;
    }

    public LocalDateTime getDataAvaliacao(){
        return this.dataAvaliacao;
    }

    public void setDataAvaliacao(LocalDateTime dataAvaliacao){
        this.dataAvaliacao=dataAvaliacao;
    }
}
