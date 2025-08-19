const tamanho = 5;
const numNavios = 3;
let navios = [];
let acertos = 0;
let fimDeJogo = false;

// Gerar tabuleiro
const tabuleiro = document.getElementById("tabuleiro");
for (let y = 0; y < tamanho; y++) {
  for (let x = 0; x < tamanho; x++) {
    const celula = document.createElement("div");
    celula.classList.add("celula");
    celula.dataset.x = x;
    celula.dataset.y = y;
    celula.addEventListener("click", aoClicarNaCelula);
    tabuleiro.appendChild(celula);
  }
}

// ==========================
// Função para gerar navios
// ==========================
function gerarNavios() {
  const posicoes = [];

  while (posicoes.length < numNavios) {
    const x = Math.floor(Math.random() * tamanho);
    const y = Math.floor(Math.random() * tamanho);

    // Verificar se já existe essa posição
    const existe = posicoes.some(p => p.x === x && p.y === y);
    if (!existe) {
      posicoes.push({ x, y });
    }
  }

  return posicoes; // Retorna array de objetos {x, y}
}

// Chamada inicial da função
navios = gerarNavios();

// ==============================
// Função para tratar cliques
// ==============================
function aoClicarNaCelula(event) {
  if (fimDeJogo) return;

  const celula = event.currentTarget;
  const x = parseInt(celula.dataset.x);
  const y = parseInt(celula.dataset.y);

  // Impedir clique repetido
  if (celula.classList.contains("clicado")) return;
  celula.classList.add("clicado");

  // Verificar se é acerto ou erro
  const acertou = navios.some(p => p.x === x && p.y === y);
  if (acertou) {
    celula.innerText = "💥";
    acertos++;
  } else {
    celula.innerText = "🌊";
  }

  // Verificar se o jogo terminou
  if (acertos === numNavios) {
    fimDeJogo = true;
    setTimeout(() => alert("Você afundou todos os navios!"), 200);
  }
}

// ==============================
// Testes Unitários no Console
// ==============================
function testarGeracaoDeNavios() {
  const n = gerarNavios();

  // Teste 1 - quantidade correta
  console.log("Teste 1 - Quantidade correta:", n.length === numNavios);

  // Teste 2 - posições únicas
  const unicos = new Set(n.map(p => `${p.x},${p.y}`));
  console.log("Teste 2 - Sem repetições:", unicos.size === numNavios);

  // Teste 3 - dentro do tabuleiro
  const dentroDosLimites = n.every(p => p.x >= 0 && p.x < tamanho && p.y >= 0 && p.y < tamanho);
  console.log("Teste 3 - Dentro dos limites:", dentroDosLimites);
}
