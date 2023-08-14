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
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.draw();
    // Leeps the player from falling through the world
    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
}

class Platform {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };

    this.width = 200;
    this.height = 20;
  }

  draw() {
    c.fillStyle = "purple";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const player = new Player();
const platform = new Platform();

// Keys that I want to monitor, the default setting would be false
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

// This is all about movement and removing the trail the player leaves behind
// Getting the player to move forwards and backward smoothly without gliding
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platform.draw();

  if (keys.right.pressed) {
    player.velocity.x = 5;
  } else if (keys.left.pressed) {
    player.velocity.x = -5;
  } else player.velocity.x = 0;
}

animate();

// Player Movement when you press down on a key
window.addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;
      break;

    case 83:
      console.log("down");
      break;

    case 68:
      console.log("right");
      keys.right.pressed = true;
      break;

    // You would think + 20 would mean you're going up, but that's not the case -20 get you jumping
    case 87:
      console.log("up");
      player.velocity.y -= 20;
      break;
  }
});

// For the player to stop moving when you aren't pressing the key
window.addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = false;
      break;

    case 83:
      console.log("down");
      break;

    case 68:
      console.log("right");
      keys.right.pressed = false;
      break;

    // You would think + 20 would mean you're going up, but that's not the case -20 get you jumping
    case 87:
      console.log("up");
      player.velocity.y -= 20;
      break;
  }
});
