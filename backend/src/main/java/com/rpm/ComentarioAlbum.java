package com.rpm;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// Nao e tabela: so o formato do JSON de POST /api/avaliacoes/albuns/comentarios.
// O comentario e salvo na mesma linha da avaliacao (coluna texto de avaliacao_album).
// Aqui o texto passa a ser obrigatorio.
public class ComentarioAlbum extends AvaliacaoAlbum {

    @Override
    @NotBlank(message="comentario nao pode ser vazio")
    @Size(max=800, message="Comentario deve ter no maximo 800 caracteres")
    public String getTexto(){
        return super.getTexto();
    }

}
