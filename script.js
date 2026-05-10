const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];
let mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

document.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Particle {
  constructor() {
    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * 180 + 40;
    this.size = Math.random() * 4 + 1;
    this.speed = Math.random() * 0.02 + 0.01;
  }

  draw() {
    let x = mouse.x + Math.cos(this.angle) * this.radius;
    let y = mouse.y + Math.sin(this.angle) * this.radius;

    ctx.beginPath();
    ctx.arc(x, y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "cyan";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "cyan";
    ctx.fill();

    this.angle += this.speed;
  }
}

for (let i = 0; i < 250; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => p.draw());

  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 60, 0, Math.PI * 2);
  ctx.strokeStyle = "cyan";
  ctx.lineWidth = 4;
  ctx.shadowBlur = 35;
  ctx.shadowColor = "cyan";
  ctx.stroke();

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});