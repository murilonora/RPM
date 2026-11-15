package com.rpm;

// lancada quando o id nao existe, ou existe mas e de outro usuario
// (mesma mensagem nos dois casos, pra nao revelar que o id de outro usuario existe)
public class AvaliacaoNaoEncontradaException extends RuntimeException {
    public AvaliacaoNaoEncontradaException() {
        super("Avaliacao nao encontrada");
    }
}
