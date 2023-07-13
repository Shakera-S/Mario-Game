// To access the canvas element
const canvas = document.querySelector("canvas");

// The 2d world
const c = canvas.getContext("2d");

// Setting the size of the canvas to the size of the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Increases the speed of the player falling
const gravity = 1.5;

// The player and all things associated with it, such as shape, color, and movement
class Player {
  // Whenever you're making a class you must always have a constructor()
  constructor() {
    // Starting point for the player, in the air
    this.position = {
      x: 100,
      y: 100,
    };
    // Drops the player onto the land
    this.velocity = {
      x: 0,
      y: 0,
    };
    // Shapes the player
    this.width = 30;
    this.height = 30;
  }
  draw() {
    c.fillStyle = "purple";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.position.y += this.velocity.y;
    this.draw();

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
}

const player = new Player();
player.update();

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
}

animate();
