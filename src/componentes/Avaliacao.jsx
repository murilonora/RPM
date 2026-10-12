import { useState, useEffect } from "react";
import Logotipo from './Logotipo';

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
        <div className="flex items-center gap-1 mt-4">
            <span className="text-sm text-gray-400 mr-2">Sua nota:</span>
            {[1, 2, 3, 4, 5].map((estrela) => (
                <button
                    key={estrela}
                    onClick={() => salvarNota(estrela)}
                    onMouseEnter={() => setHover(estrela)}
                    onMouseLeave={() => setHover(0)}
                    className={`transition-all cursor-pointer ${
                        estrela <= (hover || nota)
                            ? 'grayscale-0 opacity-100 scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                            : 'grayscale opacity-40 hover:scale-105'
                    }`}
                >
                    <div className="w-8 h-auto">
                        <Logotipo />
                    </div>
                </button>
            ))}
        </div>
    );
}