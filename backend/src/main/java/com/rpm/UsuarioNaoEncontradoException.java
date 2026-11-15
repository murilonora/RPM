package com.rpm;

// lancada quando o perfil pedido nao existe
public class UsuarioNaoEncontradoException extends RuntimeException {
    public UsuarioNaoEncontradoException() {
        super("Usuario nao encontrado");
    }
}
