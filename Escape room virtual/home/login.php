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
    // Verifica se 'email' e 'senha' estão definidos
    if (isset($_POST['email']) && isset($_POST['senha'])) {
        // Sanitiza os dados de entrada
        $email = mysqli_real_escape_string($con, $_POST['email']);
        $senha = mysqli_real_escape_string($con, $_POST['senha']);

        // Verifica se os campos estão preenchidos
        if (empty($email) || empty($senha)) {
            echo "Por favor, preencha todos os campos.";
        } else {
            // Consulta para verificar as credenciais
            $sql = "SELECT * FROM usuarios WHERE email='$email' AND senha='$senha'";
            $result = mysqli_query($con, $sql);

            if (mysqli_num_rows($result) == 1) {
                // Login bem-sucedido
                header("Location: home.html");
                exit();
            } else {
                // Credenciais inválidas
                echo "Email ou senha inválidos.";
            }
        }
    } else {
        echo "Por favor, preencha todos os campos.";
    }
}

// Fecha a conexão
mysqli_close($con);

$sql = "SELECT * FROM usuarios WHERE email='$email'";
$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result) == 1) {
    $usuario = mysqli_fetch_assoc($result);
    
    // Verifica se a senha está correta
    if (password_verify($senha, $usuario['senha'])) {
        // Login bem-sucedido
        header("Location: home.html");
        exit();
    } else {
        echo "Email ou senha inválidos.";
    }
} else {
    echo "Email ou senha inválidos.";
}

?>
