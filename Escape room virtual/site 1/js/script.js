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
        { pergunta: "Qual é a primeira letra da palavra 'amor'?", resposta: "a", letra: "A" },
        { pergunta: "Que letra tem um cedilha e se usa em 'açaí'?", resposta: "ç", letra: "Ç" },
        { pergunta: "Qual é a nona letra do alfabeto?", resposta: "i", letra: "I" },
        { pergunta: "Qual é a letra que aparece no final da palavra 'pão'?", resposta: "ã", letra: "Ã" },
        { pergunta: "Qual letra aparece duas vezes em 'imitar'?", resposta: "i", letra: "I" },
        { pergunta: "Qual a primeira letra da palavra 'mãe'?", resposta: "m", letra: "M" },
        { pergunta: "Qual a última letra da palavra 'limão'?", resposta: "o", letra: "O" },
        { pergunta: "Que letra está no meio da palavra 'tempo'?", resposta: "t", letra: "T" }
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
        
        if (answer === fases[faseAtual].resposta) {  // Resposta correta
            feedbackElement.textContent = "Parabéns! Você completou a fase.";
            letrasObtidas.push(fases[faseAtual].letra);
            letrasObtidasElement.textContent = letrasObtidas.join('');
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
        } else {
            finalFeedback.textContent = "GAME OVER! Não há mais tentativas.";
            finalForm.querySelector('button').disabled = true;  // Desabilitar novas tentativas
        }
    });
});


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
