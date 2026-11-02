package com.rpm;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

// @MappedSuperclass: esta classe nao vira tabela sozinha; os campos dela
// aparecem nas tabelas das filhas (avaliacao_musica e avaliacao_album).
@MappedSuperclass
public abstract class Avaliacao {

    // gerado pelo MySQL
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    // quem avaliou: vem da sessao do login, nunca do JSON enviado.
    // No banco vira a coluna usuario_id .
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Usuario usuario;

    @NotBlank(message="Artista obrigatorio")
    @Column(name = "artista_id", nullable = false)
    private String artistaId;

    @NotNull(message="Nota obrigatoria")
    @Min(value=1,message="Nota minima é 1")
    @Max(value=5,message="O maximo é 5")
    @Column(nullable = false)
    private Integer nota;

    // comentario opcional: so e preenchido pelas rotas /comentarios
    @Column(length = 800)
    private String texto;

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

    public String getArtistaId(){
        return this.artistaId;
    }

    public void setArtistaId(String artistaId){
        this.artistaId=artistaId;
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

    public String getTexto(){
        return this.texto;
    }

    public void setTexto(String texto){
        this.texto=texto;
    }

    public LocalDateTime getDataAvaliacao(){
        return this.dataAvaliacao;
    }

    public void setDataAvaliacao(LocalDateTime dataAvaliacao){
        this.dataAvaliacao=dataAvaliacao;
    }
}
