<?php
include('conexao.php');
$erro = ''; // Variável para armazenar a mensagem de erro
$sucesso = ''; // Variável para armazenar a mensagem de sucesso

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT); // Criptografar senha

    // Verificar se o email já existe
    $sql = "SELECT id FROM usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $erro = "Este email já está em uso."; // Armazena a mensagem de erro
    } else {
        // Inserir novo usuário
        $sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $nome, $email, $senha);

        if ($stmt->execute()) {
            $sucesso = "Cadastro realizado com sucesso!"; // Armazena a mensagem de sucesso
        } else {
            $erro = "Erro: " . $stmt->error; // Armazena a mensagem de erro
        }
    }
    $stmt->close();
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Cadastro</title>
    <style>
        .alert {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px;
            border-radius: 5px;
            z-index: 1000;
        }
        .alert-error {
            background-color: #f44336; /* Vermelho */
            color: white;
        }
        .alert-success {
            background-color: #4CAF50; /* Verde */
            color: white;
        }
    </style>
</head>
<body>
    
    <!-- Alert -->
    <?php if ($erro): ?>
        <div class="alert alert-error"><?php echo $erro; ?></div>
    <?php endif; ?>
    
    <?php if ($sucesso): ?>
        <div class="alert alert-success"><?php echo $sucesso; ?></div>
        <script>
            setTimeout(function() {
                window.location.href = "home.html"; // Redireciona após 3 segundos
            }, 3000); // 3000 milissegundos = 3 segundos
        </script>
    <?php endif; ?>

    
</body>
</html>
