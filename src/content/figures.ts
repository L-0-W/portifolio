/**
 * Pessoas da grade no lugar do retrato.
 * `fame` substitui a bio durante o glitch.
 * `fragments` caem no fundo enquanto a carta está selecionada.
 * `src` entra quando houver foto; sem ele, a carta mostra só o nome.
 */

export type FigureField = "computacao" | "fisica" | "matematica";

export type Figure = {
  id: string;
  name: string;
  field: FigureField;
  fame: string;
  fragments: readonly string[];
  src?: string;
  alt?: string;
};

export const fieldLabel: Record<FigureField, string> = {
  computacao: "computação",
  fisica: "física",
  matematica: "matemática",
};

export const figures: readonly Figure[] = [
  {
    id: "lovelace",
    name: "Ada Lovelace",
    field: "computacao",
    fame: "Escreveu o primeiro algoritmo publicado, pensado para a Máquina Analítica de Babbage.",
    fragments: ["Note G", "Babbage", "loop", "Bernoulli", "A = B + C"],
  },
  {
    id: "turing",
    name: "Alan Turing",
    field: "computacao",
    fame: "Definiu a máquina de Turing e perguntou se uma máquina pode pensar.",
    fragments: ["M = (Q, Σ, δ, q0)", "δ(q, s)", "halt", "computável", "0 e 1"],
  },
  {
    id: "hopper",
    name: "Grace Hopper",
    field: "computacao",
    fame: "Criou o primeiro compilador e ajudou a desenhar o COBOL.",
    fragments: ["COBOL", "compiler", "A = B + C", "FLOW-MATIC", "bug"],
  },
  {
    id: "neumann",
    name: "John von Neumann",
    field: "computacao",
    fame: "Descreveu a arquitetura de programa armazenado que os computadores ainda usam.",
    fragments: ["fetch", "decode", "execute", "programa na memória", "EDVAC"],
  },
  {
    id: "shannon",
    name: "Claude Shannon",
    field: "computacao",
    fame: "Fundou a teoria da informação e deu nome ao bit.",
    fragments: ["H = - Σ p log2 p", "bit", "C = B log2(1 + S/N)", "entropia", "XOR"],
  },
  {
    id: "dijkstra",
    name: "Edsger Dijkstra",
    field: "computacao",
    fame: "Criou o algoritmo do caminho mínimo e defendeu a programação estruturada.",
    fragments: [
      "dist[v] = min(dist[v], dist[u] + w)",
      "caminho mínimo",
      "sem goto",
      "semáforo",
      "fila de prioridade",
    ],
  },
  {
    id: "knuth",
    name: "Donald Knuth",
    field: "computacao",
    fame: "Escreveu The Art of Computer Programming e formalizou a análise de algoritmos.",
    fragments: ["O(n log n)", "TeX", "TAOCP", "análise", "MIX"],
  },
  {
    id: "hamilton",
    name: "Margaret Hamilton",
    field: "computacao",
    fame: "Liderou o software de voo da Apollo e ajudou a nomear a engenharia de software.",
    fragments: ["Apollo", "prioridade", "assíncrono", "1201", "engenharia de software"],
  },
  {
    id: "berners-lee",
    name: "Tim Berners-Lee",
    field: "computacao",
    fame: "Inventou a World Wide Web: o HTTP, o HTML e o endereço URL.",
    fragments: ["HTTP", "HTML", "URL", "GET /", "<a href>"],
  },
  {
    id: "newton",
    name: "Isaac Newton",
    field: "fisica",
    fame: "Formulou as leis do movimento, a gravitação e o cálculo.",
    fragments: ["F = ma", "F = G m1 m2 / r^2", "v = u + at", "s = ut + 1/2 at^2", "fluxão"],
  },
  {
    id: "maxwell",
    name: "James Clerk Maxwell",
    field: "fisica",
    fame: "Uniu eletricidade e magnetismo nas equações do campo eletromagnético.",
    fragments: ["div E = ρ / ε0", "div B = 0", "rot E = - dB/dt", "c = 1/√(ε0 μ0)", "campo"],
  },
  {
    id: "curie",
    name: "Marie Curie",
    field: "fisica",
    fame: "Descobriu a radioatividade e isolou o polônio e o rádio.",
    fragments: ["A = A0 e^(-λt)", "λ = ln 2 / T", "polônio", "rádio", "becquerel"],
  },
  {
    id: "feynman",
    name: "Richard Feynman",
    field: "fisica",
    fame: "Reformulou a eletrodinâmica quântica e desenhou os diagramas que levam o seu nome.",
    fragments: ["QED", "iħ ∂ψ/∂t = Hψ", "integral de caminho", "diagrama", "α ≈ 1/137"],
  },
  {
    id: "euler",
    name: "Leonhard Euler",
    field: "matematica",
    fame: "Ligou exponencial, imaginário e π na identidade e^(iπ) + 1 = 0, e abriu a teoria dos grafos.",
    fragments: ["e^(iπ) + 1 = 0", "V - E + F = 2", "Σ 1/n^2 = π^2/6", "e", "f(x)"],
  },
  {
    id: "gauss",
    name: "Carl Friedrich Gauss",
    field: "matematica",
    fame: "Demonstrou o teorema fundamental da álgebra e descreveu a distribuição normal.",
    fragments: ["ax^2 + bx + c = 0", "e^(-x^2 / 2)", "mínimos quadrados", "mod p", "média"],
  },
  {
    id: "noether",
    name: "Emmy Noether",
    field: "matematica",
    fame: "Mostrou que cada simetria contínua corresponde a uma lei de conservação.",
    fragments: ["δS = 0", "∂T = 0", "simetria", "anel", "ideal"],
  },
];
