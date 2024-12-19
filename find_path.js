const VERTICAL_BOXES_LENGTH = 5;
const HORIZONTAL_BOXES_LENGTH = 5;
const RANDOM_WAY = getRandomWay();

function delay() {
  for (let i = 0; i < 800000000; i++) {
  }
}

function getRandomWay() {
  const randomWay = Math.floor(Math.random() * 6);

  const ways = [
    "111222233343445455", "111213141525354555",
    "11121323333231415152535455", "112131415152535455", "112122232434444555"
  ];

  return ways[randomWay];
}

function isAxisMatched(x_path, x_axis, y_path, y_axis) {
  return x_path === x_axis && y_path === y_axis;
}

function isPathCorrect(x, y) {
  for (let i = 0; i < RANDOM_WAY.length; i += 2) {
    if (isAxisMatched(+RANDOM_WAY[i], x, +RANDOM_WAY[i + 1], y)) {
      return true;
    }
  }

  return false;
}

function displayInstructions() {
  const instructions = "  d -->  ➡️ \n  s -->  ⬇️ \n  w -->  ⬆️ \n  a -->  ⬅️";
  console.log(instructions + "\n  e -->  exit\n");
}

function isLastRow(row) {
  return row === VERTICAL_BOXES_LENGTH;
}

function getSymbolForMove(x_pos, y_pos) {
  return isPathCorrect(x_pos, y_pos) ? "👨‍💼" : "💥";
}

function addEnd(row) {
  if (isLastRow(row)) {
    return "➡️ END";
  }

  return "";
}

function createHorizontalBoxes(row, x_pos, y_pos) {
  let horizontalBox = "";

  for (let column = 1; column <= HORIZONTAL_BOXES_LENGTH; column++) {
    if (row === x_pos && column === y_pos) {
      horizontalBox += getSymbolForMove(x_pos, y_pos);
      continue;
    }
    horizontalBox += "🟦";
  }

  const isLastBox = addEnd(row);
  return horizontalBox + isLastBox;
}

function printBox(box) {
  console.log(box);
}

function createBox(x_pos, y_pos) {
  let box = "➡️ ";

  for (let row = 1; row <= VERTICAL_BOXES_LENGTH; row++) {
    box += createHorizontalBoxes(row, x_pos, y_pos) + "\n  ";
  }

  printBox(box);
  displayInstructions();
}

function readUserDirection() {
  const direction = prompt("choose direction : ");

  return direction;
}

function changePosition(x, y) {
  if (!isPathCorrect(x, y)) {
    createBox(x, y);
    delay();
    console.clear();
    x = 1; y = 1;
  }

  createBox(x, y);
  const direction = readUserDirection();
  console.clear();

  switch (direction) {
    case "d": y += 1; break;
    case "s": x += 1; break;
    case "w": x -= 1; break;
    case "a": y -= 1; break;
    case "e": return;
  }

  playGame(x, y);
}

function isReachedToFinalPosition(x, y) {
  return VERTICAL_BOXES_LENGTH === x && HORIZONTAL_BOXES_LENGTH === y;
}

function printBanner() {
  console.log("\n ---- YOU REACHED THE DESTINATION ----\n");
}

function playGame(x, y) {
  if (isReachedToFinalPosition(x, y)) {
    printBanner();
    return;
  }

  changePosition(x, y);
}

function frameWork() {
  console.log("\n*--------------------* 𝓦 𝓔 𝓛 𝓒 𝓞 𝓜 𝓔  𝓣 𝓞   𝓕 𝓘 𝓝 𝓓   𝓟 𝓐 𝓣 𝓗  *-----------------------*\n");
  console.log("  -------------* Game Instructions *----------------- \n");
  console.log("  --> There is only one way is correct, your target is to find the path.");
  console.log("  --> if there is a bomb. it will go to intial position.\n");
}

function canStart() {
  const isUserStarts = confirm('  ⭐️ can we start the game ?');
  console.log("\n");

  return isUserStarts;
}

function startGame() {
  frameWork();

  if (canStart()) {
    playGame(1, 1);
  }

  console.log("    BYE see you next time      \n");
}

startGame();