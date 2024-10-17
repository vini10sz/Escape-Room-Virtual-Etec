document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const gameSection = document.getElementById('game');
    const loginSection = document.getElementById('login');
    const gameForm = document.getElementById('gameForm');
    const skipBtn = document.getElementById('skipBtn');
    const timerElement = document.getElementById('timeLeft');
    const feedbackElement = document.getElementById('feedback');
    const challengeElement = document.getElementById('challenge');
    const faseNumeroElement = document.getElementById('faseNumero');
    const letrasObtidasElement = document.getElementById('letrasObtidas');
    const finalScreen = document.getElementById('finalScreen');
    const finalLetters = document.getElementById('finalLetters');
    const finalForm = document.getElementById('finalForm');
    const finalFeedback = document.getElementById('finalFeedback');

    // Novas fases com as letras desejadas
    let fases = [
        const perguntasRespostas = [
            { pergunta: "Qual é o nome do animal conhecido como o rei da selva?", resposta: "leão", letra: "B" }, // "B" - O animal é o "B" da palavra "Leão"
            { pergunta: "Qual é o maior continente do mundo?", resposta: "Ásia", letra: "U" }, // "U" - O continente é a "U" da palavra "Ásia"
            { pergunta: "Qual fruta é conhecida por ser vermelha ou verde e tem sementes por fora?", resposta: "morango", letra: "S" }, // "S"
            { pergunta: "Qual é o nome do nosso planeta?", resposta: "Terra", letra: "C" }, // "C" - O planeta é o "C" da palavra "Terra"
            { pergunta: "Qual é o líquido que bebemos para nos manter hidratados?", resposta: "água", letra: "A" } // "A" - O líquido é a "A" da palavra "Água"
        ];
        
    ];

    let faseAtual = 0;
    let timeLeft = 90;
    let timer;
    let letrasObtidas = [];
    const palavraFinalCorreta = "BUSCA LETRAS";

    // Função para começar o jogo após login
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        loginSection.style.display = 'none';
        gameSection.style.display = 'block';
        carregarFase(faseAtual);
        startTimer();
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
    gameForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const answer = document.getElementById('answer').value.toLowerCase();

        if (answer === fases[faseAtual].resposta) {  // Resposta correta
            feedbackElement.textContent = "Parabéns! Você completou a fase.";
            letrasObtidas.push(fases[faseAtual].letra);
            letrasObtidasElement.textContent = letrasObtidas.join('');
            clearInterval(timer);
            faseAtual++;
            carregarFase(faseAtual);
        } else {  // Resposta incorreta, pula a fase
            feedbackElement.textContent = "Resposta incorreta. A fase será pulada.";
            clearInterval(timer);
            pularFase();
        }
    });

    // Função para pular a fase
    skipBtn.addEventListener('click', function () {
        pularFase();
    });

    // Função para pular a fase manualmente ou automaticamente
    function pularFase() {
        faseAtual++;
        if (faseAtual < fases.length) {
            carregarFase(faseAtual);
        } else {
            mostrarTelaFinal();
        }
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
        } else {
            finalFeedback.textContent = "Você perdeu o desafio. Não há mais tentativas.";
            finalForm.querySelector('button').disabled = true;  // Desabilitar novas tentativas
        }
    });
});
