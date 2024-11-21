document.addEventListener('DOMContentLoaded', function () {
    const loginSection = document.getElementById('login');
    const gameSection = document.getElementById('game');
    const startBtn = document.getElementById('startBtn');
    const waitingMessage = document.getElementById('waitingMessage');
    const timerElement = document.getElementById('timeLeft');
    const feedbackElement = document.getElementById('feedback');
    const challengeElement = document.getElementById('challenge');
    const faseNumeroElement = document.getElementById('faseNumero');
    const letrasObtidasElement = document.getElementById('letrasObtidas');
    const finalScreen = document.getElementById('finalScreen');
    const finalLetters = document.getElementById('finalLetters');
    const finalForm = document.getElementById('finalForm');
    const finalFeedback = document.getElementById('finalFeedback');

    let fases = [
        { pergunta: "Qual é o nome do autor da obra 'Dom Casmurro'?", resposta: "Machado de Assis", letra: "M" },
        { pergunta: "Qual é o nome do fenômeno em que a luz é desviada ao passar por um objeto?", resposta: "Refração", letra: "Ã" },
        { pergunta: "Qual é o nome do filósofo grego conhecido como o pai da lógica?", resposta: "Aristóteles", letra: "O" },
        { pergunta: "Qual é a ciência que estuda os seres vivos e seu ambiente?", resposta: "Biologia", letra: "I" },
        { pergunta: "Qual é a capital do Japão?", resposta: "Tóquio", letra: "T" },
        { pergunta: "Quantos continentes existem no mundo?", resposta: "6", letra: "A" },
        { pergunta: "Em que ano ocorreu a Independência do Brasil?", resposta: "1822", letra: "Ç" },
        { pergunta: "Qual é o maior planeta do sistema solar?", resposta: "Júpiter", letra: "I" }
    ];

    let faseAtual = 0;
    let timeLeft = 60;
    let timer;
    let letrasObtidas = [];
    const palavraFinalCorreta = "JOGO IMITAÇÃO";

    startBtn.addEventListener('click', function () {
        startBtn.style.display = 'none';
        waitingMessage.style.display = 'block';
        let countDown = 5;
        const countdownInterval = setInterval(function () {
            waitingMessage.textContent = `Aguarde... Jogo começando em ${countDown} segundos`;
            countDown--;
            if (countDown < 0) {
                clearInterval(countdownInterval);
                loginSection.style.display = 'none';
                gameSection.style.display = 'block';
                carregarFase(faseAtual);
            }
        }, 1000);
    });

    function startTimer() {
        timeLeft = 60;
        timer = setInterval(function () {
            if (timeLeft <= 0) {
                clearInterval(timer);
                feedbackElement.textContent = "Tempo esgotado! Tente novamente.";
                faseAtual++;
                carregarFase(faseAtual);
            } else {
                timeLeft--;
                timerElement.textContent = timeLeft;
            }
        }, 1000);
    }

    function carregarFase(faseIndex) {
        if (faseIndex >= fases.length) {
            mostrarTelaFinal();
            return;
        }
        challengeElement.textContent = fases[faseIndex].pergunta;
        faseNumeroElement.textContent = `Fase ${faseIndex + 1}`;
        feedbackElement.textContent = '';
        document.getElementById('answer').value = '';
        startTimer();
    }

    document.getElementById('gameForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const answer = document.getElementById('answer').value.toLowerCase();
        if (answer === fases[faseAtual].resposta.toLowerCase()) {
            feedbackElement.textContent = "Parabéns! Você completou a fase.";
            letrasObtidas.push(fases[faseAtual].letra);
            letrasObtidasElement.textContent = letrasObtidas.join(' ');
            clearInterval(timer);
            faseAtual++;
            carregarFase(faseAtual);
        } else {
            feedbackElement.textContent = "Resposta incorreta. Tente novamente.";
        }
    });

    function mostrarTelaFinal() {
        gameSection.style.display = 'none';
        finalScreen.style.display = 'block';
        finalLetters.textContent = letrasObtidas.join(' ');
    }

    finalForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const finalWord = document.getElementById('finalWord').value.toUpperCase();
        if (finalWord === palavraFinalCorreta) {
            finalFeedback.textContent = "Parabéns! Você venceu o jogo!";
        } else {
            finalFeedback.textContent = "Palavra incorreta. Tente novamente.";
        }
    });
});
