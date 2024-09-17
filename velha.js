var JogadorDaVez = "X";
var selecionados = []; // Array para armazenar os itens selecionados
var placar = [0, 0]; 

let Ganhador = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

atualizarPlacar()

function Selecionado(quadrado) {
    let btn = document.getElementById("q" + quadrado);
    if (btn.textContent !== "") return;
    btn.textContent = JogadorDaVez;

    selecionados.push({quadrado: quadrado, jogador: JogadorDaVez}); // Adiciona o item selecionado ao array

    // Troca de jogador antes de checar
    TrocaDeJogador(btn);

    // Check só após a troca de jogador
    check();
}

function TrocaDeJogador(btn) {
    if (JogadorDaVez === "X") {
        btn.style.background = "#4287f5";
        JogadorDaVez = "O";
    } else {
        btn.style.background = "#64FE93";
        JogadorDaVez = "X";
    }
    document.getElementById("player").textContent = JogadorDaVez;
}

function check() {
    // Cria um array com os quadrados selecionados pelo jogador anterior
    let jogadorAnterior = JogadorDaVez === "X" ? "O" : "X";
    let selecionadosJogador = selecionados.filter(s => s.jogador === jogadorAnterior).map(s => s.quadrado);

    for (let combinacao of Ganhador) {
        if (combinacao.every(item => selecionadosJogador.includes(item))) {
            setTimeout(() => {
                alert(jogadorAnterior + " venceu!"); // Exibe o alerta após 1 segundo
                if (jogadorAnterior === "X") {
                    placar[0] += 1; 
                } else {
                    placar[1] += 1;
                }
                atualizarPlacar();
                resetGame();
            }, 200); // Atraso de 1 segundo (1000 ms)
            return;
        }
    }

    // Verifica se todos os quadrados foram preenchidos
    if (selecionados.length === 9) {
        setTimeout(() => {
            alert("Empate!"); // Atraso de 1 segundo para empate também
            resetGame();
        }, 1000);
    }
}

function resetGame() {
    // Limpa o tabuleiro
    for (let i = 1; i <= 9; i++) {
        let btn = document.getElementById("q" + i);
        btn.textContent = "";
        btn.style.backgroundColor = ""; // Limpa a cor de fundo
    }
    
    selecionados = [];
    
    JogadorDaVez = "X";
    document.getElementById("player").textContent = JogadorDaVez;
}

function atualizarPlacar() {
    document.getElementById("placar").textContent = `X = ${placar[0]} vs O = ${placar[1]}`;
}
