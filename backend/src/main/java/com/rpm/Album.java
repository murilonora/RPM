package com.rpm;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;

@Entity
public class Album {

    // Álbum não tem id no front, então o MySQL gera 1, 2, 3... (AUTO_INCREMENT).
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    private String ano;
    private String faixas;
    private String reproducoes;
    private Long streams;
    private String capa;

    // Muitos álbuns → um artista. No banco vira a coluna artista_id (chave estrangeira).
    // nullable = false: todo álbum precisa ter um artista.
    @ManyToOne
    @JoinColumn(name = "artista_id", nullable = false)
    private Artista artista;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAno() {
        return ano;
    }

    public void setAno(String ano) {
        this.ano = ano;
    }

    public String getFaixas() {
        return faixas;
    }

    public void setFaixas(String faixas) {
        this.faixas = faixas;
    }

    public String getReproducoes() {
        return reproducoes;
    }

    public void setReproducoes(String reproducoes) {
        this.reproducoes = reproducoes;
    }

    public Long getStreams() {
        return streams;
    }

    public void setStreams(Long streams) {
        this.streams = streams;
    }

    public String getCapa() {
        return capa;
    }

    public void setCapa(String capa) {
        this.capa = capa;
    }

    public Artista getArtista() {
        return artista;
    }

    public void setArtista(Artista artista) {
        this.artista = artista;
    }
}
