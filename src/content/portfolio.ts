/**
 * Conteúdo de exemplo para avaliar o desenho.
 * Troque pelos seus dados quando quiser — a página inteira lê daqui.
 * Um href "#" não navega. Um href que começa com http abre em nova aba.
 * Em cada projeto, `accent` colore o endereço e a tinta da gravura.
 * `motif` "hatch", "dots" ou "cross" imprime o fundo; "plain" deixa o papel liso.
 * Na aba, o retrato seleciona o projeto. O botão da chapa abre `/projetos/slug`.
 * Cada projeto tem três `tags`, quatro `marks` e um `poster`.
 * `mark: "novo"` imprime a tarja. A ordem do elenco está em `rosterSlots`.
 * As gravuras ficam em `public/projetos/`.
 * `linkLabel` nomeia o link externo da folha quando o href começa com http.
 * O perfil tem `trade` e três `tags`. Escrituras e leituras têm `id`.
 * Uma leitura pode ter `cover`, o caminho da capa em `public/`.
 * O clique seleciona a escritura ou a leitura. O botão "Ler" só aparece se o href começa com http.
 */

export type InlinePart = {
  text: string;
  href?: string;
  badge?: boolean;
};

export type SocialIcon = "linkedin" | "github" | "mail";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIcon;
};

export type ProjectIcon =
  | "book"
  | "clipboard"
  | "grid"
  | "bell"
  | "notebook"
  | "type";

export type Wash =
  | "verdigris"
  | "sand"
  | "periwinkle"
  | "rose"
  | "sage"
  | "stone";

export type Accent = "teal" | "ochre" | "plum" | "red" | "green" | "blue";

export type Motif = "hatch" | "dots" | "cross" | "plain";

export const posterIds = ["lamp", "press", "sheet", "pin", "folio", "sort"] as const;

export type PosterId = (typeof posterIds)[number];

export const craftMarks = [
  "tipo",
  "grade",
  "cor",
  "papel",
  "movimento",
  "prova",
  "voz",
  "medida",
] as const;

export type CraftMark = (typeof craftMarks)[number];

export const craftMarkLabel: Record<CraftMark, string> = {
  tipo: "Tipo",
  grade: "Grade",
  cor: "Cor",
  papel: "Papel",
  movimento: "Movimento",
  prova: "Prova",
  voz: "Voz",
  medida: "Medida",
};

export type ProjectFigure = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  url: string;
  href: string;
  linkLabel?: string;
  icon: ProjectIcon;
  accent: Accent;
  motif: Motif;
  mark?: "novo";
  poster: PosterId;
  tags: readonly [string, string, string];
  marks: readonly [CraftMark, CraftMark, CraftMark, CraftMark];
  figures: ProjectFigure[];
};

export type Writing = {
  id: string;
  title: string;
  dek: string;
  date: string;
  dateTime: string;
  href: string;
};

export type ReadingStatus = "lendo" | "na-mesa" | "lido";

export type Reading = {
  id: string;
  title: string;
  author: string;
  status: ReadingStatus;
  note?: string;
  wash: Wash;
  cover?: string;
};

export const statusLabel: Record<ReadingStatus, string> = {
  lendo: "Lendo",
  "na-mesa": "Na mesa",
  lido: "Lido",
};

export const profile = {
  name: "Luiz Felipe",
  kicker: "Folha pessoal",
  trade: "Full-stack / System Programming",
  tags: ["Full-stack", "Sistemas", "Gráficos"] as const,
  year: 2026,
  description:
    "Sistemas de suporte e controle administrativo, computação gráfica e programação de sistemas.",
  paragraphs: [
    [
      {
        text: "Criou sistemas de suporte e controle administrativo em diferentes empresas e levantou requisitos de pequenas empresas para criar soluções agradáveis. Estuda e gosta bastante de computação gráfica e de programação de sistemas.",
      },
    ],
    [
      { text: "Também gosta de ler " },
      { text: "livros", href: "#lendo" },
      {
        text: " sobre a área, de conhecer tecnologias novas e de escrever ",
      },
      { text: "artigos", href: "#escrituras" },
      { text: " sobre descobertas e feitos." },
    ],
  ] satisfies InlinePart[][],
};

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/feed/",
    icon: "linkedin",
  },
  { label: "GitHub", href: "https://github.com/L-0-W", icon: "github" },
  { label: "E-mail", href: "mailto:fluiz7880@gmail.com", icon: "mail" },
];

export const sections = [
  {
    id: "projetos",
    label: "Projetos",
    dek: "Peças recentes, do desenho à publicação.",
  },
  {
    id: "escrituras",
    label: "Escrituras",
    dek: "Notas curtas sobre ofício, tipo e interface.",
  },
  {
    id: "lendo",
    label: "Lendo",
    dek: "O que está aberto na mesa, e o que já fechou.",
  },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const projects: Project[] = [
  {
    slug: "portal-administrativo",
    title: "Portal Administrativo",
    description:
      "Portal para o dia a dia de uma empresa: boletos, recebimentos, transferências, usuários e plugins para falar com outros lugares, como WhatsApp, Instagram, Gmail e MCP. Nasceu para a Revele Cosméticos e serve a qualquer operação.",
    url: "github.com/L-0-W/revele_portal_muriae",
    href: "https://github.com/L-0-W/revele_portal_muriae",
    linkLabel: "Código",
    icon: "clipboard",
    accent: "ochre",
    motif: "dots",
    mark: "novo",
    poster: "sheet",
    tags: ["Administrativo", "Utilizável", "Em evolução"],
    marks: ["grade", "medida", "prova", "voz"],
    figures: [
      {
        src: "/projetos/portal-recebimentos.png",
        alt: "Tela de recebimentos com o saldo do período, cinco lançamentos e o caixa em dinheiro.",
        title: "Os recebimentos",
        description:
          "O dia entra numa lista, com o saldo, a forma e o que ainda falta lançar.",
      },
      {
        src: "/projetos/portal-boletos.png",
        alt: "Tela de boletos com quatro vencimentos, o total a pagar e um boleto vencido.",
        title: "Os boletos",
        description:
          "Vencimento, situação e o total a pagar ficam no mesmo balcão.",
      },
      {
        src: "/projetos/portal-transferencias.png",
        alt: "Tela de transferências com o formulário e um lançamento entre caixas.",
        title: "As transferências",
        description:
          "O valor sai de um caixa e entra em outro, com a data na mesma linha.",
      },
      {
        src: "/projetos/portal-usuarios.png",
        alt: "Tela de usuários com a conta administradora e as permissões por área.",
        title: "Os usuários",
        description: "Cada conta leva o que pode ver, criar, editar e apagar.",
      },
      {
        src: "/projetos/portal-plugins.png",
        alt: "Tela de plugins com os cartões de MCP, WhatsApp, Instagram e Bling.",
        title: "Os plugins",
        description:
          "Um encaixe para falar com outros lugares: MCP, WhatsApp, Instagram e Bling.",
      },
    ],
  },
];

export type RosterSlot =
  | { kind: "project"; slug: string }
  | { kind: "held"; id: string; title: string }
  | { kind: "sealed"; id: string };

export const rosterSlots: readonly RosterSlot[] = [
  { kind: "project", slug: "portal-administrativo" },
];

export const writings: Writing[] = [];

export const readings: Reading[] = [
  {
    id: "beautiful-cpp",
    title: "Beautiful C++",
    author: "J. Guy Davidson e Kate Gregory",
    status: "lendo",
    wash: "sage",
    cover: "/leituras/beautiful-cpp.png",
  },
  {
    id: "crafting-interpreters",
    title: "Crafting Interpreters",
    author: "Robert Nystrom",
    status: "lendo",
    wash: "stone",
    cover: "/leituras/crafting-interpreters.png",
  },
];
