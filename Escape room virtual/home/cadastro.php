<?php
$host = "localhost";
$user = "root";
$pass = "";
$base = "escape_room";

// Conecta ao banco de dados
$con = mysqli_connect($host, $user, $pass, $base);

// Verifica a conexão
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

// Verifica se o formulário foi submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitização dos dados de entrada
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    
    // Verifica se todos os campos estão preenchidos
    if (empty($nome) || empty($email) || empty($senha)) {
        echo "Por favor, preencha todos os campos.";
    } else {
        // Usa prepared statements para evitar SQL injection
        $stmt = $con->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $nome, $email, $senha);
        
        if ($stmt->execute()) {
            header("Location: login.html");
            // Redirecionar para uma página protegida ou inicial
exit();            
        } else {
            echo "Erro ao cadastrar professor: " . $stmt->error;
        }
        
        $stmt->close();
    }
}

// Fecha a conexão
mysqli_close($con);

// Criptografa a senha
$senhaCriptografada = password_hash($senha, PASSWORD_DEFAULT);

// Usa prepared statements para evitar SQL injection
$stmt = $con->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nome, $email, $senhaCriptografada);

?>
