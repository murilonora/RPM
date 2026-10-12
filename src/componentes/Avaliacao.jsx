import { useState, useEffect } from "react";
// Certifique-se de que o ficheiro DiscoSVG.jsx está na mesma pasta
import { DiscoSVG } from './DiscoSVG'; 

export default function Avaliacao({ idElemento }) {
    const [nota, setNota] = useState(0);
    const [hover, setHover] = useState(0);

    // Carrega a nota guardada assim que o componente aparece no ecrã
    useEffect(() => {
        const notaSalva = localStorage.getItem(idElemento);
        if (notaSalva) {
            setNota(Number(notaSalva));
        }
    }, [idElemento]);

    // Guarda a nova nota tanto no ecrã como no armazenamento do navegador
    const salvarNota = (novaNota) => {
        setNota(novaNota);
        localStorage.setItem(idElemento, novaNota);
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
                                ? 'grayscale-0 opacity-100 scale-110 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]' 
                                : 'grayscale opacity-30 hover:opacity-60 hover:scale-105'
                        }`}
                        title={`Dar nota ${estrela}`}
                    >
                        <div className="w-7 h-7">
                            <DiscoSVG />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}