// Disco de ouro gravado que sai da capa na placa do favorito (puramente decorativo)
export function DiscoOuroSvg() {
  return (
    <svg viewBox="0 0 140 140" className="disco-ouro-svg">
      <defs>
        <radialGradient id="goldVinylGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="30%" stopColor="#f7e189" />
          <stop offset="55%" stopColor="#c59b27" />
          <stop offset="80%" stopColor="#f3d061" />
          <stop offset="95%" stopColor="#aa8218" />
          <stop offset="100%" stopColor="#55410e" />
        </radialGradient>
        <linearGradient id="goldGrooveSheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="25%" stopColor="rgba(0,0,0,0.22)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="75%" stopColor="rgba(0,0,0,0.25)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
        </linearGradient>
        <linearGradient id="goldSheenRev" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="35%" stopColor="rgba(0,0,0,0.18)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="70%" stopColor="rgba(0,0,0,0.2)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.25)" />
        </linearGradient>
      </defs>

      {/* Borda Externa do Disco (Lead-in groove) */}
      <circle cx="70" cy="70" r="68" fill="url(#goldVinylGrad)" stroke="#fff099" strokeWidth="1.2" />

      {/* Sulcos Concêntricos de Áudio (Grooves Físicos Gravados) */}
      <circle cx="70" cy="70" r="64" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="0.8" />
      <circle cx="70" cy="70" r="61" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5" />
      <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="0.8" />
      <circle cx="70" cy="70" r="55" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" strokeDasharray="6 2" />
      <circle cx="70" cy="70" r="52" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="0.9" />
      <circle cx="70" cy="70" r="48" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" strokeDasharray="8 3" />
      <circle cx="70" cy="70" r="44" fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="0.8" />
      <circle cx="70" cy="70" r="40" fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth="0.6" strokeDasharray="5 2" />
      <circle cx="70" cy="70" r="36" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="0.9" />

      {/* Reflexos Metálicos Duplos (Anisotropia de Vinil 33 RPM) */}
      <circle cx="70" cy="70" r="68" fill="url(#goldGrooveSheen)" style={{ mixBlendMode: "overlay" }} />
      <circle cx="70" cy="70" r="68" fill="url(#goldSheenRev)" style={{ mixBlendMode: "overlay" }} />

      {/* Run-out groove (área lisa interna de escape) */}
      <circle cx="70" cy="70" r="32" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" />
      <circle cx="70" cy="70" r="29" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" />

      {/* Selo Central Oficial RPM (Label vermelho clássico com aro dourado) */}
      <circle cx="70" cy="70" r="24" fill="#ff0004" stroke="#ffd700" strokeWidth="2.2" />
      <circle cx="70" cy="70" r="21" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.6" strokeDasharray="2 2" />

      {/* Tipografia de Gravação no Selo */}
      <text x="70" y="64" textAnchor="middle" fill="#f7f4ed" fontSize="6.5" fontWeight="900" fontFamily="monospace" letterSpacing="0.6">RPM</text>
      <text x="70" y="75" textAnchor="middle" fill="#ffd700" fontSize="4.2" fontWeight="800" fontFamily="sans-serif" letterSpacing="1">OURO</text>

      {/* Furo Central do Toca-Discos (Spindle Hole) */}
      <circle cx="70" cy="70" r="5.5" fill="#08080a" stroke="#fff099" strokeWidth="1.2" />
      <circle cx="70" cy="70" r="2.5" fill="#000000" />
    </svg>
  );
}
