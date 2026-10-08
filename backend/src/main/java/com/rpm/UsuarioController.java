package com.rpm;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController                       //avisa que essa classe responde a requisições HTTP e retorna JSON
@RequestMapping("/api/usuarios")      // endereço base
public class UsuarioController {

    @PostMapping                      // atende requisições POST no endereço base, ou seja, POST /api/usuarios
    public Usuario criar(@Valid @RequestBody Usuario usuario) {   // Cria objeto a faz a validação
        return usuario;
    }
}
