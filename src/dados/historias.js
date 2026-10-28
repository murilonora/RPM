// Acervo de matérias da seção "Histórias em destaque". A cada visita o
// carrossel sorteia algumas delas. `album` precisa bater com o título do álbum
// em dadosMusicais (é dele que vem a capa usada no rótulo do vinil).
export const ACERVO_HISTORIAS = [
  {
    artistaId: "racionais-mcs",
    album: "Sobrevivendo no Inferno",
    vertente: "Rap nacional",
    manchete: "Sobrevivendo no Inferno, a bíblia do rap brasileiro",
    linhaFina:
      "Da periferia de São Paulo para a lista de leituras da Unicamp: a trajetória, as letras e o impacto do grupo que deu voz à quebrada.",
    fato: "1,5 milhão de cópias vendidas de forma independente",
    leitura: 10,
  },
  {
    artistaId: "sabotage",
    album: "Rap e Compromisso",
    vertente: "Rap nacional",
    manchete: "O Maestro do Canão e o disco que bastou",
    linhaFina:
      "Um único álbum lançado em vida foi suficiente para mudar a métrica, o vocabulário e o sotaque do rap paulistano.",
    fato: "Rap é Compromisso, de 2000, o único disco lançado em vida",
    leitura: 8,
  },
  {
    artistaId: "emicida",
    album: "AmarElo",
    vertente: "Rap e MPB",
    manchete: "AmarElo: quando o rap pediu licença ao samba",
    linhaFina:
      "Do Theatro Municipal ao documentário, o disco que costurou Belchior, Pabllo Vittar e Zeca Pagodinho numa mesma ideia de Brasil.",
    fato: "O show no Theatro Municipal virou documentário em 2020",
    leitura: 9,
  },
  {
    artistaId: "criolo",
    album: "Nó na Orelha",
    vertente: "Rap nacional",
    manchete: "Nó na Orelha e a São Paulo sem amor",
    linhaFina:
      "Rap, samba, afrobeat e brega no mesmo disco: Criolo saiu do Grajaú e fez a cidade inteira cantar que não existe amor em SP.",
    fato: "Lançado para download gratuito em 2011",
    leitura: 7,
  },
  {
    artistaId: "djonga",
    album: "Heresia",
    vertente: "Rap nacional",
    manchete: "Heresia: o primeiro capítulo de um ritual anual",
    linhaFina:
      "A estreia que colocou Belo Horizonte no mapa do rap e inaugurou o hábito de Djonga entregar um disco novo todo mês de março.",
    fato: "Desde 2017, um álbum novo a cada 13 de março",
    leitura: 7,
  },
  {
    artistaId: "chico-buarque",
    album: "Construcao",
    vertente: "MPB",
    manchete: "Construção: um operário em versos proparoxítonos",
    linhaFina:
      "Em plena ditadura, Chico Buarque fechou cada verso numa proparoxítona e transformou a rotina de um trabalhador num retrato duro do país.",
    fato: "Lançado em 1971, no auge da censura",
    leitura: 7,
  },
  {
    artistaId: "caetano-veloso",
    album: "Tropicalia ou Panis et Circencis",
    vertente: "MPB",
    manchete: "Tropicália: o disco-manifesto que misturou tudo",
    linhaFina:
      "Guitarra elétrica, bolero, ruído e poesia concreta num só LP, gravado em grupo para provar que a música brasileira podia engolir o mundo.",
    fato: "Com Gil, Gal, Os Mutantes, Tom Zé e Nara Leão",
    leitura: 9,
  },
  {
    artistaId: "gilberto-gil",
    album: "Refazenda",
    vertente: "MPB",
    manchete: "Refazenda e a volta de Gil às raízes",
    linhaFina:
      "Depois do exílio, Gilberto Gil olhou para o sertão e para o baião e abriu a trilogia que ainda passaria por Refavela e Realce.",
    fato: "Primeiro disco da trilogia Re, de 1975",
    leitura: 6,
  },
  {
    artistaId: "marilia-mendonca",
    album: "Festa das Patroas",
    vertente: "Sertanejo",
    manchete: "Festa das Patroas e o feminejo no comando",
    linhaFina:
      "A Rainha da Sofrência dividiu o palco com Maiara & Maraisa num projeto que celebrou a virada das mulheres no sertanejo.",
    fato: "Gravado com Maiara & Maraisa em 2021",
    leitura: 6,
  },
  {
    artistaId: "legiao-urbana",
    album: "Dois",
    vertente: "Rock nacional",
    manchete: "Dois: o disco que fez Brasília falar pelo país",
    linhaFina:
      "Eduardo e Mônica, Tempo Perdido e Índios saíram do mesmo vinil de 1986 e viraram a trilha de uma geração inteira.",
    fato: "Três clássicos da banda no mesmo disco",
    leitura: 8,
  },
  {
    artistaId: "cazuza",
    album: "Ideologia",
    vertente: "Rock nacional",
    manchete: "Ideologia: Cazuza mostra a cara do Brasil",
    linhaFina:
      "Já doente, Cazuza transformou a urgência em letras afiadas e entregou dois hinos de uma vez: Ideologia e Brasil.",
    fato: "Brasil, mostra a tua cara nasceu neste disco de 1988",
    leitura: 7,
  },
  {
    artistaId: "titas",
    album: "Cabeca Dinossauro",
    vertente: "Rock nacional",
    manchete: "Cabeça Dinossauro, o punk que desafiou a ordem",
    linhaFina:
      "Os Titãs trocaram o pop pela raiva e apontaram contra polícia, igreja e família no disco mais barulhento da década.",
    fato: "Polícia e Bichos Escrotos no mesmo LP de 1986",
    leitura: 7,
  },
  {
    artistaId: "sepultura",
    album: "Roots",
    vertente: "Metal",
    manchete: "Roots: o metal mineiro que foi ouvir os Xavante",
    linhaFina:
      "O Sepultura misturou peso, percussão brasileira e cantos indígenas e mostrou ao mundo um metal que só podia ter nascido aqui.",
    fato: "Parte do disco foi gravada com o povo Xavante",
    leitura: 8,
  },
  {
    artistaId: "kendrick-lamar",
    album: "DAMN.",
    vertente: "Rap americano",
    manchete: "DAMN.: o rap que levou o Pulitzer",
    linhaFina:
      "Fé, fama e violência em Compton num disco que pode ser ouvido do começo ao fim ou ao contrário, e que mudou a história de um prêmio.",
    fato: "Primeiro álbum fora do erudito e do jazz a vencer o Pulitzer",
    leitura: 9,
  },
  {
    artistaId: "nas",
    album: "Illmatic",
    vertente: "Rap americano",
    manchete: "Illmatic: Queensbridge em quarenta minutos",
    linhaFina:
      "Aos 20 anos, Nas transformou o conjunto habitacional onde cresceu em poesia e criou o padrão pelo qual todo disco de rap seria medido.",
    fato: "Apenas dez faixas, lançadas em 1994",
    leitura: 8,
  },
  {
    artistaId: "2pac",
    album: "Me Against the World",
    vertente: "Rap americano",
    manchete: "Me Against the World, o desabafo atrás das grades",
    linhaFina:
      "O disco mais introspectivo de 2Pac fala de mãe, medo e morte, e chegou ao topo das paradas enquanto ele cumpria pena.",
    fato: "Estreou em 1º lugar com o rapper na prisão",
    leitura: 8,
  },
  {
    artistaId: "notorious-big",
    album: "Ready to Die",
    vertente: "Rap americano",
    manchete: "Ready to Die: do Brooklyn para o topo",
    linhaFina:
      "Biggie contou a vida de um jovem vendedor de rua com humor e fatalismo e devolveu a Nova York o trono do rap.",
    fato: "A estreia da Bad Boy Records, em 1994",
    leitura: 7,
  },
  {
    artistaId: "michael-jackson",
    album: "Thriller",
    vertente: "Pop",
    manchete: "Thriller: o disco que redefiniu o pop",
    linhaFina:
      "Funk, rock, disco e videoclipes de cinema: Michael Jackson e Quincy Jones criaram o álbum que derrubou barreiras na MTV.",
    fato: "O álbum mais vendido de todos os tempos",
    leitura: 9,
  },
  {
    artistaId: "nirvana",
    album: "Nevermind",
    vertente: "Rock",
    manchete: "Nevermind e o grunge que tomou o mundo",
    linhaFina:
      "Um disco feito em Seattle com distorção e melodia que levou o rock alternativo das garagens direto para o primeiro lugar.",
    fato: "Tirou Michael Jackson do topo da Billboard em 1992",
    leitura: 8,
  },
  {
    artistaId: "metallica",
    album: "Master of Puppets",
    vertente: "Metal",
    manchete: "Master of Puppets e o thrash como arte",
    linhaFina:
      "Velocidade, faixas longas e arranjos quase sinfônicos fizeram do terceiro disco do Metallica o manual do metal moderno.",
    fato: "Primeiro disco de metal no registro da Biblioteca do Congresso dos EUA",
    leitura: 8,
  },
  {
    artistaId: "daft-punk",
    album: "Random Access Memories",
    vertente: "Eletrônica",
    manchete: "Random Access Memories: robôs tocando à mão",
    linhaFina:
      "A dupla francesa trocou samplers por músicos de estúdio, chamou Nile Rodgers e Giorgio Moroder e fez a disco music voltar ao rádio.",
    fato: "Álbum do Ano no Grammy de 2014",
    leitura: 7,
  },
  {
    artistaId: "frank-ocean",
    album: "Blonde",
    vertente: "R&B",
    manchete: "Blonde: o silêncio que virou obra-prima",
    linhaFina:
      "Depois de quatro anos sumido, Frank Ocean voltou com um disco minimalista, cheio de vozes alteradas e memórias de juventude.",
    fato: "Lançado de forma independente em 2016",
    leitura: 7,
  },
  {
    artistaId: "bad-bunny",
    album: "Un Verano Sin Ti",
    vertente: "Reggaeton",
    manchete: "Un Verano Sin Ti e o verão que falou espanhol",
    linhaFina:
      "Reggaeton, dembow e indie num disco de praia que dominou as paradas do mundo inteiro sem uma linha em inglês.",
    fato: "Primeiro álbum todo em espanhol indicado a Álbum do Ano no Grammy",
    leitura: 7,
  },
  {
    artistaId: "kanye-west",
    album: "My Beautiful Dark Twisted Fantasy",
    vertente: "Rap americano",
    manchete: "My Beautiful Dark Twisted Fantasy e o exílio no Havaí",
    linhaFina:
      "Depois de um ano fora dos holofotes, Kanye levou dezenas de músicos e produtores para um estúdio em Honolulu e voltou com o disco mais ambicioso da carreira.",
    fato: "Primeira nota 10 da Pitchfork para um disco inédito desde 2002",
    leitura: 8,
  },
];
