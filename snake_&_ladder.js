console.log("\n*------------------------------------------------ 🐍 SNAKE AND LADDER 🪜 -----------------------------------------------------*\n");

const EMPTY = "┃      ┃";
const TWO_DOTS = "┃⚪️  ⚪️┃";
const ONE_LEFT = "┃⚪️    ┃";
const ONE_MIDDLE = "┃  ⚪️  ┃";
const ONE_RIGHT = "┃    ⚪️┃";

function repeat(char, times) {
  let string = "";

  for (let i = 0; i < times; i++) {
    string += char;
  }
  return string;
}

function topBorder() {
  return "╭" + repeat("━", 6) + "╮";
}

function bottomBorder() {
  return "╰" + repeat("━", 6) + "╯";
}

function addString(first, second, third) {
  return "\n" + first + "\n" + second + "\n" + third + "\n";
}

function getFaceValue(one, two, three) {
  return topBorder() + addString(one, two, three) + bottomBorder();
}

function face(faceValue) {
  switch (faceValue) {
    case 1: return getFaceValue(EMPTY, ONE_MIDDLE, EMPTY);
    case 2: return getFaceValue(ONE_LEFT, EMPTY, ONE_RIGHT);
    case 3: return getFaceValue(ONE_LEFT, ONE_MIDDLE, ONE_RIGHT);
    case 4: return getFaceValue(TWO_DOTS, EMPTY, TWO_DOTS);
    case 5: return getFaceValue(TWO_DOTS, ONE_MIDDLE, TWO_DOTS);
    case 6: return getFaceValue(TWO_DOTS, TWO_DOTS, TWO_DOTS);
  }
}

function delay() {
  for (let i = 0; i < 200000000; i++) {
  }
  console.clear();
}

function getDiceValue(num) {
  const faceValue = Math.ceil(Math.random() * 6);
  delay();
  console.log(face(faceValue));

  if (num === 0) {
    return faceValue;
  }

  return getDiceValue(num - 1);
}

function snake(position) {
  const mouth = [37, 28, 48, 75, 94, 96];
  const tail = [3, 10, 16, 32, 71, 42];

  for (let i = 0; i < mouth.length; i++) {
    if (mouth[i] === position) {
      return tail[i];
    }
  }
}

function ladder(position) {
  const ladderStart = [4, 12, 14, 22, 41, 54];
  const ladderEnd = [56, 50, 55, 58, 79, 88];

  for (let i = 0; i < ladderStart.length; i++) {
    if (ladderStart[i] === position) {
      return ladderEnd[i];
    }
  }
}

function isPositionSnake(position) {
  const snakePositions = [37, 28, 48, 75, 94, 96];

  for (let i = 0; i < snakePositions.length; i++) {
    if (snakePositions[i] === position) {
      return true;
    }
  }
  return false;
}

function isPositionLadder(position) {
  const ladderPositions = [4, 12, 14, 22, 41, 54];

  for (let i = 0; i < ladderPositions.length; i++) {
    if (ladderPositions[i] === position) {
      return true;
    }
  }
  return false;
}

function getCurrentPosition(player, position) {
  if (isPositionSnake(position)) {
    console.log("-- snake 🐍 --");
    return snake(position);
  }

  if (isPositionLadder(position)) {
    console.log("-- ladder 🪜 --");
    return ladder(position);
  }

  return position > 100 ? player : position;
}

function getWinnerBanner(name) {
  return "\n  --- CONGRATULATIONS! '" + name + "', YOU WON..🏆 --- \n\n";
}

function makeMassage(name, player) {
  prompt("\n" + name + " chance : press enter ");
  const rolledNumber = getDiceValue(12);
  console.log(name, "previous position :", player);

  return getCurrentPosition(player, player + rolledNumber);
}

function playGame(player1Score, player2Score, name1, name2) {
  if (player2Score === 100) {
    return getWinnerBanner(name2);
  }

  player1Score = makeMassage(name1, player1Score)
  console.log(name1, "current Positon :", player1Score);
  console.log("\n*-----------------------------------------*");

  if (player1Score === 100) {
    return getWinnerBanner(name1);
  }

  player2Score = makeMassage(name2, player2Score);
  console.log(name2 + " current position :", player2Score);
  console.log("\n*-----------------------------------------*");

  return playGame(player1Score, player2Score, name1, name2);
}

function startGame() {
  const name1 = prompt("enter player1 name :");
  const name2 = prompt("enter player2 name :");

  console.log(playGame(0, 0, name1, name2));
}

startGame();