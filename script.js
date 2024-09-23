// Variables globales
let player = document.getElementById('player');
let gameContainer = document.getElementById('game-container');
let gravity = 0.5;
let isJumping = false;
let jumpStrength = 10;
let playerVelocityY = 0;
let playerYPosition = parseInt(window.getComputedStyle(player).bottom);
let isGameOver = false;

// Gérer les sauts
document.addEventListener('keydown', function (event) {
    if (event.code === 'Space' && !isJumping) {
        isJumping = true;
        playerVelocityY = jumpStrength;
    }
});

function gameLoop() {
    if (isJumping) {
        playerVelocityY -= gravity;  // Gravité appliquée
        playerYPosition += playerVelocityY;
        if (playerYPosition <= 20) {  // Toucher le sol (limité à la hauteur de la plateforme)
            playerYPosition = 20;
            isJumping = false;
            playerVelocityY = 0;
        }
        player.style.bottom = playerYPosition + 'px';
    }

    // Vérification des collisions avec le monstre
    let playerRect = player.getBoundingClientRect();
    let monster = document.getElementById('monster');
    let monsterRect = monster.getBoundingClientRect();
    if (
        playerRect.left < monsterRect.right &&
        playerRect.right > monsterRect.left &&
        playerRect.bottom > monsterRect.top &&
        playerRect.top < monsterRect.bottom
    ) {
        // Collision détectée
        isGameOver = true;
        alert("Game Over !");
        window.location.reload(); // Recharge la page pour recommencer
    }

    if (!isGameOver) {
        requestAnimationFrame(gameLoop);
    }
}

// Démarrer la boucle du jeu
requestAnimationFrame(gameLoop);
