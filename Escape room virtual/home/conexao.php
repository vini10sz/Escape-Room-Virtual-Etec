<?php
$servername = "localhost"; // Nome do servidor
$username = "root";        // Nome de usuário do banco de dados
$password = "";            // Senha do banco de dados root2023
$dbname = "escape_room";   // Nome do banco de dados

// Conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
?>
