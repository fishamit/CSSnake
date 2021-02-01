const screenSizeX = 10;
const screenSizeY = 10;
const direction = ["up", "right", "left", "down"];
const startLocationX = Math.floor(Math.random() * 4 + 3);
const startLocationY = Math.floor(Math.random() * 4 + 3);

const screen = grabScreen();

let growing = false;
let speed = 350;

const snake = {
  direction: direction[Math.floor(Math.random() * 4)],
  snakeArray: [{ x: startLocationX, y: startLocationY }],
};

const apple = {
  x: 0,
  y: 0,
};

growSnake();

resetApple();

window.addEventListener("keydown", function (e) {
  if (e.code == "ArrowUp" || e.code == "KeyW") {
    if (snake.direction != "down") {
      if (snake.direction == "right" || snake.direction == "left") {
        snake.direction = "up";
        game();
        setLoop();
      } else {
        snake.direction = "up";
      }
    }
  } else if (e.code == "ArrowDown" || e.code == "KeyS") {
    if (snake.direction != "up") {
      if (snake.direction == "right" || snake.direction == "left") {
        snake.direction = "down";
        game();
        setLoop();
      } else {
        snake.direction = "down";
      }
    }
  } else if (e.code == "ArrowRight" || e.code == "KeyD") {
    if (snake.direction != "left") {
      if (snake.direction == "up" || snake.direction == "down") {
        snake.direction = "right";
        game();
        setLoop();
      } else {
        snake.direction = "right";
      }
    }
  } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
    if (snake.direction != "right") {
      if (snake.direction == "up" || snake.direction == "down") {
        snake.direction = "left";
        game();
        setLoop();
      } else {
        snake.direction = "left";
      }
    }
  }
});

game();
let loop = window.setInterval(game, speed);

function game() {
  clearScreen();

  if (!growing) {
    moveSnake();
  } else {
    growSnake();
  }
  handleApple();
  drawApple();
  drawSnake();
}

function createValidMap() {
  let map = [];

  for (let i = 0; i < screenSizeY; i++) {
    for (let j = 0; j < screenSizeX; j++) {
      map.push({ x: j, y: i });
    }
  }

  let newValidMap = map.filter(function (element) {
    for (let i = 0; i < snake.snakeArray.length; i++) {
      if (
        element.x == snake.snakeArray[i].x &&
        element.y == snake.snakeArray[i].y
      ) {
        return false;
      }
    }
    return true;
  });
  return newValidMap;
}

function handleApple() {
  if (snake.snakeArray[0].x == apple.x && snake.snakeArray[0].y == apple.y) {
    growing = true;
    resetApple();
    if (speed >= 100) {
      speed -= 5;
    }

    setLoop();
  }
}

function setLoop() {
  clearInterval(loop);
  loop = setInterval(game, speed);
}

function drawApple() {
  screen[apple.y][apple.x].style.backgroundColor = "#654e25";
  screen[apple.y][apple.x].style.boxShadow = "none";
}

function resetApple() {
  let validMap = createValidMap();

  let newCoords = validMap[Math.floor(Math.random() * validMap.length)];
  apple.x = newCoords.x;
  apple.y = newCoords.y;
}

function checkAppleCollision(newx, newy) {
  for (let i = 0; i < snake.snakeArray.length; i++) {
    if (newx == snake.snakeArray[i].x && newy == snake.snakeArray[i].y) {
      return true;
    }
  }
  return false;
}

function growSnake() {
  let newx;
  let newy;
  if (snake.direction == "up") {
    if (snake.snakeArray[0].y == 0) {
      newx = snake.snakeArray[0].x;
      newy = screenSizeY - 1;
    } else {
      newx = snake.snakeArray[0].x;
      newy = snake.snakeArray[0].y - 1;
    }
  }
  if (snake.direction == "down") {
    if (snake.snakeArray[0].y == screenSizeY - 1) {
      newx = snake.snakeArray[0].x;
      newy = 0;
    } else {
      newx = snake.snakeArray[0].x;
      newy = snake.snakeArray[0].y + 1;
    }
  }
  if (snake.direction == "right") {
    if (snake.snakeArray[0].x == screenSizeX - 1) {
      newx = 0;
      newy = snake.snakeArray[0].y;
    } else {
      newx = snake.snakeArray[0].x + 1;
      newy = snake.snakeArray[0].y;
    }
  }
  if (snake.direction == "left") {
    if (snake.snakeArray[0].x == 0) {
      newx = screenSizeX - 1;
      newy = snake.snakeArray[0].y;
    } else {
      newx = snake.snakeArray[0].x - 1;
      newy = snake.snakeArray[0].y;
    }
  }
  snake.snakeArray.unshift({ x: newx, y: newy });
  growing = false;
}

function resetGame() {
  snake.snakeArray = [
    { x: 4, y: 5 },
    { x: 3, y: 5 },
  ];
  resetApple();
  speed = 350;
  snake.direction = "up";
  setLoop();
}

function moveSnake() {
  for (let i = snake.snakeArray.length - 1; i > 0; i--) {
    snake.snakeArray[i].x = snake.snakeArray[i - 1].x;
    snake.snakeArray[i].y = snake.snakeArray[i - 1].y;
  }
  if (snake.direction == "right") {
    if (snake.snakeArray[0].x >= screenSizeX - 1) {
      snake.snakeArray[0].x = 0;
    } else {
      snake.snakeArray[0].x += 1;
    }
  }
  if (snake.direction == "down") {
    if (snake.snakeArray[0].y >= screenSizeY - 1) {
      snake.snakeArray[0].y = 0;
    } else {
      snake.snakeArray[0].y += 1;
    }
  }
  if (snake.direction == "left") {
    if (snake.snakeArray[0].x <= 0) {
      snake.snakeArray[0].x = screenSizeX - 1;
    } else {
      snake.snakeArray[0].x -= 1;
    }
  }

  if (snake.direction == "up") {
    if (snake.snakeArray[0].y <= 0) {
      snake.snakeArray[0].y = screenSizeY - 1;
    } else {
      snake.snakeArray[0].y -= 1;
    }
  }

  for (let i = 1; i < snake.snakeArray.length; i++) {
    if (
      snake.snakeArray[0].x == snake.snakeArray[i].x &&
      snake.snakeArray[0].y == snake.snakeArray[i].y
    ) {
      resetGame();
    }
  }
}
function clearScreen() {
  for (let i = 0; i < screenSizeY; i++) {
    for (let j = 0; j < screenSizeX; j++) {
      screen[i][j].style.backgroundColor = "#8bac0f";
      screen[i][j].style.boxShadow = "inset 0 0 20px 0 #306230bb";
    }
  }
}

function drawSnake() {
  for (let i = 0; i < snake.snakeArray.length; i++) {
    screen[snake.snakeArray[i].y][snake.snakeArray[i].x].style.backgroundColor =
      "#254e25";
    screen[snake.snakeArray[i].y][snake.snakeArray[i].x].style.boxShadow =
      "none";
  }
}

function grabScreen() {
  const pixels = new Array(screenSizeY);
  for (let i = 0; i < screenSizeX; i++) {
    pixels[i] = new Array(screenSizeX);
  }
  let idCounter = 1;
  for (let i = 0; i < screenSizeY; i++) {
    for (let j = 0; j < screenSizeX; j++) {
      pixels[i][j] = document.getElementById(idCounter);
      idCounter++;
    }
  }
  return pixels;
}
