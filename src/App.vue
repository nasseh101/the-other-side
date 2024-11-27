<template>
  <div id="app">
    <br>
    <section class="message">
      <div class="speech-bubble">
        <div class="speech-icon">
          <i class="nes-bcrikko"></i>
        </div>
        <div class="nes-balloon from-left">
          <p>Hello my friend! Your objective is simple...</p>
          <p>Get to the other side of Level 5 in under 20 seconds to win it all!</p>
        </div>
      </div>
    </section>
    <div id="level" class="nes-text">Level: {{ currentLevel }}</div>
    <div
        id="timer"
        class="nes-text"
        :class="{ 'is-error': timeLeft <= 10, 'is-success': timeLeft > 10 }"
    >
      Time Left: {{ timeLeft }}s
    </div>
    <canvas
        id="gameCanvas"
        ref="gameCanvas"
        :width="canvasWidth"
        :height="canvasHeight">
    </canvas>
    <br>
    <p>Hit 'Space' to ascend!</p>
    <section>
      <button type="button" class="nes-btn" @click="showGameModal('quit-modal-dialog')">
        Quit Game
      </button>
      <br>
      <dialog class="nes-dialog is-dark is-rounded" id="quit-modal-dialog">
        <form method="dialog">
          <p>Giving up already?</p>
            <button class="nes-btn">Just kidding!</button>

            <button class="nes-btn is-error">I can't take it anymore!</button>
        </form>
      </dialog>
    </section>
    <section>
      <dialog class="nes-dialog is-dark is-rounded" id="time-up-dialog">
        <form method="dialog">
          <p class="is-error" style="text-align: center">Game Over!</p>
          <p>You have unfortunately run out of time my friend!</p>
          <menu class="dialog-menu">
            <button class="nes-btn" @click="resetGame">Retry</button>
            <button class="nes-btn is-error">Quit Game</button>
          </menu>
        </form>
      </dialog>
    </section>
    <section>
      <dialog class="nes-dialog is-dark is-rounded" id="collision-detected-dialog">
        <form method="dialog">
          <p class="is-error" style="text-align: center">Game Over!</p>
          <p>Damn! You were caught before you could get to the other side!</p>
          <menu class="dialog-menu">
            <button class="nes-btn" @click="resetGame">Retry</button>
            <button class="nes-btn is-error">Quit Game</button>
          </menu>
        </form>
      </dialog>
    </section>

    <section>
      <dialog class="nes-dialog is-dark is-rounded" id="win-dialog">
        <form method="dialog">
          <input type="text" style="opacity: 0; height: 0; width: 0; position: absolute;" autofocus />
          <div style="text-align: center">
            <section class="message">
              <div class="speech-bubble">
                <div class="speech-icon">
                  <i class="nes-bcrikko"></i>
                </div>
                <div class="nes-balloon from-left">
                  <p>Welcome to the other side my friend! You got here with {{ timeLeft }}s left to spare!</p>
                  <p></p>
                </div>
              </div>
            </section>
          </div>
          <menu class="dialog-menu">
            <button class="nes-btn" @click="resetGame">I WANNA DO IT AGAIN!</button>
            <button class="nes-btn is-error">I'm quite content with this victory</button>
          </menu>
        </form>
      </dialog>
    </section>
  </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref, reactive } from 'vue';
import music from '../src/assets/music.mp3';

// References
const gameCanvas = ref(null);

// Reactive State
const gameOver = ref(false);
const gameStarted = ref(false);
const timeLeft = ref(20);
const timerInterval = ref(null);
const currentLevel = ref(1);
const maxLevel = 5;

// Create an Audio object
const audio = new Audio(music);

// Canvas and context
let canvas = null;
let ctx = null;

// Game settings
const playerSize = 20;
const obstacleWidth = 50;
const obstacleHeight = 20;
const gravity = 0.6;
const jumpStrength = -10;

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

// Reactive properties for canvas dimensions
const canvasWidth = ref(1200);
const canvasHeight = ref(650);

// Function to update canvas size based on window size
const updateCanvasSize = () => {
  console.log('crash')
  const aspectRatio = 1200 / 650; // Original aspect ratio

  // Calculate the maximum possible width and height while maintaining aspect ratio
  let newWidth = window.innerWidth * 0.8; // 80% of window width
  let newHeight = newWidth / aspectRatio;

  if (newHeight > window.innerHeight * 0.8) {
    newHeight = window.innerHeight * 0.8;
    newWidth = newHeight * aspectRatio;
  }

  canvasWidth.value = Math.floor(newWidth);
  canvasHeight.value = Math.floor(newHeight);

  // Adjust the canvas style for responsiveness
  if (gameCanvas.value) {
    gameCanvas.value.style.width = `${newWidth}px`;
    gameCanvas.value.style.height = `${newHeight}px`;
  }
};

// Initialize Game
onMounted(() => {
  updateCanvasSize();
  initGame();
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
});

function showGameModal (elementId) {
  audio.pause();
  document.getElementById(elementId).showModal();
}

function initGame() {
  canvas = gameCanvas.value;
  ctx = canvas.getContext('2d');
  player.x = canvasWidth.value / 2 - playerSize / 2;
  player.y = canvasHeight.value - playerSize;
  createObstacles();
  window.addEventListener('keydown', handleKeyDown);
  gameLoop();
}

function handleKeyDown(e) {
  if (!gameStarted.value && e.code === 'Space') {
    audio.currentTime = 0;
    audio.play().catch((error) => {
      console.error('Error playing audio:', error);
    });
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
  const rowHeight = canvasHeight.value / obstacleRows;
  const obstacleSpacing = canvasWidth.value / obstaclesPerRow;

  for (let i = 0; i < obstacleRows; i++) {
    let yPosition = i * rowHeight + rowHeight / 2 - obstacleHeight / 2;

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
    if (obstacle.x > canvasWidth.value) {
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
  if (player.y + player.height > canvasHeight.value) {
    player.y = canvasHeight.value - player.height;
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
      showGameModal('collision-detected-dialog')
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
      showGameModal('win-dialog')
    }
  }
}

function resetLevel() {
  // Reset player position
  player.x = canvasWidth.value / 2 - playerSize / 2;
  player.y = canvasHeight.value- playerSize;
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
  player.x = canvasWidth.value / 2 - playerSize / 2;
  player.y = canvasHeight.value- playerSize;
  createObstacles();
  gameLoop();
}

function gameLoop() {
  if (gameOver.value) return;
  ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);

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
      showGameModal('time-up-dialog');
    }
  }, 1000);
}
</script>
<style>
/* Remove the "scoped" attribute for global styles or use a separate global CSS file */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #000 !important;; /* Black background */
  color: #fff; /* Ensure text is visible on the black background */
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%; /* Allow the app to expand to full height */
  background-color: transparent; /* Remove local background to rely on global */
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

.centered-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 300px;
}

/* Center buttons horizontally */
.dialog-menu {
  display: flex;
  justify-content: center;
  gap: 10px;
}

/* Adjust button size and spacing for a polished look */
.dialog-menu button {
  padding: 10px 20px;
}

.nes-balloon {
  color: #000;
  margin-left: 10px;
}

.message i {
  font-size: 100px;
}

.speech-bubble {
  display: flex; align-items: center;
}

.speech-icon {
  margin-top: 50px; margin-right: 20px
}
</style>


