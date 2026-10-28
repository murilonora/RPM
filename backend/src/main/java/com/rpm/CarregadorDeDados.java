package com.rpm;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

// Carrega os artistas, álbuns e músicas do arquivo resources/dados/artistas.json
// para o banco, uma única vez (quando a tabela de artistas está vazia).
//
// @Component: o Spring cria esta classe ao subir a aplicação.
// CommandLineRunner: o método run() é executado logo depois que a aplicação sobe.
@Component
public class CarregadorDeDados implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(CarregadorDeDados.class);
    private static final String ARQUIVO = "dados/artistas.json";

    private final ArtistaRepository artistaRepository;
    private final AlbumRepository albumRepository;
    private final MusicaRepository musicaRepository;
    private final ObjectMapper objectMapper;

    // Injeção de dependência pelo construtor: o Spring entrega os repositories
    // e o ObjectMapper (Jackson) já prontos.
    public CarregadorDeDados(ArtistaRepository artistaRepository,
                             AlbumRepository albumRepository,
                             MusicaRepository musicaRepository,
                             ObjectMapper objectMapper) {
        this.artistaRepository = artistaRepository;
        this.albumRepository = albumRepository;
        this.musicaRepository = musicaRepository;
        this.objectMapper = objectMapper;
    }

    // @Transactional: ou salva tudo, ou nada. Se der erro no meio,
    // o banco não fica com metade dos dados.
    @Override
    @Transactional
    public void run(String... args) throws Exception {

        List<ArtistaJson> artistasJson;
        try (InputStream entrada = new ClassPathResource(ARQUIVO).getInputStream()) {
            artistasJson = objectMapper.readValue(entrada, new TypeReference<List<ArtistaJson>>() {});
        }

        List<Album> albuns = new ArrayList<>();
        List<Musica> musicas = new ArrayList<>();
        int novos=0;
        for (ArtistaJson json : artistasJson) {
            // pula artistas que ja estao no banco, so os novos entram
            if (artistaRepository.existsById(json.id())) {
                continue;
            }
            Artista artista = artistaRepository.save(paraArtista(json));

            for (AlbumJson albumJson : json.albuns()) {
                albuns.add(paraAlbum(albumJson, artista));
            }
            for (MusicaJson musicaJson : json.musicas()) {
                musicas.add(paraMusica(musicaJson, artista));
            }
            novos++; //conta cada artista salvo
        }

        albumRepository.saveAll(albuns);
        musicaRepository.saveAll(musicas);

        log.info("Importação concluída: {} artistas, {} álbuns, {} músicas.",
                novos,albuns.size(),musicas.size());
    }

    private Artista paraArtista(ArtistaJson json) {
        Artista artista = new Artista();
        artista.setId(json.id());
        artista.setNome(json.nome());
        artista.setCategoria(json.categoria());
        artista.setGenero(json.genero());
        artista.setOrigem(json.origem());
        artista.setPeriodoAtivo(json.periodoAtivo());
        artista.setOuvintesMensais(json.ouvintesMensais());
        artista.setOuvintesMensaisNum(json.ouvintesMensaisNum());
        artista.setFoto(json.foto());
        artista.setLegendaFoto(json.legendaFoto());
        artista.setResumo(json.resumo());
        // No JSON a biografia é uma lista de parágrafos; no banco vira um texto só,
        // com uma linha em branco entre os parágrafos.
        artista.setBiografia(json.biografia() == null ? null : String.join("\n\n", json.biografia()));
        artista.setCitacao(json.citacao());
        return artista;
    }

    private Album paraAlbum(AlbumJson json, Artista artista) {
        Album album = new Album();
        album.setTitulo(json.titulo());
        album.setAno(json.ano());
        album.setFaixas(json.faixas());
        album.setReproducoes(json.reproducoes());
        album.setStreams(json.streams());
        album.setCapa(json.capa());
        album.setArtista(artista);
        return album;
    }

    private Musica paraMusica(MusicaJson json, Artista artista) {
        Musica musica = new Musica();
        musica.setTitulo(json.titulo());
        musica.setAlbum(json.album());
        musica.setAno(json.ano());
        musica.setReproducoes(json.reproducoes());
        musica.setStreams(json.streams());
        musica.setCapa(json.capa());
        musica.setArtista(artista);
        return musica;
    }

    // Formato do artistas.json. São records usados só para ler o arquivo:
    // o JSON tem as listas de álbuns e músicas dentro do artista, e a biografia
    // como lista, diferente das entidades.
    record ArtistaJson(String id, String nome, String categoria, String genero, String origem,
                       String periodoAtivo, String ouvintesMensais, Long ouvintesMensaisNum,
                       String foto, String legendaFoto, String resumo, List<String> biografia,
                       String citacao, List<MusicaJson> musicas, List<AlbumJson> albuns) {
    }

    record AlbumJson(String titulo, String ano, String faixas, String reproducoes,
                     Long streams, String capa) {
    }

    record MusicaJson(String titulo, String album, String ano, String reproducoes,
                      Long streams, String capa) {
    }
}
