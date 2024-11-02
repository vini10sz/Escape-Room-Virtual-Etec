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

    let fases = [
        { pergunta: "Qual é o nome do autor da obra 'Dom Casmurro'?", resposta: "Machado de Assis", letra: "M" },
        { pergunta: "Qual é o nome do fenômeno em que a luz é desviada ao passar por um objeto?", resposta: "Refração", letra: "Ã" },
        { pergunta: "Qual é o nome do filósofo grego conhecido como o pai da lógica?", resposta: "Aristóteles", letra: "O" },
        { pergunta: "Qual é a ciência que estuda os seres vivos e seu ambiente?", resposta: "Biologia", letra: "I" },
        { pergunta: "Qual é a capital do Japão?", resposta: "Tóquio", letra: "T" },
        { pergunta: "Qual é o termo para o estudo dos fenômenos climáticos e atmosféricos?", resposta: "Meteorologia", letra: "A" },
        { pergunta: "Qual é a parte do cérebro responsável pelo controle motor e pela coordenação?", resposta: "Cerebelo", letra: "Ç" },
        { pergunta: "Qual é o nome do primeiro homem a pisar na Lua?", resposta: "Neil Armstrong", letra: "I" }
    ];

    let faseAtual = 0;
    let timeLeft = 90;
    let timer;
    let letrasObtidas = [];
    const palavraFinalCorreta = "JOGO IMITAÇÃO";

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
    skipBtn.addEventListener('click', function () {
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

// Função para criar e animar confeitos
function criarConfeitos() {
    const confeitosContainer = document.getElementById('confeitosContainer');

    // Cria 5 confeitos aleatórios
    for (let i = 0; i < 5; i++) {
        const confeito = document.createElement('div');
        confeito.classList.add('confeito');

        // Define a posição aleatória do confeito
        const xPos = Math.random() * 100; // Posição horizontal (em porcentagem)
        const delay = Math.random() * 1; // Atraso aleatório para a animação

        confeito.style.left = `${xPos}%`;
        confeito.style.animationDelay = `${delay}s`;

        // Adiciona o confeito ao contêiner
        confeitosContainer.appendChild(confeito);

        // Remove o confeito após a animação
        setTimeout(() => {
            confeito.remove();
        }, 2000); // Tempo total da animação
    }
}

// ocultar conteudo
document.addEventListener('DOMContentLoaded', function() {
    const realizeTitle = document.querySelector('.realize');
    const gameSection = document.getElementById('game');
    const finalScreen = document.getElementById('finalScreen');
    const loginForm = document.getElementById('loginForm');

    // Esconder o título "FAÇA O CADASTRO PARA INICIAR O JOGO!" quando o usuário acessa outras sections
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio do formulário
        realizeTitle.style.display = 'none';
        gameSection.style.display = 'block';
    });

    // Lógica para mostrar/ocultar "realize" nas sections de perguntas ou tela final
    if (gameSection.style.display === 'block' || finalScreen.style.display === 'block') {
        realizeTitle.style.display = 'none';
    }
});


// Configuração do servidor express
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configurar middleware para lidar com JSON
app.use(bodyParser.json());

// Configurar conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  // Sua senha do MySQL
    database: 'escape_room'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL conectado...');
});

// Endpoint para cadastrar usuário
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Verificar se o nome de usuário já existe
    db.query('SELECT * FROM usuarios WHERE username = ?', [username], async (error, results) => {
        if (results.length > 0) {
            return res.status(400).send('Nome de usuário já existe');
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserir novo usuário no banco de dados
        db.query('INSERT INTO usuarios (username, password) VALUES (?, ?)', [username, hashedPassword], (error, results) => {
            if (error) {
                return res.status(500).send('Erro ao registrar usuário');
            }
            res.status(201).send('Usuário registrado com sucesso');
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

// Login do usuário
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.text();
        alert(data);  // Mostra mensagem de sucesso ou erro
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao registrar usuário');
    }
});
