const botaoCfr1 = document.getElementById("cfr1");
const botaoCfr2 = document.getElementById("cfr2");
const botaoCfr3 = document.getElementById("cfr3");
const botaoReiniciar = document.getElementById("reiniciar");
const botaoReset = document.getElementById("reset");
const mensagem = document.getElementById("mensagem");
const txtTentativas = document.getElementById("contador-tentativas");
const txtVitorias = document.getElementById("contador-vitorias");
const arena = document.getElementById("arena");
const cofres = [botaoCfr1, botaoCfr2, botaoCfr3];

let tentativa = 0;
let vitorias = 0;
let jogoAtivo = true;

let cofreVencedor = Math.floor(Math.random() * 3) + 1;

let indexFujao = Math.floor(Math.random() * cofres.length);

function atualizarPlacar() {
    txtTentativas.textContent = "Tentativas: " + tentativa;
    txtVitorias.textContent = "Presentes: " + vitorias;
}

function verificarCofre(numeroCofre) {
    if (!jogoAtivo) return;

    tentativa++;
    atualizarPlacar();

    if (numeroCofre === cofreVencedor) {
        jogoAtivo = false;
        vitorias++;
        atualizarPlacar();
        mensagem.textContent = "PARABÉNS, VOCÊ GANHOU UM PRESENTE!";
    } else {
        jogoAtivo = false;
        mensagem.textContent = "VOCÊ ERROU O PRESENTE! Clique em 'Jogar Novamente' para tentar de novo.";
    }
}

botaoCfr1.addEventListener("click", function() {
    verificarCofre(1);
});

botaoCfr2.addEventListener("click", function() {
    verificarCofre(2);
});

botaoCfr3.addEventListener("click", function() {
    verificarCofre(3);
});

botaoCfr1.addEventListener("click", function() { verificarCofre(1); });
botaoCfr2.addEventListener("click", function() { verificarCofre(2); });
botaoCfr3.addEventListener("click", function() { verificarCofre(3); });

cofres.forEach(function(cofre, index) {
    cofre.addEventListener("mouseenter", function() {
        if (!jogoAtivo) return;

        if (index === indexFujao) {
            atualizarPlacar();

            const largura = arena.clientWidth - cofre.offsetWidth;
            const altura = arena.clientHeight - cofre.clientHeight;

            const x = Math.random() * largura;
            const y = Math.random() * altura;

            cofre.style.left = x + 'px';
            cofre.style.top = y + 'px';

            mensagem.textContent = "Tentativas de clicar no cofre: " + tentativa;
        }
    });
});

function novaRodada() {
    jogoAtivo = true;
    atualizarPlacar();
    
    cofreVencedor = Math.floor(Math.random() * 3) + 1;
    indexFujao = Math.floor(Math.random() * cofres.length);
}

botaoReset.addEventListener("click", function() {
    novaRodada();
    mensagem.textContent = "O JOGO FOI REINICIADO!";
});

botaoReiniciar.addEventListener("click", function() {
    tentativa = 0;
    vitorias = 0;
    atualizarPlacar();
    mensagem.textContent = "O SEU PLACAR FOI REINICIADO!";
});