package com.rpm;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

//gabral, quando for ler esse código, isso aqui é bem simples
//é basicamente uma rota pro spring percorrer pra montar as
//classes, validar e se der errado vai jogar pro TratarErros
//roda os metodos e cria uma resposta pro JSON
@RestController
//isso indica que ela é uma classe controller e que
//o retorno sera o corpo da resposta


@RequestMapping("/api/avaliacoes")
//prefixo de todos os endereços da classe

public class AvaliacaoController {

    private final AvaliacaoMusicaRepository avaliacaoMusicaRepository;
    private final AvaliacaoAlbumRepository avaliacaoAlbumRepository;
    private final SessaoUsuario sessaoUsuario;

    // injeção de dependência: o Spring entrega os repositories prontos
    public AvaliacaoController(AvaliacaoMusicaRepository avaliacaoMusicaRepository,
                               AvaliacaoAlbumRepository avaliacaoAlbumRepository,
                               SessaoUsuario sessaoUsuario) {
        this.avaliacaoMusicaRepository = avaliacaoMusicaRepository;
        this.avaliacaoAlbumRepository = avaliacaoAlbumRepository;
        this.sessaoUsuario = sessaoUsuario;
    }

    public record MinhasAvaliacoes(List<AvaliacaoAlbum> albuns, List<AvaliacaoMusica> musicas) {
    }

    @GetMapping
    public MinhasAvaliacoes listarMinhas(HttpServletRequest requisicao){
        Usuario usuario= usuarioLogado(requisicao);
        List<AvaliacaoAlbum> albuns= avaliacaoAlbumRepository.findByUsuarioId(usuario.getId());
        List<AvaliacaoMusica> musicas= avaliacaoMusicaRepository.findByUsuarioId(usuario.getId());

        return new MinhasAvaliacoes(albuns,musicas);
    }

    @PostMapping("/musicas")
    //post é um verbo http para criar um recurso novo

    @ResponseStatus(HttpStatus.CREATED)

    public AvaliacaoMusica avaliarMusica(@Valid @RequestBody AvaliacaoMusica avaliacao, HttpServletRequest requisicao){
        AvaliacaoMusica salva = buscarOuCriarMusica(usuarioLogado(requisicao), avaliacao);
        salva.setNota(avaliacao.getNota());
        salva.setDataAvaliacao(LocalDateTime.now());
        return avaliacaoMusicaRepository.save(salva);
    }

    @PostMapping("/musicas/comentarios")

    @ResponseStatus(HttpStatus.CREATED)
    public AvaliacaoMusica comentarioMusica(@Valid @RequestBody ComentarioMusica comentario, HttpServletRequest requisicao){
        AvaliacaoMusica salva = buscarOuCriarMusica(usuarioLogado(requisicao), comentario);
        salva.setNota(comentario.getNota());
        salva.setTexto(comentario.getTexto().trim());
        salva.setDataAvaliacao(LocalDateTime.now());
        return avaliacaoMusicaRepository.save(salva);
    }

    @PostMapping("/albuns")
    @ResponseStatus(HttpStatus.CREATED)
    public AvaliacaoAlbum avaliarAlbum(@Valid @RequestBody AvaliacaoAlbum avaliacao, HttpServletRequest requisicao) {
        AvaliacaoAlbum salva = buscarOuCriarAlbum(usuarioLogado(requisicao), avaliacao);
        salva.setNota(avaliacao.getNota());
        salva.setDataAvaliacao(LocalDateTime.now());
        return avaliacaoAlbumRepository.save(salva);
    }

    @PostMapping("/albuns/comentarios")
    @ResponseStatus(HttpStatus.CREATED)
    public AvaliacaoAlbum comentarioAlbum(@Valid @RequestBody ComentarioAlbum comentario, HttpServletRequest requisicao){
        AvaliacaoAlbum salva = buscarOuCriarAlbum(usuarioLogado(requisicao), comentario);
        salva.setNota(comentario.getNota());
        salva.setTexto(comentario.getTexto().trim());
        salva.setDataAvaliacao(LocalDateTime.now());
        return avaliacaoAlbumRepository.save(salva);
    }

    // DELETE /api/avaliacoes/musicas/{id}: apaga uma avaliacao de musica do usuario logado
    @DeleteMapping("/musicas/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluirMusica(@PathVariable Long id, HttpServletRequest requisicao) {
        Usuario usuario = usuarioLogado(requisicao);
        AvaliacaoMusica avaliacao = avaliacaoMusicaRepository.findById(id)
                .orElseThrow(AvaliacaoNaoEncontradaException::new);
        // so o dono pode apagar; de outro usuario responde igual a "nao existe"
        if (!avaliacao.getUsuario().getId().equals(usuario.getId())) {
            throw new AvaliacaoNaoEncontradaException();
        }
        avaliacaoMusicaRepository.delete(avaliacao);
    }

    // DELETE /api/avaliacoes/albuns/{id}: mesma ideia para album
    @DeleteMapping("/albuns/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluirAlbum(@PathVariable Long id, HttpServletRequest requisicao) {
        Usuario usuario = usuarioLogado(requisicao);
        AvaliacaoAlbum avaliacao = avaliacaoAlbumRepository.findById(id)
                .orElseThrow(AvaliacaoNaoEncontradaException::new);
        if (!avaliacao.getUsuario().getId().equals(usuario.getId())) {
            throw new AvaliacaoNaoEncontradaException();
        }
        avaliacaoAlbumRepository.delete(avaliacao);
    }

    // ---------- auxiliares ----------

    // quem esta logado; sem login, responde 401 (a logica fica no SessaoUsuario)
    private Usuario usuarioLogado(HttpServletRequest requisicao) {
        return sessaoUsuario.usuarioLogado(requisicao);
    }

    // se o usuario ja avaliou esta musica, devolve a avaliacao antiga (para atualizar);
    // senao, cria uma nova ligada a ele
    private AvaliacaoMusica buscarOuCriarMusica(Usuario usuario, AvaliacaoMusica dados) {
        return avaliacaoMusicaRepository
                .findByUsuarioIdAndArtistaIdAndTituloMusica(usuario.getId(), dados.getArtistaId(), dados.getTituloMusica())
                .orElseGet(() -> {
                    AvaliacaoMusica nova = new AvaliacaoMusica();
                    nova.setUsuario(usuario);
                    nova.setArtistaId(dados.getArtistaId());
                    nova.setTituloMusica(dados.getTituloMusica());
                    return nova;
                });
    }

    // mesma ideia para album
    private AvaliacaoAlbum buscarOuCriarAlbum(Usuario usuario, AvaliacaoAlbum dados) {
        return avaliacaoAlbumRepository
                .findByUsuarioIdAndArtistaIdAndTituloAlbum(usuario.getId(), dados.getArtistaId(), dados.getTituloAlbum())
                .orElseGet(() -> {
                    AvaliacaoAlbum nova = new AvaliacaoAlbum();
                    nova.setUsuario(usuario);
                    nova.setArtistaId(dados.getArtistaId());
                    nova.setTituloAlbum(dados.getTituloAlbum());
                    return nova;
                });
    }
}
