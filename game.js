const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Dino
let dinoY = 150;
let velocity = 0;
const gravity = 0.6;

// Kaktory
let obstacles = [];
let frame = 0;

function spawnObstacle() {
  obstacles.push({ x: 800, width: 20, height: 40 });
}

function loop() {
  frame++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dino
  ctx.fillStyle = "black";
  ctx.fillRect(50, dinoY, 30, 30);

  // Dino jump physics
  velocity += gravity;
  dinoY += velocity;

  if (dinoY > 150) {
    dinoY = 150;
    velocity = 0;
  }

  // Spawn obstacles
  if (frame % 120 === 0) spawnObstacle();

  // Draw & move obstacles
  for (let i = 0; i < obstacles.length; i++) {
    let ob = obstacles[i];
    ob.x -= 5;

    ctx.fillRect(ob.x, 160 - ob.height, ob.width, ob.height);

    // Collision check
    if (ob.x < 80 && ob.x + ob.width > 50 && dinoY + 30 > 160 - ob.height) {
      alert("Game Over!");
      obstacles = [];
      frame = 0;
      dinoY = 150;
      velocity = 0;
      return;
    }
  }

  requestAnimationFrame(loop);
}

document.addEventListener("keydown", () => {
  if (dinoY === 150) velocity = -12; // jump power
});

loop();
