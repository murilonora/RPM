package com.rpm;

public class EmailJaCadastradoException extends RuntimeException{
    public EmailJaCadastradoException() {
        super("Este e-mail já tem cadastro");
    }
}
