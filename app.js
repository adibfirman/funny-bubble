const canvas = document.querySelector("canvas");
const w = window.innerWidth / 1.1;
const h = window.innerHeight / 1.2;

canvas.width = w;
canvas.height = h;

const c = canvas.getContext("2d");
const colors = ["#BBDEFB", "#3F51B5", "#00897B", "#0277BD"];
const minCircle = 2;
const maxCircle = 60;
const mouse = {
  x: null,
  y: null
};

canvas.addEventListener("mousemove", function(e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

function Circle({ r, x, y, dx, dy }) {
  this.r = r;
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.color = colors[Math.floor(Math.random() * colors.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.r, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.fillStyle = this.color;
    c.stroke();
    c.fill();

    this.update();
  };

  this.update = function() {
    if (this.x + this.r > w || this.x - this.r < 0) this.dx = -this.dx;
    if (this.y + this.r > h || this.y - this.r < 0) this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;

    const calcX = mouse.x - this.x;
    const calcY = mouse.y - this.y;

    if (calcX < 60 && calcX > 10 && calcY < 60 && calcY > 10) {
      if (this.r < maxCircle) this.r += 1;
    } else if (this.r > minCircle) this.r -= 1;
  };
}

let circles = [];
for (let i = 0; i < 1300; i++) {
  let r = minCircle;
  let x = Math.random() * w + r;
  let y = Math.random() * h + r;
  let dx = Math.random() * 2;
  let dy = Math.random() * 2;

  circles.push(new Circle({ r, x, y, dx, dy }));
}

(function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, w, h);

  circles.forEach(item => {
    item.draw();
  });
})();
