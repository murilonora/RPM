package com.rpm;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class Usuario {
    private Long id;

    @NotBlank(message= "Nome obrigatorio")
    private String nome;

    @NotBlank(message="Email obrigatorio")
    @Email(message="Email invalido")
    private String email;

    @NotBlank(message="Senha obrigatoria")
    @Size(min=8, message="Senha deve ter no minimo 8 caracteres")
    @JsonProperty(access=JsonProperty.Access.WRITE_ONLY)
    private String senha;

    public Long getId(){
        return this.id;
    }

    public String getNome(){
        return this.nome;
    }

    public String getSenha(){
        return this.senha;
    }

    public String getEmail(){
        return this.email;
    }

    public void setId(Long id){
        this.id=id;
    }

    public void setNome(String nome){
        this.nome=nome;
    }

    public void setEmail(String email){
        this.email=email;
    }

    public void setSenha(String senha){
        this.senha=senha;
    }

    public void trocarSenha(String novaSenha){
        if(novaSenha==null || novaSenha.isBlank()){
            throw new IllegalArgumentException("Senha vazia");
        }
        if(Objects.equals(novaSenha,this.senha)){
            throw new IllegalArgumentException("A nova senha deve ser diferente da atual");
        }
        this.senha=novaSenha;
    }
}
