import React, { useState, useEffect, useMemo } from 'react';
import {
  Search, Sun, Moon, User, Menu, X, ChevronRight, Clock, Share2,
  Bookmark, TrendingUp, Eye, FileText, Users, Plus, Edit3, Trash2,
  ExternalLink, Database, CheckCircle2, LayoutDashboard, Send
} from 'lucide-react';

// ============================================================================
// 1. CONFIGURAÇÃO EDITORIAL, TIPOGRAFIA & PALETA MERIDIANO
// ============================================================================
const EDITORIAS = [
  'Política', 'Brasil', 'Mundo', 'Economia', 'Tecnologia',
  'Esportes', 'Saúde', 'Educação', 'Entretenimento', 'Cultura', 'Ciência'
];

const INITIAL_AUTHORS = [
  {
    id: 'aut-1',
    name: 'Helena Vasconcelos',
    role: 'Editora-Chefe de Política',
    bio: 'Jornalista política com 18 anos de cobertura em Brasília, especialista em instituições republicanas e reforma fiscal.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    columnTitle: 'Crônica do Planalto'
  },
  {
    id: 'aut-2',
    name: 'Rafael Montenegro',
    role: 'Colunista de Economia & Mercados',
    bio: 'Economista e analista financeiro. Acompanha política monetária, câmbio e infraestrutura global.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    columnTitle: 'Bússola Econômica'
  },
  {
    id: 'aut-3',
    name: 'Clara Albuquerque',
    role: 'Correspondente Internacional',
    bio: 'Baseada em Londres e Bruxelas, cobre geopolítica europeia, diplomacia multilateral e transição energética.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    columnTitle: 'Meridiano Global'
  },
  {
    id: 'aut-4',
    name: 'Lucas Ferreira Lima',
    role: 'Editor de Tecnologia & Ciência',
    bio: 'Especialista em inteligência artificial, semicondutores, exploração espacial e políticas digitais.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    columnTitle: 'Fronteira Digital'
  },
  {
    id: 'aut-5',
    name: 'Beatriz Nogueira',
    role: 'Repórter Especial de Brasil & Saúde',
    bio: 'Dedica-se a reportagens investigativas sobre saúde pública, urbanismo e educação básica no país.',
    avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=200&q=80',
    columnTitle: 'Retratos do País'
  },
  {
    id: 'aut-6',
    name: 'Thiago Sampaio',
    role: 'Crítico de Cultura & Esportes',
    bio: 'Ensaísta cultural, crítico de cinema e cronista esportivo com foco na gestão do futebol moderno.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    columnTitle: 'Observatório Cultural'
  }
];

// ============================================================================
// 2. ACERVO INICIAL DE NOTÍCIAS (20 MATÉRIAS COMPLETAS EM TODAS AS 11 EDITORIAS)
// ============================================================================
const INITIAL_ARTICLES = [
  {
    id: 'art-1',
    slug: 'congresso-avanca-marco-regulatorio-inteligencia-artificial-soberania-dados',
    chapeu: 'MARCO DIGITAL',
    category: 'Política',
    title: 'Congresso avança na votação do marco regulatório de IA com foco em soberania de dados e direitos autorais',
    subtitle: 'Texto estabelece regras rígidas para sistemas de alto risco na administração pública e cria fundo nacional para infraestrutura de computação.',
    authorId: 'aut-1',
    publishedAt: '12 Nov 2026 • 14:15',
    timestamp: '2026-11-12T14:15:00',
    readTime: '6 min de leitura',
    views: 48920,
    status: 'published',
    placement: 'hero',
    breaking: true,
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'Plenário do Congresso Nacional durante sessão de debates sobre a regulamentação tecnológica e transparência algorítmica.',
    imageCredit: 'Foto: Agência Meridiano / Arquivo Brasília',
    content: [
      'BRASÍLIA — Após oito meses de audiências públicas com cientistas, representantes da indústria tecnológica e entidades da sociedade civil, a comissão especial do Congresso Nacional aprovou o relatório final do novo Marco Regulatório da Inteligência Artificial. O texto busca equilibrar o incentivo à inovação doméstica com garantias constitucionais de privacidade, transparência algorítmica e remuneração por direitos autorais.',
      'O ponto central da proposta divide os sistemas automatizados em níveis de risco. Aplicações utilizadas em diagnósticos médicos, concessão de crédito, segurança pública e processos seletivos passam a exigir auditorias independentes periódicas e explicabilidade clara sobre os critérios adotados pelas máquinas.',
      '“Não podemos permitir que decisões que afetam diretamente a vida civil e econômica dos cidadãos sejam tomadas por caixas-pretas opacas sem supervisão humana qualificada”, afirmou o relator da matéria durante a leitura do parecer.',
      'Outro eixo estratégico do projeto é o incentivo à soberania digital. O texto cria mecanismos tributários para a instalação de centros de processamento de dados alimentados por energia limpa no território nacional, reduzindo a dependência de servidores estrangeiros para modelos treinados em língua portuguesa.',
      'No campo da propriedade intelectual, veículos jornalísticos, editoras, músicos e produtores audiovisuais terão o direito de negociar licenciamento prévio sempre que suas obras forem utilizadas no treinamento comercial de modelos generativos. O projeto segue agora para votação simbólica e nominal no plenário na próxima semana.'
    ],
    quote: '“A regulação inteligente não freia o progresso tecnológico; ela constrói a confiança institucional necessária para que a sociedade adote novas ferramentas com segurança.”'
  },
  {
    id: 'art-2',
    slug: 'banco-central-sinaliza-cautela-juros-diante-resiliencia-atividade-economica',
    chapeu: 'POLÍTICA MONETÁRIA',
    category: 'Economia',
    title: 'Comitê de Política Monetária reforça vigilância inflacionária diante da resiliência do mercado de trabalho',
    subtitle: 'Ata divulgada nesta quinta-feira aponta que trajetória fiscal e câmbio global exigem serenidade antes de novos cortes na taxa básica.',
    authorId: 'aut-2',
    publishedAt: '12 Nov 2026 • 13:40',
    timestamp: '2026-11-12T13:40:00',
    readTime: '5 min de leitura',
    views: 39410,
    status: 'published',
    placement: 'secondary',
    breaking: true,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=85',
    imageCaption: 'Painéis de negociação financeira refletem a reação dos investidores após a publicação da ata do Comitê de Política Monetária.',
    imageCredit: 'Foto: Ricardo Mendes / Meridiano Economia',
    content: [
      'SÃO PAULO — A ata da última reunião do Comitê de Política Monetária trouxe um tom mais técnico e cauteloso do que o antecipado por parte dos analistas do mercado financeiro. O colegiado destacou que o dinamismo do consumo das famílias e a taxa de desemprego em mínimas históricas mantêm pressionada a inflação do setor de serviços.',
      'Embora os índices cheios de preços ao consumidor permaneçam dentro do intervalo de tolerância da meta anual, os diretores alertaram para a desancoragem parcial das expectativas de médio prazo. O cenário externo, marcado por juros elevados nas principais economias desenvolvidas, também reduz a margem de manobra para movimentos bruscos.',
      'Para economistas ouvidos pelo MERIDIANO, a mensagem sinaliza um ciclo de distensão monetária mais gradual ao longo dos próximos trimestres, condicionado à execução rigorosa do arcabouço fiscal.',
      'Na bolsa de valores, os contratos de juros futuros registraram leve ajuste para cima nos vencimentos intermediários, enquanto o dólar operou próximo à estabilidade, cotado a R$ 5,42 no meio da tarde.'
    ],
    quote: '“A credibilidade monetária é construída na consistência entre o diagnóstico técnico e a firmeza na condução dos instrumentos de estabilidade.”'
  },
  {
    id: 'art-3',
    slug: 'acordo-transicao-energetica-cupula-atlantica-investimentos-hidrogenio-verde',
    chapeu: 'GEOPOLÍTICA & CLIMA',
    category: 'Mundo',
    title: 'Cúpula Atlântica sela fundo de US$ 45 bilhões para corredores de hidrogênio verde e redes elétricas inteligentes',
    subtitle: 'Parceria entre países da América do Sul e União Europeia busca descarbonizar cadeias industriais pesadas até 2035.',
    authorId: 'aut-3',
    publishedAt: '12 Nov 2026 • 12:50',
    timestamp: '2026-11-12T12:50:00',
    readTime: '5 min de leitura',
    views: 31280,
    status: 'published',
    placement: 'secondary',
    breaking: true,
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1000&q=85',
    imageCaption: 'Complexo eólico costeiro integrado a plantas de eletrólise para produção de combustível limpo em escala industrial.',
    imageCredit: 'Foto: European Energy Press / Divulgação',
    content: [
      'BRUXELAS — Ministros de Energia e Relações Exteriores de vinte e quatro nações assinaram nesta quinta-feira um tratado operacional que destina US$ 45 bilhões em garantias soberanas e financiamento misto para projetos de hidrogênio verde e modernização portuária.',
      'O acordo estabelece padrões internacionais únicos de certificação de emissões, eliminando barreiras alfandegárias para aço verde, fertilizantes limpos e combustíveis sintéticos de aviação produzidos no Atlântico Sul.',
      'Especialistas em geopolítica energética avaliam que o pacto inaugura uma nova geografia industrial, na qual regiões com abundância de energia solar e eólica deixam de ser meras exportadoras de commodities brutas para se tornarem polos de manufatura limpa.',
      'Os primeiros leilões conjuntos de infraestrutura portuária estão previstos para o primeiro semestre do próximo ano, com participação de bancos multilaterais de desenvolvimento.'
    ],
    quote: '“Estamos redesenhando o mapa industrial do século XXI sobre pilares de energia renovável e cooperação atlântica.”'
  },
  {
    id: 'art-4',
    slug: 'nova-geracao-chips-fotonicos-reduz-consumo-energetico-data-centers',
    chapeu: 'SEMICONDUTORES',
    category: 'Tecnologia',
    title: 'Nova arquitetura de chips fotônicos reduz em 68% o consumo energético de grandes centros de dados',
    subtitle: 'Substituição de trilhas elétricas por pulsos de luz resolve o gargalo térmico que limitava supercomputadores modernos.',
    authorId: 'aut-4',
    publishedAt: '12 Nov 2026 • 12:05',
    timestamp: '2026-11-12T12:05:00',
    readTime: '4 min de leitura',
    views: 28640,
    status: 'published',
    placement: 'secondary',
    breaking: false,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85',
    imageCaption: 'Detalhe de wafer de silício integrado com guias de onda ópticos utilizados na transmissão de dados em alta velocidade.',
    imageCredit: 'Foto: Laboratório de Fotônica Integrada',
    content: [
      'ZURIQUE — Um consórcio internacional de engenharia eletrônica apresentou a primeira linha comercial de processadores híbridos fotônicos capazes de transferir terabits de informação por segundo utilizando pulsos de laser em vez de elétrons.',
      'Nos chips convencionais de silício, a resistência elétrica gera calor intenso à medida que os transistores se aproximam da escala subnanométrica, exigindo sistemas monumentais de refrigeração líquida.',
      'Ao integrar guias de onda ópticos diretamente na placa do processador, os pesquisadores eliminaram grande parte da dissipação térmica e aumentaram em quatro vezes a largura de banda entre módulos de memória.',
      'Analistas do setor preveem que a tecnologia será decisiva para viabilizar a expansão sustentável da computação científica e da inteligência artificial sem sobrecarregar as redes elétricas urbanas.'
    ],
    quote: '“Mover fótons em vez de elétrons dentro do silício representa a mudança mais profunda na computação desde o circuito integrado.”'
  },
  {
    id: 'art-5',
    slug: 'expansao-ferroviaria-corredor-centro-oeste-reduz-custo-frete-graos',
    chapeu: 'INFRAESTRUTURA',
    category: 'Brasil',
    title: 'Conclusão de novo trecho ferroviário no Centro-Oeste promete cortar em 28% o custo logístico de exportação',
    subtitle: 'Obra conecta polos agrícolas diretamente aos terminais portuários do Arco Norte, retirando milhares de caminhões das rodovias.',
    authorId: 'aut-5',
    publishedAt: '12 Nov 2026 • 11:30',
    timestamp: '2026-11-12T11:30:00',
    readTime: '5 min de leitura',
    views: 24190,
    status: 'published',
    placement: 'feed',
    breaking: false,
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1000&q=85',
    imageCaption: 'Composição ferroviária de carga pesada operando no novo corredor logístico integrado ao Arco Norte.',
    imageCredit: 'Foto: Infraestrutura Nacional / Divulgação',
    content: [
      'CUIABÁ — A entrega operacional de 420 quilômetros de nova malha ferroviária no coração produtivo do Centro-Oeste marca uma inflexão histórica na matriz de transportes brasileira, historicamente dependente do modal rodoviário.',
      'Com capacidade para composições de até 120 vagões, o corredor intermodal permitirá o escoamento contínuo de grãos, minérios e manufaturados rumo aos portos da região Norte, reduzindo em até quatro dias o tempo de viagem marítima para a Europa e a Ásia.',
      'Além do ganho de competitividade para o agronegócio e a indústria, estudos ambientais estimam uma queda anual de 1,4 milhão de toneladas nas emissões de gás carbônico e redução significativa nos índices de acidentes nas rodovias federais.'
    ],
    quote: '“Cada quilômetro de trilho entregue transforma a geografia econômica do interior e aproxima o Brasil dos padrões logísticos globais.”'
  },
  {
    id: 'art-6',
    slug: 'terapia-genica-personalizada-apresenta-remissao-duradoura-ensaios-clinicos',
    chapeu: 'MEDICINA DE PRECISÃO',
    category: 'Saúde',
    title: 'Terapia celular de nova geração alcança taxa de remissão de 84% em pacientes com doenças autoimunes graves',
    subtitle: 'Estudo multicêntrico publicado na revista The Lancet demonstra reprogramação segura do sistema imunológico sem imunossupressão contínua.',
    authorId: 'aut-5',
    publishedAt: '12 Nov 2026 • 10:55',
    timestamp: '2026-11-12T10:55:00',
    readTime: '6 min de leitura',
    views: 35700,
    status: 'published',
    placement: 'feed',
    breaking: false,
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1000&q=85',
    imageCaption: 'Pesquisadores analisam culturas celulares em laboratório de terapia avançada e imunologia clínica.',
    imageCredit: 'Foto: Instituto de Pesquisa Biomédica',
    content: [
      'LONDRES — Resultados de fase 3 publicados nesta semana comprovam que uma adaptação da terapia com células CAR-T, originalmente desenvolvida para tumores hematológicos, é capaz de redefinir o sistema imunológico de pacientes com lúpus severo e esclerose sistêmica.',
      'Ao longo de 24 meses de acompanhamento, 84% dos participantes mantiveram remissão clínica completa sem necessidade de corticoides ou medicamentos imunossupressores diários.',
      'Hospitais universitários brasileiros já participam da etapa de transferência tecnológica para produzir o tratamento em laboratórios públicos, o que pode reduzir drasticamente o custo por paciente nos próximos anos.'
    ],
    quote: '“Não estamos apenas controlando sintomas; estamos ensinando o sistema imunológico a reconhecer novamente o próprio organismo.”'
  },
  {
    id: 'art-7',
    slug: 'telescopio-espacial-detecta-assinaturas-atmosfericas-complexas-exoplaneta-rochoso',
    chapeu: 'ASTROFÍSICA',
    category: 'Ciência',
    title: 'Espectrógrafo de alta precisão detecta vapor d’água e dióxido de enxofre na atmosfera de exoplaneta temperado',
    subtitle: 'Descoberta a 48 anos-luz da Terra confirma atividade geológica e abre nova etapa na busca por mundos habitáveis.',
    authorId: 'aut-4',
    publishedAt: '12 Nov 2026 • 10:15',
    timestamp: '2026-11-12T10:15:00',
    readTime: '5 min de leitura',
    views: 27450,
    status: 'published',
    placement: 'feed',
    breaking: false,
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1000&q=85',
    imageCaption: 'Representação espectroscópica de nebulosa e sistemas planetários observados no infravermelho profundo.',
    imageCredit: 'Foto: Observatório Espacial Internacional',
    content: [
      'GENEBRA — Uma equipe internacional de astrofísicos anunciou a caracterização atmosférica mais detalhada já obtida de um planeta rochoso fora do Sistema Solar. Orbitando na zona temperada de uma estrela anã laranja, o mundo apresenta camadas densas de vapor d’água, dióxido de carbono e compostos de enxofre.',
      'A presença simultânea desses gases indica vulcanismo ativo e um ciclo atmosférico dinâmico, fatores considerados fundamentais para a regulação térmica de superfícies planetárias.',
      'Os dados foram obtidos durante doze trânsitos planetários consecutivos, permitindo filtrar com precisão inédita a luz da estrela hospedeira.'
    ],
    quote: '“Pela primeira vez estamos fazendo meteorologia comparada em mundos rochosos situados a dezenas de anos-luz.”'
  },
  {
    id: 'art-8',
    slug: 'selecao-brasileira-define-convocacao-eliminatorias-renovacao-meio-campo',
    chapeu: 'FUTEBOL INTERNACIONAL',
    category: 'Esportes',
    title: 'Comissão técnica aposta em meio-campo versátil e posse de bola para rodada decisiva das Eliminatórias',
    subtitle: 'Treinador destaca maturidade tática da nova geração e confirma esquema com três construtores para os confrontos de novembro.',
    authorId: 'aut-6',
    publishedAt: '12 Nov 2026 • 09:45',
    timestamp: '2026-11-12T09:45:00',
    readTime: '4 min de leitura',
    views: 29830,
    status: 'published',
    placement: 'feed',
    breaking: false,
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=85',
    imageCaption: 'Estádio lotado durante preparação noturna para partida oficial do calendário internacional de seleções.',
    imageCredit: 'Foto: Agência Esportiva Meridiano',
    content: [
      'RIO DE JANEIRO — A preparação da Seleção Brasileira para os dois compromissos decisivos desta Data Fifa evidencia uma mudança clara de filosofia tática. Em vez da transição vertical acelerada, a comissão técnica trabalha a compactação entre linhas e a superioridade numérica no setor central.',
      'Durante os treinos fechados na Granja Comary, o treinador testou formações com volantes de passe refinado e laterais que atuam por dentro na construção ofensiva.',
      'A partida desta sexta-feira terá ingressos esgotados e arbitragem sul-americana.'
    ],
    quote: '“O futebol moderno exige controle emocional e inteligência espacial durante os noventa minutos.”'
  },
  {
    id: 'art-9',
    slug: 'universidades-publicas-ampliam-programas-dupla-titulacao-engenharia-clima',
    chapeu: 'ENSINO SUPERIOR',
    category: 'Educação',
    title: 'Universidades federais lançam rede de dupla titulação em engenharia ambiental e ciência de dados',
    subtitle: 'Iniciativa oferece 3.500 bolsas de intercâmbio acadêmico e laboratórios integrados com institutos europeus e asiáticos.',
    authorId: 'aut-5',
    publishedAt: '12 Nov 2026 • 09:10',
    timestamp: '2026-11-12T09:10:00',
    readTime: '4 min de leitura',
    views: 16420,
    status: 'published',
    placement: 'feed',
    breaking: false,
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=85',
    imageCaption: 'Biblioteca universitária e centro de estudos interdisciplinares onde funcionarão os núcleos de pesquisa.',
    imageCredit: 'Foto: Acervo Universitário / Meridiano',
    content: [
      'SÃO PAULO — Uma aliança envolvendo dezoito universidades públicas brasileiras e doze instituições estrangeiras de ponta anunciou a abertura de editais para cursos com dupla titulação internacional voltados à transição ecológica e modelagem computacional.',
      'Os estudantes cursarão os três primeiros anos no Brasil e realizarão o ciclo final de pesquisa aplicada no exterior, retornando com projetos vinculados a problemas reais de saneamento, energia e biodiversidade.',
      'As inscrições para o primeiro processo seletivo estarão abertas a partir de dezembro.'
    ],
    quote: '“Formar engenheiros e cientistas com visão global e compromisso local é o melhor investimento estrutural de uma nação.”'
  },
  {
    id: 'art-10',
    slug: 'retrospectiva-arquitetura-modernista-latino-americana-abre-museu-arte-moderna',
    chapeu: 'EXPOSIÇÃO',
    category: 'Cultura',
    title: 'Grande retrospectiva reúne 180 maquetes e desenhos originais do modernismo arquitetônico latino-americano',
    subtitle: 'Mostra revela o diálogo entre concreto armado, urbanismo social e paisagismo tropical entre as décadas de 1940 e 1970.',
    authorId: 'aut-6',
    publishedAt: '12 Nov 2026 • 08:40',
    timestamp: '2026-11-12T08:40:00',
    readTime: '5 min de leitura',
    views: 18950,
    status: 'published',
    placement: 'feed',
    breaking: false,
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=85',
    imageCaption: 'Galeria expositiva com luz natural zenital destacando estruturas geométricas e acervo documental.',
    imageCredit: 'Foto: Fundação Cultural / Divulgação',
    content: [
      'SÃO PAULO — Com curadoria colaborativa de historiadores do Brasil, México, Argentina e Venezuela, a exposição “Formas do Futuro: Arquitetura e Cidade na América Latina” ocupa três andares do Museu de Arte Moderna a partir deste sábado.',
      'O acervo inclui plantas originais restauradas, fotografias de época em grande formato e maquetes táteis de conjuntos habitacionais, universidades e pavilhões culturais que redefiniram a paisagem urbana do continente.',
      'A programação paralela contará com ciclos de debates gratuitos sobre preservação do patrimônio moderno e revitalização dos centros históricos.'
    ],
    quote: '“A arquitetura modernista latino-americana provou que o rigor geométrico pode dialogar com a luz tropical e o espaço público democrático.”'
  },
  {
    id: 'art-11',
    slug: 'cinema-independente-nacional-bate-recorde-publico-salas-arte-streaming',
    chapeu: 'AUDIOVISUAL',
    category: 'Entretenimento',
    title: 'Cinema autoral brasileiro vive novo ciclo de ouro com recorde de público e prêmios em festivais internacionais',
    subtitle: 'Produções regionais fora do eixo tradicional conquistam bilheteria e ampliam presença em catálogos globais.',
    authorId: 'aut-6',
    publishedAt: '12 Nov 2026 • 08:05',
    timestamp: '2026-11-12T08:05:00',
    readTime: '4 min de leitura',
    views: 21340,
    status: 'published',
    placement: 'feed',
    breaking: false,
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=85',
    imageCaption: 'Sala de exibição cinematográfica durante mostra competitiva de longas-metragens nacionais.',
    imageCredit: 'Foto: Mostra Internacional de Cinema',
    content: [
      'RECIFE — O cinema brasileiro encerra o ano com números expressivos de público e reconhecimento crítico. Levantamento da agência setorial mostra um crescimento de 42% na frequência às salas de exibição para longas nacionais independentes.',
      'O destaque fica por conta da descentralização produtiva: obras filmadas em Pernambuco, Minas Gerais, Bahia e Rio Grande do Sul lideram as listas de premiações internacionais e garantiram distribuição simultânea em mais de trinta países.',
      'Produtores atribuem o fenômeno à combinação entre roteiros enraizados em narrativas humanas universais e políticas contínuas de formação técnica.'
    ],
    quote: '“Quando o cinema brasileiro fala a partir de seus territórios profundos, ele alcança ressonância imediata em qualquer plateia do mundo.”'
  },
  {
    id: 'art-12',
    slug: 'reforma-tributaria-regulamentacao-imposto-seletivo-debate-senado',
    chapeu: 'TRIBUTAÇÃO',
    category: 'Política',
    title: 'Senado instala grupo de trabalho para definir alíquotas de referência e regras de transição tributária',
    subtitle: 'Governadores e prefeitos negociam critérios de partilha do novo conselho federativo antes do recesso parlamentar.',
    authorId: 'aut-1',
    publishedAt: '11 Nov 2026 • 21:15',
    timestamp: '2026-11-11T21:15:00',
    readTime: '5 min de leitura',
    views: 19870,
    status: 'published',
    placement: 'feed',
    breaking: false,
    imageUrl: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&w=1000&q=85',
    imageCaption: 'Fachada do Senado Federal iluminada ao entardecer em Brasília.',
    imageCredit: 'Foto: Agência Meridiano / Brasília',
    content: [
      'BRASÍLIA — A mesa diretora do Senado formalizou o cronograma de votação das leis complementares que operacionalizam o novo sistema de tributação sobre o consumo. O objetivo é assegurar previsibilidade jurídica para empresas e entes federativos.',
      'Secretários estaduais da Fazenda reuniram-se com lideranças partidárias para ajustar o funcionamento técnico da câmara de compensação automática de créditos tributários.'
    ],
    quote: '“A simplificação tributária é o motor silencioso que destrava investimentos de longo prazo na economia real.”'
  },
  {
    id: 'art-13',
    slug: 'balanca-comercial-registra-superavit-historico-impulsionado-manufaturados',
    chapeu: 'COMÉRCIO EXTERIOR',
    category: 'Economia',
    title: 'Exportações de bens industriais de média-alta tecnologia crescem 14% e impulsionam saldo comercial',
    subtitle: 'Aeronaves, equipamentos elétricos e máquinas agrícolas lideram a diversificação da pauta exportadora brasileira.',
    authorId: 'aut-2',
    publishedAt: '11 Nov 2026 • 19:50',
    timestamp: '2026-11-11T19:50:00',
    readTime: '4 min de leitura',
    views: 17540,
    status: 'published',
    placement: 'feed',
    breaking: false,
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=85',
    imageCaption: 'Terminal portuário de contêineres operando cargas de alto valor agregado destinadas ao mercado externo.',
    imageCredit: 'Foto: Porto de Santos / Divulgação',
    content: [
      'BRASÍLIA — Dados consolidados do comércio exterior revelam que o superávit comercial acumulado no ano superou as projeções mais otimistas do mercado, com destaque para a expansão das vendas de manufaturados.',
      'O desempenho reflete a abertura de novos mercados na Ásia e no Oriente Médio para a indústria aeronáutica e de bens de capital fabricados no país.'
    ],
    quote: '“A sofisticação da pauta exportadora reduz a vulnerabilidade externa diante dos ciclos voláteis de preços agrícolas.”'
  },
  {
    id: 'art-14',
    slug: 'diplomacia-asiatica-acordo-corredores-maritimos-seguranca-alimentar',
    chapeu: 'RELAÇÕES INTERNACIONAIS',
    category: 'Mundo',
    title: 'Nações do Indo-Pacífico firmam protocolo de segurança marítima e estabilidade no abastecimento de grãos',
    subtitle: 'Tratado estabelece rotas prioritárias e reservas estratégicas conjuntas para mitigar choques climáticos nas colheitas.',
    authorId: 'aut-3',
    publishedAt: '11 Nov 2026 • 18:30',
    timestamp: '2026-11-11T18:30:00',
    readTime: '5 min de leitura',
    views: 15210,
    status: 'published',
    placement: 'feed',
    breaking: false,
    imageUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=85',
    imageCaption: 'Cartografia marítima e rotas comerciais estratégicas no oceano Indo-Pacífico.',
    imageCredit: 'Foto: Arquivo Internacional Meridiano',
    content: [
      'SINGAPURA — Líderes econômicos de quinze países asiáticos concluíram uma rodada diplomática focada na resiliência das cadeias globais de suprimentos alimentares e marítimos.',
      'O documento prevê monitoramento via satélite de gargalos portuários e mecanismos rápidos de financiamento comercial em situações de emergência climática.'
    ],
    quote: '“A segurança alimentar no século XXI depende tanto da produtividade no campo quanto da fluidez diplomática nos oceanos.”'
  },
  {
    id: 'art-15',
    slug: 'criptografia-pos-quantica-bancos-centrais-iniciam-migracao-protocolos',
    chapeu: 'CIBERSEGURANÇA',
    category: 'Tecnologia',
    title: 'Bancos centrais e redes financeiras iniciam migração para criptografia resistente a computadores quânticos',
    subtitle: 'Novos algoritmos matemáticos protegem transações interbancárias contra futuras quebras de chaves digitais.',
    authorId: 'aut-4',
    publishedAt: '11 Nov 2026 • 17:45',
    timestamp: '2026-11-11T17:45:00',
    readTime: '4 min de leitura',
    views: 22190,
    status: 'published',
    placement: 'feed',
    breaking: false,
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=85',
    imageCaption: 'Infraestrutura de servidores seguros e protocolos criptográficos de alta camada.',
    imageCredit: 'Foto: Segurança Digital / Meridiano',
    content: [
      'NOVA YORK — O sistema financeiro internacional iniciou a transição gradual para padrões de criptografia pós-quântica, antecipando-se ao avanço dos processadores quânticos de grande escala.',
      'Os novos protocolos utilizam estruturas matemáticas baseadas em reticulados multidimensionais, capazes de resistir tanto a ataques clássicos quanto quânticos.'
    ],
    quote: '“Na segurança cibernética sistêmica, a transição precisa ser concluída anos antes que a ameaça teórica se torne operacional.”'
  },
  {
    id: 'art-16',
    slug: 'monitoramento-satelite-tempo-real-reduz-desmatamento-amazonia-cerrado',
    chapeu: 'MEIO AMBIENTE',
    category: 'Brasil',
    title: 'Integração de satélites de radar reduz em 34% os alertas de desmatamento no Cerrado e na Amazônia',
    subtitle: 'Sistema de resposta rápida permite fiscalização remota mesmo sob cobertura densa de nuvens durante o período chuvoso.',
    authorId: 'aut-5',
    publishedAt: '11 Nov 2026 • 16:20',
    timestamp: '2026-11-11T16:20:00',
    readTime: '5 min de leitura',
    views: 19300,
    status: 'published',
    placement: 'feed',
    breaking: false,
    imageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=85',
    imageCaption: 'Vista aérea de floresta tropical preservada e bacia hidrográfica monitorada por sensoriamento remoto.',
    imageCredit: 'Foto: Observação Ambiental / INPE',
    content: [
      'MANAUS — O cruzamento automatizado de imagens de radar orbital com cadastros fundiários rurais permitiu bloquear preventivamente o crédito bancário de propriedades com supressão ilegal de vegetação nativa.',
      'Segundo os dados técnicos divulgados nesta semana, a taxa trimestral atingiu o menor patamar da série recente.'
    ],
    quote: '“A inteligência geoespacial transformou o monitoramento ambiental de uma ação reativa em uma política preventiva eficaz.”'
  },
  {
    id: 'art-17',
    slug: 'tenis-brasileiro-consolida-presenca-top-20-mundial-temporada-saibro',
    chapeu: 'TÊNIS & ALTO RENDIMENTO',
    category: 'Esportes',
    title: 'Nova geração do tênis brasileiro consolida presença no top 20 mundial com ciência aplicada ao treino',
    subtitle: 'Uso de biomecânica e análise preditiva de partidas impulsiona resultados em torneios Masters 1000 e Grand Slams.',
    authorId: 'aut-6',
    publishedAt: '11 Nov 2026 • 15:10',
    timestamp: '2026-11-11T15:10:00',
    readTime: '4 min de leitura',
    views: 14820,
    status: 'published',
    placement: 'feed',
    breaking: false,
    imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1000&q=85',
    imageCaption: 'Quadra central durante disputa internacional de simples no circuito profissional.',
    imageCredit: 'Foto: Circuito Internacional / Divulgação',
    content: [
      'PARIS — O desempenho consistente dos atletas brasileiros nas quadras europeias reflete uma profissionalização silenciosa nas equipes multidisciplinares de preparação física e análise tática.',
      'Com calendário otimizado para prevenir lesões musculares, os tenistas do país chegam à reta final da temporada disputando vagas nas finais do circuito.'
    ],
    quote: '“O talento natural ganha partidas isoladas, mas é o planejamento científico que sustenta uma carreira no topo do ranking.”'
  },
  {
    id: 'art-18',
    slug: 'pesquisa-microbioma-intestinal-revela-novos-biomarcadores-saude-cognitiva',
    chapeu: 'NEUROCIÊNCIA',
    category: 'Saúde',
    title: 'Estudo longitudinal identifica relação direta entre diversidade do microbioma e prevenção do declínio cognitivo',
    subtitle: 'Acompanhamento de 12 mil voluntários por dez anos aponta impacto decisivo da dieta rica em fibras na neuroproteção.',
    authorId: 'aut-5',
    publishedAt: '11 Nov 2026 • 14:00',
    timestamp: '2026-11-11T14:00:00',
    readTime: '5 min de leitura',
    views: 25610,
    status: 'published',
    placement: 'feed',
    breaking: false,
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1000&q=85',
    imageCaption: 'Análise laboratorial de metabólitos e sequenciamento genômico em estudo de neurociência nutricional.',
    imageCredit: 'Foto: Centro de Neurobiologia Clínica',
    content: [
      'BOSTON — Pesquisadores mapearam moléculas produzidas por bactérias benéficas do intestino humano que atravessam a barreira hematoencefálica e reduzem processos neuroinflamatórios associados ao envelhecimento.',
      'Os resultados abrem caminho para protocolos nutricionais personalizados e probióticos de precisão voltados à saúde cerebral.'
    ],
    quote: '“O eixo intestino-cérebro deixou de ser uma hipótese periférica para se tornar uma das fronteiras mais promissoras da medicina preventiva.”'
  },
  {
    id: 'art-19',
    slug: 'alfabetizacao-cientifica-escolas-ensino-medio-laboratorios-abertos',
    chapeu: 'EDUCAÇÃO BÁSICA',
    category: 'Educação',
    title: 'Redes estaduais ampliam laboratórios de iniciação científica no ensino médio e elevam desempenho em matemática',
    subtitle: 'Metodologia baseada em investigação experimental reduz evasão escolar e desperta vocações tecnológicas.',
    authorId: 'aut-5',
    publishedAt: '11 Nov 2026 • 12:40',
    timestamp: '2026-11-11T12:40:00',
    readTime: '4 min de leitura',
    views: 13940,
    status: 'published',
    placement: 'feed',
    breaking: false,
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=85',
    imageCaption: 'Estudantes do ensino médio participam de oficina prática de ciências experimentais em escola pública.',
    imageCredit: 'Foto: Secretaria de Educação / Divulgação',
    content: [
      'BELO HORIZONTE — Escolas públicas que adotaram projetos práticos de investigação científica integrados ao currículo regular registraram avanço médio de 18% nas avaliações de raciocínio lógico e interpretação de dados.',
      'O programa capacita professores da rede e conecta turmas do ensino médio a mentores de universidades locais.'
    ],
    quote: '“Quando o estudante formula hipóteses e testa fenômenos reais, a ciência deixa de ser memorização abstrata.”'
  },
  {
    id: 'art-20',
    slug: 'fusao-nuclear-reator-experimental-atinge-novo-recorde-confinamento-magnetico',
    chapeu: 'ENERGIA LIMPA',
    category: 'Ciência',
    title: 'Reator experimental de fusão nuclear mantém plasma estável por 18 minutos e bate recorde mundial',
    subtitle: 'Avanço em ímãs supercondutores de alta temperatura aproxima a geração comercial de energia limpa e praticamente ilimitada.',
    authorId: 'aut-4',
    publishedAt: '11 Nov 2026 • 11:15',
    timestamp: '2026-11-11T11:15:00',
    readTime: '6 min de leitura',
    views: 33480,
    status: 'published',
    placement: 'feed',
    breaking: false,
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=85',
    imageCaption: 'Visualização de campos magnéticos de confinamento e energia estelar em pesquisa de fusão controlada.',
    imageCredit: 'Foto: Consórcio Internacional de Fusão',
    content: [
      'CADARACHE — Engenheiros e físicos nucleares celebraram um marco decisivo na busca pela energia das estrelas na Terra. Durante ensaio realizado nesta semana, o reator tokamak sustentou plasma superaquecido a 120 milhões de graus Celsius por 1.080 segundos contínuos.',
      'O feito foi possível graças a uma nova geração de bobinas supercondutoras revestidas com terras raras, capazes de gerar campos magnéticos intensos com menor consumo elétrico.',
      'A estabilidade prolongada do plasma era o principal desafio técnico para transformar a fusão nuclear em uma fonte contínua de eletricidade livre de carbono.'
    ],
    quote: '“Dominar o confinamento magnético prolongado significa transformar um experimento de física extrema em engenharia energética.”'
  }
];

// ============================================================================
// 3. COMPONENTE DE IDENTIDADE VISUAL: LOGOTIPO MERIDIANO
// ============================================================================
const MeridianoLogo = ({ darkMode, compact = false }) => (
  <div className="flex items-center gap-3 select-none group">
    <div className={`relative flex items-center justify-center ${compact ? 'w-8 h-8' : 'w-10 h-10'} border-2 ${darkMode ? 'border-stone-100 bg-stone-900' : 'border-slate-900 bg-white'} transition-colors`}>
      <svg viewBox="0 0 36 36" className="w-full h-full p-1" fill="none">
        <circle cx="18" cy="18" r="13" stroke={darkMode ? '#F5F5F4' : '#0F172A'} strokeWidth="1.75" />
        <ellipse cx="18" cy="18" rx="6.5" ry="13" stroke={darkMode ? '#F5F5F4' : '#0F172A'} strokeWidth="1.5" />
        <line x1="5" y1="18" x2="31" y2="18" stroke={darkMode ? '#F5F5F4' : '#0F172A'} strokeWidth="1.5" />
        <line x1="18" y1="3" x2="18" y2="33" stroke="#B91C1C" strokeWidth="2.2" />
      </svg>
    </div>
    <div className="flex flex-col">
      <span
        className={`${compact ? 'text-xl' : 'text-2xl md:text-3xl'} font-extrabold tracking-[0.14em] leading-none uppercase ${darkMode ? 'text-stone-100' : 'text-slate-950'}`}
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        MERIDIANO
      </span>
      {!compact && (
        <span className={`text-[10px] tracking-[0.26em] uppercase font-semibold mt-1 ${darkMode ? 'text-stone-400' : 'text-slate-500'}`}>
          Jornalismo • Análise • Fatos
        </span>
      )}
    </div>
  </div>
);

// ============================================================================
// 4. APLICAÇÃO PRINCIPAL DO PORTAL DE NOTÍCIAS
// ============================================================================
export default function App() {
  // Estados globais do portal
  const [articles, setArticles] = useState(INITIAL_ARTICLES);
  const [authors, setAuthors] = useState(INITIAL_AUTHORS);
  const [darkMode, setDarkMode] = useState(false);

  // Roteamento editorial (URL amigável simulada + estado)
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'category' | 'article' | 'admin'
  const [selectedCategory, setSelectedCategory] = useState('Política');
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  // Busca, leitura e interação
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState(['art-1', 'art-6']);
  const [fontScale, setFontScale] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);

  // Estados do Painel Administrativo (CMS)
  const [adminAuthenticated, setAdminAuthenticated] = useState(true);
  const [adminLoginEmail, setAdminLoginEmail] = useState('redacao@meridiano.com.br');
  const [adminLoginPass, setAdminLoginPass] = useState('••••••••••••');
  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard' | 'articles' | 'editor' | 'authors' | 'seo'
  const [editingArticleId, setEditingArticleId] = useState(null);

  // Formulário de criação/edição de matéria
  const [formState, setFormState] = useState({
    chapeu: '',
    category: 'Política',
    title: '',
    subtitle: '',
    authorId: 'aut-1',
    placement: 'feed',
    status: 'published',
    breaking: false,
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=85',
    imageCaption: '',
    imageCredit: 'Foto: Agência Meridiano',
    quote: '',
    contentText: ''
  });

  // Formulário de novo autor
  const [newAuthor, setNewAuthor] = useState({
    name: '',
    role: '',
    columnTitle: '',
    bio: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  });

  // Notificação discreta
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Atualiza metadados SEO / Open Graph no documento dinamicamente
  const activeArticle = useMemo(
    () => articles.find((a) => a.id === selectedArticleId) || null,
    [articles, selectedArticleId]
  );

  useEffect(() => {
    if (currentView === 'article' && activeArticle) {
      document.title = `${activeArticle.title} | MERIDIANO`;
    } else if (currentView === 'category') {
      document.title = `${selectedCategory} — Notícias e Análises | MERIDIANO`;
    } else if (currentView === 'admin') {
      document.title = `Redação & CMS | MERIDIANO`;
    } else {
      document.title = `MERIDIANO — Jornalismo, Política, Economia, Mundo e Tecnologia`;
    }
  }, [currentView, activeArticle, selectedCategory]);

  // Navegação limpa com rolagem para o topo
  const openHome = () => {
    setCurrentView('home');
    setSelectedArticleId(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCategory = (cat) => {
    setSelectedCategory(cat);
    setCurrentView('category');
    setSelectedArticleId(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openArticle = (articleId) => {
    setArticles((prev) =>
      prev.map((art) => (art.id === articleId ? { ...art, views: art.views + 1 } : art))
    );
    setSelectedArticleId(articleId);
    setCurrentView('article');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAdmin = () => {
    setCurrentView('admin');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleBookmark = (id, e) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) => {
      const exists = prev.includes(id);
      triggerToast(exists ? 'Matéria removida dos itens salvos.' : 'Matéria salva na sua lista de leitura.');
      return exists ? prev.filter((item) => item !== id) : [...prev, id];
    });
  };

  // Derivação editorial das matérias publicadas
  const publishedArticles = useMemo(
    () => articles.filter((a) => a.status === 'published'),
    [articles]
  );

  const heroArticle = useMemo(
    () => publishedArticles.find((a) => a.placement === 'hero') || publishedArticles[0],
    [publishedArticles]
  );

  const secondaryArticles = useMemo(() => {
    const secs = publishedArticles.filter((a) => a.placement === 'secondary' && a.id !== heroArticle?.id);
    if (secs.length >= 3) return secs.slice(0, 3);
    const fill = publishedArticles.filter((a) => a.id !== heroArticle?.id && !secs.some((s) => s.id === a.id));
    return [...secs, ...fill].slice(0, 3);
  }, [publishedArticles, heroArticle]);

  const latestFeedArticles = useMemo(() => {
    const excludeIds = new Set([heroArticle?.id, ...secondaryArticles.map((s) => s.id)]);
    return publishedArticles.filter((a) => !excludeIds.has(a.id));
  }, [publishedArticles, heroArticle, secondaryArticles]);

  const mostReadArticles = useMemo(
    () => [...publishedArticles].sort((a, b) => b.views - a.views).slice(0, 5),
    [publishedArticles]
  );

  const breakingHeadlines = useMemo(
    () => publishedArticles.filter((a) => a.breaking).slice(0, 6),
    [publishedArticles]
  );

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return publishedArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.chapeu.toLowerCase().includes(q)
    );
  }, [publishedArticles, searchQuery]);

  const getAuthor = (authorId) =>
    authors.find((au) => au.id === authorId) || authors[0];

  // Funções do CMS Administrativo
  const startCreateArticle = () => {
    setEditingArticleId(null);
    setFormState({
      chapeu: 'EXCLUSIVO',
      category: 'Política',
      title: '',
      subtitle: '',
      authorId: authors[0]?.id || 'aut-1',
      placement: 'feed',
      status: 'published',
      breaking: false,
      imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=85',
      imageCaption: 'Registro fotográfico da reportagem.',
      imageCredit: 'Foto: Agência Meridiano',
      quote: '',
      contentText: ''
    });
    setAdminTab('editor');
  };

  const startEditArticle = (art) => {
    setEditingArticleId(art.id);
    setFormState({
      chapeu: art.chapeu,
      category: art.category,
      title: art.title,
      subtitle: art.subtitle,
      authorId: art.authorId,
      placement: art.placement,
      status: art.status,
      breaking: art.breaking,
      imageUrl: art.imageUrl,
      imageCaption: art.imageCaption,
      imageCredit: art.imageCredit,
      quote: art.quote || '',
      contentText: art.content.join('\n\n')
    });
    setAdminTab('editor');
  };

  const handleSaveArticle = (e) => {
    e.preventDefault();
    if (!formState.title.trim() || !formState.contentText.trim()) {
      triggerToast('Preencha o título e o corpo da matéria.');
      return;
    }

    const paragraphs = formState.contentText
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean);

    const slug = formState.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (editingArticleId) {
      setArticles((prev) =>
        prev.map((item) => {
          if (formState.placement === 'hero' && item.id !== editingArticleId && item.placement === 'hero') {
            return { ...item, placement: 'secondary' };
          }
          if (item.id === editingArticleId) {
            return {
              ...item,
              ...formState,
              slug,
              content: paragraphs
            };
          }
          return item;
        })
      );
      triggerToast('Matéria atualizada na edição.');
    } else {
      const newArt = {
        id: `art-${Date.now()}`,
        slug,
        chapeu: formState.chapeu.toUpperCase() || 'REPORTAGEM',
        category: formState.category,
        title: formState.title,
        subtitle: formState.subtitle,
        authorId: formState.authorId,
        publishedAt: '12 Nov 2026 • Agora',
        timestamp: new Date().toISOString(),
        readTime: `${Math.max(2, Math.ceil(paragraphs.join(' ').split(' ').length / 180))} min de leitura`,
        views: 1,
        status: formState.status,
        placement: formState.placement,
        breaking: formState.breaking,
        imageUrl: formState.imageUrl,
        imageCaption: formState.imageCaption || 'Imagem ilustrativa da reportagem.',
        imageCredit: formState.imageCredit || 'Foto: Agência Meridiano',
        quote: formState.quote,
        content: paragraphs
      };

      setArticles((prev) => {
        const cleaned =
          formState.placement === 'hero'
            ? prev.map((a) => (a.placement === 'hero' ? { ...a, placement: 'secondary' } : a))
            : prev;
        return [newArt, ...cleaned];
      });
      triggerToast('Nova matéria publicada no portal.');
    }

    setAdminTab('articles');
  };

  const handleDeleteArticle = (id) => {
    if (articles.length <= 4) {
      triggerToast('Mantenha ao menos 4 matérias ativas na edição.');
      return;
    }
    setArticles((prev) => prev.filter((a) => a.id !== id));
    triggerToast('Matéria removida do acervo.');
  };

  const promoteToHero = (id) => {
    setArticles((prev) =>
      prev.map((a) => {
        if (a.id === id) return { ...a, placement: 'hero', status: 'published' };
        if (a.placement === 'hero') return { ...a, placement: 'secondary' };
        return a;
      })
    );
    triggerToast('Manchete principal da capa atualizada.');
  };

  const handleAddAuthor = (e) => {
    e.preventDefault();
    if (!newAuthor.name.trim() || !newAuthor.role.trim()) return;
    setAuthors((prev) => [
      ...prev,
      {
        id: `aut-${Date.now()}`,
        ...newAuthor
      }
    ]);
    setNewAuthor({
      name: '',
      role: '',
      columnTitle: '',
      bio: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    });
    triggerToast('Colunista cadastrado na redação.');
  };

  // Classes base do tema claro/escuro (Papel Jornal vs Edição Noturna)
  const theme = {
    bg: darkMode ? 'bg-[#0F1115] text-stone-100' : 'bg-[#FAF9F6] text-slate-900',
    surface: darkMode ? 'bg-[#161920]' : 'bg-white',
    subtleBg: darkMode ? 'bg-[#1C2029]' : 'bg-[#F3F1EC]',
    border: darkMode ? 'border-stone-800' : 'border-stone-300',
    strongBorder: darkMode ? 'border-stone-200' : 'border-slate-900',
    mutedText: darkMode ? 'text-stone-400' : 'text-slate-600',
    serif: { fontFamily: "'Playfair Display', Georgia, Cambria, serif" },
    sans: { fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }
  };

  // ============================================================================
  // 5. CABEÇALHO JORNALÍSTICO (MASTHEAD + NAVEGAÇÃO + PLANTÃO)
  // ============================================================================
  const renderHeader = () => (
    <header className={`border-b ${theme.border} ${theme.surface} transition-colors`}>
      {/* Barra superior institucional: Data, Cotações e Controles */}
      <div className={`border-b ${theme.border} text-xs`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-semibold tracking-wide">
              Quinta-feira, 12 de novembro de 2026
            </span>
            <span className={`hidden md:inline ${theme.mutedText}`}>|</span>
            <div className={`hidden md:flex items-center gap-4 ${theme.mutedText}`}>
              <span>
                Dólar <strong className={darkMode ? 'text-stone-200' : 'text-slate-900'}>R$ 5,42</strong>{' '}
                <span className="text-emerald-600 font-medium">-0,31%</span>
              </span>
              <span>
                Euro <strong className={darkMode ? 'text-stone-200' : 'text-slate-900'}>R$ 5,89</strong>{' '}
                <span className="text-emerald-600 font-medium">-0,18%</span>
              </span>
              <span>
                Ibovespa <strong className={darkMode ? 'text-stone-200' : 'text-slate-900'}>134.820 pts</strong>{' '}
                <span className="text-red-600 font-medium">+0,64%</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`flex items-center gap-1.5 px-2 py-1 text-xs font-medium hover:opacity-80 transition cursor-pointer ${theme.mutedText}`}
              title="Alternar modo claro e escuro"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{darkMode ? 'Edição Diurna' : 'Edição Noturna'}</span>
            </button>

            <span className={theme.mutedText}>|</span>

            <button
              onClick={openAdmin}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold tracking-wide uppercase transition cursor-pointer ${
                currentView === 'admin'
                  ? 'bg-[#B91C1C] text-white'
                  : darkMode
                  ? 'bg-stone-800 text-stone-100 hover:bg-stone-700'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Área da Redação</span>
            </button>
          </div>
        </div>
      </div>

      {/* Masthead principal: Menu, Logotipo Central/Esquerda e Busca */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 border ${theme.border} hover:border-red-700 transition cursor-pointer`}
            aria-label="Abrir menu de editorias"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button onClick={openHome} className="text-left cursor-pointer">
            <MeridianoLogo darkMode={darkMode} />
          </button>
        </div>

        {/* Destaque editorial da edição + Busca */}
        <div className="flex items-center gap-3">
          <div className={`hidden lg:flex flex-col text-right pr-4 border-r ${theme.border}`}>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#B91C1C]">
              Edição Nacional • Nº 4.812
            </span>
            <span className={`text-xs ${theme.mutedText}`}>
              Atualizado em tempo real por Brasília, São Paulo e Londres
            </span>
          </div>

          <div className="relative">
            {searchOpen ? (
              <div className={`flex items-center border ${theme.strongBorder} ${theme.surface} px-3 py-1.5 w-64 sm:w-80`}>
                <Search className="w-4 h-4 text-[#B91C1C] mr-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar manchetes, temas ou autores..."
                  autoFocus
                  className="w-full bg-transparent text-sm focus:outline-none"
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="ml-1 opacity-60 hover:opacity-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className={`flex items-center gap-2 px-3.5 py-2 border ${theme.border} hover:border-red-700 text-sm font-medium transition cursor-pointer`}
              >
                <Search className="w-4 h-4 text-[#B91C1C]" />
                <span className="hidden sm:inline">Pesquisar</span>
              </button>
            )}

            {/* Dropdown instantâneo de resultados de pesquisa */}
            {searchOpen && searchQuery.trim().length > 0 && (
              <div className={`absolute right-0 mt-2 w-80 sm:w-96 border ${theme.strongBorder} ${theme.surface} shadow-2xl z-50 max-h-96 overflow-y-auto`}>
                <div className={`px-4 py-2 border-b ${theme.border} text-xs font-bold uppercase tracking-wider ${theme.mutedText}`}>
                  {searchResults.length} {searchResults.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
                </div>
                {searchResults.length === 0 ? (
                  <div className={`p-4 text-sm ${theme.mutedText}`}>
                    Nenhuma reportagem encontrada para “{searchQuery}”.
                  </div>
                ) : (
                  searchResults.map((res) => (
                    <button
                      key={res.id}
                      onClick={() => {
                        openArticle(res.id);
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className={`w-full text-left p-3.5 border-b ${theme.border} hover:bg-red-700/5 transition block cursor-pointer`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#B91C1C]">
                        {res.category} • {res.publishedAt}
                      </span>
                      <p className="text-sm font-bold leading-snug mt-0.5" style={theme.serif}>
                        {res.title}
                      </p>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Barra horizontal de editorias */}
      <nav className={`border-t border-b-2 ${theme.strongBorder} ${theme.surface} sticky top-0 z-30`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ul className="flex items-center justify-between overflow-x-auto no-scrollbar py-2.5 gap-5 text-xs sm:text-[13px] font-bold uppercase tracking-wider whitespace-nowrap">
            <li>
              <button
                onClick={openHome}
                className={`pb-1 transition cursor-pointer ${
                  currentView === 'home'
                    ? 'text-[#B91C1C] border-b-2 border-[#B91C1C]'
                    : 'hover:text-[#B91C1C]'
                }`}
              >
                Capa
              </button>
            </li>
            {EDITORIAS.map((cat) => {
              const active = currentView === 'category' && selectedCategory === cat;
              return (
                <li key={cat}>
                  <button
                    onClick={() => openCategory(cat)}
                    className={`pb-1 transition cursor-pointer ${
                      active
                        ? 'text-[#B91C1C] border-b-2 border-[#B91C1C]'
                        : 'hover:text-[#B91C1C]'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Menu gaveta completo */}
      {mobileMenuOpen && (
        <div className={`border-b ${theme.strongBorder} ${theme.subtleBg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#B91C1C] mb-3">
                Editorias do Jornal
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
                {EDITORIAS.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => openCategory(cat)}
                    className="text-left py-1 hover:text-[#B91C1C] transition cursor-pointer"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#B91C1C] mb-3">
                Colunistas Titulares
              </h4>
              <ul className="space-y-2 text-sm">
                {authors.slice(0, 4).map((au) => (
                  <li key={au.id}>
                    <div className="font-bold">{au.name}</div>
                    <div className={`text-xs ${theme.mutedText}`}>{au.columnTitle}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#B91C1C] mb-3">
                Leitura Salva ({bookmarkedIds.length})
              </h4>
              {bookmarkedIds.length === 0 ? (
                <p className={`text-xs ${theme.mutedText}`}>Nenhuma matéria salva no momento.</p>
              ) : (
                <ul className="space-y-2 text-xs">
                  {articles
                    .filter((a) => bookmarkedIds.includes(a.id))
                    .slice(0, 3)
                    .map((art) => (
                      <li key={art.id}>
                        <button
                          onClick={() => openArticle(art.id)}
                          className="text-left font-semibold hover:text-[#B91C1C] line-clamp-2 cursor-pointer"
                        >
                          {art.title}
                        </button>
                      </li>
                    ))}
                </ul>
              )}
            </div>

            <div className={`border-l ${theme.border} pl-0 md:pl-6 flex flex-col justify-between`}>
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#B91C1C] mb-2">
                  Sistema Editorial
                </h4>
                <p className={`text-xs leading-relaxed ${theme.mutedText}`}>
                  Acesse o painel da redação para publicar reportagens, definir a manchete principal e gerenciar metadados SEO.
                </p>
              </div>
              <button
                onClick={openAdmin}
                className="mt-4 w-full py-2.5 px-4 bg-[#B91C1C] text-white text-xs font-bold uppercase tracking-wider hover:bg-red-800 transition cursor-pointer"
              >
                Abrir Painel Administrativo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Faixa de Últimas Notícias (Plantão Horizontal) */}
      <div className={`border-b ${theme.border} ${theme.subtleBg} overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-10 flex items-center gap-4">
          <span className="bg-[#B91C1C] text-white text-[11px] font-extrabold uppercase tracking-widest px-2.5 py-1 shrink-0 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Plantão
          </span>

          <div className="relative flex-1 overflow-hidden">
            <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
              {[...breakingHeadlines, ...breakingHeadlines].map((item, idx) => (
                <button
                  key={`${item.id}-${idx}`}
                  onClick={() => openArticle(item.id)}
                  className="inline-flex items-center gap-2 text-xs font-medium hover:text-[#B91C1C] transition cursor-pointer"
                >
                  <span className="font-bold uppercase text-[#B91C1C]">{item.category}:</span>
                  <span>{item.title}</span>
                  <span className={`mx-2 ${theme.mutedText}`}>•</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  // ============================================================================
  // 6. PÁGINA INICIAL — EXPERIÊNCIA EDITORIAL BROADSHEET
  // ============================================================================
  const renderHome = () => (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* BLOCO 1: GRADE PRINCIPAL DE CAPA (MANCHETE HERO + 3 SECUNDÁRIAS) */}
      <section className={`pb-10 border-b-2 ${theme.strongBorder}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Manchete Principal (8 colunas) */}
          {heroArticle && (
            <article
              onClick={() => openArticle(heroArticle.id)}
              className={`lg:col-span-8 lg:pr-8 lg:border-r ${theme.border} group cursor-pointer`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#B91C1C]">
                  {heroArticle.chapeu}
                </span>
                <span className={`text-xs ${theme.mutedText}`}>•</span>
                <span className={`text-xs font-semibold uppercase tracking-wider ${theme.mutedText}`}>
                  {heroArticle.category}
                </span>
              </div>

              <h1
                className="text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.12] tracking-tight group-hover:text-[#B91C1C] transition-colors"
                style={theme.serif}
              >
                {heroArticle.title}
              </h1>

              <p className={`mt-4 text-base sm:text-lg leading-relaxed ${theme.mutedText}`}>
                {heroArticle.subtitle}
              </p>

              <div className="mt-5 relative overflow-hidden bg-slate-900 aspect-[16/9]">
                <img
                  src={heroArticle.imageUrl}
                  alt={heroArticle.title}
                  loading="eager"
                  className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-500"
                />
              </div>

              <div className={`mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs ${theme.mutedText}`}>
                <span>{heroArticle.imageCaption}</span>
                <span className="font-medium">
                  Por <strong className={darkMode ? 'text-stone-200' : 'text-slate-900'}>{getAuthor(heroArticle.authorId).name}</strong> • {heroArticle.publishedAt}
                </span>
              </div>
            </article>
          )}

          {/* Notícias Secundárias da Capa (4 colunas) */}
          <div className="lg:col-span-4 flex flex-col justify-between divide-y divide-stone-300 dark:divide-stone-800">
            {secondaryArticles.map((art, index) => (
              <article
                key={art.id}
                onClick={() => openArticle(art.id)}
                className={`${index === 0 ? 'pb-6' : index === secondaryArticles.length - 1 ? 'pt-6' : 'py-6'} group cursor-pointer`}
              >
                <div className="grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-7">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#B91C1C] block mb-1">
                      {art.category}
                    </span>
                    <h2
                      className="text-lg font-bold leading-snug group-hover:text-[#B91C1C] transition-colors"
                      style={theme.serif}
                    >
                      {art.title}
                    </h2>
                    <span className={`text-[11px] mt-2 block ${theme.mutedText}`}>
                      {art.publishedAt}
                    </span>
                  </div>
                  <div className="col-span-5 aspect-[4/3] overflow-hidden bg-slate-800">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                {index === 0 && (
                  <p className={`text-xs leading-relaxed mt-3 ${theme.mutedText}`}>
                    {art.subtitle}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCO 2: ÚLTIMAS NOTÍCIAS (CRONOLÓGICO) + MAIS LIDAS & COLUNISTAS */}
      <section className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Coluna Esquerda: Feed Cronológico de Últimas Notícias (8 colunas) */}
        <div className={`lg:col-span-8 lg:pr-8 lg:border-r ${theme.border}`}>
          <div className={`flex items-center justify-between pb-3 mb-6 border-b-2 ${theme.strongBorder}`}>
            <h2 className="text-sm font-extrabold uppercase tracking-[0.18em] flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#B91C1C] inline-block" />
              Últimas Notícias
            </h2>
            <span className={`text-xs ${theme.mutedText}`}>Ordem cronológica da redação</span>
          </div>

          <div className={`divide-y ${theme.border}`}>
            {latestFeedArticles.slice(0, 9).map((art) => {
              const author = getAuthor(art.authorId);
              const isSaved = bookmarkedIds.includes(art.id);
              return (
                <article
                  key={art.id}
                  onClick={() => openArticle(art.id)}
                  className="py-6 first:pt-0 grid grid-cols-1 sm:grid-cols-12 gap-5 group cursor-pointer"
                >
                  <div className="sm:col-span-4 aspect-[16/10] overflow-hidden bg-slate-800">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="sm:col-span-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
                          <span className="text-[#B91C1C]">{art.category}</span>
                          <span className={theme.mutedText}>•</span>
                          <span className={theme.mutedText}>{art.chapeu}</span>
                        </div>
                        <button
                          onClick={(e) => toggleBookmark(art.id, e)}
                          className={`p-1 hover:text-[#B91C1C] transition cursor-pointer ${isSaved ? 'text-[#B91C1C]' : theme.mutedText}`}
                          title="Salvar para ler depois"
                        >
                          <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                        </button>
                      </div>

                      <h3
                        className="text-xl sm:text-2xl font-bold leading-snug group-hover:text-[#B91C1C] transition-colors"
                        style={theme.serif}
                      >
                        {art.title}
                      </h3>

                      <p className={`mt-2 text-sm leading-relaxed line-clamp-2 ${theme.mutedText}`}>
                        {art.subtitle}
                      </p>
                    </div>

                    <div className={`mt-3 flex items-center gap-3 text-xs ${theme.mutedText}`}>
                      <span>Por {author.name}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {art.publishedAt}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Coluna Direita: Ranking Mais Lidas + Opinião & Colunistas (4 colunas) */}
        <aside className="lg:col-span-4 space-y-10">
          {/* Mais Lidas */}
          <div className={`p-6 border ${theme.border} ${theme.surface}`}>
            <div className={`pb-3 mb-5 border-b-2 ${theme.strongBorder} flex items-center justify-between`}>
              <h3 className="text-sm font-extrabold uppercase tracking-[0.18em] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#B91C1C]" />
                Mais Lidas
              </h3>
              <span className={`text-[11px] uppercase tracking-wider ${theme.mutedText}`}>24h</span>
            </div>

            <ol className={`divide-y ${theme.border}`}>
              {mostReadArticles.map((art, index) => (
                <li
                  key={art.id}
                  onClick={() => openArticle(art.id)}
                  className="py-4 first:pt-0 last:pb-0 flex items-start gap-4 group cursor-pointer"
                >
                  <span
                    className="text-3xl font-extrabold text-[#B91C1C] leading-none select-none w-7 shrink-0"
                    style={theme.serif}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#B91C1C] block mb-0.5">
                      {art.category}
                    </span>
                    <h4
                      className="text-base font-bold leading-snug group-hover:text-[#B91C1C] transition-colors"
                      style={theme.serif}
                    >
                      {art.title}
                    </h4>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Colunistas & Análise */}
          <div className={`p-6 border ${theme.border} ${theme.subtleBg}`}>
            <div className={`pb-3 mb-5 border-b-2 ${theme.strongBorder}`}>
              <h3 className="text-sm font-extrabold uppercase tracking-[0.18em]">
                Colunistas & Análise
              </h3>
            </div>

            <div className={`divide-y ${theme.border}`}>
              {authors.slice(0, 4).map((au) => {
                const authorArticle = publishedArticles.find((a) => a.authorId === au.id) || publishedArticles[0];
                return (
                  <div
                    key={au.id}
                    onClick={() => openArticle(authorArticle.id)}
                    className="py-4 first:pt-0 last:pb-0 flex items-start gap-3.5 group cursor-pointer"
                  >
                    <img
                      src={au.avatar}
                      alt={au.name}
                      className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition shrink-0 border border-stone-400"
                    />
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#B91C1C] block">
                        {au.name}
                      </span>
                      <span className={`text-[11px] block mb-1 ${theme.mutedText}`}>
                        {au.columnTitle}
                      </span>
                      <p
                        className="text-sm font-bold leading-snug group-hover:text-[#B91C1C] transition-colors"
                        style={theme.serif}
                      >
                        “{authorArticle.title}”
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </section>

      {/* BLOCO 3: FAIXAS TEMÁTICAS POR EDITORIA */}
      <section className={`pt-8 border-t-2 ${theme.strongBorder}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-extrabold uppercase tracking-[0.18em]">
            Destaques por Editoria
          </h2>
          <span className={`text-xs ${theme.mutedText}`}>Cobertura especializada</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Economia', 'Mundo', 'Tecnologia', 'Ciência'].map((cat) => {
            const catArticles = publishedArticles.filter((a) => a.category === cat);
            const lead = catArticles[0];
            const rest = catArticles.slice(1, 3);
            if (!lead) return null;

            return (
              <div key={cat} className={`border-t-2 border-[#B91C1C] pt-4 flex flex-col justify-between`}>
                <div>
                  <button
                    onClick={() => openCategory(cat)}
                    className="flex items-center justify-between w-full text-left mb-3 group cursor-pointer"
                  >
                    <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#B91C1C]">
                      {cat}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#B91C1C] group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <div onClick={() => openArticle(lead.id)} className="group cursor-pointer mb-4">
                    <div className="aspect-[16/10] overflow-hidden mb-3 bg-slate-800">
                      <img
                        src={lead.imageUrl}
                        alt={lead.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3
                      className="text-lg font-bold leading-snug group-hover:text-[#B91C1C] transition-colors"
                      style={theme.serif}
                    >
                      {lead.title}
                    </h3>
                  </div>
                </div>

                <div className={`divide-y ${theme.border} border-t ${theme.border} pt-2`}>
                  {rest.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => openArticle(item.id)}
                      className="py-2.5 text-left text-xs font-semibold leading-snug hover:text-[#B91C1C] transition block w-full cursor-pointer"
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );

  // ============================================================================
  // 7. PÁGINA DE EDITORIA DEDICADA (11 EDITORIAS COMPLETAS)
  // ============================================================================
  const renderCategoryPage = () => {
    const catArticles = publishedArticles.filter((a) => a.category === selectedCategory);
    const lead = catArticles[0];
    const others = catArticles.slice(1);

    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Cabeçalho da Editoria */}
        <div className={`pb-6 mb-8 border-b-2 ${theme.strongBorder} flex flex-col sm:flex-row sm:items-end justify-between gap-4`}>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B91C1C] mb-2">
              <button onClick={openHome} className="hover:underline cursor-pointer">Início</button>
              <span>/</span>
              <span>Editoria</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight" style={theme.serif}>
              {selectedCategory}
            </h1>
          </div>
          <p className={`text-sm max-w-md ${theme.mutedText}`}>
            Reportagens especiais, análises aprofundadas e cobertura em tempo real da editoria de {selectedCategory} do MERIDIANO.
          </p>
        </div>

        {catArticles.length === 0 ? (
          <div className={`p-12 border ${theme.border} text-center`}>
            <p className="text-lg font-semibold mb-2">Nenhuma matéria publicada nesta editoria ainda.</p>
            <button
              onClick={openAdmin}
              className="mt-2 px-4 py-2 bg-[#B91C1C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Publicar primeira matéria em {selectedCategory}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className={`lg:col-span-8 lg:pr-8 lg:border-r ${theme.border}`}>
              {/* Manchete Principal da Editoria */}
              {lead && (
                <article
                  onClick={() => openArticle(lead.id)}
                  className={`pb-8 mb-8 border-b ${theme.border} group cursor-pointer`}
                >
                  <div className="aspect-[16/9] overflow-hidden mb-5 bg-slate-800">
                    <img
                      src={lead.imageUrl}
                      alt={lead.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#B91C1C]">
                    {lead.chapeu}
                  </span>
                  <h2
                    className="text-3xl sm:text-4xl font-bold leading-tight mt-2 group-hover:text-[#B91C1C] transition-colors"
                    style={theme.serif}
                  >
                    {lead.title}
                  </h2>
                  <p className={`mt-3 text-base leading-relaxed ${theme.mutedText}`}>
                    {lead.subtitle}
                  </p>
                  <div className={`mt-4 text-xs ${theme.mutedText}`}>
                    Por <strong>{getAuthor(lead.authorId).name}</strong> • {lead.publishedAt} • {lead.readTime}
                  </div>
                </article>
              )}

              {/* Demais matérias da editoria */}
              <div className={`divide-y ${theme.border}`}>
                {others.map((art) => (
                  <article
                    key={art.id}
                    onClick={() => openArticle(art.id)}
                    className="py-6 first:pt-0 grid grid-cols-1 sm:grid-cols-12 gap-5 group cursor-pointer"
                  >
                    <div className="sm:col-span-4 aspect-[16/10] overflow-hidden bg-slate-800">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="sm:col-span-8">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#B91C1C]">
                        {art.chapeu}
                      </span>
                      <h3
                        className="text-xl font-bold leading-snug mt-1 group-hover:text-[#B91C1C] transition-colors"
                        style={theme.serif}
                      >
                        {art.title}
                      </h3>
                      <p className={`mt-2 text-sm line-clamp-2 ${theme.mutedText}`}>
                        {art.subtitle}
                      </p>
                      <span className={`text-xs mt-3 block ${theme.mutedText}`}>
                        {art.publishedAt} • {art.readTime}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Coluna Lateral da Editoria */}
            <aside className="lg:col-span-4 space-y-8">
              <div className={`p-6 border ${theme.border} ${theme.surface}`}>
                <h3 className={`text-xs font-extrabold uppercase tracking-[0.18em] pb-3 mb-4 border-b-2 ${theme.strongBorder}`}>
                  Outras Editorias
                </h3>
                <div className="flex flex-wrap gap-2">
                  {EDITORIAS.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => openCategory(cat)}
                      className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition cursor-pointer ${
                        cat === selectedCategory
                          ? 'bg-[#B91C1C] text-white border-[#B91C1C]'
                          : `${theme.border} hover:border-[#B91C1C]`
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`p-6 border ${theme.border} ${theme.subtleBg}`}>
                <h3 className={`text-xs font-extrabold uppercase tracking-[0.18em] pb-3 mb-4 border-b-2 ${theme.strongBorder}`}>
                  Mais Lidas no Portal
                </h3>
                <ol className={`divide-y ${theme.border}`}>
                  {mostReadArticles.slice(0, 4).map((art, i) => (
                    <li
                      key={art.id}
                      onClick={() => openArticle(art.id)}
                      className="py-3 first:pt-0 last:pb-0 flex items-start gap-3 cursor-pointer group"
                    >
                      <span className="text-xl font-extrabold text-[#B91C1C]" style={theme.serif}>
                        {i + 1}
                      </span>
                      <span className="text-sm font-bold leading-snug group-hover:text-[#B91C1C]" style={theme.serif}>
                        {art.title}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        )}
      </main>
    );
  };

  // ============================================================================
  // 8. PÁGINA DE LEITURA DE MATÉRIA (EXPERIÊNCIA EDITORIAL IMERSIVA)
  // ============================================================================
  const renderArticlePage = () => {
    if (!activeArticle) return null;
    const author = getAuthor(activeArticle.authorId);
    const isSaved = bookmarkedIds.includes(activeArticle.id);

    const relatedArticles = publishedArticles
      .filter((a) => a.id !== activeArticle.id && a.category === activeArticle.category)
      .slice(0, 3);

    const fallbackRelated =
      relatedArticles.length >= 2
        ? relatedArticles
        : publishedArticles.filter((a) => a.id !== activeArticle.id).slice(0, 3);

    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6">
          <button onClick={openHome} className="hover:text-[#B91C1C] cursor-pointer">Capa</button>
          <span className={theme.mutedText}>/</span>
          <button
            onClick={() => openCategory(activeArticle.category)}
            className="text-[#B91C1C] hover:underline cursor-pointer"
          >
            {activeArticle.category}
          </button>
          <span className={theme.mutedText}>/</span>
          <span className={theme.mutedText}>{activeArticle.chapeu}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Coluna Principal de Leitura (8 colunas) */}
          <article className={`lg:col-span-8 lg:pr-10 lg:border-r ${theme.border}`}>
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#B91C1C] block mb-3">
              {activeArticle.chapeu}
            </span>

            <h1
              className="text-3xl sm:text-4xl lg:text-[42px] font-bold leading-[1.15] tracking-tight"
              style={theme.serif}
            >
              {activeArticle.title}
            </h1>

            <p className={`mt-4 text-lg sm:text-xl leading-relaxed ${theme.mutedText}`}>
              {activeArticle.subtitle}
            </p>

            {/* Barra de Autoria, Data e Controles de Leitura */}
            <div className={`mt-6 py-4 border-t border-b ${theme.border} flex flex-wrap items-center justify-between gap-4`}>
              <div className="flex items-center gap-3.5">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-11 h-11 rounded-full object-cover border border-stone-400"
                />
                <div>
                  <div className="text-sm font-bold">Por {author.name}</div>
                  <div className={`text-xs ${theme.mutedText}`}>
                    {author.role} • {activeArticle.publishedAt} ({activeArticle.readTime})
                  </div>
                </div>
              </div>

              {/* Ferramentas de tipografia, salvar e compartilhar */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFontScale((s) => Math.max(0.9, +(s - 0.1).toFixed(1)))}
                  className={`px-2.5 py-1.5 border ${theme.border} text-xs font-bold hover:border-[#B91C1C] cursor-pointer`}
                  title="Diminuir tamanho do texto"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontScale((s) => Math.min(1.3, +(s + 0.1).toFixed(1)))}
                  className={`px-2.5 py-1.5 border ${theme.border} text-xs font-bold hover:border-[#B91C1C] cursor-pointer`}
                  title="Aumentar tamanho do texto"
                >
                  A+
                </button>
                <button
                  onClick={(e) => toggleBookmark(activeArticle.id, e)}
                  className={`p-2 border ${theme.border} hover:border-[#B91C1C] transition cursor-pointer ${
                    isSaved ? 'text-[#B91C1C] border-[#B91C1C]' : ''
                  }`}
                  title="Salvar matéria"
                >
                  <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={() => triggerToast('Link permanente copiado para a área de transferência.')}
                  className={`flex items-center gap-1.5 px-3 py-2 border ${theme.border} hover:border-[#B91C1C] text-xs font-bold uppercase tracking-wider transition cursor-pointer`}
                >
                  <Share2 className="w-3.5 h-3.5 text-[#B91C1C]" />
                  <span>Compartilhar</span>
                </button>
              </div>
            </div>

            {/* Imagem Principal em Alta Resolução */}
            <figure className="my-8">
              <div className="aspect-[16/9] overflow-hidden bg-slate-900">
                <img
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className={`mt-2.5 text-xs leading-relaxed flex flex-col sm:flex-row sm:justify-between gap-1 ${theme.mutedText}`}>
                <span>{activeArticle.imageCaption}</span>
                <span className="font-semibold shrink-0">{activeArticle.imageCredit}</span>
              </figcaption>
            </figure>

            {/* Corpo Editorial da Matéria */}
            <div
              className="space-y-6 leading-[1.82] tracking-[0.005em]"
              style={{ fontSize: `${1.08 * fontScale}rem` }}
            >
              {activeArticle.content.map((paragraph, idx) => (
                <React.Fragment key={idx}>
                  <p className={idx === 0 ? 'first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-[#B91C1C]' : ''}>
                    {paragraph}
                  </p>

                  {/* Olho jornalístico (Pull Quote) após o segundo parágrafo */}
                  {idx === 1 && activeArticle.quote && (
                    <blockquote className={`my-8 py-6 px-6 border-l-4 border-[#B91C1C] ${theme.subtleBg}`}>
                      <p
                        className="text-xl sm:text-2xl font-bold italic leading-snug"
                        style={theme.serif}
                      >
                        {activeArticle.quote}
                      </p>
                    </blockquote>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Cartão Institucional do Autor */}
            <div className={`mt-12 p-6 border ${theme.border} ${theme.subtleBg} flex flex-col sm:flex-row items-start sm:items-center gap-5`}>
              <img
                src={author.avatar}
                alt={author.name}
                className="w-16 h-16 rounded-full object-cover border border-stone-400 shrink-0"
              />
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#B91C1C]">
                  Sobre o Autor
                </span>
                <h4 className="text-lg font-bold" style={theme.serif}>{author.name}</h4>
                <p className={`text-xs mt-1 leading-relaxed ${theme.mutedText}`}>{author.bio}</p>
              </div>
            </div>

            {/* Notícias Relacionadas */}
            <div className={`mt-12 pt-8 border-t-2 ${theme.strongBorder}`}>
              <h3 className="text-sm font-extrabold uppercase tracking-[0.18em] mb-6">
                Leia Também em {activeArticle.category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {fallbackRelated.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => openArticle(rel.id)}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-[16/10] overflow-hidden mb-3 bg-slate-800">
                      <img
                        src={rel.imageUrl}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#B91C1C]">
                      {rel.category}
                    </span>
                    <h4
                      className="text-base font-bold leading-snug mt-1 group-hover:text-[#B91C1C] transition-colors"
                      style={theme.serif}
                    >
                      {rel.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Coluna Lateral da Página de Leitura (4 colunas) */}
          <aside className="lg:col-span-4 space-y-8">
            <div className={`p-6 border ${theme.border} ${theme.surface} sticky top-16`}>
              <h3 className={`text-xs font-extrabold uppercase tracking-[0.18em] pb-3 mb-5 border-b-2 ${theme.strongBorder}`}>
                Mais Lidas na Redação
              </h3>
              <ol className={`divide-y ${theme.border}`}>
                {mostReadArticles.map((art, i) => (
                  <li
                    key={art.id}
                    onClick={() => openArticle(art.id)}
                    className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3.5 group cursor-pointer"
                  >
                    <span className="text-2xl font-extrabold text-[#B91C1C] leading-none" style={theme.serif}>
                      {i + 1}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#B91C1C] block">
                        {art.category}
                      </span>
                      <h4
                        className="text-sm font-bold leading-snug group-hover:text-[#B91C1C] transition-colors"
                        style={theme.serif}
                      >
                        {art.title}
                      </h4>
                    </div>
                  </li>
                ))}
              </ol>

              <div className={`mt-6 pt-5 border-t ${theme.border}`}>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#B91C1C] block mb-1">
                  URL Canônica & SEO
                </span>
                <code className={`text-[11px] break-all block ${theme.mutedText}`}>
                  https://meridiano.com.br/{activeArticle.category.toLowerCase()}/{activeArticle.slug}
                </code>
              </div>
            </div>
          </aside>
        </div>
      </main>
    );
  };

  // ============================================================================
  // 9. PAINEL ADMINISTRATIVO DA REDAÇÃO (CMS COMPLETO + SUPABASE & SEO)
  // ============================================================================
  const renderAdminPanel = () => {
    if (!adminAuthenticated) {
      return (
        <main className="max-w-md mx-auto px-4 py-16">
          <div className={`p-8 border-2 ${theme.strongBorder} ${theme.surface}`}>
            <MeridianoLogo darkMode={darkMode} compact />
            <h1 className="text-2xl font-bold mt-6" style={theme.serif}>
              Acesso à Redação
            </h1>
            <p className={`text-xs mt-1 mb-6 ${theme.mutedText}`}>
              Autenticação via Supabase Auth para editores e colunistas credenciados.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setAdminAuthenticated(true);
                triggerToast('Sessão editorial iniciada.');
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1">E-mail Institucional</label>
                <input
                  type="email"
                  value={adminLoginEmail}
                  onChange={(e) => setAdminLoginEmail(e.target.value)}
                  className={`w-full px-3 py-2 border ${theme.border} bg-transparent text-sm`}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1">Senha</label>
                <input
                  type="password"
                  value={adminLoginPass}
                  onChange={(e) => setAdminLoginPass(e.target.value)}
                  className={`w-full px-3 py-2 border ${theme.border} bg-transparent text-sm`}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#B91C1C] text-white text-xs font-bold uppercase tracking-widest hover:bg-red-800 transition cursor-pointer"
              >
                Entrar no Sistema Editorial
              </button>
            </form>
          </div>
        </main>
      );
    }

    const totalViews = articles.reduce((acc, a) => acc + a.views, 0);

    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Cabeçalho do CMS */}
        <div className={`pb-6 mb-8 border-b-2 ${theme.strongBorder} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#B91C1C]">
              Sistema de Gestão Editorial • MERIDIANO CMS
            </span>
            <h1 className="text-3xl font-bold mt-1" style={theme.serif}>
              Controle de Edição, Manchetes e Arquitetura
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={startCreateArticle}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#B91C1C] text-white text-xs font-bold uppercase tracking-wider hover:bg-red-800 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nova Matéria</span>
            </button>
            <button
              onClick={openHome}
              className={`flex items-center gap-2 px-4 py-2.5 border ${theme.strongBorder} text-xs font-bold uppercase tracking-wider hover:bg-red-700/10 transition cursor-pointer`}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Ver Portal Público</span>
            </button>
          </div>
        </div>

        {/* Navegação de Abas do Painel */}
        <div className={`flex flex-wrap gap-2 pb-6 mb-8 border-b ${theme.border}`}>
          {[
            { id: 'dashboard', label: 'Visão Geral & Audiência', icon: LayoutDashboard },
            { id: 'articles', label: `Gerenciar Matérias (${articles.length})`, icon: FileText },
            { id: 'editor', label: editingArticleId ? 'Editando Matéria' : 'Editor de Texto', icon: Edit3 },
            { id: 'authors', label: `Colunistas & Autores (${authors.length})`, icon: Users },
            { id: 'seo', label: 'SEO, Sitemap & Supabase', icon: Database }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider border transition cursor-pointer ${
                  active
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-stone-100 dark:text-slate-900'
                    : `${theme.border} hover:border-[#B91C1C]`
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ABA 1: DASHBOARD DE ESTATÍSTICAS */}
        {adminTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`p-6 border ${theme.border} ${theme.surface}`}>
                <span className={`text-xs font-bold uppercase tracking-wider ${theme.mutedText}`}>
                  Leituras Totais (24h)
                </span>
                <div className="text-3xl font-extrabold mt-2" style={theme.serif}>
                  {totalViews.toLocaleString('pt-BR')}
                </div>
                <span className="text-xs text-emerald-600 font-semibold mt-1 block">
                  +14,8% frente à média semanal
                </span>
              </div>

              <div className={`p-6 border ${theme.border} ${theme.surface}`}>
                <span className={`text-xs font-bold uppercase tracking-wider ${theme.mutedText}`}>
                  Matérias Publicadas
                </span>
                <div className="text-3xl font-extrabold mt-2" style={theme.serif}>
                  {publishedArticles.length}
                </div>
                <span className={`text-xs mt-1 block ${theme.mutedText}`}>
                  Distribuídas em {EDITORIAS.length} editorias
                </span>
              </div>

              <div className={`p-6 border ${theme.border} ${theme.surface}`}>
                <span className={`text-xs font-bold uppercase tracking-wider ${theme.mutedText}`}>
                  Tempo Médio de Leitura
                </span>
                <div className="text-3xl font-extrabold mt-2" style={theme.serif}>
                  4m 48s
                </div>
                <span className="text-xs text-emerald-600 font-semibold mt-1 block">
                  Alta retenção editorial
                </span>
              </div>

              <div className={`p-6 border ${theme.border} ${theme.surface}`}>
                <span className={`text-xs font-bold uppercase tracking-wider ${theme.mutedText}`}>
                  Manchete Principal Ativa
                </span>
                <div className="text-sm font-bold mt-2 line-clamp-2" style={theme.serif}>
                  {heroArticle?.title}
                </div>
              </div>
            </div>

            {/* Controle Rápido da Manchete de Capa */}
            <div className={`p-6 border ${theme.border} ${theme.surface}`}>
              <h2 className="text-sm font-extrabold uppercase tracking-widest mb-4">
                Hierarquia da Capa — Selecionar Manchete Principal
              </h2>
              <div className={`divide-y ${theme.border}`}>
                {articles.slice(0, 6).map((art) => (
                  <div key={art.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase text-[#B91C1C]">{art.category}</span>
                        {art.placement === 'hero' && (
                          <span className="px-2 py-0.5 bg-[#B91C1C] text-white text-[10px] font-extrabold uppercase">
                            Manchete Principal
                          </span>
                        )}
                        {art.placement === 'secondary' && (
                          <span className="px-2 py-0.5 bg-slate-700 text-white text-[10px] font-bold uppercase">
                            Destaque Secundário
                          </span>
                        )}
                      </div>
                      <p className="font-bold text-sm mt-1" style={theme.serif}>{art.title}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {art.placement !== 'hero' && (
                        <button
                          onClick={() => promoteToHero(art.id)}
                          className={`px-3 py-1.5 border ${theme.border} hover:border-[#B91C1C] text-xs font-bold uppercase tracking-wider cursor-pointer`}
                        >
                          Promover a Manchete
                        </button>
                      )}
                      <button
                        onClick={() => startEditArticle(art)}
                        className={`p-2 border ${theme.border} hover:border-[#B91C1C] cursor-pointer`}
                        title="Editar"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ABA 2: LISTA COMPLETA DE MATÉRIAS */}
        {adminTab === 'articles' && (
          <div className={`border ${theme.border} ${theme.surface} overflow-x-auto`}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`border-b-2 ${theme.strongBorder} text-[11px] font-extrabold uppercase tracking-wider`}>
                  <th className="p-4">Título / Chapéu</th>
                  <th className="p-4">Editoria</th>
                  <th className="p-4">Posição</th>
                  <th className="p-4">Audiência</th>
                  <th className="p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme.border} text-sm`}>
                {articles.map((art) => (
                  <tr key={art.id} className="hover:bg-red-700/5">
                    <td className="p-4 max-w-md">
                      <span className="text-[10px] font-bold uppercase text-[#B91C1C] block">{art.chapeu}</span>
                      <span className="font-bold line-clamp-1" style={theme.serif}>{art.title}</span>
                      <span className={`text-xs block ${theme.mutedText}`}>
                        {getAuthor(art.authorId).name} • {art.publishedAt}
                      </span>
                    </td>
                    <td className="p-4 font-semibold">{art.category}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-[10px] font-extrabold uppercase ${
                        art.placement === 'hero'
                          ? 'bg-[#B91C1C] text-white'
                          : art.placement === 'secondary'
                          ? 'bg-slate-800 text-white'
                          : `${theme.subtleBg}`
                      }`}>
                        {art.placement === 'hero' ? 'Manchete Hero' : art.placement === 'secondary' ? 'Secundária' : 'Feed'}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-xs">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-[#B91C1C]" />
                        {art.views.toLocaleString('pt-BR')}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => promoteToHero(art.id)}
                          className={`px-2.5 py-1 border ${theme.border} text-[11px] font-bold uppercase hover:border-[#B91C1C] cursor-pointer`}
                          title="Definir como manchete principal"
                        >
                          Capa
                        </button>
                        <button
                          onClick={() => startEditArticle(art)}
                          className={`p-1.5 border ${theme.border} hover:border-[#B91C1C] cursor-pointer`}
                          title="Editar matéria"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(art.id)}
                          className={`p-1.5 border ${theme.border} hover:border-red-600 text-red-600 cursor-pointer`}
                          title="Excluir matéria"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ABA 3: EDITOR DE MATÉRIAS */}
        {adminTab === 'editor' && (
          <form onSubmit={handleSaveArticle} className={`p-6 sm:p-8 border ${theme.border} ${theme.surface} space-y-6`}>
            <div className="flex items-center justify-between border-b pb-4 border-stone-300 dark:border-stone-800">
              <h2 className="text-xl font-bold" style={theme.serif}>
                {editingArticleId ? 'Editar Reportagem' : 'Redigir Nova Reportagem'}
              </h2>
              <span className="text-xs font-bold uppercase text-[#B91C1C]">Padrão Editorial Meridiano</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1.5">Editoria</label>
                <select
                  value={formState.category}
                  onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                  className={`w-full px-3 py-2.5 border ${theme.border} ${theme.surface} text-sm`}
                >
                  {EDITORIAS.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1.5">Chapéu (Etiqueta)</label>
                <input
                  type="text"
                  value={formState.chapeu}
                  onChange={(e) => setFormState({ ...formState, chapeu: e.target.value })}
                  placeholder="Ex: ANÁLISE, EXCLUSIVO, INFRAESTRUTURA"
                  className={`w-full px-3 py-2 border ${theme.border} bg-transparent text-sm`}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1.5">Autor / Colunista</label>
                <select
                  value={formState.authorId}
                  onChange={(e) => setFormState({ ...formState, authorId: e.target.value })}
                  className={`w-full px-3 py-2.5 border ${theme.border} ${theme.surface} text-sm`}
                >
                  {authors.map((au) => (
                    <option key={au.id} value={au.id}>{au.name} ({au.role})</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider block mb-1.5">Título da Manchete</label>
              <input
                type="text"
                value={formState.title}
                onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                placeholder="Escreva um título informativo, direto e jornalístico..."
                className={`w-full px-3.5 py-3 border ${theme.border} bg-transparent text-lg font-bold`}
                style={theme.serif}
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider block mb-1.5">Subtítulo / Linha Fina</label>
              <input
                type="text"
                value={formState.subtitle}
                onChange={(e) => setFormState({ ...formState, subtitle: e.target.value })}
                placeholder="Resumo complementar em uma ou duas frases..."
                className={`w-full px-3.5 py-2.5 border ${theme.border} bg-transparent text-sm`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1.5">Posicionamento na Capa</label>
                <select
                  value={formState.placement}
                  onChange={(e) => setFormState({ ...formState, placement: e.target.value })}
                  className={`w-full px-3 py-2.5 border ${theme.border} ${theme.surface} text-sm`}
                >
                  <option value="hero">Manchete Principal (Hero)</option>
                  <option value="secondary">Destaque Secundário</option>
                  <option value="feed">Últimas Notícias (Cronológico)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1.5">URL da Fotografia Principal</label>
                <input
                  type="url"
                  value={formState.imageUrl}
                  onChange={(e) => setFormState({ ...formState, imageUrl: e.target.value })}
                  className={`w-full px-3 py-2 border ${theme.border} bg-transparent text-sm`}
                />
              </div>

              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2.5 text-sm font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formState.breaking}
                    onChange={(e) => setFormState({ ...formState, breaking: e.target.checked })}
                    className="w-4 h-4 accent-[#B91C1C]"
                  />
                  <span>Exibir na faixa de Plantão (Última Hora)</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1.5">Legenda da Fotografia</label>
                <input
                  type="text"
                  value={formState.imageCaption}
                  onChange={(e) => setFormState({ ...formState, imageCaption: e.target.value })}
                  className={`w-full px-3 py-2 border ${theme.border} bg-transparent text-sm`}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1.5">Olho / Citação em Destaque (Opcional)</label>
                <input
                  type="text"
                  value={formState.quote}
                  onChange={(e) => setFormState({ ...formState, quote: e.target.value })}
                  placeholder="Frase de impacto destacada no meio do texto..."
                  className={`w-full px-3 py-2 border ${theme.border} bg-transparent text-sm`}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider block mb-1.5">
                Texto Completo da Reportagem (Separe parágrafos com Enter)
              </label>
              <textarea
                rows={9}
                value={formState.contentText}
                onChange={(e) => setFormState({ ...formState, contentText: e.target.value })}
                placeholder="LOCAL — Redija o texto jornalístico completo..."
                className={`w-full p-4 border ${theme.border} bg-transparent text-sm leading-relaxed`}
                required
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-300 dark:border-stone-800">
              <button
                type="button"
                onClick={() => setAdminTab('articles')}
                className={`px-5 py-2.5 border ${theme.border} text-xs font-bold uppercase tracking-wider cursor-pointer`}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-[#B91C1C] text-white text-xs font-bold uppercase tracking-wider hover:bg-red-800 transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{editingArticleId ? 'Salvar Alterações' : 'Publicar Agora'}</span>
              </button>
            </div>
          </form>
        )}

        {/* ABA 4: GESTÃO DE AUTORES E COLUNISTAS */}
        {adminTab === 'authors' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-4">
              {authors.map((au) => (
                <div key={au.id} className={`p-5 border ${theme.border} ${theme.surface} flex items-center gap-4`}>
                  <img src={au.avatar} alt={au.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h3 className="font-bold text-base" style={theme.serif}>{au.name}</h3>
                    <span className="text-xs font-bold text-[#B91C1C] block">{au.role} • {au.columnTitle}</span>
                    <p className={`text-xs mt-1 ${theme.mutedText}`}>{au.bio}</p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddAuthor} className={`lg:col-span-5 p-6 border ${theme.border} ${theme.surface} space-y-4 h-fit`}>
              <h3 className="text-lg font-bold" style={theme.serif}>Cadastrar Novo Colunista</h3>
              <div>
                <label className="text-xs font-bold uppercase block mb-1">Nome Completo</label>
                <input
                  type="text"
                  value={newAuthor.name}
                  onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
                  className={`w-full px-3 py-2 border ${theme.border} bg-transparent text-sm`}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase block mb-1">Cargo Editorial</label>
                <input
                  type="text"
                  value={newAuthor.role}
                  onChange={(e) => setNewAuthor({ ...newAuthor, role: e.target.value })}
                  placeholder="Ex: Colunista de Ciência"
                  className={`w-full px-3 py-2 border ${theme.border} bg-transparent text-sm`}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase block mb-1">Nome da Coluna</label>
                <input
                  type="text"
                  value={newAuthor.columnTitle}
                  onChange={(e) => setNewAuthor({ ...newAuthor, columnTitle: e.target.value })}
                  placeholder="Ex: Horizonte Científico"
                  className={`w-full px-3 py-2 border ${theme.border} bg-transparent text-sm`}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase block mb-1">Minibiografia</label>
                <textarea
                  rows={3}
                  value={newAuthor.bio}
                  onChange={(e) => setNewAuthor({ ...newAuthor, bio: e.target.value })}
                  className={`w-full px-3 py-2 border ${theme.border} bg-transparent text-sm`}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#B91C1C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Adicionar à Redação
              </button>
            </form>
          </div>
        )}

        {/* ABA 5: SEO TÉCNICO, SITEMAP XML & SCHEMA SUPABASE */}
        {adminTab === 'seo' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`p-6 border ${theme.border} ${theme.surface}`}>
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#B91C1C] mb-3">
                Schema SQL — Banco de Dados Supabase (PostgreSQL)
              </h3>
              <p className={`text-xs mb-4 ${theme.mutedText}`}>
                Estrutura relacional pronta para persistência de matérias, editorias, autores e políticas RLS no Supabase.
              </p>
              <pre className={`p-4 text-xs overflow-x-auto ${theme.subtleBg} border ${theme.border} font-mono leading-relaxed`}>
{`-- Tabelas principais do Portal MERIDIANO
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  column_title TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  chapeu TEXT NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  content JSONB NOT NULL,
  quote TEXT,
  image_url TEXT,
  image_caption TEXT,
  image_credit TEXT,
  placement TEXT DEFAULT 'feed',
  breaking BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published',
  views BIGINT DEFAULT 0,
  author_id UUID REFERENCES authors(id),
  published_at TIMESTAMPTZ DEFAULT now()
);`}
              </pre>
            </div>

            <div className={`p-6 border ${theme.border} ${theme.surface}`}>
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#B91C1C] mb-3">
                Sitemap XML Dinâmico & Meta Tags Open Graph
              </h3>
              <p className={`text-xs mb-4 ${theme.mutedText}`}>
                Geração automática de URLs amigáveis para indexação imediata no Google News e compartilhamento social.
              </p>
              <pre className={`p-4 text-xs overflow-x-auto ${theme.subtleBg} border ${theme.border} font-mono leading-relaxed`}>
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${publishedArticles
  .slice(0, 5)
  .map(
    (a) => `  <url>
    <loc>https://meridiano.com.br/${a.category.toLowerCase()}/${a.slug}</loc>
    <lastmod>${a.timestamp}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`}
              </pre>
            </div>
          </div>
        )}
      </main>
    );
  };

  // ============================================================================
  // 10. RODAPÉ INSTITUCIONAL DE VEÍCULO DE COMUNICAÇÃO
  // ============================================================================
  const renderFooter = () => (
    <footer className={`mt-16 border-t-4 border-[#B91C1C] ${darkMode ? 'bg-[#0A0C0F] text-stone-300' : 'bg-slate-950 text-stone-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-stone-800">
          <MeridianoLogo darkMode={true} />
          <p className="text-xs text-stone-400 max-w-md">
            Jornalismo independente, verificação rigorosa de fatos e análise aprofundada dos acontecimentos que definem o Brasil e o mundo.
          </p>
        </div>

        <div className="py-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 border-b border-stone-800 text-xs">
          <div className="col-span-2 sm:col-span-4 lg:col-span-4">
            <h4 className="font-extrabold uppercase tracking-widest text-stone-400 mb-3">Editorias</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {EDITORIAS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => openCategory(cat)}
                  className="text-left text-stone-300 hover:text-white transition cursor-pointer"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <h4 className="font-extrabold uppercase tracking-widest text-stone-400 mb-3">Institucional</h4>
            <ul className="space-y-2 text-stone-300">
              <li><button onClick={openHome} className="hover:text-white cursor-pointer">Princípios Editoriais</button></li>
              <li><button onClick={openAdmin} className="hover:text-white cursor-pointer">Acesso da Redação (CMS)</button></li>
              <li><button onClick={() => triggerToast('Canal de checagem: fatos@meridiano.com.br')} className="hover:text-white cursor-pointer">Comunicar Erro / Checagem</button></li>
              <li><button onClick={() => setAdminTab('seo') || openAdmin()} className="hover:text-white cursor-pointer">Mapa do Site & API</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <span>© 2026 MERIDIANO Comunicação S.A. Todos os direitos reservados.</span>
          <span>ISSN 2965-8841 • Brasília • São Paulo • Londres</span>
        </div>
      </div>
    </footer>
  );

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${theme.bg}`} style={theme.sans}>
      {/* Estilos auxiliares para animação contínua do plantão e fontes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400;1,700&display=swap');
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 42s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {renderHeader()}

      <div className="flex-1">
        {currentView === 'home' && renderHome()}
        {currentView === 'category' && renderCategoryPage()}
        {currentView === 'article' && renderArticlePage()}
        {currentView === 'admin' && renderAdminPanel()}
      </div>

      {renderFooter()}

      {/* Toast de feedback editorial */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white border-l-4 border-[#B91C1C] px-4 py-3 shadow-2xl flex items-center gap-2.5 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}