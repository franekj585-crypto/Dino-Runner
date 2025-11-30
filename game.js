const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Dino
const dinoImg = new Image();
dinoImg.src = "https://i.imgur.com/0G0uVnR.png"; // Pikselowy dino

let dinoY = 150;
let velocity = 0;
const gravity = 0.6;

// Obstacle
const cactusImg = new Image();
cactusImg.src = "https://i.imgur.com/L9Ue8Uf.png"; // Pikselowy kaktus

let obstacles = [];
let frame = 0;

// Chmury
const cloudImg = new Image();
cloudImg.src = "https://i.imgur.com/JpTR5fK.png";
let clouds = [{x: 800, y: 50}];

function spawnObstacle() {
  obstacles.push({ x: 800, width: 20, height: 40 });
}

function spawnCloud() {
  clouds.push({x: 800, y: Math.random() * 80});
}

function loop() {
  frame++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Tło - piasek
  ctx.fillStyle = "#f0e68c";
  ctx.fillRect(0, 180, canvas.width, 20);

  // Chmury
  clouds.forEach((cloud, i) => {
    cloud.x -= 1;
    ctx.drawImage(cloudImg, cloud.x, cloud.y, 50, 25);
    if (cloud.x < -50) clouds.splice(i, 1);
  });
  if (frame % 300 === 0) spawnCloud();

  // Dino
  velocity += gravity;
  dinoY += velocity;
  if (dinoY > 150) {
    dinoY = 150;
    velocity = 0;
  }
  ctx.drawImage(dinoImg, 50, dinoY, 30, 30);

  // Spawn obstacles
  if (frame % 120 === 0) spawnObstacle();

  // Draw & move obstacles
  obstacles.forEach((ob, i) => {
    ob.x -= 5;
    ctx.drawImage(cactusImg, ob.x, 160 - ob.height, ob.width, ob.height);

    // Collision
    if (ob.x < 80 && ob.x + ob.width > 50 && dinoY + 30 > 160 - ob.height) {
      alert("Game Over!");
      obstacles = [];
      clouds = [{x: 800, y: 50}];
      frame = 0;
      dinoY = 150;
      velocity = 0;
    }
  });

  requestAnimationFrame(loop);
}

document.addEventListener("keydown", () => {
  if (dinoY === 150) velocity = -12; // jump
});

loop();

