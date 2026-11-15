package com.rpm;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;

// Descobre quem esta logado a partir da sessao criada pelo LoginController.
// Fica separado para qualquer controller poder usar (avaliacoes, perfil...).
@Component
public class SessaoUsuario {

    private final UsuarioRepository usuarioRepository;

    public SessaoUsuario(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    // le o id guardado pelo LoginController na sessao; sem login, responde 401
    public Usuario usuarioLogado(HttpServletRequest requisicao) {
        HttpSession sessao = requisicao.getSession(false);   // false: nao cria sessao nova
        Long id = (sessao == null) ? null : (Long) sessao.getAttribute(LoginController.USUARIO_DA_SESSAO);
        if (id == null) {
            throw new NaoLogadoException();
        }
        return usuarioRepository.findById(id).orElseThrow(NaoLogadoException::new);
    }
}
