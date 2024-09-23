// Variables globales
let player = document.getElementById('player');
let platforms = document.querySelectorAll('.platform');
let gameContainer = document.getElementById('game-container');
let monster = document.getElementById('monster');
let scoreBoard = document.getElementById('score');
let gravity = 0.5;
let isJumping = false;
let jumpStrength = 12;
let playerVelocityY = 0;
let playerVelocityX = 0;
let playerYPosition = parseInt(window.getComputedStyle(player).bottom);
let playerXPosition = parseInt(window.getComputedStyle(player).left);
let score = 0;
let isGameOver = false;
let scrollOffset = 0;

// Gérer les mouvements du joueur
document.addEventListener('keydown', function (event) {
    if (event.code === 'Space' && !isJumping) {
        isJumping = true;
        playerVelocityY = jumpStrength;
    }
    if (event.code === 'ArrowRight') {
        playerVelocityX = 5;
    }
    if (event.code === 'ArrowLeft') {
        playerVelocityX = -5;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
        playerVelocityX = 0;
    }
});

// Boucle principale du jeu
function gameLoop() {
    // Gravité et saut
    if (isJumping) {
        playerVelocityY -= gravity; // Appliquer la gravité
        playerYPosition += playerVelocityY;

        if (playerYPosition <= 20) {  // Limite inférieure (sol)
            playerYPosition = 20;
            isJumping = false;
            playerVelocityY = 0;
        }
    }

    // Déplacement horizontal
    playerXPosition += playerVelocityX;
    
    // Gérer les collisions avec les plateformes
    platforms.forEach(platform => {
        let platformRect = platform.getBoundingClientRect();
        let playerRect = player.getBoundingClientRect();
        if (
            playerRect.right > platformRect.left &&
            playerRect.left < platformRect.right &&
            playerRect.bottom > platformRect.top &&
            playerRect.bottom < platformRect.bottom
        ) {
            // Le joueur est sur la plateforme
            playerYPosition = platformRect.top - gameContainer.offsetTop - playerRect.height;
            isJumping = false;
            playerVelocityY = 0;
        }
    });

    // Vérification des collisions avec le monstre
    let playerRect = player.getBoundingClientRect();
    let monsterRect = monster.getBoundingClientRect();
    if (
        playerRect.left < monsterRect.right &&
        playerRect.right > monsterRect.left &&
        playerRect.bottom > monsterRect.top &&
        playerRect.top < monsterRect.bottom
    ) {
        isGameOver = true;
        alert("Game Over! Score final : " + score);
        window.location.reload(); // Recharge la page pour recommencer
    }

    // Mise à jour de la position du joueur et du score
    player.style.bottom = playerYPosition + 'px';
    player.style.left = playerXPosition + 'px';
    
    // Défilement du monde si le joueur avance
    if (playerXPosition > 400) {
        scrollOffset += playerVelocityX;
        gameContainer.style.transform = `translateX(-${scrollOffset}px)`;
    }

    // Augmenter le score
    score += 1;
    scoreBoard.innerText = score;

    // Continuer la boucle de jeu
    if (!isGameOver) {
        requestAnimationFrame(gameLoop);
    }
}

// Démarrer le jeu
requestAnimationFrame(gameLoop);
