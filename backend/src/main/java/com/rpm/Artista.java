package com.rpm;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Artista {

    // Chave primária. Sem @GeneratedValue: o id já vem pronto do front ("matue").
    @Id
    private String id;

    @Column(nullable = false)
    private String nome;

    private String categoria;
    private String genero;
    private String origem;
    private String periodoAtivo;
    private String ouvintesMensais;
    private Long ouvintesMensaisNum;
    private String foto;
    private String legendaFoto;

    // TEXT: esses textos passam de 255 caracteres (limite do VARCHAR padrão).
    @Column(columnDefinition = "TEXT")
    private String resumo;

    @Column(columnDefinition = "TEXT")
    private String biografia;

    @Column(columnDefinition = "TEXT")
    private String citacao;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getOrigem() {
        return origem;
    }

    public void setOrigem(String origem) {
        this.origem = origem;
    }

    public String getPeriodoAtivo() {
        return periodoAtivo;
    }

    public void setPeriodoAtivo(String periodoAtivo) {
        this.periodoAtivo = periodoAtivo;
    }

    public String getOuvintesMensais() {
        return ouvintesMensais;
    }

    public void setOuvintesMensais(String ouvintesMensais) {
        this.ouvintesMensais = ouvintesMensais;
    }

    public Long getOuvintesMensaisNum() {
        return ouvintesMensaisNum;
    }

    public void setOuvintesMensaisNum(Long ouvintesMensaisNum) {
        this.ouvintesMensaisNum = ouvintesMensaisNum;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getLegendaFoto() {
        return legendaFoto;
    }

    public void setLegendaFoto(String legendaFoto) {
        this.legendaFoto = legendaFoto;
    }

    public String getResumo() {
        return resumo;
    }

    public void setResumo(String resumo) {
        this.resumo = resumo;
    }

    public String getBiografia() {
        return biografia;
    }

    public void setBiografia(String biografia) {
        this.biografia = biografia;
    }

    public String getCitacao() {
        return citacao;
    }

    public void setCitacao(String citacao) {
        this.citacao = citacao;
    }
}
