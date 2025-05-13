<?php
session_start();

if (!isset($_SESSION['usuario_id'])) {
    header('Location: perfil/login.php');
    exit();
}

$usuarioLogado = true; // Usuário está logado
?>

<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memória do Seu Jeito</title>
    <link rel="stylesheet" href="css/style-menu.css">
</head>
<body>
    <header>
        <div class="logo-container">
            <a href="index.php"><img src="logo_katakana.png" alt="Logo do jogo" class="logo"></a>
            <h1>MEMÓRIA DO SEU JEITO</h1>
        </div>
        <div class="user-container">
            <div class="user-icon" onclick="toggleUserDropdown()"></div>
            <div id="user-dropdown" class="user-dropdown hidden">
                <ul>
                    <li><a href="perfil/profile.php">Perfil</a></li>
                    <li><a href="perfil/logout.php">Deslogar</a></li>
                </ul>
            </div>
        </div>
    </header>

    <main>
        <div id="menu-container" class="menu-container">
            <button class="menu-button" onclick="startGameFromMenu()">Jogar</button>
            <button class="menu-button" onclick="window.location.href='html/video.html'">Video Demonstrativo</button>
            <button class="menu-button" onclick="window.location.href='html/home.html'">Home</button>
            <button class="menu-button" onclick="window.location.href='html/sobre.html'">Sobre</button>
            <button class="menu-button" onclick="window.location.href='html/creditos.html'">Créditos</button>
        </div>
        
        <div id="bemvindo-message">
            <h2>Bem-vindo ao Memória do Seu Jeito!</h2>
            <p>Escolha uma opção no menu para começar.</p>
        </div>
        <br>
        
        <div id="dificuldade-menu" class="menu-container hidden">
            <h2>Dificuldade</h2>
            <button class="menu-button" onclick="selectDifficulty('facil')">Fácil</button>
            <button class="menu-button" onclick="selectDifficulty('padrao')">Padrão</button>
            <button class="menu-button" onclick="selectDifficulty('dificil')">Difícil</button>
        </div>

        <div id="tema-menu" class="menu-container hidden">
            <h2>Temas</h2>
            <button class="menu-button" onclick="startGame(1)">Sala de Aula</button>
            <button class="menu-button" onclick="startGame(2)">Escritório</button>
            <button class="menu-button" onclick="startGame(3)">Loja de Roupa</button>
            <button class="menu-button" onclick="startGame(4)">Mercado</button>
            <button class="menu-button" disabled title="Modo Indisponível">Personalizado</button>
        </div>

        <button id="voltar-button" class="voltar-button hidden" onclick="goBack()">Voltar</button>
    </main>

    <footer>
        <p>&copy; 2025 Memória do Seu Jeito. Todos os direitos reservados.</p>
    </footer>

    <script src="js/menu_script.js" defer></script>
    <script>
        var usuarioLogado = true;
    </script>
</body>
</html>
