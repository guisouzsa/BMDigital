// Todos os textos da landing page. Edite aqui sem mexer nos componentes.
// Títulos são { lead, accent }: o "accent" é a parte final, exibida em azul (assinatura da marca).
// Tom: quem fala entende de operação, venda e negócio. Sem frases de coach, sem jargão de agência.

export type Title = { lead: string; accent: string };

/** Navegação principal (barra no topo; menu em telas menores). `id` = âncora real da seção. */
export const nav = [
  { id: "inicio", label: "Início" },
  { id: "operacao", label: "A operação" },
  { id: "pilares", label: "Pilares" },
  { id: "seo-ia", label: "SEO para IA" },
  { id: "comercial", label: "Comercial" },
  { id: "como-funciona", label: "Como funciona" },
  { id: "contato", label: "Contato" },
] as const;

export type NavId = (typeof nav)[number]["id"];

export const hero = {
  label: "Assessoria de growth e vendas",
  title: { lead: "Do primeiro clique", accent: "à venda fechada." } satisfies Title,
  lead: "Atrair o lead é só uma parte. O que acontece depois é o que transforma oportunidade em venda.",
  cta: "Falar com a BM Digital",
  secondary: "Ver a operação",
};

export const problem = {
  label: "O problema",
  title: { lead: "O problema começa", accent: "quando o lead chega." } satisfies Title,
  intro: "Atrair pessoas é só uma parte do trabalho.",
  // Os pontos em que a cadeia quebra: causa → consequência
  breaks: [
    { cause: "Se o produto não está bem posicionado,", effect: "o anúncio perde força." },
    { cause: "Se a página não convence,", effect: "o investimento aumenta." },
    { cause: "Se o atendimento demora,", effect: "o lead esfria." },
    { cause: "Se não existe acompanhamento,", effect: "oportunidades simplesmente desaparecem." },
  ],
  closing: "A BM Digital olha para essa cadeia inteira, porque venda não acontece em uma única etapa.",
};

export const machine = {
  label: "A máquina",
  title: { lead: "Uma venda nunca depende", accent: "só do anúncio." } satisfies Title,
  lines: [
    "O anúncio pode trazer a oportunidade.",
    "A página pode transformar atenção em interesse.",
    "O atendimento pode transformar interesse em conversa.",
    "O comercial pode transformar conversa em venda.",
  ],
  closing: "O que fazemos é conectar essas partes para que elas trabalhem como uma única operação.",
  chain: ["Produto", "Posicionamento", "Aquisição", "Conversão", "Comercial", "Venda"],
};

export const pillars = {
  label: "Os três pilares",
  title: { lead: "Da construção", accent: "à venda." } satisfies Title,
  items: [
    {
      number: "01",
      name: "Construção",
      pillar: "Construção e Embalagem",
      text: "O produto precisa existir antes de ser vendido. Estruturamos a oferta, a apresentação e os pontos de contato que transformam uma ideia em algo comercializável.",
      details: ["Oferta", "Infoproduto", "Landing pages"],
    },
    {
      number: "02",
      name: "Aquisição",
      pillar: "Aquisição e Posicionamento",
      text: "Colocamos a oferta diante das pessoas certas e trabalhamos o posicionamento para que ela seja encontrada: nos mecanismos de busca, nas redes e também nas novas ferramentas de pesquisa por IA.",
      details: ["Meta", "TikTok", "Google", "Busca por IA"],
    },
    {
      number: "03",
      name: "Comercial",
      pillar: "A Máquina de Vendas",
      text: "Quando o interesse chega, a operação precisa saber o que fazer com ele. Atendimento, recuperação, follow-up e fechamento fazem parte da mesma estratégia.",
      details: ["Call center próprio", "Recuperação", "Follow-up", "Fechamento 1 a 1"],
    },
  ],
};

export const aiSeo = {
  label: "SEO para IA",
  title: { lead: "A forma de pesquisar", accent: "está mudando." } satisfies Title,
  before: "Durante anos, a disputa era pela primeira página do Google.",
  now: "Agora, uma parte das pesquisas começa em uma conversa com uma inteligência artificial.",
  askIntro: "Quando alguém pergunta",
  question: "Quem é referência em determinado assunto?",
  askOutro: "a sua empresa aparece nessa resposta?",
  closing: "Trabalhamos posicionamento para mecanismos de busca tradicionais e para ambientes de busca baseados em IA.",
  references: ["Google", "ChatGPT", "Gemini", "Claude"],
};

export const commercial = {
  label: "Depois do clique",
  title: { lead: "E depois que", accent: "alguém clica?" } satisfies Title,
  intro: ["É aqui que muita operação termina.", "Para nós, é onde começa a parte mais importante."],
  chain: ["Clique", "Contato", "Atendimento", "Qualificação", "Follow-up", "Venda"],
  principles: [
    "Cada etapa precisa ter uma função.",
    "Cada contato precisa ter contexto.",
    "E cada oportunidade precisa saber para onde ir.",
  ],
  structure: "A BM Digital tem estrutura própria de operação comercial: atendimento, recuperação, follow-up e fechamento de vendas complexas, 1 a 1.",
  cta: "Falar com a BM Digital",
};

export const diagnosis = {
  label: "Raio-X da operação",
  title: { lead: "Onde sua operação", accent: "está travando?" } satisfies Title,
  hint: "Escolha uma etapa",
  areas: [
    { id: "produto", name: "Produto", question: "Você sabe exatamente o que está vendendo, e por que alguém deveria comprar?" },
    { id: "aquisicao", name: "Aquisição", question: "O investimento está trazendo apenas tráfego ou pessoas com potencial real de compra?" },
    { id: "conversao", name: "Conversão", question: "A página transforma interesse em ação?" },
    { id: "comercial", name: "Comercial", question: "Quantas oportunidades deixam de ser acompanhadas?" },
    { id: "escala", name: "Escala", question: "O que funciona hoje conseguiria funcionar com 2x ou 5x mais demanda?" },
  ],
  closing: "Antes de colocar mais dinheiro na operação, precisamos descobrir onde ele está sendo perdido.",
  cta: "Falar com a BM Digital",
};

export const process = {
  label: "Como trabalhamos",
  title: { lead: "Um método,", accent: "seis etapas." } satisfies Title,
  steps: [
    { name: "Diagnóstico", text: "Onde a venda trava." },
    { name: "Estratégia", text: "O plano e as prioridades." },
    { name: "Estruturação", text: "Produto, páginas e processos." },
    { name: "Operação", text: "Aquisição e comercial rodando." },
    { name: "Otimização", text: "Ajustes guiados por dados." },
    { name: "Escala", text: "Crescer o que funciona." },
  ],
};

export const positioning = {
  label: "Para quem é",
  title: { lead: "Para quem quer vender", accent: "com estrutura." } satisfies Title,
  profiles: [
    {
      tag: "Com quem trabalhamos",
      text: "Especialistas, infoprodutores e empresas que já têm um produto ou uma oferta e querem transformar interesse em vendas de forma consistente.",
    },
    {
      tag: "Como pensamos",
      text: "Posts, anúncios e relatórios são importantes, e funcionam melhor quando fazem parte de uma operação: produto, aquisição, atendimento e comercial trabalhando juntos.",
    },
  ],
  statement: { lead: "O tráfego é o começo.", after: "A venda é o destino." },
};

export const manifesto = {
  title: "Não prometemos que um anúncio vai resolver seu negócio.",
  kicker: "Porque normalmente não resolve.",
  text: "Uma operação comercial depende do produto, da oferta, do posicionamento, da aquisição, da conversão e do atendimento. É por isso que trabalhamos olhando para o processo inteiro.",
};

export const finalCta = {
  kicker: "Tem produto. Tem mercado. Falta estrutura para vender?",
  title: { lead: "Seu produto já existe.", accent: "A operação também deveria existir." } satisfies Title,
  lead: "Vamos entender onde sua estrutura está hoje, o que está impedindo a venda e quais partes precisam ser construídas.",
  cta: "Falar com a BM Digital",
};

export const floatLabel = "Falar no WhatsApp";
export const navCta = "Falar no WhatsApp";

export const seo = {
  title: "BM Digital | Assessoria de Growth e Vendas",
  description:
    "A BM Digital é uma assessoria de growth e vendas, liderada por Breno Moreira, que estrutura produtos, aquisição, posicionamento e operação comercial.",
  tagline: "Ideias que geram resultados.",
};
