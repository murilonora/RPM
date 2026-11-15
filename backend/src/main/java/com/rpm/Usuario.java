package com.rpm;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    @NotBlank(message= "Nome obrigatorio")
    private String nome;

    @NotBlank(message="Email obrigatorio")
    @Email(message="Email invalido")
    @Column(unique = true, nullable = false)
    private String email;

    @NotBlank(message="Senha obrigatoria")
    @Size(min=8, message="Senha deve ter no minimo 8 caracteres")
    @JsonProperty(access=JsonProperty.Access.WRITE_ONLY)
    private String senha;

    // Perfil publico. READ_ONLY: aparecem nas respostas, mas o cadastro (POST /api/usuarios)
    // ignora esses campos. So mudam pelo PUT /api/usuarios/me, que valida os links.
    @Column(columnDefinition = "TEXT")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String bio;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String instagram;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String twitter;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String spotify;

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

    public String getBio(){
        return this.bio;
    }

    public void setBio(String bio){
        this.bio=bio;
    }

    public String getInstagram(){
        return this.instagram;
    }

    public void setInstagram(String instagram){
        this.instagram=instagram;
    }

    public String getTwitter(){
        return this.twitter;
    }

    public void setTwitter(String twitter){
        this.twitter=twitter;
    }

    public String getSpotify(){
        return this.spotify;
    }

    public void setSpotify(String spotify){
        this.spotify=spotify;
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
