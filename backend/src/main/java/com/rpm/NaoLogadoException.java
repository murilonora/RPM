package com.rpm;

// lancada quando uma rota que exige login e chamada sem sessao valida
public class NaoLogadoException extends RuntimeException {
    public NaoLogadoException() {
        super("Faca login para avaliar");
    }
}
