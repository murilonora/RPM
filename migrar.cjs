const mysql = require('mysql2');

// 1. Configuração da ligação ao MySQL
const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '#Momtff12#', // Altera aqui se o teu MySQL tiver password
  database: 'dados_musicais_db'
});

// 2. Lista completa com TODOS os artistas do projeto
const bancoDeDadosArtistas = [
  {
    "id": "matue",
    "nome": "Matue",
    "biografia": [
      "Matheus Brasileiro Aguiar e amplamente considerado o grande expoente do trap no Brasil. Nascido em Fortaleza, criou o selo 30PRAUM e redefiniu o alcance do genero no streaming nacional.",
      "Com 'Maquina do Tempo' (2020) quebrou todos os recordes historicos do Spotify Brasil no dia de lancamento. Em 2024, lancou '333', aclamado por critica e publico."
    ],
    "resumo": "Pioneiro do trap comercial no Brasil, fundador do selo 30PRAUM e recordista do Spotify Brasil.",
    "musicas": [
      { "titulo": "Anos Luz", "album": "Single", "ano": "2017", "streams": 310000000 },
      { "titulo": "Maquina do Tempo", "album": "Maquina do Tempo", "ano": "2020", "streams": 285000000 },
      { "titulo": "777-666", "album": "Maquina do Tempo", "ano": "2020", "streams": 260000000 },
      { "titulo": "Crack com Mussilon", "album": "333", "ano": "2024", "streams": 195000000 },
      { "titulo": "Kenny G", "album": "Single", "ano": "2019", "streams": 180000000 }
    ],
    "albuns": [
      { "titulo": "Maquina do Tempo", "ano": "2020", "streams": 950000000 },
      { "titulo": "333", "ano": "2024", "streams": 620000000 }
    ]
  },
  {
    "id": "filipe-ret",
    "nome": "Filipe Ret",
    "biografia": [
      "Originario do Catete, RJ, iniciou nas batalhas de rima da Lapa. Formou-se em jornalismo e uniu poesia filosofica ao ritmo das ruas.",
      "Com albuns como 'Vivaz' e 'LUME' (2022), fundou a gravadora NADAMAL e se consolidou como voz geracional."
    ],
    "resumo": "Pilar lirico do rap carioca que construiu a ponte entre o rap classico e o trap contemporaneo.",
    "musicas": [
      { "titulo": "Melhor Agora", "album": "LUME", "ano": "2022", "streams": 270000000 },
      { "titulo": "Incondicional", "album": "Imersao", "ano": "2021", "streams": 190000000 },
      { "titulo": "Neurotico de Guerra", "album": "Vivaz", "ano": "2012", "streams": 180000000 },
      { "titulo": "Me Sinto Abencoado", "album": "LUME", "ano": "2022", "streams": 175000000 }
    ],
    "albuns": [
      { "titulo": "LUME", "ano": "2022", "streams": 680000000 },
      { "titulo": "Audaz", "ano": "2018", "streams": 410000000 },
      { "titulo": "Vivaz", "ano": "2012", "streams": 340000000 }
    ]
  },
  {
    "id": "l7nnon",
    "nome": "L7NNON",
    "biografia": [
      "Giovanni Di Sacco, o L7NNON, mistura trap, drill, phonk e rock alternativo com estetica visual marcante.",
      "Parceiro frequente de Matue e outros nomes da 30PRAUM, e conhecido por experimentacoes sonoras ousadas e letras introspectivas."
    ],
    "resumo": "Um dos artistas mais ecleticos do trap nacional, pioneiro da fusao com drill e phonk.",
    "musicas": [
      { "titulo": "Pandora", "album": "Single", "ano": "2021", "streams": 210000000 },
      { "titulo": "Amor e Facas", "album": "SETE", "ano": "2022", "streams": 180000000 },
      { "titulo": "SETE", "album": "SETE", "ano": "2022", "streams": 150000000 }
    ],
    "albuns": [
      { "titulo": "SETE", "ano": "2022", "streams": 480000000 }
    ]
  },
  {
    "id": "kayblack",
    "nome": "KayBlack",
    "biografia": [
      "Kaique Menezes, o KayBlack, transformou vivencias da quebrada e cronicas sobre relacoes em hinos do trap nacional.",
      "Ficou reconhecido pelo EP 'Contraditorio' e participacoes em cyphers gigantes do YouTube."
    ],
    "resumo": "Voz marcante do trap romantico e melodico da cena paulistana.",
    "musicas": [
      { "titulo": "Segredo", "album": "Contraditorio", "ano": "2023", "streams": 220000000 },
      { "titulo": "Preferida", "album": "Contraditorio", "ano": "2023", "streams": 185000000 },
      { "titulo": "Cartier", "album": "Single", "ano": "2023", "streams": 140000000 }
    ],
    "albuns": [
      { "titulo": "Contraditorio", "ano": "2023", "streams": 510000000 }
    ]
  },
  {
    "id": "costa-gold",
    "nome": "Costa Gold",
    "biografia": [
      "Jonas Costa, o Costa Gold, nasceu em Santos e construiu uma carreira solida no rap underground antes de estourar no mainstream.",
      "Conhecido por textos densos e referencias literarias, seus albuns sao considerados classicos da nova era do rap nacional."
    ],
    "resumo": "Um dos artistas mais respeitados do underground brasileiro, referencia em flow e tecnica.",
    "musicas": [
      { "titulo": "Gringo", "album": "Condominio B", "ano": "2016", "streams": 120000000 },
      { "titulo": "Grana", "album": "Single", "ano": "2019", "streams": 95000000 },
      { "titulo": "Efeito Placebo", "album": "Condominio B", "ano": "2016", "streams": 85000000 }
    ],
    "albuns": [
      { "titulo": "Condominio B", "ano": "2016", "streams": 290000000 },
      { "titulo": "Tardes de Versailles", "ano": "2018", "streams": 220000000 }
    ]
  },
  {
    "id": "racionais-mcs",
    "nome": "Racionais MCs",
    "biografia": [
      "Formado por Mano Brown, Ice Blue, Edi Rock e KL Jay em 1988, o grupo deu voz a juventude negra e periferica, denunciando racismo e desigualdade.",
      "'Sobrevivendo no Inferno' (1997) vendeu 1,5 milhao de copias de forma independente e hoje integra leituras obrigatorias da Unicamp."
    ],
    "resumo": "O maior e mais influente grupo de rap da historia da musica brasileira.",
    "musicas": [
      { "titulo": "Vida Loka Parte 1 e 2", "album": "Nada como um Dia apos o Outro Dia", "ano": "2002", "streams": 230000000 },
      { "titulo": "Negro Drama", "album": "Nada como um Dia apos o Outro Dia", "ano": "2002", "streams": 195000000 },
      { "titulo": "Jesus Chorou", "album": "Nada como um Dia apos o Outro Dia", "ano": "2002", "streams": 170000000 },
      { "titulo": "Diario de um Detento", "album": "Sobrevivendo no Inferno", "ano": "1997", "streams": 160000000 },
      { "titulo": "Capitulo 4 Versiculo 3", "album": "Sobrevivendo no Inferno", "ano": "1997", "streams": 140000000 }
    ],
    "albuns": [
      { "titulo": "Nada como um Dia apos o Outro Dia", "ano": "2002", "streams": 650000000 },
      { "titulo": "Sobrevivendo no Inferno", "ano": "1997", "streams": 480000000 },
      { "titulo": "Raio X Brasil", "ano": "1993", "streams": 120000000 }
    ]
  },
  {
    "id": "emicida",
    "nome": "Emicida",
    "biografia": [
      "Leandro Roque de Oliveira comecou nas batalhas de freestyle e fundou com seu irmao a Laboratorio Fantasma.",
      "O projeto 'AmarElo' (2019) foi premiado com o Grammy Latino e e aclamado como manifesto de resistencia afro-brasileira."
    ],
    "resumo": "Poeta e pensador que uniu o hip hop a MPB e a alta literatura.",
    "musicas": [
      { "titulo": "Passarinhos com Vanessa da Mata", "album": "Sobre Criancas", "ano": "2015", "streams": 145000000 },
      { "titulo": "AmarElo com Pabllo Vittar e Majur", "album": "AmarElo", "ano": "2019", "streams": 130000000 },
      { "titulo": "Principia", "album": "AmarElo", "ano": "2019", "streams": 95000000 }
    ],
    "albuns": [
      { "titulo": "AmarElo", "ano": "2019", "streams": 410000000 },
      { "titulo": "Sobre Criancas Quadris Pesadelos e Licoes de Casa", "ano": "2015", "streams": 220000000 },
      { "titulo": "O Glorioso Retorno de Quem Nunca Esteve Aqui", "ano": "2013", "streams": 180000000 }
    ]
  },
  {
    "id": "djonga",
    "nome": "Djonga",
    "biografia": [
      "Gustavo Pereira Marques e famoso por lancar um album todo dia 13 de marco e construiu classicos como 'Heresia' e 'Ladrao'.",
      "Reconhecido por rimas densas sobre politica, identidade negra e cotidiano da periferia mineira."
    ],
    "resumo": "Letras incisivas e postura combativa que colocaram BH no mapa do rap nacional.",
    "musicas": [
      { "titulo": "Leal", "album": "Ladrao", "ano": "2019", "streams": 145000000 },
      { "titulo": "Penumbra", "album": "Historias da Minha Area", "ano": "2020", "streams": 110000000 },
      { "titulo": "Junho de 94", "album": "O Menino Que Queria Ser Deus", "ano": "2018", "streams": 95000000 }
    ],
    "albuns": [
      { "titulo": "Ladrao", "ano": "2019", "streams": 280000000 },
      { "titulo": "O Menino Que Queria Ser Deus", "ano": "2018", "streams": 210000000 },
      { "titulo": "Heresia", "ano": "2017", "streams": 120000000 }
    ]
  },
  {
    "id": "sabotage",
    "nome": "Sabotage",
    "biografia": [
      "Mauro Mateus dos Santos, o Sabotage, nasceu na Favela do Canao, zona sul paulistana. Com flow sincopado e timbre unico, uniu rap, samba e MPB.",
      "Seu disco de estreia 'Rap e Compromisso' (2000) redefiniu a forma como rimas eram construidas no Brasil."
    ],
    "resumo": "Eternizado como o Maestro do Canao, lenda indelevel do rap nacional.",
    "musicas": [
      { "titulo": "Um Bom Lugar", "album": "Rap e Compromisso", "ano": "2000", "streams": 88000000 },
      { "titulo": "Mun-Ra", "album": "Rap e Compromisso", "ano": "2000", "streams": 72000000 },
      { "titulo": "No Brooklin", "album": "Rap e Compromisso", "ano": "2000", "streams": 64000000 }
    ],
    "albuns": [
      { "titulo": "Rap e Compromisso", "ano": "2000", "streams": 290000000 }
    ]
  },
  {
    "id": "criolo",
    "nome": "Criolo",
    "biografia": [
      "Kleber Cavalcante Gomes, o Criolo, revolucionou o cenario musical brasileiro com 'Nao Existe Amor em SP' (2011).",
      "Seu albuns transitam livremente entre generos, e ele e um dos artistas mais premiados e respeitados da musica brasileira contemporanea."
    ],
    "resumo": "Poeta e cantor que criou uma linguagem propria misturando rap, reggae, samba e MPB.",
    "musicas": [
      { "titulo": "Nao Existe Amor em SP", "album": "Nao Existe Amor em SP", "ano": "2011", "streams": 75000000 },
      { "titulo": "Linha de Frente", "album": "Criolo", "ano": "2006", "streams": 58000000 }
    ],
    "albuns": [
      { "titulo": "Nao Existe Amor em SP", "ano": "2011", "streams": 180000000 },
      { "titulo": "Convoque Seu Buda", "ano": "2014", "streams": 140000000 }
    ]
  },
  {
    "id": "kendrick-lamar",
    "nome": "Kendrick Lamar",
    "biografia": [
      "Nascido em Compton, California, desenvolveu narrativa autobiografica ancorada em jazz, funk e critica social.",
      "'To Pimp a Butterfly' e 'DAMN.' sao obras-primas mundiais. Em 2018, ganhou o Premio Pulitzer. Em 2024, dominou as paradas com 'Not Like Us'."
    ],
    "resumo": "Unico artista de rap a receber o Premio Pulitzer de Musica.",
    "musicas": [
      { "titulo": "HUMBLE.", "album": "DAMN.", "ano": "2017", "streams": 2100000000 },
      { "titulo": "Money Trees", "album": "good kid, m.A.A.d city", "ano": "2012", "streams": 1800000000 },
      { "titulo": "DNA.", "album": "DAMN.", "ano": "2017", "streams": 1400000000 },
      { "titulo": "Not Like Us", "album": "Single", "ano": "2024", "streams": 1200000000 },
      { "titulo": "Alright", "album": "To Pimp a Butterfly", "ano": "2015", "streams": 890000000 }
    ],
    "albuns": [
      { "titulo": "DAMN.", "ano": "2017", "streams": 6200000000 },
      { "titulo": "good kid, m.A.A.d city", "ano": "2012", "streams": 5400000000 },
      { "titulo": "To Pimp a Butterfly", "ano": "2015", "streams": 3800000000 },
      { "titulo": "Mr. Morale e the Big Steppers", "ano": "2022", "streams": 2700000000 }
    ]
  },
  {
    "id": "drake",
    "nome": "Drake",
    "biografia": [
      "Aubrey Drake Graham comecou como ator em 'Degrassi' antes de se tornar o artista mais dominante do rap moderno.",
      "Com o selo OVO Sound e albuns recordistas como 'Scorpion' e 'Certified Lover Boy', redefiniu o rap melodico e o trap influenciado pelo dancehall."
    ],
    "resumo": "O artista mais streamado de todos os tempos no Spotify, dominando o rap por mais de uma decada.",
    "musicas": [
      { "titulo": "One Dance", "album": "Views", "ano": "2016", "streams": 3100000000 },
      { "titulo": "God's Plan", "album": "Scorpion", "ano": "2018", "streams": 2800000000 },
      { "titulo": "Hotline Bling", "album": "Views", "ano": "2015", "streams": 2400000000 },
      { "titulo": "Started From the Bottom", "album": "Nothing Was the Same", "ano": "2013", "streams": 1100000000 }
    ],
    "albuns": [
      { "titulo": "Scorpion", "ano": "2018", "streams": 8100000000 },
      { "titulo": "Views", "ano": "2016", "streams": 7400000000 },
      { "titulo": "Certified Lover Boy", "ano": "2021", "streams": 5900000000 },
      { "titulo": "Nothing Was the Same", "ano": "2013", "streams": 3200000000 }
    ]
  },
  {
    "id": "travis-scott",
    "nome": "Travis Scott",
    "biografia": [
      "Jacques Bermon Webster II fundou o selo Cactus Jack e revolucionou a estetica sonora e visual do rap.",
      "Seu disco 'ASTROWORLD' (2018) atingiu o status de classico moderno, seguido pelo ambicioso 'UTOPIA' (2023)."
    ],
    "resumo": "Criador de experiencias psicodelicas imersivas e arquiteto de shows em estadios.",
    "musicas": [
      { "titulo": "Goosebumps", "album": "Birds in the Trap", "ano": "2016", "streams": 2600000000 },
      { "titulo": "SICKO MODE", "album": "ASTROWORLD", "ano": "2018", "streams": 2400000000 },
      { "titulo": "HIGHEST IN THE ROOM", "album": "Single", "ano": "2019", "streams": 1600000000 },
      { "titulo": "FE!N", "album": "UTOPIA", "ano": "2023", "streams": 1100000000 }
    ],
    "albuns": [
      { "titulo": "ASTROWORLD", "ano": "2018", "streams": 7100000000 },
      { "titulo": "UTOPIA", "ano": "2023", "streams": 3400000000 },
      { "titulo": "Rodeo", "ano": "2015", "streams": 3200000000 }
    ]
  },
  {
    "id": "j-cole",
    "nome": "J. Cole",
    "biografia": [
      "Jermaine Lamarr Cole fundou o selo Dreamville e lancou albuns como '2014 Forest Hills Drive', platina multipla sem participacoes de outros artistas.",
      "Reconhecido por lirismo denso, narrativas autobiograficas e consistencia artistica ao longo de mais de uma decada."
    ],
    "resumo": "Um dos rappers mais respeitados da geracao atual, conhecido por albuns platinados sem features.",
    "musicas": [
      { "titulo": "No Role Modelz", "album": "2014 Forest Hills Drive", "ano": "2014", "streams": 1600000000 },
      { "titulo": "MIDDLE CHILD", "album": "Single", "ano": "2019", "streams": 1100000000 },
      { "titulo": "Love Yourz", "album": "2014 Forest Hills Drive", "ano": "2014", "streams": 900000000 }
    ],
    "albuns": [
      { "titulo": "2014 Forest Hills Drive", "ano": "2014", "streams": 5100000000 },
      { "titulo": "KOD", "ano": "2018", "streams": 3400000000 },
      { "titulo": "The Off-Season", "ano": "2021", "streams": 2900000000 }
    ]
  },
  {
    "id": "eminem",
    "nome": "Eminem",
    "biografia": [
      "Marshall Mathers, descoberto por Dr. Dre, quebrou barreiras culturais com seu alter ego 'Slim Shady'. 15 Grammys e o Oscar de Melhor Cancao Original.",
      "Vendeu mais de 220 milhoes de copias ao longo da carreira, sendo um dos artistas mais impactantes de todos os tempos."
    ],
    "resumo": "O artista de rap mais vendido de todos os tempos e lenda tecnica das rimas velozes.",
    "musicas": [
      { "titulo": "Lose Yourself", "album": "8 Mile", "ano": "2002", "streams": 2300000000 },
      { "titulo": "Without Me", "album": "The Eminem Show", "ano": "2002", "streams": 2100000000 },
      { "titulo": "The Real Slim Shady", "album": "The Marshall Mathers LP", "ano": "2000", "streams": 1900000000 },
      { "titulo": "Mockingbird", "album": "Encore", "ano": "2004", "streams": 1700000000 },
      { "titulo": "Stan feat. Dido", "album": "The Marshall Mathers LP", "ano": "2000", "streams": 1300000000 }
    ],
    "albuns": [
      { "titulo": "The Eminem Show", "ano": "2002", "streams": 5800000000 },
      { "titulo": "The Marshall Mathers LP", "ano": "2000", "streams": 4300000000 },
      { "titulo": "Recovery", "ano": "2010", "streams": 3900000000 },
      { "titulo": "The Slim Shady LP", "ano": "1999", "streams": 2100000000 }
    ]
  },
  {
    "id": "nicki-minaj",
    "nome": "Nicki Minaj",
    "biografia": [
      "Onika Tanya Maraj-Petty e a primeira artista feminina a ter 100 entradas na Billboard Hot 100, e e considerada a rainha do rap feminino.",
      "Com albuns como 'Pink Friday' e 'The Pinkprint', redefiniu o papel da mulher no rap mainstream e abriu caminho para Cardi B, Megan e outras."
    ],
    "resumo": "A rainha do rap feminino, pioneira que abriu as portas para toda uma geracao de MC's mulheres.",
    "musicas": [
      { "titulo": "Super Bass", "album": "Pink Friday", "ano": "2010", "streams": 1800000000 },
      { "titulo": "Anaconda", "album": "The Pinkprint", "ano": "2014", "streams": 1400000000 },
      { "titulo": "Starships", "album": "Pink Friday Roman Reloaded", "ano": "2012", "streams": 1200000000 }
    ],
    "albuns": [
      { "titulo": "Pink Friday", "ano": "2010", "streams": 3100000000 },
      { "titulo": "The Pinkprint", "ano": "2014", "streams": 2800000000 }
    ]
  },
  {
    "id": "2pac",
    "nome": "2Pac - Tupac Shakur",
    "biografia": [
      "Filho de membros dos Panteras Negras, Tupac trouxe ao hip hop uma visceralidade poetica sobre sobrevivencia e revolta politica.",
      "Entrou para o Rock and Roll Hall of Fame. 'All Eyez on Me' continua sendo um dos albuns de rap mais vendidos da historia."
    ],
    "resumo": "Icone mundial imortal, poeta, ator e ativista. Mais de 75 milhoes de discos vendidos.",
    "musicas": [
      { "titulo": "California Love", "album": "All Eyez on Me", "ano": "1996", "streams": 820000000 },
      { "titulo": "Changes", "album": "Greatest Hits", "ano": "1998", "streams": 740000000 },
      { "titulo": "All Eyez on Me", "album": "All Eyez on Me", "ano": "1996", "streams": 630000000 },
      { "titulo": "Dear Mama", "album": "Me Against the World", "ano": "1995", "streams": 510000000 }
    ],
    "albuns": [
      { "titulo": "All Eyez on Me", "ano": "1996", "streams": 3200000000 },
      { "titulo": "Me Against the World", "ano": "1995", "streams": 1400000000 },
      { "titulo": "The Don Killuminati The 7 Day Theory", "ano": "1996", "streams": 1100000000 }
    ]
  },
  {
    "id": "notorious-big",
    "nome": "The Notorious B.I.G.",
    "biografia": [
      "Christopher George Latore Wallace resgatou a proeminencia de Nova York nos anos 90 com 'Ready to Die' (1994).",
      "Sua capacidade de rimar com riqueza de detalhes cinematograficos estabeleceu o padrao para MCs futuros."
    ],
    "resumo": "Considerado o maior contador de historias e o flow mais fluido de toda a historia do hip hop.",
    "musicas": [
      { "titulo": "Juicy", "album": "Ready to Die", "ano": "1994", "streams": 1100000000 },
      { "titulo": "Hypnotize", "album": "Life After Death", "ano": "1997", "streams": 950000000 },
      { "titulo": "Big Poppa", "album": "Ready to Die", "ano": "1994", "streams": 890000000 },
      { "titulo": "Mo Money Mo Problems", "album": "Life After Death", "ano": "1997", "streams": 680000000 }
    ],
    "albuns": [
      { "titulo": "Life After Death", "ano": "1997", "streams": 3100000000 },
      { "titulo": "Ready to Die", "ano": "1994", "streams": 2900000000 }
    ]
  },
  {
    "id": "jay-z",
    "nome": "Jay-Z",
    "biografia": [
      "Shawn Corey Carter construiu um imperio cultural, empresarial e musical ao longo de tres decadas, com 14 albuns de estudio.",
      "Primeiro artista solo de rap a entrar para o Rock and Roll Hall of Fame."
    ],
    "resumo": "Bilionario do hip hop, co-fundador do Roc-A-Fella Records e um dos MCs mais aclamados.",
    "musicas": [
      { "titulo": "Empire State of Mind", "album": "The Blueprint 3", "ano": "2009", "streams": 1400000000 },
      { "titulo": "99 Problems", "album": "The Black Album", "ano": "2003", "streams": 1100000000 },
      { "titulo": "Izzo H.O.V.A.", "album": "The Blueprint", "ano": "2001", "streams": 900000000 }
    ],
    "albuns": [
      { "titulo": "The Blueprint", "ano": "2001", "streams": 3800000000 },
      { "titulo": "The Black Album", "ano": "2003", "streams": 3200000000 },
      { "titulo": "4:44", "ano": "2017", "streams": 1900000000 }
    ]
  },
  {
    "id": "dr-dre",
    "nome": "Dr. Dre",
    "biografia": [
      "Cofundou o N.W.A, criou a Death Row Records e depois a Aftermath Entertainment. Revelou Snoop Dogg, Eminem e Kendrick Lamar.",
      "Criou a assinatura sonora do G-Funk com 'The Chronic' (1992) e '2001' (1999)."
    ],
    "resumo": "Arquiteto do G-Funk e um dos maiores produtores musicais de toda a historia.",
    "musicas": [
      { "titulo": "Still D.R.E. feat. Snoop Dogg", "album": "2001", "ano": "1999", "streams": 1900000000 },
      { "titulo": "The Next Episode feat. Snoop Dogg", "album": "2001", "ano": "1999", "streams": 1600000000 },
      { "titulo": "Forgot About Dre feat. Eminem", "album": "2001", "ano": "1999", "streams": 950000000 },
      { "titulo": "Nuthin But A G Thang", "album": "The Chronic", "ano": "1992", "streams": 780000000 }
    ],
    "albuns": [
      { "titulo": "2001", "ano": "1999", "streams": 4700000000 },
      { "titulo": "The Chronic", "ano": "1992", "streams": 1800000000 },
      { "titulo": "Compton", "ano": "2015", "streams": 920000000 }
    ]
  },
  {
    "id": "nas",
    "nome": "Nas",
    "biografia": [
      "Nasir Bin Olu Dara Jones lancou 'Illmatic' em 1994 com apenas 20 anos, e o disco e ate hoje considerado a biblia do lirismo no rap.",
      "Ao longo de 30 anos de carreira, nunca perdeu a agudez poetica e a capacidade de retratar a realidade das ruas de Nova York."
    ],
    "resumo": "Autor de 'Illmatic', considerado o album de rap mais perfeito de todos os tempos pela critica.",
    "musicas": [
      { "titulo": "N.Y. State of Mind", "album": "Illmatic", "ano": "1994", "streams": 680000000 },
      { "titulo": "One Love", "album": "Illmatic", "ano": "1994", "streams": 540000000 },
      { "titulo": "If I Ruled the World feat. Lauryn Hill", "album": "It Was Written", "ano": "1996", "streams": 480000000 }
    ],
    "albuns": [
      { "titulo": "Illmatic", "ano": "1994", "streams": 2100000000 },
      { "titulo": "It Was Written", "ano": "1996", "streams": 1400000000 },
      { "titulo": "King's Disease", "ano": "2020", "streams": 890000000 }
    ]
  },
  {
    "id": "anitta",
    "nome": "Anitta",
    "biografia": [
      "Larissa de Macedo Machado saiu do Honorio Gurgel para se tornar o maior fenomeno da musica pop brasileira de todos os tempos.",
      "Em 2022, tornou-se a primeira artista brasileira no Top 1 global do Spotify com 'Envolver'. Realizou show historico no Coachella."
    ],
    "resumo": "A artista brasileira mais ouvida no mundo, pioneira do funk brasileiro no cenario global.",
    "musicas": [
      { "titulo": "Envolver", "album": "Versions of Me", "ano": "2022", "streams": 850000000 },
      { "titulo": "Vai Malandra", "album": "Single", "ano": "2017", "streams": 720000000 },
      { "titulo": "Desce Pro Play Pa Pa Pa", "album": "Single", "ano": "2020", "streams": 620000000 },
      { "titulo": "Girl From Rio", "album": "Versions of Me", "ano": "2021", "streams": 580000000 }
    ],
    "albuns": [
      { "titulo": "Versions of Me", "ano": "2022", "streams": 2400000000 },
      { "titulo": "Kisses", "ano": "2019", "streams": 1800000000 }
    ]
  },
  {
    "id": "ludmilla",
    "nome": "Ludmilla",
    "biografia": [
      "Nascida em Duque de Caxias, Ludmilla foi a primeira artista negra a atingir 1 bilhao de streams no Spotify Brasil.",
      "Com o projeto 'Numanice', reinventou o pagode baiano para o cenario nacional e se tornou referencia de garra e representatividade."
    ],
    "resumo": "Primeira artista negra a atingir 1 bilhao de streams no Spotify Brasil.",
    "musicas": [
      { "titulo": "Numanice", "album": "Numanice", "ano": "2021", "streams": 480000000 },
      { "titulo": "Rainha da Favela", "album": "Single", "ano": "2020", "streams": 350000000 },
      { "titulo": "Cheguei", "album": "Single", "ano": "2017", "streams": 290000000 }
    ],
    "albuns": [
      { "titulo": "Numanice", "ano": "2021", "streams": 1100000000 },
      { "titulo": "Numanice 2", "ano": "2022", "streams": 890000000 }
    ]
  },
  {
    "id": "mc-ryan-sp",
    "nome": "MC Ryan SP",
    "biografia": [
      "Ryan Garcia Pereira, o MC Ryan SP, explodiu com o estilo automotivo do funk paulistano, diferente das batidas cariocas.",
      "Musicas como 'Tava em Casa' viralizaram nas plataformas e em bailes de toda o pais."
    ],
    "resumo": "Um dos maiores nomes do funk paulistano, misturando trap e funk com batidas automotivas.",
    "musicas": [
      { "titulo": "Tava em Casa", "album": "Single", "ano": "2021", "streams": 320000000 },
      { "titulo": "Mega Rolo", "album": "Single", "ano": "2020", "streams": 250000000 }
    ],
    "albuns": [
      { "titulo": "Volume 1", "ano": "2021", "streams": 580000000 }
    ]
  },
  {
    "id": "chico-buarque",
    "nome": "Chico Buarque",
    "biografia": [
      "Chico Buarque de Hollanda e reconhecido pelo lirismo profundo e engajamento sociopolitico que marcou geracoes.",
      "Autor de classicos que desafiaram a censura durante a ditadura e retrataram o cotidiano brasileiro com poesia rara."
    ],
    "resumo": "Um dos maiores compositores e cronistas da historia da musica brasileira.",
    "musicas": [
      { "titulo": "Construcao", "album": "Construcao", "ano": "1971", "streams": 52000000 },
      { "titulo": "Apesar de Voce", "album": "Chico Buarque", "ano": "1978", "streams": 48000000 },
      { "titulo": "Calice", "album": "Chico Buarque", "ano": "1978", "streams": 41000000 }
    ],
    "albuns": [
      { "titulo": "Construcao", "ano": "1971", "streams": 82000000 },
      { "titulo": "Meus Caros Amigos", "ano": "1976", "streams": 60000000 }
    ]
  },
  {
    "id": "caetano-veloso",
    "nome": "Caetano Veloso",
    "biografia": [
      "Fundador do movimento Tropicalia ao lado de Gilberto Gil, Caetano reinventou a MPB com influencias do rock internacional.",
      "Com mais de 50 anos de carreira e obras como 'Tropicalia' e 'Livro', e um dos artistas mais influentes da America Latina."
    ],
    "resumo": "Fundador da Tropicalia, revolucionou a musica brasileira unindo MPB, rock e experimentacao.",
    "musicas": [
      { "titulo": "Sozinho", "album": "Livro", "ano": "1997", "streams": 95000000 },
      { "titulo": "Voce e Linda", "album": "Livro", "ano": "1997", "streams": 80000000 },
      { "titulo": "Tropicalia", "album": "Tropicalia", "ano": "1968", "streams": 45000000 }
    ],
    "albuns": [
      { "titulo": "Livro", "ano": "1997", "streams": 190000000 },
      { "titulo": "Tropicalia ou Panis et Circencis", "ano": "1968", "streams": 120000000 }
    ]
  },
  {
    "id": "gilberto-gil",
    "nome": "Gilberto Gil",
    "biografia": [
      "Gilberto Passos Gil Moreira e co-fundador da Tropicalia e Premio Grammy Latino pelo conjunto de sua obra.",
      "Tambem ex-Ministro da Cultura do Brasil, Gil e um simbolo da musica, cultura e politica nacional."
    ],
    "resumo": "Premio Polar de Musica e ex-Ministro da Cultura, um dos maiores embaixadores da musica brasileira.",
    "musicas": [
      { "titulo": "Aquele Abraco", "album": "Aquele Abraco", "ano": "1969", "streams": 65000000 },
      { "titulo": "Toda Menina Baiana", "album": "Refazenda", "ano": "1975", "streams": 58000000 },
      { "titulo": "Esperando na Janela", "album": "Realce", "ano": "1979", "streams": 48000000 }
    ],
    "albuns": [
      { "titulo": "Refazenda", "ano": "1975", "streams": 140000000 },
      { "titulo": "Realce", "ano": "1979", "streams": 110000000 }
    ]
  },
  {
    "id": "marilia-mendonca",
    "nome": "Marilia Mendonca",
    "biografia": [
      "Marilia Mendonca revolucionou o sertanejo com composicoes que retratavam as dores femininas com honestidade e poesia rara.",
      "Primeira latina a ganhar o Grammy Latino de Melhor Album Sertanejo e um dos maiores fenomenos da historia da musica brasileira."
    ],
    "resumo": "A Rainha da Sofrencia. Primeira latina a vencer o Grammy de Melhor Album de Musica Sertaneja.",
    "musicas": [
      { "titulo": "Infiel", "album": "Realidade", "ano": "2016", "streams": 760000000 },
      { "titulo": "Graveto", "album": "Single", "ano": "2019", "streams": 590000000 },
      { "titulo": "Todo Mundo Vai Sofrer", "album": "Single", "ano": "2019", "streams": 540000000 },
      { "titulo": "Troca de Calcada", "album": "Festa das Patroas", "ano": "2021", "streams": 480000000 }
    ],
    "albuns": [
      { "titulo": "Realidade", "ano": "2016", "streams": 1400000000 },
      { "titulo": "Festa das Patroas", "ano": "2021", "streams": 980000000 }
    ]
  },
  {
    "id": "gusttavo-lima",
    "nome": "Gusttavo Lima",
    "biografia": [
      "Gusttavo Lima se tornou um dos maiores fenomenos do sertanejo universitario com seus shows de Buteco espalhados pelo Brasil.",
      "Com sucessos como 'Balada' e '22', construiu um dos maiores imperios musicais do interior brasileiro."
    ],
    "resumo": "O Embaixador do sertanejo, dono do maior show itinerante do Brasil: o Buteco.",
    "musicas": [
      { "titulo": "Balada Tche Tche Re Re", "album": "Gusttavo Lima e Voce", "ano": "2012", "streams": 680000000 },
      { "titulo": "22", "album": "O Embaixador", "ano": "2021", "streams": 520000000 },
      { "titulo": "Bloqueado", "album": "Buteco do Gusttavo Lima", "ano": "2020", "streams": 490000000 }
    ],
    "albuns": [
      { "titulo": "Buteco do Gusttavo Lima", "ano": "2020", "streams": 1600000000 },
      { "titulo": "O Embaixador", "ano": "2021", "streams": 1200000000 }
    ]
  },
  {
    "id": "ana-castela",
    "nome": "Ana Castela",
    "biografia": [
      "Ana Castela explodiu com 'Pipoco' e se tornou um dos maiores fenomenos do sertanejo contemporaneo com apenas 19 anos.",
      "E a artista feminina mais ouvida do Brasil no Spotify, com uma mistura de sertanejo e country que conquistou o pais."
    ],
    "resumo": "A Boiadeira mais ouvida do Brasil, fenomeno da nova geracao do sertanejo.",
    "musicas": [
      { "titulo": "Pipoco com Melody", "album": "Single", "ano": "2022", "streams": 920000000 },
      { "titulo": "Nosso Quadro", "album": "Boiadeira", "ano": "2023", "streams": 730000000 },
      { "titulo": "Boiadeira", "album": "Boiadeira", "ano": "2022", "streams": 650000000 }
    ],
    "albuns": [
      { "titulo": "Boiadeira", "ano": "2022", "streams": 2100000000 },
      { "titulo": "Ta Rocheda", "ano": "2023", "streams": 1800000000 }
    ]
  },
  {
    "id": "henrique-e-juliano",
    "nome": "Henrique e Juliano",
    "biografia": [
      "Henrique e Juliano comecaram tocando em barzinhos do interior do Mato Grosso do Sul antes de se tornarem um dos maiores fenomenos do sertanejo.",
      "Com albuns ao vivo memoraveis e hits como 'Cuida Bem Dela', dominam as paradas e os estadios nacionais."
    ],
    "resumo": "Uma das duplas sertanejas mais amadas do Brasil, com recordes de publico e streams.",
    "musicas": [
      { "titulo": "Cuida Bem Dela", "album": "Na Praia 2", "ano": "2018", "streams": 580000000 },
      { "titulo": "Liberdade Provisoria", "album": "Single", "ano": "2019", "streams": 520000000 },
      { "titulo": "Tao Improvavel", "album": "Single", "ano": "2021", "streams": 480000000 }
    ],
    "albuns": [
      { "titulo": "Na Praia 2", "ano": "2018", "streams": 1300000000 },
      { "titulo": "Ao Vivo em Campo Grande", "ano": "2020", "streams": 1100000000 }
    ]
  },
  {
    "id": "michael-jackson",
    "nome": "Michael Jackson",
    "biografia": [
      "Comecou aos 11 anos com os Jackson 5 e se tornou a maior estrela pop de todos os tempos, revolucionando danca, moda e videoclipes.",
      "'Thriller' (1982) e o album mais vendido de toda a historia. Michael ganhou 15 Grammys e transformou a industria da musica."
    ],
    "resumo": "O Rei do Pop. O artista mais vendido de toda a historia da musica com mais de 750 milhoes de copias.",
    "musicas": [
      { "titulo": "Billie Jean", "album": "Thriller", "ano": "1982", "streams": 1900000000 },
      { "titulo": "Thriller", "album": "Thriller", "ano": "1982", "streams": 1400000000 },
      { "titulo": "Beat It", "album": "Thriller", "ano": "1982", "streams": 1300000000 },
      { "titulo": "Man in the Mirror", "album": "Bad", "ano": "1987", "streams": 1100000000 },
      { "titulo": "Smooth Criminal", "album": "Bad", "ano": "1987", "streams": 980000000 }
    ],
    "albuns": [
      { "titulo": "Thriller", "ano": "1982", "streams": 4200000000 },
      { "titulo": "Bad", "ano": "1987", "streams": 3100000000 },
      { "titulo": "Dangerous", "ano": "1991", "streams": 2400000000 }
    ]
  },
  {
    "id": "beyonce",
    "nome": "Beyonce",
    "biografia": [
      "Beyonce Giselle Knowles-Carter estreou com o Destiny's Child antes de se tornar a maior artista viva.",
      "Com albuns visuais como 'Lemonade' (2016) e 'Renaissance' (2022), elevou o pop a uma forma de arte e ativismo."
    ],
    "resumo": "A artista mais premiada na historia do Grammy, com 32 premios e presenca lendaria.",
    "musicas": [
      { "titulo": "Crazy in Love feat. Jay-Z", "album": "Dangerously in Love", "ano": "2003", "streams": 1600000000 },
      { "titulo": "Halo", "album": "I Am Sasha Fierce", "ano": "2008", "streams": 1400000000 },
      { "titulo": "Single Ladies", "album": "I Am Sasha Fierce", "ano": "2008", "streams": 1200000000 },
      { "titulo": "CUFF IT", "album": "Renaissance", "ano": "2022", "streams": 890000000 }
    ],
    "albuns": [
      { "titulo": "Renaissance", "ano": "2022", "streams": 4100000000 },
      { "titulo": "Lemonade", "ano": "2016", "streams": 3600000000 },
      { "titulo": "I Am Sasha Fierce", "ano": "2008", "streams": 3200000000 }
    ]
  },
  {
    "id": "taylor-swift",
    "nome": "Taylor Swift",
    "biografia": [
      "Comecou como cantora country teenager e se reinventou diversas vezes, dominando o pop, indie folk e synth-pop.",
      "A Eras Tour (2023-2024) se tornou a turne musical com maior arrecadacao de toda a historia, ultrapassando USD 1 bilhao."
    ],
    "resumo": "A artista mais ouvida do Spotify em todos os tempos, com a Eras Tour se tornando a maior turne da historia.",
    "musicas": [
      { "titulo": "Shake It Off", "album": "1989", "ano": "2014", "streams": 3400000000 },
      { "titulo": "Blank Space", "album": "1989", "ano": "2014", "streams": 3100000000 },
      { "titulo": "Cruel Summer", "album": "Lover", "ano": "2019", "streams": 2900000000 },
      { "titulo": "Love Story", "album": "Fearless", "ano": "2008", "streams": 2800000000 },
      { "titulo": "Anti-Hero", "album": "Midnights", "ano": "2022", "streams": 2300000000 }
    ],
    "albuns": [
      { "titulo": "Midnights", "ano": "2022", "streams": 6800000000 },
      { "titulo": "1989 Taylors Version", "ano": "2023", "streams": 5900000000 },
      { "titulo": "Lover", "ano": "2019", "streams": 4800000000 },
      { "titulo": "Folklore", "ano": "2020", "streams": 4200000000 }
    ]
  },
  {
    "id": "billie-eilish",
    "nome": "Billie Eilish",
    "biografia": [
      "Billie Eilish Pirate Baird O'Connell comecou a fazer musica no quarto com seu irmao Finneas e explodiu com 'Ocean Eyes' aos 14 anos.",
      "Com 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?' (2019), tornou-se a mais jovem artista a vencer os 4 principais premios do Grammy em uma so cerimonia."
    ],
    "resumo": "A mais jovem artista a vencer os 4 principais premios do Grammy na mesma cerimonia.",
    "musicas": [
      { "titulo": "bad guy", "album": "WHEN WE ALL FALL ASLEEP", "ano": "2019", "streams": 2800000000 },
      { "titulo": "Therefore I Am", "album": "Single", "ano": "2020", "streams": 1400000000 },
      { "titulo": "Happier Than Ever", "album": "Happier Than Ever", "ano": "2021", "streams": 1200000000 }
    ],
    "albuns": [
      { "titulo": "WHEN WE ALL FALL ASLEEP WHERE DO WE GO", "ano": "2019", "streams": 5200000000 },
      { "titulo": "Happier Than Ever", "ano": "2021", "streams": 3800000000 }
    ]
  },
  {
    "id": "ed-sheeran",
    "nome": "Ed Sheeran",
    "biografia": [
      "Edward Christopher Sheeran comecou tocando nas ruas de Londres antes de se tornar um dos artistas mais vendidos de todos os tempos.",
      "Com albuns como '+', 'x' e '/', e hinos como 'Shape of You' e 'Perfect', dominou as paradas mundiais por mais de uma decada."
    ],
    "resumo": "O compositor mais prolificado de sua geracao, com multiplos recordes de vendas e streaming.",
    "musicas": [
      { "titulo": "Shape of You", "album": "Divide", "ano": "2017", "streams": 3800000000 },
      { "titulo": "Perfect", "album": "Divide", "ano": "2017", "streams": 2900000000 },
      { "titulo": "Thinking Out Loud", "album": "x", "ano": "2014", "streams": 2400000000 },
      { "titulo": "Bad Habits", "album": "Equals", "ano": "2021", "streams": 2100000000 }
    ],
    "albuns": [
      { "titulo": "Divide", "ano": "2017", "streams": 7400000000 },
      { "titulo": "x", "ano": "2014", "streams": 5800000000 },
      { "titulo": "Equals", "ano": "2021", "streams": 4200000000 }
    ]
  },
  {
    "id": "legiao-urbana",
    "nome": "Legiao Urbana",
    "biografia": [
      "Formada em Brasilia por Renato Russo, Dado Villa-Lobos e outros, a Legiao Urbana tornou-se a banda mais importante do rock nacional.",
      "Com albuns como 'Dois' e 'As Quatro Estacoes', capturou angustias e esperancas de toda uma geracao brasileira."
    ],
    "resumo": "A maior banda do rock nacional, voz de uma geracao com letras filosoficas e poeticas.",
    "musicas": [
      { "titulo": "Eduardo e Monica", "album": "Dois", "ano": "1986", "streams": 210000000 },
      { "titulo": "Tempo Perdido", "album": "Dois", "ano": "1986", "streams": 185000000 },
      { "titulo": "Pais e Filhos", "album": "As Quatro Estacoes", "ano": "1989", "streams": 165000000 },
      { "titulo": "Sera", "album": "Legiao Urbana", "ano": "1985", "streams": 140000000 }
    ],
    "albuns": [
      { "titulo": "Dois", "ano": "1986", "streams": 520000000 },
      { "titulo": "As Quatro Estacoes", "ano": "1989", "streams": 410000000 },
      { "titulo": "V", "ano": "1991", "streams": 380000000 }
    ]
  },
  {
    "id": "cazuza",
    "nome": "Cazuza",
    "biografia": [
      "Agenor de Miranda Araujo Neto comecou no Barao Vermelho antes de seguir carreira solo.",
      "Albuns como 'Ideologia' e 'O Tempo Nao Para' consolidaram sua posicao como um dos maiores da musica nacional."
    ],
    "resumo": "Roqueiro, poeta e maldito. Uma das vozes mais marcantes do Brasil.",
    "musicas": [
      { "titulo": "O Tempo Nao Para", "album": "O Tempo Nao Para", "ano": "1988", "streams": 145000000 },
      { "titulo": "Ideologia", "album": "Ideologia", "ano": "1988", "streams": 120000000 },
      { "titulo": "Brasil", "album": "Ideologia", "ano": "1988", "streams": 110000000 }
    ],
    "albuns": [
      { "titulo": "Ideologia", "ano": "1988", "streams": 310000000 },
      { "titulo": "O Tempo Nao Para", "ano": "1988", "streams": 280000000 }
    ]
  },
  {
    "id": "titas",
    "nome": "Titas",
    "biografia": [
      "Formada em Sao Paulo em 1982 por um coletivo de 9 integrantes, os Titas se tornaram referencia do rock nacional.",
      "Albuns como 'Cabeca Dinossauro' e 'Jesus Nao Tem Dentes no Pais dos Banguelas' sao classicos absolutos."
    ],
    "resumo": "Uma das bandas mais criativas e longevas do rock nacional, com classicos dos anos 80 e 90.",
    "musicas": [
      { "titulo": "Comida", "album": "Jesus Nao Tem Dentes", "ano": "1987", "streams": 130000000 },
      { "titulo": "Policia", "album": "Cabeca Dinossauro", "ano": "1986", "streams": 110000000 },
      { "titulo": "Familia", "album": "Cabeca Dinossauro", "ano": "1986", "streams": 95000000 }
    ],
    "albuns": [
      { "titulo": "Cabeca Dinossauro", "ano": "1986", "streams": 280000000 },
      { "titulo": "Jesus Nao Tem Dentes no Pais dos Banguelas", "ano": "1987", "streams": 240000000 }
    ]
  },
  {
    "id": "nirvana",
    "nome": "Nirvana",
    "biografia": [
      "Formada por Kurt Cobain, Krist Novoselic e Dave Grohl, o Nirvana popularizou o grunge e chegou as massas com 'Nevermind' (1991).",
      "'Smells Like Teen Spirit' tornou-se o hino de uma geracao e 'Nevermind' permanece um dos albuns mais influentes de todos os tempos."
    ],
    "resumo": "A banda que popularizou o grunge e definiu o rock alternativo dos anos 90.",
    "musicas": [
      { "titulo": "Smells Like Teen Spirit", "album": "Nevermind", "ano": "1991", "streams": 1900000000 },
      { "titulo": "Come as You Are", "album": "Nevermind", "ano": "1991", "streams": 1400000000 },
      { "titulo": "Heart-Shaped Box", "album": "In Utero", "ano": "1993", "streams": 980000000 },
      { "titulo": "Something in the Way", "album": "Nevermind", "ano": "1991", "streams": 860000000 }
    ],
    "albuns": [
      { "titulo": "Nevermind", "ano": "1991", "streams": 4800000000 },
      { "titulo": "In Utero", "ano": "1993", "streams": 2400000000 },
      { "titulo": "Bleach", "ano": "1989", "streams": 1100000000 }
    ]
  },
  {
    "id": "queen",
    "nome": "Queen",
    "biografia": [
      "Formada em Londres, o Queen combinou rock classico, opera, musica de estadio e glam rock de forma unica.",
      "A performance no Live Aid (1985) e considerada o maior show da historia do rock. 'Bohemian Rhapsody' e a cancao mais streamada do seculo XX."
    ],
    "resumo": "Uma das maiores bandas de rock de todos os tempos, com Freddie Mercury como sua voz imortal.",
    "musicas": [
      { "titulo": "Bohemian Rhapsody", "album": "A Night at the Opera", "ano": "1975", "streams": 2400000000 },
      { "titulo": "Don't Stop Me Now", "album": "Jazz", "ano": "1978", "streams": 1800000000 },
      { "titulo": "We Will Rock You", "album": "News of the World", "ano": "1977", "streams": 1400000000 },
      { "titulo": "We Are the Champions", "album": "News of the World", "ano": "1977", "streams": 1200000000 },
      { "titulo": "Somebody to Love", "album": "A Day at the Races", "ano": "1976", "streams": 1100000000 }
    ],
    "albuns": [
      { "titulo": "Greatest Hits", "ano": "1981", "streams": 5200000000 },
      { "titulo": "A Night at the Opera", "ano": "1975", "streams": 3800000000 },
      { "titulo": "News of the World", "ano": "1977", "streams": 2600000000 }
    ]
  },
  {
    "id": "led-zeppelin",
    "nome": "Led Zeppelin",
    "biografia": [
      "Formada em Londres por Jimmy Page, Robert Plant, John Paul Jones e John Bonham, o Led Zeppelin redefiniu o rock pesado.",
      "Com albuns como 'Led Zeppelin IV' e 'Physical Graffiti', criaram um catalogo atemporal de hard rock, folk e blues."
    ],
    "resumo": "A banda que inventou o hard rock e continua sendo a mais influente da historia do genero.",
    "musicas": [
      { "titulo": "Stairway to Heaven", "album": "Led Zeppelin IV", "ano": "1971", "streams": 1200000000 },
      { "titulo": "Whole Lotta Love", "album": "Led Zeppelin II", "ano": "1969", "streams": 890000000 },
      { "titulo": "Black Dog", "album": "Led Zeppelin IV", "ano": "1971", "streams": 720000000 }
    ],
    "albuns": [
      { "titulo": "Led Zeppelin IV", "ano": "1971", "streams": 2800000000 },
      { "titulo": "Physical Graffiti", "ano": "1975", "streams": 2100000000 },
      { "titulo": "Led Zeppelin II", "ano": "1969", "streams": 1800000000 }
    ]
  },
  {
    "id": "red-hot-chili-peppers",
    "nome": "Red Hot Chili Peppers",
    "biografia": [
      "Formada em Los Angeles em 1983, os Red Hot Chili Peppers fundiram funk, rock, punk e soul de forma pioneira.",
      "Com albuns como 'Blood Sugar Sex Magik' e 'Californication', conquistaram o mundo e permanecem ativos apos 4 decadas."
    ],
    "resumo": "A maior banda de funk rock do mundo, com mais de 120 milhoes de copias vendidas.",
    "musicas": [
      { "titulo": "Under the Bridge", "album": "Blood Sugar Sex Magik", "ano": "1991", "streams": 1400000000 },
      { "titulo": "Scar Tissue", "album": "Californication", "ano": "1999", "streams": 1200000000 },
      { "titulo": "Californication", "album": "Californication", "ano": "1999", "streams": 1100000000 }
    ],
    "albuns": [
      { "titulo": "Californication", "ano": "1999", "streams": 3400000000 },
      { "titulo": "Blood Sugar Sex Magik", "ano": "1991", "streams": 2800000000 },
      { "titulo": "By the Way", "ano": "2002", "streams": 2100000000 }
    ]
  },
  {
    "id": "metallica",
    "nome": "Metallica",
    "biografia": [
      "Formada por James Hetfield, Lars Ulrich, Kirk Hammett e Cliff Burton, o Metallica definiu o thrash metal.",
      "O 'Black Album' (1991) e o album mais vendido nos EUA desde 1991 e consolidou a banda como mainstream sem perder a brutalidade."
    ],
    "resumo": "A banda de metal mais bem sucedida da historia, com mais de 125 milhoes de discos vendidos.",
    "musicas": [
      { "titulo": "Enter Sandman", "album": "Metallica Black Album", "ano": "1991", "streams": 1400000000 },
      { "titulo": "Nothing Else Matters", "album": "Metallica Black Album", "ano": "1991", "streams": 1200000000 },
      { "titulo": "Master of Puppets", "album": "Master of Puppets", "ano": "1986", "streams": 980000000 },
      { "titulo": "One", "album": "And Justice for All", "ano": "1988", "streams": 780000000 }
    ],
    "albuns": [
      { "titulo": "Metallica Black Album", "ano": "1991", "streams": 3800000000 },
      { "titulo": "Master of Puppets", "ano": "1986", "streams": 2100000000 },
      { "titulo": "Ride the Lightning", "ano": "1984", "streams": 1400000000 }
    ]
  },
  {
    "id": "sepultura",
    "nome": "Sepultura",
    "biografia": [
      "Formada em Belo Horizonte em 1984 pelos irmaos Cavalera, o Sepultura se tornou a banda brasileira de metal mais importante do mundo.",
      "'Roots' (1996) e considerado uma obra-prima ao misturar metal com elementos indigenas brasileiros e ritmos afro-brasileiros."
    ],
    "resumo": "A maior banda de metal pesado da America Latina, referencia mundial do thrash e groove metal.",
    "musicas": [
      { "titulo": "Roots Bloody Roots", "album": "Roots", "ano": "1996", "streams": 180000000 },
      { "titulo": "Refuse Resist", "album": "Chaos A.D.", "ano": "1993", "streams": 145000000 },
      { "titulo": "Territory", "album": "Chaos A.D.", "ano": "1993", "streams": 120000000 }
    ],
    "albuns": [
      { "titulo": "Roots", "ano": "1996", "streams": 420000000 },
      { "titulo": "Chaos A.D.", "ano": "1993", "streams": 380000000 },
      { "titulo": "Beneath the Remains", "ano": "1989", "streams": 210000000 }
    ]
  },
  {
    "id": "iron-maiden",
    "nome": "Iron Maiden",
    "biografia": [
      "Fundada por Steve Harris em Londres, a Iron Maiden criou o som definitivo do heavy metal britanico dos anos 80.",
      "Com seu mascote Eddie e cancoes epicas como 'The Trooper' e 'Hallowed Be Thy Name', influenciou incontaveis bandas de metal."
    ],
    "resumo": "A mais importante banda do heavy metal classico, com mais de 100 milhoes de discos vendidos.",
    "musicas": [
      { "titulo": "The Trooper", "album": "Piece of Mind", "ano": "1983", "streams": 680000000 },
      { "titulo": "Run to the Hills", "album": "The Number of the Beast", "ano": "1982", "streams": 620000000 },
      { "titulo": "Fear of the Dark", "album": "Fear of the Dark", "ano": "1992", "streams": 540000000 }
    ],
    "albuns": [
      { "titulo": "The Number of the Beast", "ano": "1982", "streams": 1400000000 },
      { "titulo": "Piece of Mind", "ano": "1983", "streams": 1200000000 },
      { "titulo": "Powerslave", "ano": "1984", "streams": 1100000000 }
    ]
  },
  {
    "id": "the-weeknd",
    "nome": "The Weeknd",
    "biografia": [
      "Abel Makkonen Tesfaye reinventou o R&B com uma estetica sombria, cinematografica e melancolica.",
      "'After Hours' (2020) gerou 'Blinding Lights', a musica mais streamada de toda a historia do Spotify."
    ],
    "resumo": "O artista mais ouvido do Spotify em 2020 e 2021, dono de uma das maiores turnes da historia.",
    "musicas": [
      { "titulo": "Blinding Lights", "album": "After Hours", "ano": "2019", "streams": 4200000000 },
      { "titulo": "Starboy feat. Daft Punk", "album": "Starboy", "ano": "2016", "streams": 3100000000 },
      { "titulo": "Save Your Tears", "album": "After Hours", "ano": "2020", "streams": 2800000000 },
      { "titulo": "The Hills", "album": "Beauty Behind the Madness", "ano": "2015", "streams": 2100000000 }
    ],
    "albuns": [
      { "titulo": "After Hours", "ano": "2020", "streams": 8400000000 },
      { "titulo": "Starboy", "ano": "2016", "streams": 6200000000 },
      { "titulo": "Beauty Behind the Madness", "ano": "2015", "streams": 4800000000 }
    ]
  },
  {
    "id": "frank-ocean",
    "nome": "Frank Ocean",
    "biografia": [
      "Christopher Edwin Breaux lancou 'Channel Orange' (2012), eleito o melhor album da decada pela critica especializada.",
      "'Blonde' (2016) foi lancado de forma independente e redefiniu o que um album de R&B pode ser tematicamente e sonoramente."
    ],
    "resumo": "Artista cult que revolucionou o R&B com vulnerabilidade lirica e producao vanguardista.",
    "musicas": [
      { "titulo": "Thinkin Bout You", "album": "Channel Orange", "ano": "2012", "streams": 980000000 },
      { "titulo": "Nights", "album": "Blonde", "ano": "2016", "streams": 780000000 },
      { "titulo": "Pink + White", "album": "Blonde", "ano": "2016", "streams": 710000000 }
    ],
    "albuns": [
      { "titulo": "Channel Orange", "ano": "2012", "streams": 2400000000 },
      { "titulo": "Blonde", "ano": "2016", "streams": 2100000000 }
    ]
  },
  {
    "id": "sza",
    "nome": "SZA",
    "biografia": [
      "Solana Imani Rowe, a SZA, alcanou sucesso massivo com o album 'CTRL' (2017) e especialmente com 'SOS' (2022).",
      "'SOS' tornou-se o album de uma artista feminina mais longo a ficar no topo da Billboard 200 desde 1985."
    ],
    "resumo": "A artista feminina mais premiada no Grammy 2023, redefiniu o R&B alternativo.",
    "musicas": [
      { "titulo": "Kill Bill", "album": "SOS", "ano": "2022", "streams": 1400000000 },
      { "titulo": "Good Days", "album": "Single", "ano": "2020", "streams": 1200000000 },
      { "titulo": "The Weekend", "album": "CTRL", "ano": "2017", "streams": 980000000 }
    ],
    "albuns": [
      { "titulo": "SOS", "ano": "2022", "streams": 4800000000 },
      { "titulo": "CTRL", "ano": "2017", "streams": 2400000000 }
    ]
  },
  {
    "id": "daft-punk",
    "nome": "Daft Punk",
    "biografia": [
      "Thomas Bangalter e Guy-Manuel de Homem-Christo criaram uma das identidades mais reconheciveis da musica com seus capacetes roboticos.",
      "'Random Access Memories' (2013) ganhou o Grammy de Album do Ano. 'Get Lucky' se tornou um dos maiores hits do seculo XXI."
    ],
    "resumo": "A dupla francesa que definiu a musica eletronica moderna e criou alguns dos maiores classicos da historia.",
    "musicas": [
      { "titulo": "Get Lucky feat. Pharrell Williams", "album": "Random Access Memories", "ano": "2013", "streams": 2100000000 },
      { "titulo": "One More Time", "album": "Discovery", "ano": "2000", "streams": 1800000000 },
      { "titulo": "Around the World", "album": "Homework", "ano": "1997", "streams": 1400000000 },
      { "titulo": "Harder Better Faster Stronger", "album": "Discovery", "ano": "2001", "streams": 1200000000 }
    ],
    "albuns": [
      { "titulo": "Random Access Memories", "ano": "2013", "streams": 3800000000 },
      { "titulo": "Discovery", "ano": "2001", "streams": 3100000000 },
      { "titulo": "Homework", "ano": "1997", "streams": 2400000000 }
    ]
  },
  {
    "id": "alok",
    "nome": "Alok",
    "biografia": [
      "Alok Petrillo cresceu em uma familia de DJs e se tornou o artista brasileiro com mais ouvintes mensais no Spotify.",
      "Reconhecido no Ultra Music Festival, Tomorrowland e Coachella, colocou o Brasil no topo da musica eletronica mundial."
    ],
    "resumo": "O DJ brasileiro mais famoso do mundo, Top 5 global pelo ranking DJ Mag por multiplos anos.",
    "musicas": [
      { "titulo": "Hear Me Now", "album": "Single", "ano": "2016", "streams": 810000000 },
      { "titulo": "Never Let Me Go", "album": "Single", "ano": "2019", "streams": 650000000 },
      { "titulo": "On and On com Zeeba e Nico e Vinz", "album": "Single", "ano": "2017", "streams": 540000000 }
    ],
    "albuns": [
      { "titulo": "BURST", "ano": "2020", "streams": 1200000000 }
    ]
  },
  {
    "id": "david-guetta",
    "nome": "David Guetta",
    "biografia": [
      "Pierre David Guetta iniciou como DJ em Paris nos anos 80 e se tornou o maior nome da fusao entre musica eletronica e pop mainstream.",
      "Colaboracoes com Sia, Akon, Rihanna e Nicki Minaj geraram alguns dos maiores hits da decada de 2010."
    ],
    "resumo": "O DJ mais famoso do mundo por multiplos anos, pioneiro da fusao entre EDM e pop.",
    "musicas": [
      { "titulo": "Titanium feat. Sia", "album": "Nothing but the Beat", "ano": "2011", "streams": 2100000000 },
      { "titulo": "Without You feat. Usher", "album": "Nothing but the Beat", "ano": "2011", "streams": 1600000000 },
      { "titulo": "When Love Takes Over feat. Kelly Rowland", "album": "One Love", "ano": "2009", "streams": 1200000000 }
    ],
    "albuns": [
      { "titulo": "Nothing but the Beat", "ano": "2011", "streams": 3800000000 },
      { "titulo": "One Love", "ano": "2009", "streams": 2400000000 }
    ]
  },
  {
    "id": "bad-bunny",
    "nome": "Bad Bunny",
    "biografia": [
      "Benito Antonio Martinez Ocasio revolucionou o reggaeton com estetica androgina, letras diretas e ritmos do trap latino.",
      "Primeiro artista de lingua nao-inglesa a ser o mais ouvido do Spotify. 'Un Verano Sin Ti' (2022) foi o album mais ouvido do ano."
    ],
    "resumo": "O artista mais ouvido do Spotify por tres anos consecutivos (2020, 2021 e 2022).",
    "musicas": [
      { "titulo": "DAKITI com Jhay Cortez", "album": "El Ultimo Tour Del Mundo", "ano": "2020", "streams": 2100000000 },
      { "titulo": "Titi Me Pregunto", "album": "Un Verano Sin Ti", "ano": "2022", "streams": 1800000000 },
      { "titulo": "Me Porto Bonito", "album": "Un Verano Sin Ti", "ano": "2022", "streams": 1600000000 },
      { "titulo": "Moscow Mule", "album": "Un Verano Sin Ti", "ano": "2022", "streams": 1400000000 }
    ],
    "albuns": [
      { "titulo": "Un Verano Sin Ti", "ano": "2022", "streams": 9100000000 },
      { "titulo": "El Ultimo Tour Del Mundo", "ano": "2020", "streams": 5800000000 },
      { "titulo": "YHLQMDLG", "ano": "2020", "streams": 5200000000 }
    ]
  },
  {
    "id": "j-balvin",
    "nome": "J Balvin",
    "biografia": [
      "Jose Alvaro Osorio Balvin comecou com dificuldades financeiras em Medellin e se tornou um dos artistas latinos mais conhecidos do mundo.",
      "Colaborou com artistas como Beyonce, Cardi B e BTS, e seus albuns coloridos viraram referencia do pop latino."
    ],
    "resumo": "O colombiano que levou o reggaeton para o topo das paradas mundiais.",
    "musicas": [
      { "titulo": "Mi Gente feat. Willy William", "album": "Vibras", "ano": "2017", "streams": 2400000000 },
      { "titulo": "Con Altura feat. Rosalia", "album": "Oasis", "ano": "2019", "streams": 1800000000 },
      { "titulo": "Safari", "album": "Energia", "ano": "2016", "streams": 1600000000 }
    ],
    "albuns": [
      { "titulo": "Colores", "ano": "2020", "streams": 4200000000 },
      { "titulo": "Vibras", "ano": "2018", "streams": 3800000000 }
    ]
  },
  {
    "id": "daddy-yankee",
    "nome": "Daddy Yankee",
    "biografia": [
      "Ramon Luis Ayala Rodriguez e considerado o criador e maior embaixador do reggaeton no mundo.",
      "'Gasolina' (2004) e 'Despacito' (2017, com Luis Fonsi) se tornaram os reggaetons mais ouvidos de toda a historia."
    ],
    "resumo": "O Rei do Reggaeton, criador do genero e responsavel pela sua popularizacao mundial.",
    "musicas": [
      { "titulo": "Despacito com Luis Fonsi", "album": "Single", "ano": "2017", "streams": 8100000000 },
      { "titulo": "Con Calma com Snow", "album": "Single", "ano": "2019", "streams": 1800000000 },
      { "titulo": "Gasolina", "album": "Barrio Fino", "ano": "2004", "streams": 1400000000 }
    ],
    "albuns": [
      { "titulo": "Barrio Fino", "ano": "2004", "streams": 3200000000 },
      { "titulo": "Legendaddy", "ano": "2022", "streams": 2100000000 }
    ]
  }
];

// 3. Execução da migração para o MySQL
conexao.connect((err) => {
  if (err) {
    console.error('Erro ao ligar ao MySQL:', err);
    return;
  }
  console.log('Ligado ao MySQL com sucesso! A iniciar migração de TODOS os artistas...');

  let artistasProcessados = 0;

  bancoDeDadosArtistas.forEach((artista) => {
    const sqlArtista = 'INSERT INTO artistas (nome, biografia, resumo) VALUES (?, ?, ?)';
    const biografiaTexto = Array.isArray(artista.biografia) ? artista.biografia.join('\n') : (artista.biografia || '');

    conexao.query(sqlArtista, [artista.nome, biografiaTexto, artista.resumo || ''], (err, resultadoArtista) => {
      if (err) {
        console.error(`Erro ao inserir artista ${artista.nome}:`, err);
        return;
      }

      const artistaId = resultadoArtista.insertId;
      console.log(`[Artista] ${artista.nome} inserido com ID: ${artistaId}`);

      if (artista.albuns && artista.albuns.length > 0) {
        artista.albuns.forEach((album) => {
          const sqlAlbum = 'INSERT INTO albuns (artista_id, titulo, ano_lancamento) VALUES (?, ?, ?)';
          const anoAlbum = parseInt(album.ano) || 2020;

          conexao.query(sqlAlbum, [artistaId, album.titulo, anoAlbum], (err, resultadoAlbum) => {
            if (err) {
              console.error(`Erro ao inserir álbum ${album.titulo}:`, err);
              return;
            }

            const albumId = resultadoAlbum.insertId;
            const musicasDoAlbum = artista.musicas ? artista.musicas.filter(m => m.album === album.titulo) : [];
            
            if (musicasDoAlbum.length > 0) {
              musicasDoAlbum.forEach((musica) => {
                const sqlFaixa = 'INSERT INTO faixas (album_id, titulo_faixa, duracao, avaliacao) VALUES (?, ?, ?, ?)';
                conexao.query(sqlFaixa, [albumId, musica.titulo, '3:30', 9.0], (err) => {
                  if (err) console.error(`Erro ao inserir faixa ${musica.titulo}:`, err);
                });
              });
            }
          });
        });
      }

      artistasProcessados++;
      if (artistasProcessados === bancoDeDadosArtistas.length) {
        console.log('--- MIGRAÇÃO DE TODOS OS ARTISTAS CONCLUÍDA COM SUCESSO! ---');
      }
    });
  });

  setTimeout(() => {
    conexao.end();
    console.log('Ligação ao MySQL encerrada.');
  }, 5000);
});