import { useState, useEffect } from "react";
import { DiscoSVG } from './DiscoSVG'; // Importa apenas o disco de vinil isolado

export default function Avaliacao({ artistaId }) {
    const [nota, setNota] = useState(0);
    const [hover, setHover] = useState(0);

    useEffect(() => {
        const notaSalva = localStorage.getItem(`avaliacao_${artistaId}`);
        if (notaSalva) {
            setNota(Number(notaSalva));
        }
    }, [artistaId]);

    const salvarNota = (novaNota) => {
        setNota(novaNota);
        localStorage.setItem(`avaliacao_${artistaId}`, novaNota);
    };

    return (
        <div className="flex items-center gap-2 mt-4 bg-zinc-900/10 p-3 rounded-lg w-fit">
            <span className="text-sm font-medium text-gray-500 mr-2">Sua nota:</span>
            <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((estrela) => (
                    <button
                        key={estrela}
                        onClick={() => salvarNota(estrela)}
                        onMouseEnter={() => setHover(estrela)}
                        onMouseLeave={() => setHover(0)}
                        className={`transition-all duration-200 ease-out cursor-pointer transform ${
                            estrela <= (hover || nota)
                                ? 'grayscale-0 opacity-100 scale-110 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]' // Brilho vermelho no disco ativo
                                : 'grayscale opacity-30 hover:opacity-60 hover:scale-105'
                        }`}
                    >
                        {/* Tamanho controlado do disco individual */}
                        <div className="w-7 h-7">
                            <DiscoSVG />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}