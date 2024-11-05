<?php
include('conexao.php');
session_start();
$erro = ''; // Variável para armazenar a mensagem de erro

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // Verificar se o usuário existe
    $sql = "SELECT id, senha FROM usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $hashed_password);

    if ($stmt->num_rows > 0) {
        $stmt->fetch();
        // Verificar a senha
        if (password_verify($senha, $hashed_password)) {
            $_SESSION['id'] = $id;
            header("Location: home.html"); // Redireciona para a página home.html
            exit();
        } else {
            $erro = "Senha incorreta.";
        }
    } else {
        $erro = "Usuário não encontrado.";
    }
    $stmt->close();
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conecte-se</title>
    <link rel="icon" href="../imgs/key.png" type="image/x-icon">
    <link rel="stylesheet" href="styleLogin.css"> 
</head>
<body>
<h1>Escape Room</h1>
<h2>Virtual</h2>
<div class="form">

    <h2 class='realize'>Faça o Login para Jogar!</h2>

    <div style="color: red; font-size: 1em; font-family: 'Press Start 2P', cursive;">
        <?php echo $erro; ?>
    </div>

    <form method="POST" action="login.php">
        <label for="email">Email:</label><br>
        <input type="email" name="email" required><br><br>

        <label for="senha">Senha:</label><br>
        <input type="password" name="senha" required><br><br>

        <button type="submit" class="enviar">Entrar</button>
    </form>

    <div class="divConta">
        <span class="txtConta">Ainda não tem conta? <a class="txtConectar" href="index.html">Cadastre-se!</a></span>
    </div>
</div>
</body>
</html>
