package com.rpm;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// Nao e tabela: so o formato do JSON de POST /api/avaliacoes/musicas/comentarios.
// O comentario e salvo na mesma linha da avaliacao (coluna texto de avaliacao_musica).
// Aqui o texto passa a ser obrigatorio.
public class ComentarioMusica extends AvaliacaoMusica{

    @Override
    @NotBlank(message="Comentario nao pode ser vazio")
    @Size(max=800,message="Comentario deve ter no maximo 800 caracteres")
    public String getTexto(){
        return super.getTexto();
    }

}
