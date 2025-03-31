<?php
session_start(); 

include('conexao/conexao.php'); 
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
            <img src="logo/logo_katakana.png" alt="Logo do jogo" class="logo">
            <h1>MEMÓRIA DO SEU JEITO</h1>
        </div>
    </header>

    <main>
        <div id="menu-container" class="menu-container">
            <button class="menu-button" onclick="showRegistrationMenu()">Jogar</button>
            <button class="menu-button" onclick="window.location.href='video.html'">Video Demonstrativo</button>
            <button class="menu-button" onclick="window.location.href='index.html'">Home</button>
            <button class="menu-button" onclick="window.location.href='sobre.html'">Sobre</button>
            <button class="menu-button" onclick="window.location.href='creditos.html'">Créditos</button>
        </div>

        <div id="bemvindo-message">
            <h2>Bem-vindo ao Memória do Seu Jeito!</h2>
            <p>Escolha uma opção no menu para começar.</p>
        </div>

        <div id="registro-menu" class="menu-container hidden">
            <h2>Deseja usar o registro de jogador?</h2>
            <button class="menu-button" onclick="window.location.href='rede/registro.php'">Sim</button>
            <button class="menu-button" onclick="selectRegistration(false)">Não</button>
        </div>        

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

    <script src="js/menu_script.js"></script>
</body>
</html>