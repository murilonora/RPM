package com.rpm;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController                       //avisa que essa classe responde a requisições HTTP e retorna JSON
@RequestMapping("/api/usuarios")      // endereço base
public class UsuarioController {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    public UsuarioController(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
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
}
