<?php
session_start();

if (isset($_POST['dificuldade']) && isset($_POST['tema'])) {
    $dificuldade = $_POST['dificuldade'];
    $tema = $_POST['tema'];

    // Validação de temas permitidos
    $temas_validos = ['numero', 'espaco'];
    if (!in_array($tema, $temas_validos)) {
        $tema = 'numero'; // padrão
    }

    // Salva em sessão o tema escolhido
    $_SESSION['tema_cartas'] = $tema;

    // Redireciona conforme a dificuldade
    switch ($dificuldade) {
        case 'facil':
            $arquivo_jogo = 'jogo_facil.php';
            break;
        case 'padrao':
            $arquivo_jogo = 'jogo_padrao.php';
            break;
        case 'dificil':
            $arquivo_jogo = 'jogo_dificil.php';
            break;
        default:
            header("Location: index.php?erro=dificuldade_invalida");
            exit();
    }

    header("Location: $arquivo_jogo?tema=$tema");
    exit();
} else {
    header("Location: index.php?erro=dados_incompletos");
    exit();
}
