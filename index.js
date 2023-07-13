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
  // The player design
  draw() {
    c.fillStyle = "purple";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  // Removes the trail the player leaves behind when they drop down
  update() {
    this.position.y += this.velocity.y;
    this.draw();
    // Leeps the player from falling through the world
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

// Player Movement
window.addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      break;

    case 83:
      console.log("down");
      break;

    case 68:
      console.log("right");
      break;

    // You would think + 20 would mean you're going up, but that's not the case -20 get you jumping
    case 87:
      console.log("up");
      player.velocity.y -= 20;
      break;
  }
});
