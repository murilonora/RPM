package com.rpm;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController                       //avisa que essa classe responde a requisições HTTP e retorna JSON
@RequestMapping("/api/usuarios")      // endereço base
public class UsuarioController {

    // links: vazio (para apagar) ou comecando com https://. Bloqueia "javascript:..." e outros esquemas
    private static final String REGEX_LINK = "^$|^https://\\S+$";
    private static final String MSG_LINK = "Link deve comecar com https://";

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final SessaoUsuario sessaoUsuario;
    private final AvaliacaoAlbumRepository avaliacaoAlbumRepository;
    private final AvaliacaoMusicaRepository avaliacaoMusicaRepository;

    public UsuarioController(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder,
                             SessaoUsuario sessaoUsuario, AvaliacaoAlbumRepository avaliacaoAlbumRepository,
                             AvaliacaoMusicaRepository avaliacaoMusicaRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.sessaoUsuario = sessaoUsuario;
        this.avaliacaoAlbumRepository = avaliacaoAlbumRepository;
        this.avaliacaoMusicaRepository = avaliacaoMusicaRepository;
    }

    // formato do JSON de PUT /api/usuarios/me: so bio e links (nome, email e senha nao mudam aqui)
    public record AtualizarPerfil(
            @Size(max = 500, message = "Bio deve ter no maximo 500 caracteres") String bio,
            @Size(max = 255) @Pattern(regexp = REGEX_LINK, message = MSG_LINK) String instagram,
            @Size(max = 255) @Pattern(regexp = REGEX_LINK, message = MSG_LINK) String twitter,
            @Size(max = 255) @Pattern(regexp = REGEX_LINK, message = MSG_LINK) String spotify) {
    }

    // resposta de GET /api/usuarios/{id}/perfil: dados publicos, sem email
    public record PerfilPublico(Long id, String nome, String bio, String instagram, String twitter,
                                String spotify, List<ReviewPublica> avaliacoes) {
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping                      // atende requisições POST no endereço base, ou seja, POST /api/usuarios
    public Usuario criar(@Valid @RequestBody Usuario usuario) {   // Cria objeto a faz a validação
        // confere se o email já está cadastrado
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new EmailJaCadastradoException();
        }

        // troca a senha
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));

        // salva no banco o usuario
        return usuarioRepository.save(usuario);
    }

    // PUT /api/usuarios/me: o usuario logado edita a propria bio e links
    @PutMapping("/me")
    public Usuario atualizarPerfil(@Valid @RequestBody AtualizarPerfil dados, HttpServletRequest requisicao) {
        Usuario usuario = sessaoUsuario.usuarioLogado(requisicao);   // sem login: 401
        usuario.setBio(vazioViraNull(dados.bio()));
        usuario.setInstagram(vazioViraNull(dados.instagram()));
        usuario.setTwitter(vazioViraNull(dados.twitter()));
        usuario.setSpotify(vazioViraNull(dados.spotify()));
        return usuarioRepository.save(usuario);
    }

    // GET /api/usuarios/{id}/perfil: perfil publico de qualquer usuario (nao exige login)
    @GetMapping("/{id}/perfil")
    public PerfilPublico perfil(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(UsuarioNaoEncontradoException::new);

        // avaliacoes de album e de musica juntas, mais recentes primeiro
        List<ReviewPublica> avaliacoes = new ArrayList<>();
        for (AvaliacaoAlbum avaliacao : avaliacaoAlbumRepository.findByUsuarioIdOrderByDataAvaliacaoDesc(id)) {
            avaliacoes.add(ReviewPublica.de(avaliacao));
        }
        for (AvaliacaoMusica avaliacao : avaliacaoMusicaRepository.findByUsuarioIdOrderByDataAvaliacaoDesc(id)) {
            avaliacoes.add(ReviewPublica.de(avaliacao));
        }
        avaliacoes.sort(Comparator.comparing(ReviewPublica::dataAvaliacao).reversed());

        return new PerfilPublico(usuario.getId(), usuario.getNome(), usuario.getBio(), usuario.getInstagram(),
                usuario.getTwitter(), usuario.getSpotify(), avaliacoes);
    }

    // "" ou so espacos sao gravados como null (campo apagado)
    private String vazioViraNull(String valor) {
        return (valor == null || valor.isBlank()) ? null : valor.trim();
    }
}
