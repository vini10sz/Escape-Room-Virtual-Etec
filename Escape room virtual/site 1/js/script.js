document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const gameSection = document.getElementById('game');
    const loginSection = document.getElementById('login');
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
        { pergunta: "Quantos continentes existem no mundo?", resposta: "7", letra: "A" },
        { pergunta: "Em que ano ocorreu a Independência do Brasil?", resposta: "1822", letra: "Ç" },
        { pergunta: "Qual é o maior planeta do sistema solar?", resposta: "Júpiter", letra: "I" }
    ];

    let faseAtual = 0;
    let timeLeft = 90;
    let timer;
    let letrasObtidas = [];
    const palavraFinalCorreta = "JOGO IMITAÇÃO";

    // Lógica do botão "Estou pronto"
    startBtn.addEventListener('click', function () {
        startBtn.style.display = 'none';  // Esconder o botão "Estou pronto"
        waitingMessage.style.display = 'block';  // Mostrar a mensagem "Aguardando para começar..."
        let countDown = 5;
        const countdownInterval = setInterval(function () {
            waitingMessage.textContent = `Aguarde... Jogo começando em ${countDown} segundos`;
            countDown--;
            if (countDown < 0) {
                clearInterval(countdownInterval);
                loginSection.style.display = 'none';  // Esconde a seção de login
                gameSection.style.display = 'block';  // Mostra a seção de jogo
                carregarFase(faseAtual);
                startTimer();  // Inicia o cronômetro do jogo
            }
        }, 1000);
    });

    // Função do cronômetro
    function startTimer() {
        timeLeft = 90;
        timer = setInterval(function () {
            if (timeLeft <= 0) {
                clearInterval(timer);
                feedbackElement.textContent = "Tempo esgotado! Você perdeu a fase.";
                pularFase();
            } else {
                timeLeft--;
                timerElement.textContent = timeLeft;
            }
        }, 1000);
    }

    // Função para carregar uma nova fase
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

    // Função para verificar a resposta da fase
    document.getElementById('gameForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const answer = document.getElementById('answer').value.toLowerCase();
        
        if (answer === fases[faseAtual].resposta.toLowerCase()) {  // Resposta correta
            feedbackElement.textContent = "Parabéns! Você completou a fase.";
            letrasObtidas.push(fases[faseAtual].letra);
            letrasObtidasElement.textContent = letrasObtidas.join(' ');  // Use um espaço para separar as letras
            console.log("Letras obtidas:", letrasObtidas);  // Debug: Verifique as letras obtidas
            clearInterval(timer);
            faseAtual++;
            carregarFase(faseAtual);
        } else {  // Resposta incorreta
            feedbackElement.textContent = "Resposta incorreta. A fase será pulada.";
            clearInterval(timer);
            pularFase();
        }
    });

    // Função para pular a fase
    document.getElementById('skipBtn').addEventListener('click', function () {
        pularFase();
    });

    function pularFase() {
        clearInterval(timer);
        faseAtual++;
        carregarFase(faseAtual);
    }

    // Mostrar tela final e letras obtidas
    function mostrarTelaFinal() {
        gameSection.style.display = 'none';
        finalScreen.style.display = 'block';
        finalLetters.textContent = letrasObtidas.join(' ');
    }

    // Verificar a palavra final (apenas uma tentativa)
    finalForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const finalWord = document.getElementById('finalWord').value.toUpperCase();
        if (finalWord === palavraFinalCorreta) {
            finalFeedback.textContent = "Parabéns! Você acertou a palavra final e completou o jogo!";
            criarConfeitos();  // Chama a função para criar confeitos quando a palavra final é acertada
        } else {
            finalFeedback.textContent = "GAME OVER! Não há mais tentativas.";
            finalForm.querySelector('button').disabled = true;  // Desabilitar novas tentativas
        }
    });
});
