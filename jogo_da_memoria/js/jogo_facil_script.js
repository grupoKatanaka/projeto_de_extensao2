document.addEventListener("DOMContentLoaded", () => {
    const playerNameInput = document.getElementById("player-name");
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    const gameContainer = document.querySelector(".memory-game");
    let playerName = "";
    let gameStarted = false;
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    
    const urlParams = new URLSearchParams(window.location.search);
    const theme = String(urlParams.get("theme") || "default");
    
    function aplicarTema(theme) {
        console.log("Tema recebido:", theme);
        console.log("Imagem customizada carregada do localStorage:", localStorage.getItem("customTheme"));

    
        switch (theme) {
            case "1":
                document.body.style.backgroundImage = "url('imagens/temas/sala_aula/fundo.jpeg')";
                aplicarImagensCartas("sala_aula");
                break;
            case "2":
                document.body.style.backgroundImage = "url('imagens/temas/escritorio/fundo.jpeg')";
                aplicarImagensCartas("escritorio");
                break;
            case "3": 
                document.body.style.backgroundImage = "url('imagens/temas/loja/fundo.jpeg')";
                aplicarImagensCartas("loja");
                break;
            case "4":
                document.body.style.backgroundImage = "url('imagens/temas/mercado/fundo.jpeg')";
                aplicarImagensCartas("mercado");
                break;
            case "personalizado":
                const customImage = localStorage.getItem("customTheme");
                if (customImage) {
                    console.log("Imagem personalizada encontrada:", customImage);
                    document.body.style.backgroundImage = `url('${customImage}')`;
                    document.body.style.backgroundSize = "cover";
                    document.body.style.backgroundPosition = "center";
                    document.body.style.backgroundRepeat = "no-repeat";
                } else {
                    console.warn("Nenhuma imagem personalizada foi encontrada no localStorage.");
                    document.body.style.background = "#444"; 
                }
                break;
               
            case "default": 
                document.body.style.background = "#333"; 
                break;
        }
    
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    }      

    function aplicarImagensCartas(pasta) {
        const cards = document.querySelectorAll(".memory-card");
        let imagens = [];
    }

    aplicarTema(theme);


    playerNameInput.addEventListener("input", () => {
        let value = playerNameInput.value;
        if (!/^[a-zA-Z]{3,}[a-zA-Z0-9]{0,17}$/.test(value)) {
            playerNameInput.setCustomValidity("Por favor, insira no mínimo 3 letras e no máximo 20 caracteres (números permitidos após 3 letras). ");
        } else {
            playerNameInput.setCustomValidity("");
        }
    });

    startButton.addEventListener("click", () => {
        if (playerNameInput.value.length < 3) {
            alert("Por favor, insira no mínimo 3 letras");
            return;
        }
        playerName = playerNameInput.value;
        gameStarted = true;
        startGame();
    });

    function startGame() {
        const cards = document.querySelectorAll(".memory-card");
        
        cards.forEach(card => {
            card.classList.remove("flip");
            card.addEventListener("click", flipCard);
        });

        function checkForMatch() {
            let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
            isMatch ? disableCards() : unflipCards();
        }

        function disableCards() {
            firstCard.removeEventListener("click", flipCard);
            secondCard.removeEventListener("click", flipCard);
            resetBoard();
            checkWinCondition();
        }

        function unflipCards() {
            lockBoard = true;
            setTimeout(() => {
                firstCard.classList.remove("flip");
                secondCard.classList.remove("flip");
                resetBoard();
            }, 1000);
        }

        function resetBoard() {
            [hasFlippedCard, lockBoard] = [false, false];
            [firstCard, secondCard] = [null, null];
        }

        function checkWinCondition() {
            if (document.querySelectorAll(".memory-card.flip").length === cards.length) {
                setTimeout(() => {
                    if (confirm(`Parabéns, ${playerName}! Você venceu! Deseja jogar novamente?`)) {
                        restartGame();
                    }
                }, 500);
            }
        }

        (function shuffle() {
            cards.forEach(card => {
                let randomPos = Math.floor(Math.random() * cards.length);
                card.style.order = randomPos;
            });
        })();
    }

    function flipCard() {
        if (!gameStarted || lockBoard || this === firstCard) return;
        this.classList.add("flip");

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    restartButton.addEventListener("click", restartGame);

    function restartGame() {
        gameStarted = false;
    
        document.querySelectorAll(".memory-card").forEach(card => {
            card.classList.remove("flip");
            card.replaceWith(card.cloneNode(true)); 
        });
    
        setTimeout(startGame, 500);
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && gameStarted) {
            const cards = document.querySelectorAll(".memory-card");
            cards.forEach(card => card.classList.add("flip"));
            
            setTimeout(() => {
                cards.forEach(card => card.classList.remove("flip"));
            }, 2000);
        }
    });

    // Código de upload e embaralhamento de imagens personalizadas
    document.getElementById('upload-button').addEventListener('click', function () {
        document.getElementById('image-upload').click();
    });

    document.getElementById('image-upload').addEventListener('change', function (event) {
        const files = Array.from(event.target.files);

        if (files.length !== 8) {
            alert("Por favor, selecione exatamente 8 imagens.");
            return;
        }

        const pairedImages = files.flatMap((file, index) => [{ file, id: index }, { file, id: index }]);
        const shuffledImages = shuffleImages(pairedImages);

        const cards = document.querySelectorAll('.memory-card');

        shuffledImages.forEach(({ file, id }, index) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                const card = cards[index];
                const imgFront = card.querySelector('.front-face');
                imgFront.src = e.target.result;
                card.dataset.framework = `custom${id}`;
            };
            reader.readAsDataURL(file);
        });
    });

    function shuffleImages(images) {
        for (let i = images.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [images[i], images[j]] = [images[j], images[i]];
        }
        return images;
    }
});
