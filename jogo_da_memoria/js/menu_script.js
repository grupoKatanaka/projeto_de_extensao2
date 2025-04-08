function showDifficultyMenu() {
    document.getElementById("menu-container").classList.add("hidden");
    document.getElementById("dificuldade-menu").classList.remove("hidden");
    document.getElementById("voltar-button").classList.remove("hidden");
    document.getElementById("bemvindo-message").classList.add("hidden");
}

function showRegistrationMenu() {
    document.getElementById("menu-container").classList.add("hidden");
    document.getElementById("registro-menu").classList.remove("hidden");
    document.getElementById("voltar-button").classList.remove("hidden");
    document.getElementById("bemvindo-message").classList.add("hidden");
}

function selectRegistration(useRegistration) {
    if (useRegistration) {
        alert("A funcionalidade de registro será adicionada em breve!");
    } else {
        document.getElementById("registro-menu").classList.add("hidden"); 
        showDifficultyMenu();
    }
}


let selectedDifficulty = ''; 

function selectDifficulty(difficulty) {
    selectedDifficulty = difficulty;
    showThemeMenu();
}

function showThemeMenu() {
    document.getElementById("dificuldade-menu").classList.add("hidden");
    document.getElementById("tema-menu").classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", function () {
    const personalizadoButton = document.querySelector("button[onclick='startGame(\"personalizado\")']");
    if (personalizadoButton) {
        personalizadoButton.disabled = false;
        personalizadoButton.removeAttribute("title");
    }
});

function startGame(theme) {
    if (!selectedDifficulty) {
        alert("Por favor, selecione uma dificuldade primeiro!");
        return;
    }
    if (!theme) {
        alert("Por favor, selecione um tema!");
        return;
    }
    
    if (theme === "personalizado") {
        importCustomTheme();
    } else {
        redirectToGame(selectedDifficulty, theme);
    }
}

function importCustomTheme() {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", function (event) {
        let file = event.target.files[0];
        if (!file) {
            alert("Por favor, selecione uma imagem para o tema personalizado.");
            return;
        }
        let reader = new FileReader();
        reader.onload = function (e) {
        localStorage.setItem("customTheme", e.target.result);
        redirectToGame(selectedDifficulty, "personalizado");
};
reader.readAsDataURL(file);

        redirectToGame(selectedDifficulty, "personalizado");
    });
    input.click();
}

function redirectToGame(difficulty, theme) {
    let gamePage = "jogo_" + difficulty + ".html";
    window.location.href = `${gamePage}?theme=${theme}`;
}

function goBack() {
    const themeMenu = document.getElementById("tema-menu");
    const difficultyMenu = document.getElementById("dificuldade-menu");
    const registrationMenu = document.getElementById("registro-menu");

    if (!themeMenu.classList.contains("hidden")) {
        themeMenu.classList.add("hidden");
        difficultyMenu.classList.remove("hidden");
    } else if (!difficultyMenu.classList.contains("hidden")) {
        difficultyMenu.classList.add("hidden");
        registrationMenu.classList.remove("hidden");
    } else if (!registrationMenu.classList.contains("hidden")) {
        registrationMenu.classList.add("hidden");
        document.getElementById("menu-container").classList.remove("hidden");
        document.getElementById("voltar-button").classList.add("hidden");
        document.getElementById("bemvindo-message").classList.remove("hidden");
    }
}
