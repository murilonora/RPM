package com.rpm;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
//gabral, quando for ler esse código, isso aqui é bem simples
//é basicamente uma rota pro spring percorrer pra montar as
//classes, validar e se der errado vai jogar pro TratarErros
//roda os metodos e cria uma resposta pro JSON
@RestController
//isso indica que ela é uma classe controller e que
//o retorno sera o corpo da resposta


@RequestMapping("/api/avaliacoes")
//prefixo de todos os endereços da classe

public class AvaliacaoController {
    @PostMapping("/musicas")
    //post é um verbo http para criar um recurso novo

    @ResponseStatus(HttpStatus.CREATED)

    public AvaliacaoMusica avaliarMusica(@Valid @RequestBody AvaliacaoMusica avaliacao){
        return avaliacao;
    }

    @PostMapping("/musicas/comentarios")

    @ResponseStatus(HttpStatus.CREATED)
    public ComentarioMusica comentarioMusica(@Valid @RequestBody ComentarioMusica comentario){
        return comentario;
    }

    @PostMapping("/albuns")
    @ResponseStatus(HttpStatus.CREATED)
    public AvaliacaoAlbum avaliarAlbum(@Valid @RequestBody AvaliacaoAlbum avaliacao) {
        return avaliacao;
    }

    @PostMapping("/albuns/comentarios")
    @ResponseStatus(HttpStatus.CREATED)
    public ComentarioAlbum comentarioAlbum(@Valid @RequestBody ComentarioAlbum comentario){
        return comentario;
    }
}
