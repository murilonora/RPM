package com.rpm;

import java.util.Map;
import java.util.Optional;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController                       // responde requisições HTTP e retorna JSON
@RequestMapping("/api")               // endereço base: /api/login e /api/logout
public class LoginController {

    // guarda quem está logado
    public static final String USUARIO_DA_SESSAO = "usuarioId";

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    //Dependências
    public LoginController(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // formato do JSON que o front manda no login: { "email": "...", "senha": "..." }
    public record LoginRequisicao(
            @NotBlank(message="Email obrigatorio") String email,
            @NotBlank(message="Senha obrigatoria") String senha) {
    }

    // POST /api/login: confere email e senha e, se estiverem certos, guarda o usuario na sessao
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequisicao dados, HttpServletRequest requisicao) {
        // procura o usuario pelo email e confere a senha digitada com o hash salvo no banco
        Optional<Usuario> encontrado = usuarioRepository.findByEmail(dados.email().trim())
                .filter(usuario -> passwordEncoder.matches(dados.senha(), usuario.getSenha()));

        // email inexistente ou senha errada: mesma resposta, para nao revelar quais emails existem
        if (encontrado.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("erro", "Email ou senha invalidos"));
        }

        // descarta a sessao antiga (se houver) e cria uma nova, com um id novo
        HttpSession sessaoAntiga = requisicao.getSession(false);
        if (sessaoAntiga != null) {
            sessaoAntiga.invalidate();
        }
        HttpSession sessao = requisicao.getSession(true);

        // guarda so o id do usuario na sessao
        Usuario usuario = encontrado.get();
        sessao.setAttribute(USUARIO_DA_SESSAO, usuario.getId());

        // devolve o usuario (a senha nao aparece por causa do WRITE_ONLY na classe Usuario)
        return ResponseEntity.ok(usuario);
    }

    // POST /api/logout: encerra a sessao, se existir
    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(HttpServletRequest requisicao) {
        HttpSession sessao = requisicao.getSession(false);   // false: nao cria sessao nova so para sair
        if (sessao != null) {
            sessao.invalidate();
        }
    }
}
