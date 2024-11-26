<template>
  <div id="app">
    <div id="level" class="nes-text">Level: {{ currentLevel }}</div>
    <div
        id="timer"
        class="nes-text"
        :class="{ 'is-error': timeLeft <= 10, 'is-success': timeLeft > 10 }"
    >
      Time Left: {{ timeLeft }}s
    </div>
    <canvas id="gameCanvas" ref="gameCanvas" width="1200" height="700"></canvas>
    <br/>
    <section>
      <button type="button" class="nes-btn" onclick="document.getElementById('dialog-default').showModal();">
        Quit Game
      </button>
      <dialog class="nes-dialog is-dark is-rounded" id="dialog-default">
        <form method="dialog">
          <p class="title">Dialog</p>
          <p>Giving up already?</p>
            <button class="nes-btn">Just kidding!</button>

            <button class="nes-btn is-error">I can't take it anymore!</button>
        </form>
      </dialog>
    </section>
  </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref, reactive } from 'vue';

// References
const gameCanvas = ref(null);

// Reactive State
const gameOver = ref(false);
const gameStarted = ref(false);
const timeLeft = ref(20);
const timerInterval = ref(null);
const currentLevel = ref(1);
const maxLevel = 5;

// Canvas and context
let canvas = null;
let ctx = null;

// Game settings
const playerSize = 20;
const obstacleWidth = 50;
const obstacleHeight = 20;
const gravity = 0.6;
const jumpStrength = -12;

// Player and obstacles
const player = reactive({
  x: 0,
  y: 0,
  width: playerSize,
  height: playerSize,
  color: 'red',
  velocityY: 0,
});

const obstacles = ref([]);

// Initialize Game
onMounted(() => {
  initGame();
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
});

function initGame() {
  canvas = gameCanvas.value;
  console.log(gameCanvas)
  ctx = canvas.getContext('2d');
  player.x = canvas.width / 2 - playerSize / 2;
  player.y = canvas.height - playerSize;
  console.log('Hello!');
  createObstacles();
  window.addEventListener('keydown', handleKeyDown);
  gameLoop();
}

function handleKeyDown(e) {
  if (!gameStarted.value && e.code === 'Space') {
    gameStarted.value = true;
    startTimer();
  }
  if (e.code === 'Space') {
    player.velocityY = jumpStrength;
  }
}

function createObstacles() {
  obstacles.value = [];

  // Adjusting game difficulty based on current level
  const obstacleRows = 4 + currentLevel.value;
  const obstaclesPerRow = currentLevel.value;
  const rowHeight = canvas.height / obstacleRows;
  const obstacleSpacing = canvas.width / obstaclesPerRow;

  for (let i = 0; i < obstacleRows; i++) {
    let yPosition =
        i * rowHeight + rowHeight / 2 - obstacleHeight / 2;

    for (let j = 0; j < obstaclesPerRow; j++) {
      let xPosition = j * obstacleSpacing + Math.random() * (obstacleSpacing - obstacleWidth);

      obstacles.value.push({
        x: xPosition,
        y: yPosition,
        width: obstacleWidth,
        height: obstacleHeight,
        speed: Math.random() * (3 + currentLevel.value) + 2,
      });
    }
  }
}

function moveObstacles() {
  obstacles.value.forEach(obstacle => {
    obstacle.x += obstacle.speed;
    if (obstacle.x > canvas.width) {
      obstacle.x = -obstacle.width;
    }
  });
}

function drawObstacle(obstacle) {
  ctx.fillStyle = 'black';
  ctx.fillRect(
      obstacle.x,
      obstacle.y,
      obstacle.width,
      obstacle.height
  );
}

function applyGravity() {
  player.velocityY += gravity;
  player.y += player.velocityY;

  // Prevent the player from falling below the canvas
  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
    player.velocityY = 0;
  }

  // Prevent the player from going above the canvas
  if (player.y < 0) {
    player.y = 0;
    player.velocityY = 0;
  }
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(
      player.x,
      player.y,
      player.width,
      player.height
  );
}

function checkCollisions() {
  for (let obstacle of obstacles.value) {
    if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
    ) {
      // Collision detected
      gameOver.value = true;
      clearInterval(timerInterval.value);
      alert('Game Over! Collision detected.');
      resetGame();
      return true;
    }
  }
  return false;
}

function checkWin() {
  if (player.y <= 0) {
    if (currentLevel.value < maxLevel) {
      currentLevel.value++;
      resetLevel();
    } else {
      gameOver.value = true;
      clearInterval(timerInterval.value);
      alert('Congratulations! You completed all levels!');
      resetLevel();
      resetGame();
    }
  }
}

function resetLevel() {
  // Reset player position
  player.x = canvas.width / 2 - playerSize / 2;
  player.y = canvas.height - playerSize;
  player.velocityY = 0;

  // Create new obstacles for the next level
  createObstacles();
}

function resetGame() {
  // Reset all game variables
  gameOver.value = false;
  gameStarted.value = false;
  timeLeft.value = 20;
  currentLevel.value = 1;
  player.velocityY = 0;
  player.x = canvas.width / 2 - playerSize / 2;
  player.y = canvas.height - playerSize;
  createObstacles();
  gameLoop();
}

function gameLoop() {
  if (gameOver.value) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  moveObstacles();
  obstacles.value.forEach(drawObstacle);

  applyGravity();

  if (checkCollisions()) {
    return;
  }

  checkWin();

  drawPlayer();

  requestAnimationFrame(gameLoop);
}

function startTimer() {
  timerInterval.value = setInterval(() => {
    timeLeft.value--;
    if (timeLeft.value <= 0) {
      gameOver.value = true;
      clearInterval(timerInterval.value);
      alert('Game Over! Time ran out.');
      resetGame();
    }
  }, 1000);
}
</script>


<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000;
  height: 100%;
  margin: 0;
  color: #fff;
}

#level,
#timer {
  font-size: 24px;
  margin: 10px;
}

#gameCanvas {
  background-color: #eee;
  border: 2px solid #000;
}

</style>

