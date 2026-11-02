package com.rpm;
import java.time.LocalDateTime;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
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
    private final UsuarioRepository usuarioRepository;

    // injeção de dependência: o Spring entrega os repositories prontos
    public AvaliacaoController(AvaliacaoMusicaRepository avaliacaoMusicaRepository,
                               AvaliacaoAlbumRepository avaliacaoAlbumRepository,
                               UsuarioRepository usuarioRepository) {
        this.avaliacaoMusicaRepository = avaliacaoMusicaRepository;
        this.avaliacaoAlbumRepository = avaliacaoAlbumRepository;
        this.usuarioRepository = usuarioRepository;
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

    // ---------- auxiliares ----------

    // le o id guardado pelo LoginController na sessao; sem login, responde 401
    private Usuario usuarioLogado(HttpServletRequest requisicao) {
        HttpSession sessao = requisicao.getSession(false);   // false: nao cria sessao nova
        Long id = (sessao == null) ? null : (Long) sessao.getAttribute(LoginController.USUARIO_DA_SESSAO);
        if (id == null) {
            throw new NaoLogadoException();
        }
        return usuarioRepository.findById(id).orElseThrow(NaoLogadoException::new);
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
