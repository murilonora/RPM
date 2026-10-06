// ==========================================
// TIPAGENS (TYPESCRIPT)
// ==========================================

export interface Musica {
  titulo: string;
  album: string;
  ano: string;
  reproducoes: string;
  streams: number;
  capa?: string;
}

export interface Album {
  titulo: string;
  ano: string;
  faixas: string;
  reproducoes: string;
  streams: number;
  capa?: string;
}

export interface Artista {
  id: string;
  nome: string;
  categoria: string;
  genero: string;
  origem: string;
  periodoAtivo: string;
  ouvintesMensais: string;
  ouvintesMensaisNum: number;
  foto: string;
  legendaFoto: string;
  resumo: string;
  biografia: string[];
  citacao: string;
  musicas: Musica[];
  albuns: Album[];
}

export const categoriasMusicais: string[] = [
  "Todos",
  "Trap Brasileiro",
  "Rap Brasileiro",
  "Rap Americano",
  "Hip Hop Americano",
  "Funk Brasileiro",
  "Samba e MPB",
  "Sertanejo",
  "Pop Internacional",
  "Rock Nacional",
  "Rock Internacional",
  "Heavy Metal",
  "R&B e Soul",
  "Eletronico e EDM",
  "Reggaeton e Trap Latino"
];

const bancoDeDadosArtistas: Artista[] = [
  {
    "id": "matue",
    "nome": "Matue",
    "categoria": "Trap Brasileiro",
    "genero": "Trap / Hip Hop",
    "origem": "Fortaleza, CE, Brasil",
    "periodoAtivo": "2015 - presente",
    "ouvintesMensais": "11.8 mi",
    "ouvintesMensaisNum": 11800000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/c42fcb920963cca4d195b939e51f19d1/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Matue nos palcos com a 30PRAUM",
    "resumo": "Pioneiro do trap comercial no Brasil, fundador do selo 30PRAUM e recordista do Spotify Brasil.",
    "biografia": [
      "Matheus Brasileiro Aguiar e amplamente considerado o grande expoente do trap no Brasil. Nascido em Fortaleza, criou o selo 30PRAUM e redefiniu o alcance do genero no streaming nacional.",
      "Com 'Maquina do Tempo' (2020) quebrou todos os recordes historicos do Spotify Brasil no dia de lancamento. Em 2024, lancou '333', aclamado por critica e publico."
    ],
    "citacao": "A gente nao veio pra disputar espaco, veio pra construir o nosso proprio universo.",
    "musicas": [
      {
        "titulo": "Anos Luz",
        "album": "Single",
        "ano": "2017",
        "reproducoes": "310 mi",
        "streams": 310000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/1e0e4b9cb9d3cdd462ea03b0a5bc22ad/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Maquina do Tempo",
        "album": "Maquina do Tempo",
        "ano": "2020",
        "reproducoes": "285 mi",
        "streams": 285000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/9ad06bcb9f0bfe52bbd5e6ff464e4ca4/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "777-666",
        "album": "Maquina do Tempo",
        "ano": "2020",
        "reproducoes": "260 mi",
        "streams": 260000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/9ad06bcb9f0bfe52bbd5e6ff464e4ca4/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Crack com Mussilon",
        "album": "333",
        "ano": "2024",
        "reproducoes": "195 mi",
        "streams": 195000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/a4d8ede7aecd45c9e4b4858487a02a88/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Kenny G",
        "album": "Single",
        "ano": "2019",
        "reproducoes": "180 mi",
        "streams": 180000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/6ad325dc5de5abc07e4df64f77f66603/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Maquina do Tempo",
        "ano": "2020",
        "faixas": "7 faixas",
        "reproducoes": "950 mi",
        "streams": 950000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/9ad06bcb9f0bfe52bbd5e6ff464e4ca4/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "333",
        "ano": "2024",
        "faixas": "12 faixas",
        "reproducoes": "620 mi",
        "streams": 620000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/a4d8ede7aecd45c9e4b4858487a02a88/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "filipe-ret",
    "nome": "Filipe Ret",
    "categoria": "Trap Brasileiro",
    "genero": "Trap / Rap Acustico",
    "origem": "Rio de Janeiro, RJ, Brasil",
    "periodoAtivo": "2009 - presente",
    "ouvintesMensais": "8.9 mi",
    "ouvintesMensaisNum": 8900000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/95307e8658ae68a77da656874ca454c7/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Filipe Ret ao vivo no Lollapalooza",
    "resumo": "Pilar lirico do rap carioca que construiu a ponte entre o rap classico e o trap contemporaneo.",
    "biografia": [
      "Originario do Catete, RJ, iniciou nas batalhas de rima da Lapa. Formou-se em jornalismo e uniu poesia filosofica ao ritmo das ruas.",
      "Com albuns como 'Vivaz' e 'LUME' (2022), fundou a gravadora NADAMAL e se consolidou como voz geracional."
    ],
    "citacao": "Subversivo e quem tem coragem de viver o que sonha.",
    "musicas": [
      {
        "titulo": "Melhor Agora",
        "album": "LUME",
        "ano": "2022",
        "reproducoes": "270 mi",
        "streams": 270000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/966c622d2a432a7bffff340ef36836c7/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Incondicional",
        "album": "Imersao",
        "ano": "2021",
        "reproducoes": "190 mi",
        "streams": 190000000,
        "capa": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80"
      },
      {
        "titulo": "Neurotico de Guerra",
        "album": "Vivaz",
        "ano": "2012",
        "reproducoes": "180 mi",
        "streams": 180000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/f6de5201719a7fda618910faed3055fb/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Me Sinto Abencoado",
        "album": "LUME",
        "ano": "2022",
        "reproducoes": "175 mi",
        "streams": 175000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/702faa242e4eaf839e4062ecf43c9cf6/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "LUME",
        "ano": "2022",
        "faixas": "11 faixas",
        "reproducoes": "680 mi",
        "streams": 680000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/966c622d2a432a7bffff340ef36836c7/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Audaz",
        "ano": "2018",
        "faixas": "13 faixas",
        "reproducoes": "410 mi",
        "streams": 410000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/5c41a84e71b95f6d8b26dfebff70f934/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Vivaz",
        "ano": "2012",
        "faixas": "10 faixas",
        "reproducoes": "340 mi",
        "streams": 340000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/f6de5201719a7fda618910faed3055fb/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "l7nnon",
    "nome": "L7NNON",
    "categoria": "Trap Brasileiro",
    "genero": "Trap / Drill / Phonk",
    "origem": "Sao Paulo, SP, Brasil",
    "periodoAtivo": "2016 - presente",
    "ouvintesMensais": "7.2 mi",
    "ouvintesMensaisNum": 7200000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/64cf7661047f64ebb38c5d4fd4d31783/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "L7NNON em performance",
    "resumo": "Um dos artistas mais ecleticos do trap nacional, pioneiro da fusao com drill e phonk.",
    "biografia": [
      "Giovanni Di Sacco, o L7NNON, mistura trap, drill, phonk e rock alternativo com estetica visual marcante.",
      "Parceiro frequente de Matue e outros nomes da 30PRAUM, e conhecido por experimentacoes sonoras ousadas e letras introspectivas."
    ],
    "citacao": "Eu sou o caos organizado.",
    "musicas": [
      {
        "titulo": "Pandora",
        "album": "Single",
        "ano": "2021",
        "reproducoes": "210 mi",
        "streams": 210000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/cd36a6f157d8c4126c950680de0922a2/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Amor e Facas",
        "album": "SETE",
        "ano": "2022",
        "reproducoes": "180 mi",
        "streams": 180000000,
        "capa": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80"
      },
      {
        "titulo": "SETE",
        "album": "SETE",
        "ano": "2022",
        "reproducoes": "150 mi",
        "streams": 150000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/191d8090ab5fe166cb18394490d11fc7/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "SETE",
        "ano": "2022",
        "faixas": "9 faixas",
        "reproducoes": "480 mi",
        "streams": 480000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/4b6002fbe68fbfd001ecf1b716c78c93/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "kayblack",
    "nome": "KayBlack",
    "categoria": "Trap Brasileiro",
    "genero": "Trap Melodico",
    "origem": "Sao Paulo, SP, Brasil",
    "periodoAtivo": "2019 - presente",
    "ouvintesMensais": "9.4 mi",
    "ouvintesMensaisNum": 9400000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/b2594f37faef22fd11fa356d23944e95/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "KayBlack em estudio",
    "resumo": "Voz marcante do trap romantico e melodico da cena paulistana.",
    "biografia": [
      "Kaique Menezes, o KayBlack, transformou vivencias da quebrada e cronicas sobre relacoes em hinos do trap nacional.",
      "Ficou reconhecido pelo EP 'Contraditorio' e participacoes em cyphers gigantes do YouTube."
    ],
    "citacao": "Quem vem do nada valoriza cada detalhe da caminhada.",
    "musicas": [
      {
        "titulo": "Segredo",
        "album": "Contraditorio",
        "ano": "2023",
        "reproducoes": "220 mi",
        "streams": 220000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/29bc56fed2db3f7dd584c1a5a995383c/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Preferida",
        "album": "Contraditorio",
        "ano": "2023",
        "reproducoes": "185 mi",
        "streams": 185000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/29bc56fed2db3f7dd584c1a5a995383c/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Cartier",
        "album": "Single",
        "ano": "2023",
        "reproducoes": "140 mi",
        "streams": 140000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/8cb6b57c0e84cebb3930be5b57fee257/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Contraditorio",
        "ano": "2023",
        "faixas": "7 faixas",
        "reproducoes": "510 mi",
        "streams": 510000000,
        "capa": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    "id": "costa-gold",
    "nome": "Costa Gold",
    "categoria": "Trap Brasileiro",
    "genero": "Rap / Trap",
    "origem": "Santos, SP, Brasil",
    "periodoAtivo": "2010 - presente",
    "ouvintesMensais": "5.1 mi",
    "ouvintesMensaisNum": 5100000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/35c37e074b1ac875a1a3303f08385b2c/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Costa Gold em show",
    "resumo": "Um dos artistas mais respeitados do underground brasileiro, referencia em flow e tecnica.",
    "biografia": [
      "Jonas Costa, o Costa Gold, nasceu em Santos e construiu uma carreira solida no rap underground antes de estourar no mainstream.",
      "Conhecido por textos densos e referencias literarias, seus albuns sao considerados classicos da nova era do rap nacional."
    ],
    "citacao": "Rap e compromisso, nao e entretenimento.",
    "musicas": [
      {
        "titulo": "Gringo",
        "album": "Condominio B",
        "ano": "2016",
        "reproducoes": "120 mi",
        "streams": 120000000,
        "capa": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80"
      },
      {
        "titulo": "Grana",
        "album": "Single",
        "ano": "2019",
        "reproducoes": "95 mi",
        "streams": 95000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/778dbeccdf04fdad4e718df4fc8e00c8/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Efeito Placebo",
        "album": "Condominio B",
        "ano": "2016",
        "reproducoes": "85 mi",
        "streams": 85000000,
        "capa": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "albuns": [
      {
        "titulo": "Condominio B",
        "ano": "2016",
        "faixas": "11 faixas",
        "reproducoes": "290 mi",
        "streams": 290000000,
        "capa": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80"
      },
      {
        "titulo": "Tardes de Versailles",
        "ano": "2018",
        "faixas": "13 faixas",
        "reproducoes": "220 mi",
        "streams": 220000000,
        "capa": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    "id": "racionais-mcs",
    "nome": "Racionais MCs",
    "categoria": "Rap Brasileiro",
    "genero": "Hip Hop Consciente",
    "origem": "Sao Paulo, SP, Brasil",
    "periodoAtivo": "1988 - presente",
    "ouvintesMensais": "5.5 mi",
    "ouvintesMensaisNum": 5500000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/eb2451cb8d2eefe925a8ecffc8ff5e55/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Racionais MCs em turne de 30 anos",
    "resumo": "O maior e mais influente grupo de rap da historia da musica brasileira.",
    "biografia": [
      "Formado por Mano Brown, Ice Blue, Edi Rock e KL Jay em 1988, o grupo deu voz a juventude negra e periferica, denunciando racismo e desigualdade.",
      "'Sobrevivendo no Inferno' (1997) vendeu 1,5 milhao de copias de forma independente e hoje integra leituras obrigatorias da Unicamp."
    ],
    "citacao": "A furia da favela, a voz da periferia.",
    "musicas": [
      {
        "titulo": "Vida Loka Parte 1 e 2",
        "album": "Nada como um Dia apos o Outro Dia",
        "ano": "2002",
        "reproducoes": "230 mi",
        "streams": 230000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/e04b68c5a1aa7a29128d05e7ff9e3084/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Negro Drama",
        "album": "Nada como um Dia apos o Outro Dia",
        "ano": "2002",
        "reproducoes": "195 mi",
        "streams": 195000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/34f84b78a86decd432b12a3ff714ca22/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Jesus Chorou",
        "album": "Nada como um Dia apos o Outro Dia",
        "ano": "2002",
        "reproducoes": "170 mi",
        "streams": 170000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/e04b68c5a1aa7a29128d05e7ff9e3084/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Diario de um Detento",
        "album": "Sobrevivendo no Inferno",
        "ano": "1997",
        "reproducoes": "160 mi",
        "streams": 160000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/bc55cb71a6da7f0c41f1dc184280fe32/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Capitulo 4 Versiculo 3",
        "album": "Sobrevivendo no Inferno",
        "ano": "1997",
        "reproducoes": "140 mi",
        "streams": 140000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/bc55cb71a6da7f0c41f1dc184280fe32/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Nada como um Dia apos o Outro Dia",
        "ano": "2002",
        "faixas": "21 faixas",
        "reproducoes": "650 mi",
        "streams": 650000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/e04b68c5a1aa7a29128d05e7ff9e3084/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Sobrevivendo no Inferno",
        "ano": "1997",
        "faixas": "12 faixas",
        "reproducoes": "480 mi",
        "streams": 480000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/bc55cb71a6da7f0c41f1dc184280fe32/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Raio X Brasil",
        "ano": "1993",
        "faixas": "8 faixas",
        "reproducoes": "120 mi",
        "streams": 120000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/1c9792a50a19060ddce6a0fe5d8bd296/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "emicida",
    "nome": "Emicida",
    "categoria": "Rap Brasileiro",
    "genero": "Rap / MPB",
    "origem": "Sao Paulo, SP, Brasil",
    "periodoAtivo": "2006 - presente",
    "ouvintesMensais": "4.1 mi",
    "ouvintesMensaisNum": 4100000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/828378440da0f264fb58647280c991e9/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Emicida no show de encerramento de AmarElo",
    "resumo": "Poeta e pensador que uniu o hip hop a MPB e a alta literatura.",
    "biografia": [
      "Leandro Roque de Oliveira comecou nas batalhas de freestyle e fundou com seu irmao a Laboratorio Fantasma.",
      "O projeto 'AmarElo' (2019) foi premiado com o Grammy Latino e e aclamado como manifesto de resistencia afro-brasileira."
    ],
    "citacao": "Permita que eu fale, nao as minhas cicatrizes.",
    "musicas": [
      {
        "titulo": "Passarinhos com Vanessa da Mata",
        "album": "Sobre Criancas",
        "ano": "2015",
        "reproducoes": "145 mi",
        "streams": 145000000,
        "capa": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80"
      },
      {
        "titulo": "AmarElo com Pabllo Vittar e Majur",
        "album": "AmarElo",
        "ano": "2019",
        "reproducoes": "130 mi",
        "streams": 130000000,
        "capa": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80"
      },
      {
        "titulo": "Principia",
        "album": "AmarElo",
        "ano": "2019",
        "reproducoes": "95 mi",
        "streams": 95000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/0dc76623cb84df4b6b082ed103b67084/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "AmarElo",
        "ano": "2019",
        "faixas": "11 faixas",
        "reproducoes": "410 mi",
        "streams": 410000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/1077fa021b9b9d93cb9e66564ffc4446/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Sobre Criancas Quadris Pesadelos e Licoes de Casa",
        "ano": "2015",
        "faixas": "14 faixas",
        "reproducoes": "220 mi",
        "streams": 220000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/0aa17e3f8f791278f76e688a8411b13b/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "O Glorioso Retorno de Quem Nunca Esteve Aqui",
        "ano": "2013",
        "faixas": "14 faixas",
        "reproducoes": "180 mi",
        "streams": 180000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b55f9c94b72423911a03839d9ca95c4a/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "djonga",
    "nome": "Djonga",
    "categoria": "Rap Brasileiro",
    "genero": "Rap / Hip Hop",
    "origem": "Belo Horizonte, MG, Brasil",
    "periodoAtivo": "2012 - presente",
    "ouvintesMensais": "4.8 mi",
    "ouvintesMensaisNum": 4800000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/a685bd7ab1fd1234b7b420c59ca5be4f/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Djonga em performance ao vivo",
    "resumo": "Letras incisivas e postura combativa que colocaram BH no mapa do rap nacional.",
    "biografia": [
      "Gustavo Pereira Marques e famoso por lancar um album todo dia 13 de marco e construiu classicos como 'Heresia' e 'Ladrao'.",
      "Reconhecido por rimas densas sobre politica, identidade negra e cotidiano da periferia mineira."
    ],
    "citacao": "Fogo nos racistas!",
    "musicas": [
      {
        "titulo": "Leal",
        "album": "Ladrao",
        "ano": "2019",
        "reproducoes": "145 mi",
        "streams": 145000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/55df905d05d2c226a17cc6ff163204dd/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Penumbra",
        "album": "Historias da Minha Area",
        "ano": "2020",
        "reproducoes": "110 mi",
        "streams": 110000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/5c415f9e2f05ad4d3d5781ad52f66aca/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Junho de 94",
        "album": "O Menino Que Queria Ser Deus",
        "ano": "2018",
        "reproducoes": "95 mi",
        "streams": 95000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/10ba01b01c2e8517166d7f2270a7d454/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Ladrao",
        "ano": "2019",
        "faixas": "10 faixas",
        "reproducoes": "280 mi",
        "streams": 280000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/55df905d05d2c226a17cc6ff163204dd/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "O Menino Que Queria Ser Deus",
        "ano": "2018",
        "faixas": "10 faixas",
        "reproducoes": "210 mi",
        "streams": 210000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/10ba01b01c2e8517166d7f2270a7d454/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Heresia",
        "ano": "2017",
        "faixas": "10 faixas",
        "reproducoes": "120 mi",
        "streams": 120000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/8c61c365b4e658a1131100a4d9b5f389/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "sabotage",
    "nome": "Sabotage",
    "categoria": "Rap Brasileiro",
    "genero": "Rap / Hip Hop",
    "origem": "Sao Paulo, SP, Brasil",
    "periodoAtivo": "1989 - 2003",
    "ouvintesMensais": "2.3 mi",
    "ouvintesMensaisNum": 2300000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/012db12b37f5ff63e403a12b79192a9a/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Mauro Mateus dos Santos, o Maestro do Canao",
    "resumo": "Eternizado como o Maestro do Canao, lenda indelevel do rap nacional.",
    "biografia": [
      "Mauro Mateus dos Santos, o Sabotage, nasceu na Favela do Canao, zona sul paulistana. Com flow sincopado e timbre unico, uniu rap, samba e MPB.",
      "Seu disco de estreia 'Rap e Compromisso' (2000) redefiniu a forma como rimas eram construidas no Brasil."
    ],
    "citacao": "O rap e compromisso, nao e viagem.",
    "musicas": [
      {
        "titulo": "Um Bom Lugar",
        "album": "Rap e Compromisso",
        "ano": "2000",
        "reproducoes": "88 mi",
        "streams": 88000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/d9801848020a195308a0b2de9da074ff/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Mun-Ra",
        "album": "Rap e Compromisso",
        "ano": "2000",
        "reproducoes": "72 mi",
        "streams": 72000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/12bd074df5e5f22621b55153f0fc14ad/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "No Brooklin",
        "album": "Rap e Compromisso",
        "ano": "2000",
        "reproducoes": "64 mi",
        "streams": 64000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/d9801848020a195308a0b2de9da074ff/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Rap e Compromisso",
        "ano": "2000",
        "faixas": "11 faixas",
        "reproducoes": "290 mi",
        "streams": 290000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/d9801848020a195308a0b2de9da074ff/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "criolo",
    "nome": "Criolo",
    "categoria": "Rap Brasileiro",
    "genero": "Rap / Reggae / MPB",
    "origem": "Sao Paulo, SP, Brasil",
    "periodoAtivo": "1989 - presente",
    "ouvintesMensais": "1.9 mi",
    "ouvintesMensaisNum": 1900000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/6bc58b4567691714ce5074711b955105/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Criolo em show ao vivo",
    "resumo": "Poeta e cantor que criou uma linguagem propria misturando rap, reggae, samba e MPB.",
    "biografia": [
      "Kleber Cavalcante Gomes, o Criolo, revolucionou o cenario musical brasileiro com 'Nao Existe Amor em SP' (2011).",
      "Seus albuns transitam livremente entre generos, e ele e um dos artistas mais premiados e respeitados da musica brasileira contemporanea."
    ],
    "citacao": "Nao existe amor em SP.",
    "musicas": [
      {
        "titulo": "Nao Existe Amor em SP",
        "album": "Nao Existe Amor em SP",
        "ano": "2011",
        "reproducoes": "75 mi",
        "streams": 75000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/756d8d0262d22eb39099448293dfe323/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Linha de Frente",
        "album": "Criolo",
        "ano": "2006",
        "reproducoes": "58 mi",
        "streams": 58000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/756d8d0262d22eb39099448293dfe323/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Nao Existe Amor em SP",
        "ano": "2011",
        "faixas": "13 faixas",
        "reproducoes": "180 mi",
        "streams": 180000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/3f97f7f3f2be3d270b01878f8be54e26/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Convoque Seu Buda",
        "ano": "2014",
        "faixas": "12 faixas",
        "reproducoes": "140 mi",
        "streams": 140000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/6eff0230958231ee7ffb1c53b98e82c1/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "kendrick-lamar",
    "nome": "Kendrick Lamar",
    "categoria": "Rap Americano",
    "genero": "West Coast / Conscious Rap",
    "origem": "Compton, California, EUA",
    "periodoAtivo": "2004 - presente",
    "ouvintesMensais": "68.4 mi",
    "ouvintesMensaisNum": 68400000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/be0a7c550567f4af0ed202d7235b74d6/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Kendrick Lamar na turne The Big Steppers",
    "resumo": "Unico artista de rap a receber o Premio Pulitzer de Musica.",
    "biografia": [
      "Nascido em Compton, California, desenvolveu narrativa autobiografica ancorada em jazz, funk e critica social.",
      "'To Pimp a Butterfly' e 'DAMN.' sao obras-primas mundiais. Em 2018, ganhou o Premio Pulitzer. Em 2024, dominou as paradas com 'Not Like Us'."
    ],
    "citacao": "Sit down, be humble.",
    "musicas": [
      {
        "titulo": "HUMBLE.",
        "album": "DAMN.",
        "ano": "2017",
        "reproducoes": "2.1 bi",
        "streams": 2100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/7ce6b8452fae425557067db6e6a1cad5/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Money Trees",
        "album": "good kid, m.A.A.d city",
        "ano": "2012",
        "reproducoes": "1.8 bi",
        "streams": 1800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b5be27644d505bad7bdb516fe4165475/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "DNA.",
        "album": "DAMN.",
        "ano": "2017",
        "reproducoes": "1.4 bi",
        "streams": 1400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/7ce6b8452fae425557067db6e6a1cad5/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Not Like Us",
        "album": "Single",
        "ano": "2024",
        "reproducoes": "1.2 bi",
        "streams": 1200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/84345d29bc2ed8e713112425f8417e97/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Alright",
        "album": "To Pimp a Butterfly",
        "ano": "2015",
        "reproducoes": "890 mi",
        "streams": 890000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/00dd0da365a94b1829302d6b7fec70e6/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "DAMN.",
        "ano": "2017",
        "faixas": "14 faixas",
        "reproducoes": "6.2 bi",
        "streams": 6200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/7ce6b8452fae425557067db6e6a1cad5/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "good kid, m.A.A.d city",
        "ano": "2012",
        "faixas": "12 faixas",
        "reproducoes": "5.4 bi",
        "streams": 5400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b5be27644d505bad7bdb516fe4165475/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "To Pimp a Butterfly",
        "ano": "2015",
        "faixas": "16 faixas",
        "reproducoes": "3.8 bi",
        "streams": 3800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/00dd0da365a94b1829302d6b7fec70e6/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Mr. Morale e the Big Steppers",
        "ano": "2022",
        "faixas": "18 faixas",
        "reproducoes": "2.7 bi",
        "streams": 2700000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/412361ce41f0bd2595978dbf0e035ad3/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "drake",
    "nome": "Drake",
    "categoria": "Rap Americano",
    "genero": "Rap / R&B / Dancehall",
    "origem": "Toronto, Canada",
    "periodoAtivo": "2001 - presente",
    "ouvintesMensais": "75.2 mi",
    "ouvintesMensaisNum": 75200000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/eb0ed5b21d1ea5af021fc074ded0e91f/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Drake durante a turne It's All A Blur",
    "resumo": "O artista mais streamado de todos os tempos no Spotify, dominando o rap por mais de uma decada.",
    "biografia": [
      "Aubrey Drake Graham comecou como ator em 'Degrassi' antes de se tornar o artista mais dominante do rap moderno.",
      "Com o selo OVO Sound e albuns recordistas como 'Scorpion' e 'Certified Lover Boy', redefiniu o rap melodico e o trap influenciado pelo dancehall."
    ],
    "citacao": "Started from the bottom, now we're here.",
    "musicas": [
      {
        "titulo": "One Dance",
        "album": "Views",
        "ano": "2016",
        "reproducoes": "3.1 bi",
        "streams": 3100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/56bdb7a86a27fadb96332c0c8f1b8e81/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "God's Plan",
        "album": "Scorpion",
        "ano": "2018",
        "reproducoes": "2.8 bi",
        "streams": 2800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b69d3bcbd130ad4cc9259de543889e30/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Hotline Bling",
        "album": "Views",
        "ano": "2015",
        "reproducoes": "2.4 bi",
        "streams": 2400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/56bdb7a86a27fadb96332c0c8f1b8e81/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Started From the Bottom",
        "album": "Nothing Was the Same",
        "ano": "2013",
        "reproducoes": "1.1 bi",
        "streams": 1100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/64ec37a4cf512c7810c40ba0d318ff1e/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Scorpion",
        "ano": "2018",
        "faixas": "25 faixas",
        "reproducoes": "8.1 bi",
        "streams": 8100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b69d3bcbd130ad4cc9259de543889e30/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Views",
        "ano": "2016",
        "faixas": "20 faixas",
        "reproducoes": "7.4 bi",
        "streams": 7400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/56bdb7a86a27fadb96332c0c8f1b8e81/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Certified Lover Boy",
        "ano": "2021",
        "faixas": "21 faixas",
        "reproducoes": "5.9 bi",
        "streams": 5900000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/ea8f80f2edb20885ac8aed8751716794/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Nothing Was the Same",
        "ano": "2013",
        "faixas": "13 faixas",
        "reproducoes": "3.2 bi",
        "streams": 3200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/64ec37a4cf512c7810c40ba0d318ff1e/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "travis-scott",
    "nome": "Travis Scott",
    "categoria": "Rap Americano",
    "genero": "Southern Trap / Psychedelic Rap",
    "origem": "Houston, Texas, EUA",
    "periodoAtivo": "2008 - presente",
    "ouvintesMensais": "65.3 mi",
    "ouvintesMensaisNum": 65300000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/8d8316146026d7e6ce377e314536df62/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Travis Scott no show Circus Maximus",
    "resumo": "Criador de experiencias psicodelicas imersivas e arquiteto de shows em estadios.",
    "biografia": [
      "Jacques Bermon Webster II fundou o selo Cactus Jack e revolucionou a estetica sonora e visual do rap.",
      "Seu disco 'ASTROWORLD' (2018) atingiu o status de classico moderno, seguido pelo ambicioso 'UTOPIA' (2023)."
    ],
    "citacao": "It's lit!",
    "musicas": [
      {
        "titulo": "Goosebumps",
        "album": "Birds in the Trap",
        "ano": "2016",
        "reproducoes": "2.6 bi",
        "streams": 2600000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/6b149002c49dbb6a6056512dbfcb5e95/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "SICKO MODE",
        "album": "ASTROWORLD",
        "ano": "2018",
        "reproducoes": "2.4 bi",
        "streams": 2400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/0b08015216f975dc7fb5be3d5dcc4d88/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "HIGHEST IN THE ROOM",
        "album": "Single",
        "ano": "2019",
        "reproducoes": "1.6 bi",
        "streams": 1600000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/5fa05e7d74819963577a92a8c6ad4979/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "FE!N",
        "album": "UTOPIA",
        "ano": "2023",
        "reproducoes": "1.1 bi",
        "streams": 1100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/6d7164fecb39ddee0cb15952e750d907/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "ASTROWORLD",
        "ano": "2018",
        "faixas": "17 faixas",
        "reproducoes": "7.1 bi",
        "streams": 7100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/0b08015216f975dc7fb5be3d5dcc4d88/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "UTOPIA",
        "ano": "2023",
        "faixas": "19 faixas",
        "reproducoes": "3.4 bi",
        "streams": 3400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/6d7164fecb39ddee0cb15952e750d907/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Rodeo",
        "ano": "2015",
        "faixas": "16 faixas",
        "reproducoes": "3.2 bi",
        "streams": 3200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/c6fe182fb0f3485428906c7b21873046/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "j-cole",
    "nome": "J. Cole",
    "categoria": "Rap Americano",
    "genero": "Conscious Rap / Boom Bap",
    "origem": "Fayetteville, Carolina do Norte, EUA",
    "periodoAtivo": "2007 - presente",
    "ouvintesMensais": "55.8 mi",
    "ouvintesMensaisNum": 55800000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/dc8d97f19855c8ea3f15ee6db784198e/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "J. Cole na turne The Off-Season",
    "resumo": "Um dos rappers mais respeitados da geracao atual, conhecido por albuns platinados sem features.",
    "biografia": [
      "Jermaine Lamarr Cole fundou o selo Dreamville e lancou albuns como '2014 Forest Hills Drive', platina multipla sem participacoes de outros artistas.",
      "Reconhecido por lirismo denso, narrativas autobiograficas e consistencia artistica ao longo de mais de uma decada."
    ],
    "citacao": "Love yourz.",
    "musicas": [
      {
        "titulo": "No Role Modelz",
        "album": "2014 Forest Hills Drive",
        "ano": "2014",
        "reproducoes": "1.6 bi",
        "streams": 1600000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/f45c8916970597d390313833a9db0c61/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "MIDDLE CHILD",
        "album": "Single",
        "ano": "2019",
        "reproducoes": "1.1 bi",
        "streams": 1100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/9a0366a17a65c8479901b292a4077507/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Love Yourz",
        "album": "2014 Forest Hills Drive",
        "ano": "2014",
        "reproducoes": "900 mi",
        "streams": 900000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/f45c8916970597d390313833a9db0c61/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "2014 Forest Hills Drive",
        "ano": "2014",
        "faixas": "14 faixas",
        "reproducoes": "5.1 bi",
        "streams": 5100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/f45c8916970597d390313833a9db0c61/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "KOD",
        "ano": "2018",
        "faixas": "12 faixas",
        "reproducoes": "3.4 bi",
        "streams": 3400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/4ed078e752d9686414b3efc5190e2c82/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "The Off-Season",
        "ano": "2021",
        "faixas": "12 faixas",
        "reproducoes": "2.9 bi",
        "streams": 2900000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/1956b602e48e7d0cc9898a0288446234/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "eminem",
    "nome": "Eminem",
    "categoria": "Rap Americano",
    "genero": "Midwest Hip Hop / Hardcore Rap",
    "origem": "Detroit, Michigan, EUA",
    "periodoAtivo": "1988 - presente",
    "ouvintesMensais": "72.1 mi",
    "ouvintesMensaisNum": 72100000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/0f30bbd33a680030054af004d698d6ac/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Marshall Mathers nos palcos",
    "resumo": "O artista de rap mais vendido de todos os tempos e lenda tecnica das rimas velozes.",
    "biografia": [
      "Marshall Mathers, descoberto por Dr. Dre, quebrou barreiras culturais com seu alter ego 'Slim Shady'. 15 Grammys e o Oscar de Melhor Cancao Original.",
      "Vendeu mais de 220 milhoes de copias ao longo da carreira, sendo um dos artistas mais impactantes de todos os tempos."
    ],
    "citacao": "Look, if you had one shot or one opportunity to seize everything you ever wanted...",
    "musicas": [
      {
        "titulo": "Lose Yourself",
        "album": "8 Mile",
        "ano": "2002",
        "reproducoes": "2.3 bi",
        "streams": 2300000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Without Me",
        "album": "The Eminem Show",
        "ano": "2002",
        "reproducoes": "2.1 bi",
        "streams": 2100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/ec3c8ed67427064c70f67e5815b74cef/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "The Real Slim Shady",
        "album": "The Marshall Mathers LP",
        "ano": "2000",
        "reproducoes": "1.9 bi",
        "streams": 1900000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Mockingbird",
        "album": "Encore",
        "ano": "2004",
        "reproducoes": "1.7 bi",
        "streams": 1700000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Stan feat. Dido",
        "album": "The Marshall Mathers LP",
        "ano": "2000",
        "reproducoes": "1.3 bi",
        "streams": 1300000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "The Eminem Show",
        "ano": "2002",
        "faixas": "20 faixas",
        "reproducoes": "5.8 bi",
        "streams": 5800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/ec3c8ed67427064c70f67e5815b74cef/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "The Marshall Mathers LP",
        "ano": "2000",
        "faixas": "18 faixas",
        "reproducoes": "4.3 bi",
        "streams": 4300000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/941c2d3c366affdc662956559e078a4e/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Recovery",
        "ano": "2010",
        "faixas": "17 faixas",
        "reproducoes": "3.9 bi",
        "streams": 3900000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/be682506145061814eddee648edb7c59/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "The Slim Shady LP",
        "ano": "1999",
        "faixas": "20 faixas",
        "reproducoes": "2.1 bi",
        "streams": 2100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/83c5dc5ab4d1781ed3bb01c43956d71e/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "nicki-minaj",
    "nome": "Nicki Minaj",
    "categoria": "Rap Americano",
    "genero": "Rap / Pop Rap / Trap",
    "origem": "Port of Spain, Trinidad / Nova York, EUA",
    "periodoAtivo": "2004 - presente",
    "ouvintesMensais": "45.2 mi",
    "ouvintesMensaisNum": 45200000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/cf30ba4b709168aee196dcf16f259f22/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Nicki Minaj em show",
    "resumo": "A rainha do rap feminino, pioneira que abriu as portas para toda uma geracao de MC's mulheres.",
    "biografia": [
      "Onika Tanya Maraj-Petty e a primeira artista feminina a ter 100 entradas na Billboard Hot 100, e e considerada a rainha do rap feminino.",
      "Com albuns como 'Pink Friday' e 'The Pinkprint', redefiniu o papel da mulher no rap mainstream e abriu caminho para Cardi B, Megan e outras."
    ],
    "citacao": "I am not lucky, I am blessed.",
    "musicas": [
      {
        "titulo": "Super Bass",
        "album": "Pink Friday",
        "ano": "2010",
        "reproducoes": "1.8 bi",
        "streams": 1800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/f3f28eaf22f4aa1382b1fe83c6723961/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Anaconda",
        "album": "The Pinkprint",
        "ano": "2014",
        "reproducoes": "1.4 bi",
        "streams": 1400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/9c7a83a79ec78cfa0e4d93839d065557/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Starships",
        "album": "Pink Friday Roman Reloaded",
        "ano": "2012",
        "reproducoes": "1.2 bi",
        "streams": 1200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/3de7484240aaf23e129662c5914707df/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Pink Friday",
        "ano": "2010",
        "faixas": "14 faixas",
        "reproducoes": "3.1 bi",
        "streams": 3100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/93c7ca2b54d614843dfe7658106eed69/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "The Pinkprint",
        "ano": "2014",
        "faixas": "19 faixas",
        "reproducoes": "2.8 bi",
        "streams": 2800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/ebbcc26be4391b139475aed5ce6a6c3e/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "2pac",
    "nome": "2Pac - Tupac Shakur",
    "categoria": "Hip Hop Americano",
    "genero": "West Coast / Gangsta Rap",
    "origem": "Nova York / Los Angeles, EUA",
    "periodoAtivo": "1989 - 1996",
    "ouvintesMensais": "24.8 mi",
    "ouvintesMensaisNum": 24800000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/dc2743d871b5935004292eed2cd55f68/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Tupac Amaru Shakur",
    "resumo": "Icone mundial imortal, poeta, ator e ativista. Mais de 75 milhoes de discos vendidos.",
    "biografia": [
      "Filho de membros dos Panteras Negras, Tupac trouxe ao hip hop uma visceralidade poetica sobre sobrevivencia e revolta politica.",
      "Entrou para o Rock and Roll Hall of Fame. 'All Eyez on Me' continua sendo um dos albuns de rap mais vendidos da historia."
    ],
    "citacao": "I guarantee that I will spark the brain that will change the world.",
    "musicas": [
      {
        "titulo": "California Love",
        "album": "All Eyez on Me",
        "ano": "1996",
        "reproducoes": "820 mi",
        "streams": 820000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/924830874f01bb19bfa6153f0e428e15/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Changes",
        "album": "Greatest Hits",
        "ano": "1998",
        "reproducoes": "740 mi",
        "streams": 740000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/924830874f01bb19bfa6153f0e428e15/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "All Eyez on Me",
        "album": "All Eyez on Me",
        "ano": "1996",
        "reproducoes": "630 mi",
        "streams": 630000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/7856515f9e28265943f125fad02f63b1/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Dear Mama",
        "album": "Me Against the World",
        "ano": "1995",
        "reproducoes": "510 mi",
        "streams": 510000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/817725b26f5103a79dcad9aff93f3fbc/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "All Eyez on Me",
        "ano": "1996",
        "faixas": "27 faixas",
        "reproducoes": "3.2 bi",
        "streams": 3200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/7856515f9e28265943f125fad02f63b1/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Me Against the World",
        "ano": "1995",
        "faixas": "15 faixas",
        "reproducoes": "1.4 bi",
        "streams": 1400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/cc46ce618d538896071b62abd104cae9/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "The Don Killuminati The 7 Day Theory",
        "ano": "1996",
        "faixas": "12 faixas",
        "reproducoes": "1.1 bi",
        "streams": 1100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/cd722f622931b2f7754834ef109b5785/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "notorious-big",
    "nome": "The Notorious B.I.G.",
    "categoria": "Hip Hop Americano",
    "genero": "East Coast Hip Hop",
    "origem": "Brooklyn, Nova York, EUA",
    "periodoAtivo": "1992 - 1997",
    "ouvintesMensais": "19.5 mi",
    "ouvintesMensaisNum": 19500000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/87e928a899c183eb10f1da14db7485dd/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Christopher Wallace, o Rei de Nova York",
    "resumo": "Considerado o maior contador de historias e o flow mais fluido de toda a historia do hip hop.",
    "biografia": [
      "Christopher George Latore Wallace resgatou a proeminencia de Nova York nos anos 90 com 'Ready to Die' (1994).",
      "Sua capacidade de rimar com riqueza de detalhes cinematograficos estabeleceu o padrao para MCs futuros."
    ],
    "citacao": "It was all a dream, I used to read Word Up! magazine.",
    "musicas": [
      {
        "titulo": "Juicy",
        "album": "Ready to Die",
        "ano": "1994",
        "reproducoes": "1.1 bi",
        "streams": 1100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/7143c2cd04a78c9c969d230c69465a03/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Hypnotize",
        "album": "Life After Death",
        "ano": "1997",
        "reproducoes": "950 mi",
        "streams": 950000000,
        "capa": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80"
      },
      {
        "titulo": "Big Poppa",
        "album": "Ready to Die",
        "ano": "1994",
        "reproducoes": "890 mi",
        "streams": 890000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/7143c2cd04a78c9c969d230c69465a03/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Mo Money Mo Problems",
        "album": "Life After Death",
        "ano": "1997",
        "reproducoes": "680 mi",
        "streams": 680000000,
        "capa": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "albuns": [
      {
        "titulo": "Life After Death",
        "ano": "1997",
        "faixas": "24 faixas",
        "reproducoes": "3.1 bi",
        "streams": 3100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/0ff6906b2c4f089e10388e74692ff576/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Ready to Die",
        "ano": "1994",
        "faixas": "17 faixas",
        "reproducoes": "2.9 bi",
        "streams": 2900000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/7143c2cd04a78c9c969d230c69465a03/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "jay-z",
    "nome": "Jay-Z",
    "categoria": "Hip Hop Americano",
    "genero": "East Coast Hip Hop / Rap",
    "origem": "Brooklyn, Nova York, EUA",
    "periodoAtivo": "1989 - presente",
    "ouvintesMensais": "35.6 mi",
    "ouvintesMensaisNum": 35600000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/a59aabd18e84d732ce3b9f6f5c4e5f50/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Jay-Z em performance no Coachella",
    "resumo": "Bilionario do hip hop, co-fundador do Roc-A-Fella Records e um dos MCs mais aclamados.",
    "biografia": [
      "Shawn Corey Carter construiu um imperio cultural, empresarial e musical ao longo de tres decadas, com 14 albuns de estudio.",
      "Primeiro artista solo de rap a entrar para o Rock and Roll Hall of Fame."
    ],
    "citacao": "I'm not a businessman, I'm a business, man.",
    "musicas": [
      {
        "titulo": "Empire State of Mind",
        "album": "The Blueprint 3",
        "ano": "2009",
        "reproducoes": "1.4 bi",
        "streams": 1400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/e0edb930ad843bb002c04956a81ce7de/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "99 Problems",
        "album": "The Black Album",
        "ano": "2003",
        "reproducoes": "1.1 bi",
        "streams": 1100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/0e59c737cf636f442fe599ec5a7fc78d/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Izzo H.O.V.A.",
        "album": "The Blueprint",
        "ano": "2001",
        "reproducoes": "900 mi",
        "streams": 900000000,
        "capa": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "albuns": [
      {
        "titulo": "The Blueprint",
        "ano": "2001",
        "faixas": "13 faixas",
        "reproducoes": "3.8 bi",
        "streams": 3800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/27a4b0d7294fb555d1d23d666f8fb8fe/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "The Black Album",
        "ano": "2003",
        "faixas": "14 faixas",
        "reproducoes": "3.2 bi",
        "streams": 3200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/0e59c737cf636f442fe599ec5a7fc78d/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "4:44",
        "ano": "2017",
        "faixas": "10 faixas",
        "reproducoes": "1.9 bi",
        "streams": 1900000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/7f9a9352b29e338aaf3b7ce9c0b791c9/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "dr-dre",
    "nome": "Dr. Dre",
    "categoria": "Hip Hop Americano",
    "genero": "G-Funk / West Coast Hip Hop",
    "origem": "Compton, California, EUA",
    "periodoAtivo": "1984 - presente",
    "ouvintesMensais": "31.2 mi",
    "ouvintesMensaisNum": 31200000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/5af98b093efb7b818e4e084621c76b85/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Dr. Dre na producao do som West Coast",
    "resumo": "Arquiteto do G-Funk e um dos maiores produtores musicais de toda a historia.",
    "biografia": [
      "Cofundou o N.W.A, criou a Death Row Records e depois a Aftermath Entertainment. Revelou Snoop Dogg, Eminem e Kendrick Lamar.",
      "Criou a assinatura sonora do G-Funk com 'The Chronic' (1992) e '2001' (1999)."
    ],
    "citacao": "I'm never gonna stop making music. It's just what I do.",
    "musicas": [
      {
        "titulo": "Still D.R.E. feat. Snoop Dogg",
        "album": "2001",
        "ano": "1999",
        "reproducoes": "1.9 bi",
        "streams": 1900000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/0d9a24d054cbc5ab11843beed9f1422b/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "The Next Episode feat. Snoop Dogg",
        "album": "2001",
        "ano": "1999",
        "reproducoes": "1.6 bi",
        "streams": 1600000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/0d9a24d054cbc5ab11843beed9f1422b/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Forgot About Dre feat. Eminem",
        "album": "2001",
        "ano": "1999",
        "reproducoes": "950 mi",
        "streams": 950000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/0d9a24d054cbc5ab11843beed9f1422b/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Nuthin But A G Thang",
        "album": "The Chronic",
        "ano": "1992",
        "reproducoes": "780 mi",
        "streams": 780000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/36cffacf94fdcc49921affe8a865f6f1/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "2001",
        "ano": "1999",
        "faixas": "22 faixas",
        "reproducoes": "4.7 bi",
        "streams": 4700000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/0d9a24d054cbc5ab11843beed9f1422b/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "The Chronic",
        "ano": "1992",
        "faixas": "16 faixas",
        "reproducoes": "1.8 bi",
        "streams": 1800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/36cffacf94fdcc49921affe8a865f6f1/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Compton",
        "ano": "2015",
        "faixas": "16 faixas",
        "reproducoes": "920 mi",
        "streams": 920000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/5a47ea3a310488ab5dbae15eb8371aba/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "nas",
    "nome": "Nas",
    "categoria": "Hip Hop Americano",
    "genero": "East Coast Hip Hop / Conscious Rap",
    "origem": "Queensbridge, Nova York, EUA",
    "periodoAtivo": "1991 - presente",
    "ouvintesMensais": "12.4 mi",
    "ouvintesMensaisNum": 12400000,
    "foto": "/artistas/nas.jpg",
    "legendaFoto": "Nas nos palcos",
    "resumo": "Autor de 'Illmatic', considerado o album de rap mais perfeito de todos os tempos pela critica.",
    "biografia": [
      "Nasir Bin Olu Dara Jones lancou 'Illmatic' em 1994 com apenas 20 anos, e o disco e ate hoje considerado a biblia do lirismo no rap.",
      "Ao longo de 30 anos de carreira, nunca perdeu a agudez poetica e a capacidade de retratar a realidade das ruas de Nova York."
    ],
    "citacao": "Sleep is the cousin of death.",
    "musicas": [
      {
        "titulo": "N.Y. State of Mind",
        "album": "Illmatic",
        "ano": "1994",
        "reproducoes": "680 mi",
        "streams": 680000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/4c2dc31af4f87864afcdb6ab599c7960/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "One Love",
        "album": "Illmatic",
        "ano": "1994",
        "reproducoes": "540 mi",
        "streams": 540000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/4c2dc31af4f87864afcdb6ab599c7960/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "If I Ruled the World feat. Lauryn Hill",
        "album": "It Was Written",
        "ano": "1996",
        "reproducoes": "480 mi",
        "streams": 480000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/dc3d7abec463b08a0586c4e5680e2c22/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Illmatic",
        "ano": "1994",
        "faixas": "10 faixas",
        "reproducoes": "2.1 bi",
        "streams": 2100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/4c2dc31af4f87864afcdb6ab599c7960/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "It Was Written",
        "ano": "1996",
        "faixas": "14 faixas",
        "reproducoes": "1.4 bi",
        "streams": 1400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/dc3d7abec463b08a0586c4e5680e2c22/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "King's Disease",
        "ano": "2020",
        "faixas": "12 faixas",
        "reproducoes": "890 mi",
        "streams": 890000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/d51b4a6193f13ea9e8f67f45f943990a/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "anitta",
    "nome": "Anitta",
    "categoria": "Funk Brasileiro",
    "genero": "Funk / Pop / Reggaeton",
    "origem": "Rio de Janeiro, RJ, Brasil",
    "periodoAtivo": "2010 - presente",
    "ouvintesMensais": "38.5 mi",
    "ouvintesMensaisNum": 38500000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/e874033338b645f174694ba024a14557/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Anitta no palco do Coachella 2022",
    "resumo": "A artista brasileira mais ouvida no mundo, pioneira do funk brasileiro no cenario global.",
    "biografia": [
      "Larissa de Macedo Machado saiu do Honorio Gurgel para se tornar o maior fenomeno da musica pop brasileira de todos os tempos.",
      "Em 2022, tornou-se a primeira artista brasileira no Top 1 global do Spotify com 'Envolver'. Realizou show historico no Coachella."
    ],
    "citacao": "Eu nao vim aqui pra ser mediana.",
    "musicas": [
      {
        "titulo": "Envolver",
        "album": "Versions of Me",
        "ano": "2022",
        "reproducoes": "850 mi",
        "streams": 850000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/d4057cde2b30078608ff0b71c63f23e6/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Vai Malandra",
        "album": "Single",
        "ano": "2017",
        "reproducoes": "720 mi",
        "streams": 720000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/2ab977ea04cdbc5accb0112bdf4cb2c0/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Desce Pro Play Pa Pa Pa",
        "album": "Single",
        "ano": "2020",
        "reproducoes": "620 mi",
        "streams": 620000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/bbda2c73a0ca35d83802055f97900669/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Girl From Rio",
        "album": "Versions of Me",
        "ano": "2021",
        "reproducoes": "580 mi",
        "streams": 580000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/cf643b027333c0d90e61ca1db1378000/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Versions of Me",
        "ano": "2022",
        "faixas": "17 faixas",
        "reproducoes": "2.4 bi",
        "streams": 2400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/5e9b628a9d65aaa3e919d19e83e42c35/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Kisses",
        "ano": "2019",
        "faixas": "20 faixas",
        "reproducoes": "1.8 bi",
        "streams": 1800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/c09cf4b8b0bf62e4900bda0459910067/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "ludmilla",
    "nome": "Ludmilla",
    "categoria": "Funk Brasileiro",
    "genero": "Funk / Pagode Baiano / Pop",
    "origem": "Rio de Janeiro, RJ, Brasil",
    "periodoAtivo": "2012 - presente",
    "ouvintesMensais": "22.1 mi",
    "ouvintesMensaisNum": 22100000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/295c1c4d6b5ca30fe35979cb008eed71/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Ludmilla no palco do Numanice",
    "resumo": "Primeira artista negra a atingir 1 bilhao de streams no Spotify Brasil.",
    "biografia": [
      "Nascida em Duque de Caxias, Ludmilla foi a primeira artista negra a atingir 1 bilhao de streams no Spotify Brasil.",
      "Com o projeto 'Numanice', reinventou o pagode baiano para o cenario nacional e se tornou referencia de garra e representatividade."
    ],
    "citacao": "Minha maior forca e saber de onde vim.",
    "musicas": [
      {
        "titulo": "Numanice",
        "album": "Numanice",
        "ano": "2021",
        "reproducoes": "480 mi",
        "streams": 480000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/cda49ff0e8f8d8d612d1865f735542d6/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Rainha da Favela",
        "album": "Single",
        "ano": "2020",
        "reproducoes": "350 mi",
        "streams": 350000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/9f20719e77ad845bcc6cfebf118f5dd1/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Cheguei",
        "album": "Single",
        "ano": "2017",
        "reproducoes": "290 mi",
        "streams": 290000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/13d7651eff65c4b6f1ff0c2529602e96/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Numanice",
        "ano": "2021",
        "faixas": "10 faixas",
        "reproducoes": "1.1 bi",
        "streams": 1100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/cda49ff0e8f8d8d612d1865f735542d6/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Numanice 2",
        "ano": "2022",
        "faixas": "10 faixas",
        "reproducoes": "890 mi",
        "streams": 890000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/cda49ff0e8f8d8d612d1865f735542d6/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "mc-ryan-sp",
    "nome": "MC Ryan SP",
    "categoria": "Funk Brasileiro",
    "genero": "Funk Ostentacao / Trap Funk",
    "origem": "Sao Paulo, SP, Brasil",
    "periodoAtivo": "2018 - presente",
    "ouvintesMensais": "11.4 mi",
    "ouvintesMensaisNum": 11400000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/286b227b151a505cfdca9857c665aeec/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "MC Ryan SP em performance",
    "resumo": "Um dos maiores nomes do funk paulistano, misturando trap e funk com batidas automotivas.",
    "biografia": [
      "Ryan Garcia Pereira, o MC Ryan SP, explodiu com o estilo automotivo do funk paulistano, diferente das batidas cariocas.",
      "Musicas como 'Tava em Casa' viralizaram nas plataformas e em bailes de toda o pais."
    ],
    "citacao": "O funk e a nossa identidade.",
    "musicas": [
      {
        "titulo": "Tava em Casa",
        "album": "Single",
        "ano": "2021",
        "reproducoes": "320 mi",
        "streams": 320000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/899b8d9585ef2c432fbf98fa41b2ae06/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Mega Rolo",
        "album": "Single",
        "ano": "2020",
        "reproducoes": "250 mi",
        "streams": 250000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/beefafaf80cf3625537b72cc2e9aadce/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Volume 1",
        "ano": "2021",
        "faixas": "10 faixas",
        "reproducoes": "580 mi",
        "streams": 580000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/080cb30730fb569b9eb9b8530f26cafc/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "chico-buarque",
    "nome": "Chico Buarque",
    "categoria": "Samba e MPB",
    "genero": "MPB / Samba",
    "origem": "Rio de Janeiro, RJ, Brasil",
    "periodoAtivo": "1964 - presente",
    "ouvintesMensais": "3.2 mi",
    "ouvintesMensaisNum": 3200000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/56ccee0a0c8b389c4cec3691a4f3df4f/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Chico Buarque em estudio",
    "resumo": "Um dos maiores compositores e cronistas da historia da musica brasileira.",
    "biografia": [
      "Chico Buarque de Hollanda e reconhecido pelo lirismo profundo e engajamento sociopolitico que marcou geracoes.",
      "Autor de classicos que desafiaram a censura durante a ditadura e retrataram o cotidiano brasileiro com poesia rara."
    ],
    "citacao": "A gente vai contra a corrente ate nao poder resistir.",
    "musicas": [
      {
        "titulo": "Construcao",
        "album": "Construcao",
        "ano": "1971",
        "reproducoes": "52 mi",
        "streams": 52000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/1ba965333c86fd5f3fb3a98d22b55bc6/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Apesar de Voce",
        "album": "Chico Buarque",
        "ano": "1978",
        "reproducoes": "48 mi",
        "streams": 48000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/9a530d7e38c3c134c71e389d29850230/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Calice",
        "album": "Chico Buarque",
        "ano": "1978",
        "reproducoes": "41 mi",
        "streams": 41000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/9a530d7e38c3c134c71e389d29850230/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Construcao",
        "ano": "1971",
        "faixas": "10 faixas",
        "reproducoes": "82 mi",
        "streams": 82000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/1ba965333c86fd5f3fb3a98d22b55bc6/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Meus Caros Amigos",
        "ano": "1976",
        "faixas": "9 faixas",
        "reproducoes": "60 mi",
        "streams": 60000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/006e1edc17da0abed18acbadef101bcd/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "caetano-veloso",
    "nome": "Caetano Veloso",
    "categoria": "Samba e MPB",
    "genero": "Tropicalia / MPB / Bossa Nova",
    "origem": "Santo Amaro, BA, Brasil",
    "periodoAtivo": "1965 - presente",
    "ouvintesMensais": "2.8 mi",
    "ouvintesMensaisNum": 2800000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/466d6b39a0b650f29c961a949de0fac4/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Caetano Veloso em turne",
    "resumo": "Fundador da Tropicalia, revolucionou a musica brasileira unindo MPB, rock e experimentacao.",
    "biografia": [
      "Fundador do movimento Tropicalia ao lado de Gilberto Gil, Caetano reinventou a MPB com influencias do rock internacional.",
      "Com mais de 50 anos de carreira e obras como 'Tropicalia' e 'Livro', e um dos artistas mais influentes da America Latina."
    ],
    "citacao": "O que nao tem censura nao tem literatura.",
    "musicas": [
      {
        "titulo": "Sozinho",
        "album": "Livro",
        "ano": "1997",
        "reproducoes": "95 mi",
        "streams": 95000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/2a0f6ac6bc05458fb072275653f01dd2/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Voce e Linda",
        "album": "Livro",
        "ano": "1997",
        "reproducoes": "80 mi",
        "streams": 80000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/741dcea3bb48a5b572fd5919e4dff061/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Tropicalia",
        "album": "Tropicalia",
        "ano": "1968",
        "reproducoes": "45 mi",
        "streams": 45000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/d09748e32612d1ee3903434ac8d199eb/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Livro",
        "ano": "1997",
        "faixas": "12 faixas",
        "reproducoes": "190 mi",
        "streams": 190000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/28e816ec5eca8617a7fa8578bc41d9ca/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Tropicalia ou Panis et Circencis",
        "ano": "1968",
        "faixas": "13 faixas",
        "reproducoes": "120 mi",
        "streams": 120000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/63d660d9ac51e163091f381435767a80/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "gilberto-gil",
    "nome": "Gilberto Gil",
    "categoria": "Samba e MPB",
    "genero": "MPB / Tropicalia / Axe",
    "origem": "Salvador, BA, Brasil",
    "periodoAtivo": "1962 - presente",
    "ouvintesMensais": "2.1 mi",
    "ouvintesMensaisNum": 2100000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/1155049990857b7e5260f2f99a2d48dd/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Gilberto Gil em show no Pelourinho",
    "resumo": "Premio Polar de Musica e ex-Ministro da Cultura, um dos maiores embaixadores da musica brasileira.",
    "biografia": [
      "Gilberto Passos Gil Moreira e co-fundador da Tropicalia e Premio Grammy Latino pelo conjunto de sua obra.",
      "Tambem ex-Ministro da Cultura do Brasil, Gil e um simbolo da musica, cultura e politica nacional."
    ],
    "citacao": "A musica e um jeito de amar.",
    "musicas": [
      {
        "titulo": "Aquele Abraco",
        "album": "Aquele Abraco",
        "ano": "1969",
        "reproducoes": "65 mi",
        "streams": 65000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/d6f6ff74173afce1bc0523cf43f5aab7/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Toda Menina Baiana",
        "album": "Refazenda",
        "ano": "1975",
        "reproducoes": "58 mi",
        "streams": 58000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/dd3c4aec6e9b1645b7ba9fa7b34977ed/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Esperando na Janela",
        "album": "Realce",
        "ano": "1979",
        "reproducoes": "48 mi",
        "streams": 48000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/f5672b0f4094ca608aae68ab3bd9bc1a/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Refazenda",
        "ano": "1975",
        "faixas": "12 faixas",
        "reproducoes": "140 mi",
        "streams": 140000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/29eef0b587e65ad408320e177ce0ee00/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Realce",
        "ano": "1979",
        "faixas": "10 faixas",
        "reproducoes": "110 mi",
        "streams": 110000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/9c46be73edd66cbf9cd32e551e4ab651/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "marilia-mendonca",
    "nome": "Marilia Mendonca",
    "categoria": "Sertanejo",
    "genero": "Sertanejo Universitario",
    "origem": "Goiania, GO, Brasil",
    "periodoAtivo": "2013 - 2021",
    "ouvintesMensais": "19.4 mi",
    "ouvintesMensaisNum": 19400000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/5ad111b990fb42b2f433ecec4d3c6866/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Marilia Mendonca na Festa das Patroas",
    "resumo": "A Rainha da Sofrencia. Primeira latina a vencer o Grammy de Melhor Album de Musica Sertaneja.",
    "biografia": [
      "Marilia Mendonca revolucionou o sertanejo com composicoes que retratavam as dores femininas com honestidade e poesia rara.",
      "Primeira latina a ganhar o Grammy Latino de Melhor Album Sertanejo e um dos maiores fenomenos da historia da musica brasileira."
    ],
    "citacao": "Eu sei que voce sente o que eu sinto, a gente erra junto.",
    "musicas": [
      {
        "titulo": "Infiel",
        "album": "Realidade",
        "ano": "2016",
        "reproducoes": "760 mi",
        "streams": 760000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/a0c4f57a668317be63b598a60ce615cd/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Graveto",
        "album": "Single",
        "ano": "2019",
        "reproducoes": "590 mi",
        "streams": 590000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/f055caffa5892aa1238aa57b6c2248f5/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Todo Mundo Vai Sofrer",
        "album": "Single",
        "ano": "2019",
        "reproducoes": "540 mi",
        "streams": 540000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/e93275c17c33486c34f41dc71c0a01d2/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Troca de Calcada",
        "album": "Festa das Patroas",
        "ano": "2021",
        "reproducoes": "480 mi",
        "streams": 480000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/4f2c052b28e10908cc02d67e6a113d9c/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Realidade",
        "ano": "2016",
        "faixas": "11 faixas",
        "reproducoes": "1.4 bi",
        "streams": 1400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/c9896c339e4a7372de21c011985077bb/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Festa das Patroas",
        "ano": "2021",
        "faixas": "11 faixas",
        "reproducoes": "980 mi",
        "streams": 980000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b23db4c5329ea5c6b3f8a1d1d310ddfe/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "gusttavo-lima",
    "nome": "Gusttavo Lima",
    "categoria": "Sertanejo",
    "genero": "Sertanejo Universitario",
    "origem": "Presidente Olegario, MG, Brasil",
    "periodoAtivo": "2011 - presente",
    "ouvintesMensais": "25.6 mi",
    "ouvintesMensaisNum": 25600000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/0954d544bbd4183580375545145decd7/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Gusttavo Lima no palco do Buteco",
    "resumo": "O Embaixador do sertanejo, dono do maior show itinerante do Brasil: o Buteco.",
    "biografia": [
      "Gusttavo Lima se tornou um dos maiores fenomenos do sertanejo universitario com seus shows de Buteco espalhados pelo Brasil.",
      "Com sucessos como 'Balada' e '22', construiu um dos maiores imperios musicais do interior brasileiro."
    ],
    "citacao": "Balada, tche tche tche.",
    "musicas": [
      {
        "titulo": "Balada Tche Tche Re Re",
        "album": "Gusttavo Lima e Voce",
        "ano": "2012",
        "reproducoes": "680 mi",
        "streams": 680000000,
        "capa": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80"
      },
      {
        "titulo": "22",
        "album": "O Embaixador",
        "ano": "2021",
        "reproducoes": "520 mi",
        "streams": 520000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/9b54ff3231725243c1833706dbcfc462/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Bloqueado",
        "album": "Buteco do Gusttavo Lima",
        "ano": "2020",
        "reproducoes": "490 mi",
        "streams": 490000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/403d532b92585bfb810e122f47d33dc9/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Buteco do Gusttavo Lima",
        "ano": "2020",
        "faixas": "15 faixas",
        "reproducoes": "1.6 bi",
        "streams": 1600000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/4908387d04843b184b3fd1c40156b4e0/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "O Embaixador",
        "ano": "2021",
        "faixas": "12 faixas",
        "reproducoes": "1.2 bi",
        "streams": 1200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b1b5db6a19d522a8405ec0efd155dfc2/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "ana-castela",
    "nome": "Ana Castela",
    "categoria": "Sertanejo",
    "genero": "Sertanejo / Country Brasileiro",
    "origem": "Navirai, MS, Brasil",
    "periodoAtivo": "2020 - presente",
    "ouvintesMensais": "31.2 mi",
    "ouvintesMensaisNum": 31200000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/8f3a2e34888582a809e746678f1f6192/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Ana Castela ao vivo",
    "resumo": "A Boiadeira mais ouvida do Brasil, fenomeno da nova geracao do sertanejo.",
    "biografia": [
      "Ana Castela explodiu com 'Pipoco' e se tornou um dos maiores fenomenos do sertanejo contemporaneo com apenas 19 anos.",
      "E a artista feminina mais ouvida do Brasil no Spotify, com uma mistura de sertanejo e country que conquistou o pais."
    ],
    "citacao": "Sou caipira mesmo, nao tenho vergonha nao.",
    "musicas": [
      {
        "titulo": "Pipoco com Melody",
        "album": "Single",
        "ano": "2022",
        "reproducoes": "920 mi",
        "streams": 920000000,
        "capa": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80"
      },
      {
        "titulo": "Nosso Quadro",
        "album": "Boiadeira",
        "ano": "2023",
        "reproducoes": "730 mi",
        "streams": 730000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/1066b42c6c8535dc1530592db59d9ccc/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Boiadeira",
        "album": "Boiadeira",
        "ano": "2022",
        "reproducoes": "650 mi",
        "streams": 650000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/6e28e89fa877f49e0121e139ab1fa4c1/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Boiadeira",
        "ano": "2022",
        "faixas": "12 faixas",
        "reproducoes": "2.1 bi",
        "streams": 2100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/4517d40dcc7fcc643bc5e0ef63284285/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Ta Rocheda",
        "ano": "2023",
        "faixas": "14 faixas",
        "reproducoes": "1.8 bi",
        "streams": 1800000000,
        "capa": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    "id": "henrique-e-juliano",
    "nome": "Henrique e Juliano",
    "categoria": "Sertanejo",
    "genero": "Sertanejo Universitario",
    "origem": "Ribas do Rio Pardo, MS, Brasil",
    "periodoAtivo": "2002 - presente",
    "ouvintesMensais": "18.9 mi",
    "ouvintesMensaisNum": 18900000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/07d9569de7853f97a09a4a42d78412e2/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Henrique e Juliano em show",
    "resumo": "Uma das duplas sertanejas mais amadas do Brasil, com recordes de publico e streams.",
    "biografia": [
      "Henrique e Juliano comecaram tocando em barzinhos do interior do Mato Grosso do Sul antes de se tornarem um dos maiores fenomenos do sertanejo.",
      "Com albuns ao vivo memoraveis e hits como 'Cuida Bem Dela', dominam as paradas e os estadios nacionais."
    ],
    "citacao": "O sertanejo e um sentimento.",
    "musicas": [
      {
        "titulo": "Cuida Bem Dela",
        "album": "Na Praia 2",
        "ano": "2018",
        "reproducoes": "580 mi",
        "streams": 580000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/afdd5948ddd12dbcc35cdf759dc6fe63/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Liberdade Provisoria",
        "album": "Single",
        "ano": "2019",
        "reproducoes": "520 mi",
        "streams": 520000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/6edd2eccd336e17a566e299d35950a1b/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Tao Improvavel",
        "album": "Single",
        "ano": "2021",
        "reproducoes": "480 mi",
        "streams": 480000000,
        "capa": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "albuns": [
      {
        "titulo": "Na Praia 2",
        "ano": "2018",
        "faixas": "15 faixas",
        "reproducoes": "1.3 bi",
        "streams": 1300000000,
        "capa": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80"
      },
      {
        "titulo": "Ao Vivo em Campo Grande",
        "ano": "2020",
        "faixas": "18 faixas",
        "reproducoes": "1.1 bi",
        "streams": 1100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/d2f27d2973c6bdfe601fb4e68b6d4785/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "michael-jackson",
    "nome": "Michael Jackson",
    "categoria": "Pop Internacional",
    "genero": "Pop / R&B / Funk",
    "origem": "Gary, Indiana, EUA",
    "periodoAtivo": "1964 - 2009",
    "ouvintesMensais": "52.3 mi",
    "ouvintesMensaisNum": 52300000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/97fae13b2b30e4aec2e8c9e0c7839d92/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "The King of Pop",
    "resumo": "O Rei do Pop. O artista mais vendido de toda a historia da musica com mais de 750 milhoes de copias.",
    "biografia": [
      "Comecou aos 11 anos com os Jackson 5 e se tornou a maior estrela pop de todos os tempos, revolucionando danca, moda e videoclipes.",
      "'Thriller' (1982) e o album mais vendido de toda a historia. Michael ganhou 15 Grammys e transformou a industria da musica."
    ],
    "citacao": "I'm starting with the man in the mirror.",
    "musicas": [
      {
        "titulo": "Billie Jean",
        "album": "Thriller",
        "ano": "1982",
        "reproducoes": "1.9 bi",
        "streams": 1900000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/a0ad67d1beb761f2cb9f8b60e5bcf07a/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Thriller",
        "album": "Thriller",
        "ano": "1982",
        "reproducoes": "1.4 bi",
        "streams": 1400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/92a024220a9532489c75c9d994835697/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Beat It",
        "album": "Thriller",
        "ano": "1982",
        "reproducoes": "1.3 bi",
        "streams": 1300000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/a0ad67d1beb761f2cb9f8b60e5bcf07a/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Man in the Mirror",
        "album": "Bad",
        "ano": "1987",
        "reproducoes": "1.1 bi",
        "streams": 1100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/a0ad67d1beb761f2cb9f8b60e5bcf07a/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Smooth Criminal",
        "album": "Bad",
        "ano": "1987",
        "reproducoes": "980 mi",
        "streams": 980000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/a0ad67d1beb761f2cb9f8b60e5bcf07a/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Thriller",
        "ano": "1982",
        "faixas": "9 faixas",
        "reproducoes": "4.2 bi",
        "streams": 4200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/f01e09ceb8ad1e96707c1b4aadb5911b/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Bad",
        "ano": "1987",
        "faixas": "11 faixas",
        "reproducoes": "3.1 bi",
        "streams": 3100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/cad261eafd0c6c15811200d5039b5b50/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Dangerous",
        "ano": "1991",
        "faixas": "14 faixas",
        "reproducoes": "2.4 bi",
        "streams": 2400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/93a5354699d552666448e1c87c976605/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "beyonce",
    "nome": "Beyonce",
    "categoria": "Pop Internacional",
    "genero": "R&B / Pop / Soul",
    "origem": "Houston, Texas, EUA",
    "periodoAtivo": "1997 - presente",
    "ouvintesMensais": "71.8 mi",
    "ouvintesMensaisNum": 71800000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/0aa9d669be4e7310b8647afae37ffaab/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Beyonce na turne Renaissance",
    "resumo": "A artista mais premiada na historia do Grammy, com 32 premios e presenca lendaria.",
    "biografia": [
      "Beyonce Giselle Knowles-Carter estreou com o Destiny's Child antes de se tornar a maior artista viva.",
      "Com albuns visuais como 'Lemonade' (2016) e 'Renaissance' (2022), elevou o pop a uma forma de arte e ativismo."
    ],
    "citacao": "The most honest form of filmmaking is to make a film for yourself.",
    "musicas": [
      {
        "titulo": "Crazy in Love feat. Jay-Z",
        "album": "Dangerously in Love",
        "ano": "2003",
        "reproducoes": "1.6 bi",
        "streams": 1600000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b3415e1ea8c2e98a8bff153c6cfb4f7b/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Halo",
        "album": "I Am Sasha Fierce",
        "ano": "2008",
        "reproducoes": "1.4 bi",
        "streams": 1400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/7cf0bdc409e7a7898c745bf0244df312/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Single Ladies",
        "album": "I Am Sasha Fierce",
        "ano": "2008",
        "reproducoes": "1.2 bi",
        "streams": 1200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/1f0450a010b5a825194d7ca00b3067ab/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "CUFF IT",
        "album": "Renaissance",
        "ano": "2022",
        "reproducoes": "890 mi",
        "streams": 890000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/2242a8d11b770d4d617afc02553510a8/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Renaissance",
        "ano": "2022",
        "faixas": "16 faixas",
        "reproducoes": "4.1 bi",
        "streams": 4100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/2242a8d11b770d4d617afc02553510a8/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Lemonade",
        "ano": "2016",
        "faixas": "12 faixas",
        "reproducoes": "3.6 bi",
        "streams": 3600000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/4d45ee37ae8c1f8e7201d1d1d9d7c839/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "I Am Sasha Fierce",
        "ano": "2008",
        "faixas": "17 faixas",
        "reproducoes": "3.2 bi",
        "streams": 3200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/1f0450a010b5a825194d7ca00b3067ab/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "taylor-swift",
    "nome": "Taylor Swift",
    "categoria": "Pop Internacional",
    "genero": "Pop / Country / Indie Folk",
    "origem": "West Reading, Pennsylvania, EUA",
    "periodoAtivo": "2004 - presente",
    "ouvintesMensais": "112.8 mi",
    "ouvintesMensaisNum": 112800000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/cc2495870fe1a792ad0cdb05501ad5ec/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Taylor Swift na Eras Tour",
    "resumo": "A artista mais ouvida do Spotify em todos os tempos, com a Eras Tour se tornando a maior turne da historia.",
    "biografia": [
      "Comecou como cantora country teenager e se reinventou diversas vezes, dominando o pop, indie folk e synth-pop.",
      "A Eras Tour (2023-2024) se tornou a turne musical com maior arrecadacao de toda a historia, ultrapassando USD 1 bilhao."
    ],
    "citacao": "Long story short, I survived.",
    "musicas": [
      {
        "titulo": "Shake It Off",
        "album": "1989",
        "ano": "2014",
        "reproducoes": "3.4 bi",
        "streams": 3400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/68b4e986958b17f05b062ffa8d7ae114/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Blank Space",
        "album": "1989",
        "ano": "2014",
        "reproducoes": "3.1 bi",
        "streams": 3100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/68b4e986958b17f05b062ffa8d7ae114/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Cruel Summer",
        "album": "Lover",
        "ano": "2019",
        "reproducoes": "2.9 bi",
        "streams": 2900000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/6111c5ab9729c8eac47883e4e50e9cf8/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Love Story",
        "album": "Fearless",
        "ano": "2008",
        "reproducoes": "2.8 bi",
        "streams": 2800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/c3924fb721c024dfebc8e4b137440fde/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Anti-Hero",
        "album": "Midnights",
        "ano": "2022",
        "reproducoes": "2.3 bi",
        "streams": 2300000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/f571cb780b339ec087201b1cea53c3d9/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Midnights",
        "ano": "2022",
        "faixas": "23 faixas",
        "reproducoes": "6.8 bi",
        "streams": 6800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/5cd9afe3078d7916dcbc566dbb979b97/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "1989 Taylors Version",
        "ano": "2023",
        "faixas": "21 faixas",
        "reproducoes": "5.9 bi",
        "streams": 5900000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/5aad85c12f4c5370d3bbb2e3549d07d9/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Lover",
        "ano": "2019",
        "faixas": "18 faixas",
        "reproducoes": "4.8 bi",
        "streams": 4800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/6111c5ab9729c8eac47883e4e50e9cf8/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Folklore",
        "ano": "2020",
        "faixas": "16 faixas",
        "reproducoes": "4.2 bi",
        "streams": 4200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/290abe93bdda84bb8b170f30a4998c4c/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "billie-eilish",
    "nome": "Billie Eilish",
    "categoria": "Pop Internacional",
    "genero": "Indie Pop / Electropop / Dark Pop",
    "origem": "Los Angeles, California, EUA",
    "periodoAtivo": "2015 - presente",
    "ouvintesMensais": "86.4 mi",
    "ouvintesMensaisNum": 86400000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/8eab1a9a644889aabaca1e193e05f984/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Billie Eilish em show",
    "resumo": "A mais jovem artista a vencer os 4 principais premios do Grammy na mesma cerimonia.",
    "biografia": [
      "Billie Eilish Pirate Baird O'Connell comecou a fazer musica no quarto com seu irmao Finneas e explodiu com 'Ocean Eyes' aos 14 anos.",
      "Com 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?' (2019), tornou-se a mais jovem artista a vencer os 4 principais premios do Grammy em uma so cerimonia."
    ],
    "citacao": "I wanna make music that feels real.",
    "musicas": [
      {
        "titulo": "bad guy",
        "album": "WHEN WE ALL FALL ASLEEP",
        "ano": "2019",
        "reproducoes": "2.8 bi",
        "streams": 2800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/6630083f454d48eadb6a9b53f035d734/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Therefore I Am",
        "album": "Single",
        "ano": "2020",
        "reproducoes": "1.4 bi",
        "streams": 1400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/bb2880548dd3bc71fb97def2eedec130/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Happier Than Ever",
        "album": "Happier Than Ever",
        "ano": "2021",
        "reproducoes": "1.2 bi",
        "streams": 1200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/bb2880548dd3bc71fb97def2eedec130/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "WHEN WE ALL FALL ASLEEP WHERE DO WE GO",
        "ano": "2019",
        "faixas": "14 faixas",
        "reproducoes": "5.2 bi",
        "streams": 5200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/6630083f454d48eadb6a9b53f035d734/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Happier Than Ever",
        "ano": "2021",
        "faixas": "16 faixas",
        "reproducoes": "3.8 bi",
        "streams": 3800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/9955047483278bd0f93420951226ac44/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "ed-sheeran",
    "nome": "Ed Sheeran",
    "categoria": "Pop Internacional",
    "genero": "Pop / Folk Pop / R&B",
    "origem": "Halifax, Yorkshire, Inglaterra",
    "periodoAtivo": "2004 - presente",
    "ouvintesMensais": "82.4 mi",
    "ouvintesMensaisNum": 82400000,
    "foto": "/artistas/ed-sheeran.jpg",
    "legendaFoto": "Ed Sheeran em show",
    "resumo": "O compositor mais prolificado de sua geracao, com multiplos recordes de vendas e streaming.",
    "biografia": [
      "Edward Christopher Sheeran comecou tocando nas ruas de Londres antes de se tornar um dos artistas mais vendidos de todos os tempos.",
      "Com albuns como '+', 'x' e '/', e hinos como 'Shape of You' e 'Perfect', dominou as paradas mundiais por mais de uma decada."
    ],
    "citacao": "Music is the most powerful tool in the world.",
    "musicas": [
      {
        "titulo": "Shape of You",
        "album": "Divide",
        "ano": "2017",
        "reproducoes": "3.8 bi",
        "streams": 3800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/107c2b43f10c249077c1f7618563bb63/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Perfect",
        "album": "Divide",
        "ano": "2017",
        "reproducoes": "2.9 bi",
        "streams": 2900000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/000a9228cecfcc7c2093d9cd7bb66447/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Thinking Out Loud",
        "album": "x",
        "ano": "2014",
        "reproducoes": "2.4 bi",
        "streams": 2400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b1d763da698c38bde6a526c8220ca0ea/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Bad Habits",
        "album": "Equals",
        "ano": "2021",
        "reproducoes": "2.1 bi",
        "streams": 2100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/63af28b4e046c59293eaf313be13f8f7/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Divide",
        "ano": "2017",
        "faixas": "16 faixas",
        "reproducoes": "7.4 bi",
        "streams": 7400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/000a9228cecfcc7c2093d9cd7bb66447/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "x",
        "ano": "2014",
        "faixas": "12 faixas",
        "reproducoes": "5.8 bi",
        "streams": 5800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b1d763da698c38bde6a526c8220ca0ea/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Equals",
        "ano": "2021",
        "faixas": "14 faixas",
        "reproducoes": "4.2 bi",
        "streams": 4200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/863e1ceb019dede99269c3b774a773fe/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "legiao-urbana",
    "nome": "Legiao Urbana",
    "categoria": "Rock Nacional",
    "genero": "Rock / Post-Punk / Pop Rock",
    "origem": "Brasilia, DF, Brasil",
    "periodoAtivo": "1982 - 1996",
    "ouvintesMensais": "7.4 mi",
    "ouvintesMensaisNum": 7400000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/27331b5535cf5a8fd0cece324c201a18/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Renato Russo e Legiao Urbana",
    "resumo": "A maior banda do rock nacional, voz de uma geracao com letras filosoficas e poeticas.",
    "biografia": [
      "Formada em Brasilia por Renato Russo, Dado Villa-Lobos e outros, a Legiao Urbana tornou-se a banda mais importante do rock nacional.",
      "Com albuns como 'Dois' e 'As Quatro Estacoes', capturou angustias e esperancas de toda uma geracao brasileira."
    ],
    "citacao": "A gente nao quer so comida, a gente quer comida, diversao e arte.",
    "musicas": [
      {
        "titulo": "Eduardo e Monica",
        "album": "Dois",
        "ano": "1986",
        "reproducoes": "210 mi",
        "streams": 210000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b4738becedbed0481ac71cee50b18d6b/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Tempo Perdido",
        "album": "Dois",
        "ano": "1986",
        "reproducoes": "185 mi",
        "streams": 185000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b4738becedbed0481ac71cee50b18d6b/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Pais e Filhos",
        "album": "As Quatro Estacoes",
        "ano": "1989",
        "reproducoes": "165 mi",
        "streams": 165000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b3d9bb7414d5bf1056aa699e66293230/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Sera",
        "album": "Legiao Urbana",
        "ano": "1985",
        "reproducoes": "140 mi",
        "streams": 140000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b3d9bb7414d5bf1056aa699e66293230/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Dois",
        "ano": "1986",
        "faixas": "11 faixas",
        "reproducoes": "520 mi",
        "streams": 520000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b4738becedbed0481ac71cee50b18d6b/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "As Quatro Estacoes",
        "ano": "1989",
        "faixas": "10 faixas",
        "reproducoes": "410 mi",
        "streams": 410000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/8ae997a8e86cb6db47f1d042955e98fe/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "V",
        "ano": "1991",
        "faixas": "11 faixas",
        "reproducoes": "380 mi",
        "streams": 380000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/c370b40dbec06fd106a3e2db44a17fc8/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "cazuza",
    "nome": "Cazuza",
    "categoria": "Rock Nacional",
    "genero": "Rock / MPB / Blues Rock",
    "origem": "Rio de Janeiro, RJ, Brasil",
    "periodoAtivo": "1982 - 1990",
    "ouvintesMensais": "3.9 mi",
    "ouvintesMensaisNum": 3900000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/69102e6bf65a592cea71b531b39db4c5/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Cazuza ao vivo",
    "resumo": "Roqueiro, poeta e maldito. Uma das vozes mais marcantes do Brasil.",
    "biografia": [
      "Agenor de Miranda Araujo Neto comecou no Barao Vermelho antes de seguir carreira solo.",
      "Albuns como 'Ideologia' e 'O Tempo Nao Para' consolidaram sua posicao como um dos maiores da musica nacional."
    ],
    "citacao": "O tempo nao para.",
    "musicas": [
      {
        "titulo": "O Tempo Nao Para",
        "album": "O Tempo Nao Para",
        "ano": "1988",
        "reproducoes": "145 mi",
        "streams": 145000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/0f61ba029f3a14618b64e32bc0fd1559/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Ideologia",
        "album": "Ideologia",
        "ano": "1988",
        "reproducoes": "120 mi",
        "streams": 120000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b3421c83bafa3634fa7ce3475cb895e0/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Brasil",
        "album": "Ideologia",
        "ano": "1988",
        "reproducoes": "110 mi",
        "streams": 110000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/cb922e3ecb4f4b3110357001073a23f9/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Ideologia",
        "ano": "1988",
        "faixas": "11 faixas",
        "reproducoes": "310 mi",
        "streams": 310000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b3421c83bafa3634fa7ce3475cb895e0/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "O Tempo Nao Para",
        "ano": "1988",
        "faixas": "11 faixas",
        "reproducoes": "280 mi",
        "streams": 280000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/086ea08802b896d04843a94e76b9f48a/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "titas",
    "nome": "Titas",
    "categoria": "Rock Nacional",
    "genero": "Rock / Post-Punk / Punk Rock",
    "origem": "Sao Paulo, SP, Brasil",
    "periodoAtivo": "1982 - presente",
    "ouvintesMensais": "4.2 mi",
    "ouvintesMensaisNum": 4200000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/88d6b914b1667b49742d46b8d8f5857e/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Titas ao vivo",
    "resumo": "Uma das bandas mais criativas e longevas do rock nacional, com classicos dos anos 80 e 90.",
    "biografia": [
      "Formada em Sao Paulo em 1982 por um coletivo de 9 integrantes, os Titas se tornaram referencia do rock nacional.",
      "Albuns como 'Cabeca Dinossauro' e 'Jesus Nao Tem Dentes no Pais dos Banguelas' sao classicos absolutos."
    ],
    "citacao": "A gente nao quer so comida.",
    "musicas": [
      {
        "titulo": "Comida",
        "album": "Jesus Nao Tem Dentes",
        "ano": "1987",
        "reproducoes": "130 mi",
        "streams": 130000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/c985a13c33281bf279de0b9aba8b136c/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Policia",
        "album": "Cabeca Dinossauro",
        "ano": "1986",
        "reproducoes": "110 mi",
        "streams": 110000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/46fb31d4829324be0cbc9fce8befc6c8/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Familia",
        "album": "Cabeca Dinossauro",
        "ano": "1986",
        "reproducoes": "95 mi",
        "streams": 95000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/554a180b12cb7bea68c64eed3836c921/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Cabeca Dinossauro",
        "ano": "1986",
        "faixas": "13 faixas",
        "reproducoes": "280 mi",
        "streams": 280000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/554a180b12cb7bea68c64eed3836c921/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Jesus Nao Tem Dentes no Pais dos Banguelas",
        "ano": "1987",
        "faixas": "11 faixas",
        "reproducoes": "240 mi",
        "streams": 240000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/c985a13c33281bf279de0b9aba8b136c/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "nirvana",
    "nome": "Nirvana",
    "categoria": "Rock Internacional",
    "genero": "Grunge / Alternative Rock",
    "origem": "Aberdeen, Washington, EUA",
    "periodoAtivo": "1987 - 1994",
    "ouvintesMensais": "28.4 mi",
    "ouvintesMensaisNum": 28400000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/3ec5542ff520ee74e2befdaba32ef2ef/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Kurt Cobain no palco",
    "resumo": "A banda que popularizou o grunge e definiu o rock alternativo dos anos 90.",
    "biografia": [
      "Formada por Kurt Cobain, Krist Novoselic e Dave Grohl, o Nirvana popularizou o grunge e chegou as massas com 'Nevermind' (1991).",
      "'Smells Like Teen Spirit' tornou-se o hino de uma geracao e 'Nevermind' permanece um dos albuns mais influentes de todos os tempos."
    ],
    "citacao": "Here we are now, entertain us.",
    "musicas": [
      {
        "titulo": "Smells Like Teen Spirit",
        "album": "Nevermind",
        "ano": "1991",
        "reproducoes": "1.9 bi",
        "streams": 1900000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/f0282817b697279e56df13909962a54a/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Come as You Are",
        "album": "Nevermind",
        "ano": "1991",
        "reproducoes": "1.4 bi",
        "streams": 1400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/f0282817b697279e56df13909962a54a/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Heart-Shaped Box",
        "album": "In Utero",
        "ano": "1993",
        "reproducoes": "980 mi",
        "streams": 980000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/4d0dfaf6d522f5323aebcc85903d92ac/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Something in the Way",
        "album": "Nevermind",
        "ano": "1991",
        "reproducoes": "860 mi",
        "streams": 860000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/f0282817b697279e56df13909962a54a/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Nevermind",
        "ano": "1991",
        "faixas": "12 faixas",
        "reproducoes": "4.8 bi",
        "streams": 4800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/f0282817b697279e56df13909962a54a/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "In Utero",
        "ano": "1993",
        "faixas": "12 faixas",
        "reproducoes": "2.4 bi",
        "streams": 2400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/4d0dfaf6d522f5323aebcc85903d92ac/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Bleach",
        "ano": "1989",
        "faixas": "11 faixas",
        "reproducoes": "1.1 bi",
        "streams": 1100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/5c4474eb462a904d3b3e0ac13213e836/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "queen",
    "nome": "Queen",
    "categoria": "Rock Internacional",
    "genero": "Classic Rock / Arena Rock / Glam Rock",
    "origem": "Londres, Inglaterra",
    "periodoAtivo": "1970 - presente",
    "ouvintesMensais": "44.6 mi",
    "ouvintesMensaisNum": 44600000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/71eeb9e2eeb375df35a3c0654a5a01ab/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Freddie Mercury no palco do Live Aid",
    "resumo": "Uma das maiores bandas de rock de todos os tempos, com Freddie Mercury como sua voz imortal.",
    "biografia": [
      "Formada em Londres, o Queen combinou rock classico, opera, musica de estadio e glam rock de forma unica.",
      "A performance no Live Aid (1985) e considerada o maior show da historia do rock. 'Bohemian Rhapsody' e a cancao mais streamada do seculo XX."
    ],
    "citacao": "Is this the real life? Is this just fantasy?",
    "musicas": [
      {
        "titulo": "Bohemian Rhapsody",
        "album": "A Night at the Opera",
        "ano": "1975",
        "reproducoes": "2.4 bi",
        "streams": 2400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/0b56f4eee05fa1ea753c5654b2cdb70c/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Don't Stop Me Now",
        "album": "Jazz",
        "ano": "1978",
        "reproducoes": "1.8 bi",
        "streams": 1800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/4b8ab9c1f112b63c07e3983b98e98006/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "We Will Rock You",
        "album": "News of the World",
        "ano": "1977",
        "reproducoes": "1.4 bi",
        "streams": 1400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/7a423dd31a478954f492c560ae90559d/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "We Are the Champions",
        "album": "News of the World",
        "ano": "1977",
        "reproducoes": "1.2 bi",
        "streams": 1200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/3856be3ba91c7009c6e469d9e57c7ea9/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Somebody to Love",
        "album": "A Day at the Races",
        "ano": "1976",
        "reproducoes": "1.1 bi",
        "streams": 1100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/5bbfab8ae2def08b9d58932b5e6121a4/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Greatest Hits",
        "ano": "1981",
        "faixas": "17 faixas",
        "reproducoes": "5.2 bi",
        "streams": 5200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/3856be3ba91c7009c6e469d9e57c7ea9/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "A Night at the Opera",
        "ano": "1975",
        "faixas": "12 faixas",
        "reproducoes": "3.8 bi",
        "streams": 3800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/0b56f4eee05fa1ea753c5654b2cdb70c/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "News of the World",
        "ano": "1977",
        "faixas": "11 faixas",
        "reproducoes": "2.6 bi",
        "streams": 2600000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/7a423dd31a478954f492c560ae90559d/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "led-zeppelin",
    "nome": "Led Zeppelin",
    "categoria": "Rock Internacional",
    "genero": "Hard Rock / Heavy Metal / Blues Rock",
    "origem": "Londres, Inglaterra",
    "periodoAtivo": "1968 - 1980",
    "ouvintesMensais": "19.8 mi",
    "ouvintesMensaisNum": 19800000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/2cf138b96a63da677ac6fb79846607c8/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Led Zeppelin ao vivo",
    "resumo": "A banda que inventou o hard rock e continua sendo a mais influente da historia do genero.",
    "biografia": [
      "Formada em Londres por Jimmy Page, Robert Plant, John Paul Jones e John Bonham, o Led Zeppelin redefiniu o rock pesado.",
      "Com albuns como 'Led Zeppelin IV' e 'Physical Graffiti', criaram um catalogo atemporal de hard rock, folk e blues."
    ],
    "citacao": "The song remains the same.",
    "musicas": [
      {
        "titulo": "Stairway to Heaven",
        "album": "Led Zeppelin IV",
        "ano": "1971",
        "reproducoes": "1.2 bi",
        "streams": 1200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/460a0edd96f743be03b7405eac38c633/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Whole Lotta Love",
        "album": "Led Zeppelin II",
        "ano": "1969",
        "reproducoes": "890 mi",
        "streams": 890000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/a5fdd04471cb7d6ec8a663621bdd9bee/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Black Dog",
        "album": "Led Zeppelin IV",
        "ano": "1971",
        "reproducoes": "720 mi",
        "streams": 720000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/460a0edd96f743be03b7405eac38c633/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Led Zeppelin IV",
        "ano": "1971",
        "faixas": "8 faixas",
        "reproducoes": "2.8 bi",
        "streams": 2800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/2047754dc07232def42ec26a9a854544/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Physical Graffiti",
        "ano": "1975",
        "faixas": "15 faixas",
        "reproducoes": "2.1 bi",
        "streams": 2100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/ee0b542bf86263b564007f085e232376/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Led Zeppelin II",
        "ano": "1969",
        "faixas": "9 faixas",
        "reproducoes": "1.8 bi",
        "streams": 1800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/a035427bb18a7a99bb7f0e531e8598d8/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "red-hot-chili-peppers",
    "nome": "Red Hot Chili Peppers",
    "categoria": "Rock Internacional",
    "genero": "Alternative Rock / Funk Rock",
    "origem": "Los Angeles, California, EUA",
    "periodoAtivo": "1983 - presente",
    "ouvintesMensais": "33.1 mi",
    "ouvintesMensaisNum": 33100000,
    "foto": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/RHCP_Live_in_London_26_June_2022.jpg/1280px-RHCP_Live_in_London_26_June_2022.jpg",
    "legendaFoto": "RHCP em performance",
    "resumo": "A maior banda de funk rock do mundo, com mais de 120 milhoes de copias vendidas.",
    "biografia": [
      "Formada em Los Angeles em 1983, os Red Hot Chili Peppers fundiram funk, rock, punk e soul de forma pioneira.",
      "Com albuns como 'Blood Sugar Sex Magik' e 'Californication', conquistaram o mundo e permanecem ativos apos 4 decadas."
    ],
    "citacao": "Give it away, give it away, give it away now.",
    "musicas": [
      {
        "titulo": "Under the Bridge",
        "album": "Blood Sugar Sex Magik",
        "ano": "1991",
        "reproducoes": "1.4 bi",
        "streams": 1400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/e3f1bee87b1d5d1313641762f375a3fb/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Scar Tissue",
        "album": "Californication",
        "ano": "1999",
        "reproducoes": "1.2 bi",
        "streams": 1200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/5e61e8290a4d1d64ca58920656c9602d/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Californication",
        "album": "Californication",
        "ano": "1999",
        "reproducoes": "1.1 bi",
        "streams": 1100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/5e61e8290a4d1d64ca58920656c9602d/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Californication",
        "ano": "1999",
        "faixas": "15 faixas",
        "reproducoes": "3.4 bi",
        "streams": 3400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/5e61e8290a4d1d64ca58920656c9602d/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Blood Sugar Sex Magik",
        "ano": "1991",
        "faixas": "17 faixas",
        "reproducoes": "2.8 bi",
        "streams": 2800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/5d7af03204d679ef877b9033d279d8bd/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "By the Way",
        "ano": "2002",
        "faixas": "15 faixas",
        "reproducoes": "2.1 bi",
        "streams": 2100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/49b073f55550d41055e02c493f9a7d39/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "metallica",
    "nome": "Metallica",
    "categoria": "Heavy Metal",
    "genero": "Heavy Metal / Thrash Metal",
    "origem": "Los Angeles, California, EUA",
    "periodoAtivo": "1981 - presente",
    "ouvintesMensais": "36.8 mi",
    "ouvintesMensaisNum": 36800000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/056578a9c2007f69ce198c81875eca41/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Metallica ao vivo",
    "resumo": "A banda de metal mais bem sucedida da historia, com mais de 125 milhoes de discos vendidos.",
    "biografia": [
      "Formada por James Hetfield, Lars Ulrich, Kirk Hammett e Cliff Burton, o Metallica definiu o thrash metal.",
      "O 'Black Album' (1991) e o album mais vendido nos EUA desde 1991 e consolidou a banda como mainstream sem perder a brutalidade."
    ],
    "citacao": "Nothing else matters.",
    "musicas": [
      {
        "titulo": "Enter Sandman",
        "album": "Metallica Black Album",
        "ano": "1991",
        "reproducoes": "1.4 bi",
        "streams": 1400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/4f2093c9d25852c8f1937ae5a47b99a6/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Nothing Else Matters",
        "album": "Metallica Black Album",
        "ano": "1991",
        "reproducoes": "1.2 bi",
        "streams": 1200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/4f2093c9d25852c8f1937ae5a47b99a6/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Master of Puppets",
        "album": "Master of Puppets",
        "ano": "1986",
        "reproducoes": "980 mi",
        "streams": 980000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/291e2af9295ca885b154eee75dfa0432/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "One",
        "album": "And Justice for All",
        "ano": "1988",
        "reproducoes": "780 mi",
        "streams": 780000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/ce293de53f905a3ce444062ec5242d53/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Metallica Black Album",
        "ano": "1991",
        "faixas": "12 faixas",
        "reproducoes": "3.8 bi",
        "streams": 3800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/4f2093c9d25852c8f1937ae5a47b99a6/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Master of Puppets",
        "ano": "1986",
        "faixas": "8 faixas",
        "reproducoes": "2.1 bi",
        "streams": 2100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/291e2af9295ca885b154eee75dfa0432/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Ride the Lightning",
        "ano": "1984",
        "faixas": "8 faixas",
        "reproducoes": "1.4 bi",
        "streams": 1400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/6d5f397660c6ec7a445f386edac05b9e/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "sepultura",
    "nome": "Sepultura",
    "categoria": "Heavy Metal",
    "genero": "Thrash Metal / Death Metal / Groove Metal",
    "origem": "Belo Horizonte, MG, Brasil",
    "periodoAtivo": "1984 - presente",
    "ouvintesMensais": "4.2 mi",
    "ouvintesMensaisNum": 4200000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/d6235a4eb71bc1a80028c277dea91331/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Sepultura ao vivo no Rock in Rio",
    "resumo": "A maior banda de metal pesado da America Latina, referencia mundial do thrash e groove metal.",
    "biografia": [
      "Formada em Belo Horizonte em 1984 pelos irmaos Cavalera, o Sepultura se tornou a banda brasileira de metal mais importante do mundo.",
      "'Roots' (1996) e considerado uma obra-prima ao misturar metal com elementos indigenas brasileiros e ritmos afro-brasileiros."
    ],
    "citacao": "Roots, bloody roots.",
    "musicas": [
      {
        "titulo": "Roots Bloody Roots",
        "album": "Roots",
        "ano": "1996",
        "reproducoes": "180 mi",
        "streams": 180000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/769d279655394e62484e3953da243329/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Refuse Resist",
        "album": "Chaos A.D.",
        "ano": "1993",
        "reproducoes": "145 mi",
        "streams": 145000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/663f4d160ef18fe81a31947d0b5aa85b/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Territory",
        "album": "Chaos A.D.",
        "ano": "1993",
        "reproducoes": "120 mi",
        "streams": 120000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/663f4d160ef18fe81a31947d0b5aa85b/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Roots",
        "ano": "1996",
        "faixas": "14 faixas",
        "reproducoes": "420 mi",
        "streams": 420000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/769d279655394e62484e3953da243329/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Chaos A.D.",
        "ano": "1993",
        "faixas": "14 faixas",
        "reproducoes": "380 mi",
        "streams": 380000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/1c173a07e63874e392b7d99314b61b71/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Beneath the Remains",
        "ano": "1989",
        "faixas": "9 faixas",
        "reproducoes": "210 mi",
        "streams": 210000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/495ab895d5d002f15ee4de2f0d546335/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "iron-maiden",
    "nome": "Iron Maiden",
    "categoria": "Heavy Metal",
    "genero": "Heavy Metal / New Wave of British Heavy Metal",
    "origem": "Londres, Inglaterra",
    "periodoAtivo": "1975 - presente",
    "ouvintesMensais": "21.4 mi",
    "ouvintesMensaisNum": 21400000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/497e5e47668e13a3fb1312a4754eaa65/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Iron Maiden ao vivo",
    "resumo": "A mais importante banda do heavy metal classico, com mais de 100 milhoes de discos vendidos.",
    "biografia": [
      "Fundada por Steve Harris em Londres, a Iron Maiden criou o som definitivo do heavy metal britanico dos anos 80.",
      "Com seu mascote Eddie e cancoes epicas como 'The Trooper' e 'Hallowed Be Thy Name', influenciou incontaveis bandas de metal."
    ],
    "citacao": "Run to the hills!",
    "musicas": [
      {
        "titulo": "The Trooper",
        "album": "Piece of Mind",
        "ano": "1983",
        "reproducoes": "680 mi",
        "streams": 680000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/f4df1d0cc2d586cefd98dde8da717acd/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Run to the Hills",
        "album": "The Number of the Beast",
        "ano": "1982",
        "reproducoes": "620 mi",
        "streams": 620000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/ca87a7fc5b10f79866925db083d99ef0/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Fear of the Dark",
        "album": "Fear of the Dark",
        "ano": "1992",
        "reproducoes": "540 mi",
        "streams": 540000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/f0a2bbd32cdc42b5bf13f3344797bf94/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "The Number of the Beast",
        "ano": "1982",
        "faixas": "8 faixas",
        "reproducoes": "1.4 bi",
        "streams": 1400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/7ed7d6130119c3a0afa60499ae8e9599/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Piece of Mind",
        "ano": "1983",
        "faixas": "9 faixas",
        "reproducoes": "1.2 bi",
        "streams": 1200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/3f606b39b6ef26c7dbcf69efaebc8f97/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Powerslave",
        "ano": "1984",
        "faixas": "8 faixas",
        "reproducoes": "1.1 bi",
        "streams": 1100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/dc4e2bcc61acc3c1bb834de9a241bf7a/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "the-weeknd",
    "nome": "The Weeknd",
    "categoria": "R&B e Soul",
    "genero": "Alternative R&B / Synth-pop",
    "origem": "Toronto, Canada",
    "periodoAtivo": "2010 - presente",
    "ouvintesMensais": "111.4 mi",
    "ouvintesMensaisNum": 111400000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/581693b4724a7fcfa754455101e13a44/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "The Weeknd na turne After Hours Til Dawn",
    "resumo": "O artista mais ouvido do Spotify em 2020 e 2021, dono de uma das maiores turnes da historia.",
    "biografia": [
      "Abel Makkonen Tesfaye reinventou o R&B com uma estetica sombria, cinematografica e melancolica.",
      "'After Hours' (2020) gerou 'Blinding Lights', a musica mais streamada de toda a historia do Spotify."
    ],
    "citacao": "I try to always strive for authenticity.",
    "musicas": [
      {
        "titulo": "Blinding Lights",
        "album": "After Hours",
        "ano": "2019",
        "reproducoes": "4.2 bi",
        "streams": 4200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/fd00ebd6d30d7253f813dba3bb1c66a9/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Starboy feat. Daft Punk",
        "album": "Starboy",
        "ano": "2016",
        "reproducoes": "3.1 bi",
        "streams": 3100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/134778e4c4f19ea71c82408300925a9a/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Save Your Tears",
        "album": "After Hours",
        "ano": "2020",
        "reproducoes": "2.8 bi",
        "streams": 2800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/fd00ebd6d30d7253f813dba3bb1c66a9/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "The Hills",
        "album": "Beauty Behind the Madness",
        "ano": "2015",
        "reproducoes": "2.1 bi",
        "streams": 2100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/eea9f7fc913300e40307a0ff70dc73cf/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "After Hours",
        "ano": "2020",
        "faixas": "14 faixas",
        "reproducoes": "8.4 bi",
        "streams": 8400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/f520bf0be2e3cfc476824e75d20a164a/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Starboy",
        "ano": "2016",
        "faixas": "18 faixas",
        "reproducoes": "6.2 bi",
        "streams": 6200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/134778e4c4f19ea71c82408300925a9a/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Beauty Behind the Madness",
        "ano": "2015",
        "faixas": "14 faixas",
        "reproducoes": "4.8 bi",
        "streams": 4800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/eea9f7fc913300e40307a0ff70dc73cf/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "frank-ocean",
    "nome": "Frank Ocean",
    "categoria": "R&B e Soul",
    "genero": "Neo Soul / Alternative R&B",
    "origem": "Long Beach, California, EUA",
    "periodoAtivo": "2010 - presente",
    "ouvintesMensais": "24.1 mi",
    "ouvintesMensaisNum": 24100000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/882155c08dc31d6464d6d580083c968c/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Frank Ocean",
    "resumo": "Artista cult que revolucionou o R&B com vulnerabilidade lirica e producao vanguardista.",
    "biografia": [
      "Christopher Edwin Breaux lancou 'Channel Orange' (2012), eleito o melhor album da decada pela critica especializada.",
      "'Blonde' (2016) foi lancado de forma independente e redefiniu o que um album de R&B pode ser tematicamente e sonoramente."
    ],
    "citacao": "Work hard in silence. Let success be your noise.",
    "musicas": [
      {
        "titulo": "Thinkin Bout You",
        "album": "Channel Orange",
        "ano": "2012",
        "reproducoes": "980 mi",
        "streams": 980000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/e545e4c96ae929e8cce56808afd7756f/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Nights",
        "album": "Blonde",
        "ano": "2016",
        "reproducoes": "780 mi",
        "streams": 780000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/f798a866107715dd6dc1049e498ce21f/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Pink + White",
        "album": "Blonde",
        "ano": "2016",
        "reproducoes": "710 mi",
        "streams": 710000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/f798a866107715dd6dc1049e498ce21f/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Channel Orange",
        "ano": "2012",
        "faixas": "17 faixas",
        "reproducoes": "2.4 bi",
        "streams": 2400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/519400e29d268f449cf00af879e71af6/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Blonde",
        "ano": "2016",
        "faixas": "17 faixas",
        "reproducoes": "2.1 bi",
        "streams": 2100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/aa7e6de00b0810f5051aa60b489f58d8/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "sza",
    "nome": "SZA",
    "categoria": "R&B e Soul",
    "genero": "Alternative R&B / Neo Soul",
    "origem": "Maplewood, New Jersey, EUA",
    "periodoAtivo": "2012 - presente",
    "ouvintesMensais": "56.8 mi",
    "ouvintesMensaisNum": 56800000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/8ced041da2bed70d5715f0860956169b/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "SZA em show",
    "resumo": "A artista feminina mais premiada no Grammy 2023, redefiniu o R&B alternativo.",
    "biografia": [
      "Solana Imani Rowe, a SZA, alcanou sucesso massivo com o album 'CTRL' (2017) e especialmente com 'SOS' (2022).",
      "'SOS' tornou-se o album de uma artista feminina mais longo a ficar no topo da Billboard 200 desde 1985."
    ],
    "citacao": "Kill Bill, I don't wanna see you with another girl.",
    "musicas": [
      {
        "titulo": "Kill Bill",
        "album": "SOS",
        "ano": "2022",
        "reproducoes": "1.4 bi",
        "streams": 1400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/328d68300e654b21831b261e413780e0/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Good Days",
        "album": "Single",
        "ano": "2020",
        "reproducoes": "1.2 bi",
        "streams": 1200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/8aafccd5fc82acdebc88372bd1bef371/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "The Weekend",
        "album": "CTRL",
        "ano": "2017",
        "reproducoes": "980 mi",
        "streams": 980000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/a1a3326c5d9176c763fc3fd847b86681/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "SOS",
        "ano": "2022",
        "faixas": "23 faixas",
        "reproducoes": "4.8 bi",
        "streams": 4800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/328d68300e654b21831b261e413780e0/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "CTRL",
        "ano": "2017",
        "faixas": "14 faixas",
        "reproducoes": "2.4 bi",
        "streams": 2400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/a1a3326c5d9176c763fc3fd847b86681/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "daft-punk",
    "nome": "Daft Punk",
    "categoria": "Eletronico e EDM",
    "genero": "French House / Electronic / Disco",
    "origem": "Paris, Franca",
    "periodoAtivo": "1993 - 2021",
    "ouvintesMensais": "18.9 mi",
    "ouvintesMensaisNum": 18900000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/638e69b9caaf9f9f3f8826febea7b543/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Daft Punk com seus capacetes iconicos",
    "resumo": "A dupla francesa que definiu a musica eletronica moderna e criou alguns dos maiores classicos da historia.",
    "biografia": [
      "Thomas Bangalter e Guy-Manuel de Homem-Christo criaram uma das identidades mais reconheciveis da musica com seus capacetes roboticos.",
      "'Random Access Memories' (2013) ganhou o Grammy de Album do Ano. 'Get Lucky' se tornou um dos maiores hits do seculo XXI."
    ],
    "citacao": "Around the World.",
    "musicas": [
      {
        "titulo": "Get Lucky feat. Pharrell Williams",
        "album": "Random Access Memories",
        "ano": "2013",
        "reproducoes": "2.1 bi",
        "streams": 2100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/bc49adb87758e0c8c4e508a9c5cce85d/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "One More Time",
        "album": "Discovery",
        "ano": "2000",
        "reproducoes": "1.8 bi",
        "streams": 1800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/5718f7c81c27e0b2417e2a4c45224f8a/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Around the World",
        "album": "Homework",
        "ano": "1997",
        "reproducoes": "1.4 bi",
        "streams": 1400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b870579c8650cd59b1cce656dde2ef17/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Harder Better Faster Stronger",
        "album": "Discovery",
        "ano": "2001",
        "reproducoes": "1.2 bi",
        "streams": 1200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/5718f7c81c27e0b2417e2a4c45224f8a/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Random Access Memories",
        "ano": "2013",
        "faixas": "13 faixas",
        "reproducoes": "3.8 bi",
        "streams": 3800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/311bba0fc112d15f72c8b5a65f0456c1/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Discovery",
        "ano": "2001",
        "faixas": "14 faixas",
        "reproducoes": "3.1 bi",
        "streams": 3100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/5718f7c81c27e0b2417e2a4c45224f8a/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Homework",
        "ano": "1997",
        "faixas": "16 faixas",
        "reproducoes": "2.4 bi",
        "streams": 2400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b870579c8650cd59b1cce656dde2ef17/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "alok",
    "nome": "Alok",
    "categoria": "Eletronico e EDM",
    "genero": "Electronic / House / Dance",
    "origem": "Goiania, GO, Brasil",
    "periodoAtivo": "2010 - presente",
    "ouvintesMensais": "26.4 mi",
    "ouvintesMensaisNum": 26400000,
    "foto": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Alok_Tomorrowland_Winter_2025.jpg/1280px-Alok_Tomorrowland_Winter_2025.jpg",
    "legendaFoto": "Alok em performance no Ultra Music Festival",
    "resumo": "O DJ brasileiro mais famoso do mundo, Top 5 global pelo ranking DJ Mag por multiplos anos.",
    "biografia": [
      "Alok Petrillo cresceu em uma familia de DJs e se tornou o artista brasileiro com mais ouvintes mensais no Spotify.",
      "Reconhecido no Ultra Music Festival, Tomorrowland e Coachella, colocou o Brasil no topo da musica eletronica mundial."
    ],
    "citacao": "Musica une pessoas que nunca se encontraram.",
    "musicas": [
      {
        "titulo": "Hear Me Now",
        "album": "Single",
        "ano": "2016",
        "reproducoes": "810 mi",
        "streams": 810000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/666f254b772127dd8b15954d4f52af16/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Never Let Me Go",
        "album": "Single",
        "ano": "2019",
        "reproducoes": "650 mi",
        "streams": 650000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/33af72cf5d034401a550047993904f26/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "On and On com Zeeba e Nico e Vinz",
        "album": "Single",
        "ano": "2017",
        "reproducoes": "540 mi",
        "streams": 540000000,
        "capa": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "albuns": [
      {
        "titulo": "BURST",
        "ano": "2020",
        "faixas": "14 faixas",
        "reproducoes": "1.2 bi",
        "streams": 1200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/85eef6762085ea1d82dd05a817ec3503/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "david-guetta",
    "nome": "David Guetta",
    "categoria": "Eletronico e EDM",
    "genero": "Electronic / House / EDM",
    "origem": "Paris, Franca",
    "periodoAtivo": "1988 - presente",
    "ouvintesMensais": "52.4 mi",
    "ouvintesMensaisNum": 52400000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/2d527fa03e106ed82a28f161694278d3/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "David Guetta em Ibiza",
    "resumo": "O DJ mais famoso do mundo por multiplos anos, pioneiro da fusao entre EDM e pop.",
    "biografia": [
      "Pierre David Guetta iniciou como DJ em Paris nos anos 80 e se tornou o maior nome da fusao entre musica eletronica e pop mainstream.",
      "Colaboracoes com Sia, Akon, Rihanna e Nicki Minaj geraram alguns dos maiores hits da decada de 2010."
    ],
    "citacao": "I live for the music.",
    "musicas": [
      {
        "titulo": "Titanium feat. Sia",
        "album": "Nothing but the Beat",
        "ano": "2011",
        "reproducoes": "2.1 bi",
        "streams": 2100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/52330286cb5008805253fd77c7111d3f/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Without You feat. Usher",
        "album": "Nothing but the Beat",
        "ano": "2011",
        "reproducoes": "1.6 bi",
        "streams": 1600000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/52330286cb5008805253fd77c7111d3f/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "When Love Takes Over feat. Kelly Rowland",
        "album": "One Love",
        "ano": "2009",
        "reproducoes": "1.2 bi",
        "streams": 1200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/ee1ea209237b95cf27a1427ac5ecdec0/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Nothing but the Beat",
        "ano": "2011",
        "faixas": "17 faixas",
        "reproducoes": "3.8 bi",
        "streams": 3800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/52330286cb5008805253fd77c7111d3f/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "One Love",
        "ano": "2009",
        "faixas": "12 faixas",
        "reproducoes": "2.4 bi",
        "streams": 2400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/c335e48e42697df84efaac76fc2538dc/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "bad-bunny",
    "nome": "Bad Bunny",
    "categoria": "Reggaeton e Trap Latino",
    "genero": "Reggaeton / Trap Latino / Latin Pop",
    "origem": "Vega Baja, Porto Rico",
    "periodoAtivo": "2016 - presente",
    "ouvintesMensais": "94.5 mi",
    "ouvintesMensaisNum": 94500000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/044a3f315b041864887a8dd8709e6926/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Bad Bunny no palco",
    "resumo": "O artista mais ouvido do Spotify por tres anos consecutivos (2020, 2021 e 2022).",
    "biografia": [
      "Benito Antonio Martinez Ocasio revolucionou o reggaeton com estetica androgina, letras diretas e ritmos do trap latino.",
      "Primeiro artista de lingua nao-inglesa a ser o mais ouvido do Spotify. 'Un Verano Sin Ti' (2022) foi o album mais ouvido do ano."
    ],
    "citacao": "Yo perreo sola.",
    "musicas": [
      {
        "titulo": "DAKITI com Jhay Cortez",
        "album": "El Ultimo Tour Del Mundo",
        "ano": "2020",
        "reproducoes": "2.1 bi",
        "streams": 2100000000,
        "capa": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80"
      },
      {
        "titulo": "Titi Me Pregunto",
        "album": "Un Verano Sin Ti",
        "ano": "2022",
        "reproducoes": "1.8 bi",
        "streams": 1800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b29d1070377b784384c2456093f96a66/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Me Porto Bonito",
        "album": "Un Verano Sin Ti",
        "ano": "2022",
        "reproducoes": "1.6 bi",
        "streams": 1600000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b29d1070377b784384c2456093f96a66/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Moscow Mule",
        "album": "Un Verano Sin Ti",
        "ano": "2022",
        "reproducoes": "1.4 bi",
        "streams": 1400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b29d1070377b784384c2456093f96a66/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Un Verano Sin Ti",
        "ano": "2022",
        "faixas": "23 faixas",
        "reproducoes": "9.1 bi",
        "streams": 9100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/b29d1070377b784384c2456093f96a66/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "El Ultimo Tour Del Mundo",
        "ano": "2020",
        "faixas": "16 faixas",
        "reproducoes": "5.8 bi",
        "streams": 5800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/6ea80078f0df08737a7471f3c4cf2afa/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "YHLQMDLG",
        "ano": "2020",
        "faixas": "20 faixas",
        "reproducoes": "5.2 bi",
        "streams": 5200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/0a6f32569d4785c5ef82f581086f4302/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "j-balvin",
    "nome": "J Balvin",
    "categoria": "Reggaeton e Trap Latino",
    "genero": "Reggaeton / Urban Latino",
    "origem": "Medellin, Colombia",
    "periodoAtivo": "2004 - presente",
    "ouvintesMensais": "62.4 mi",
    "ouvintesMensaisNum": 62400000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/325eaa46bc25052d0e3d549d60cc8225/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "J Balvin no Coachella",
    "resumo": "O colombiano que levou o reggaeton para o topo das paradas mundiais.",
    "biografia": [
      "Jose Alvaro Osorio Balvin comecou com dificuldades financeiras em Medellin e se tornou um dos artistas latinos mais conhecidos do mundo.",
      "Colaborou com artistas como Beyonce, Cardi B e BTS, e seus albuns coloridos viraram referencia do pop latino."
    ],
    "citacao": "La familia es primero.",
    "musicas": [
      {
        "titulo": "Mi Gente feat. Willy William",
        "album": "Vibras",
        "ano": "2017",
        "reproducoes": "2.4 bi",
        "streams": 2400000000,
        "capa": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80"
      },
      {
        "titulo": "Con Altura feat. Rosalia",
        "album": "Oasis",
        "ano": "2019",
        "reproducoes": "1.8 bi",
        "streams": 1800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/0a6b457530fcf0bfa2eff233cb584e29/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Safari",
        "album": "Energia",
        "ano": "2016",
        "reproducoes": "1.6 bi",
        "streams": 1600000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/38b80954bf64148690fc6047582e98c1/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Colores",
        "ano": "2020",
        "faixas": "12 faixas",
        "reproducoes": "4.2 bi",
        "streams": 4200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/38b80954bf64148690fc6047582e98c1/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Vibras",
        "ano": "2018",
        "faixas": "14 faixas",
        "reproducoes": "3.8 bi",
        "streams": 3800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/5792230036366047e5c5b16749a52048/1000x1000-000000-80-0-0.jpg"
      }
    ]
  },
  {
    "id": "daddy-yankee",
    "nome": "Daddy Yankee",
    "categoria": "Reggaeton e Trap Latino",
    "genero": "Reggaeton / Dancehall Latino",
    "origem": "San Juan, Porto Rico",
    "periodoAtivo": "1994 - 2022",
    "ouvintesMensais": "44.8 mi",
    "ouvintesMensaisNum": 44800000,
    "foto": "https://cdn-images.dzcdn.net/images/artist/a4f77d40d68cf544e74883b2bd904fce/1000x1000-000000-80-0-0.jpg",
    "legendaFoto": "Daddy Yankee em show de despedida",
    "resumo": "O Rei do Reggaeton, criador do genero e responsavel pela sua popularizacao mundial.",
    "biografia": [
      "Ramon Luis Ayala Rodriguez e considerado o criador e maior embaixador do reggaeton no mundo.",
      "'Gasolina' (2004) e 'Despacito' (2017, com Luis Fonsi) se tornaram os reggaetons mais ouvidos de toda a historia."
    ],
    "citacao": "Llegamos al champin.",
    "musicas": [
      {
        "titulo": "Despacito com Luis Fonsi",
        "album": "Single",
        "ano": "2017",
        "reproducoes": "8.1 bi",
        "streams": 8100000000,
        "capa": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80"
      },
      {
        "titulo": "Con Calma com Snow",
        "album": "Single",
        "ano": "2019",
        "reproducoes": "1.8 bi",
        "streams": 1800000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/25a6edea15aa8e093b90773ac06ceeaa/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Gasolina",
        "album": "Barrio Fino",
        "ano": "2004",
        "reproducoes": "1.4 bi",
        "streams": 1400000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/d386e42d5c4dfb603e958371b79869f5/1000x1000-000000-80-0-0.jpg"
      }
    ],
    "albuns": [
      {
        "titulo": "Barrio Fino",
        "ano": "2004",
        "faixas": "17 faixas",
        "reproducoes": "3.2 bi",
        "streams": 3200000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/d386e42d5c4dfb603e958371b79869f5/1000x1000-000000-80-0-0.jpg"
      },
      {
        "titulo": "Legendaddy",
        "ano": "2022",
        "faixas": "19 faixas",
        "reproducoes": "2.1 bi",
        "streams": 2100000000,
        "capa": "https://cdn-images.dzcdn.net/images/cover/8adaf7c5ebd0c2feb49c04dbe114c58c/1000x1000-000000-80-0-0.jpg"
      }
    ]
  }
];

export const listaDeArtistas: Artista[] = bancoDeDadosArtistas.map((artista) => ({
  ...artista,
  albuns: [...artista.albuns].sort((a, b) => b.streams - a.streams),
  musicas: [...artista.musicas].sort((a, b) => b.streams - a.streams),
}));
