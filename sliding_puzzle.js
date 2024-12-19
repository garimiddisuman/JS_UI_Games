const ARRAY = ["a", "b", "c", "d", "e", "f", "g", "h", " "];

function repeat(char, times) {
  let string = "";

  for (let i = 0; i < times; i++) {
    string += char;
  }

  return string;
}

function horizontalLine() {
  const line = " ┣" + repeat("━", 11) + "┫";
  return line + "\n"
}

function horizontalBoxes(array, from, to) {
  let hor = "";

  for (let i = from; i < to; i++) {
    hor += " ┃ " + array[i];
  }

  return hor + " ┃\n" + horizontalLine();
}

function makeBox(array, height, width) {
  let box = horizontalLine();

  for (let i = 0; i < height; i++) {
    const from = i * width;
    const to = (i + 1) * width;
    box += horizontalBoxes(array, from, to)
  }

  return box;
}

function doesNumberExist(array, number) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === number) {
      return true;
    }
  }

  return false;
}

function randomDigit(limit) {
  return Math.floor(Math.random() * limit);
}

function generateCode(string) {
  const digitsArray = [];
  let digitsCount = 0;

  while (digitsCount < string.length) {
    const digit = randomDigit(string.length);

    if (!doesNumberExist(digitsArray, digit)) {
      digitsArray.push(digit);
      digitsCount++;
    }
  }

  return digitsArray;
}

function getArray() {
  const digitsArray = generateCode(ARRAY);
  const array = [];

  for (let i = 0; i < digitsArray.length; i++) {
    array.push(ARRAY[digitsArray[i]]);
  }

  return array;
}

function slice(string, from, to) {
  let slicedString = "";

  for (let i = from; i <= to; i++) {
    slicedString += string[i];
  }

  return slicedString;
}

function findIndex(string, char) {
  for (let index = 0; index < string.length; index++) {
    if (string[index] === char) {
      return index;
    }
  }

  return -1;
}

function swapChars(array, charPos1, charPos2) {
  let swappedArray = [];
  const char1 = array[charPos1];
  const char2 = array[charPos2];

  for (let i = 0; i < array.length; i++) {
    if (i === charPos1) {
      swappedArray.push(char2);
      continue;
    }
    if (i === charPos2) {
      swappedArray.push(char1);
      continue;
    }

    swappedArray.push(array[i]);
  }

  return swappedArray;
}

function getCharPosition(spacePosition, input) {
  if (input === "d" && spacePosition % 3 !== 2) {
    return spacePosition + 1;
  }
  if (input === "a" && spacePosition % 3 !== 0) {
    return spacePosition - 1;
  }
  if (input === "s" && spacePosition < 6) {
    return spacePosition + 3;
  }
  if (input === "w" && spacePosition > 2) {
    return spacePosition - 3;
  }
  return spacePosition;
}

function getModifiedString(array, input) {
  const spacePosition = findIndex(array, " ");
  let charPos = getCharPosition(spacePosition, input);
  return swapChars(array, spacePosition, charPos);
}

function wait() {
  for (let i = 0; i < 100000000; i++) {
  }
}

function displayNavigations() {
  const instructions = "  d -->  ➡️ \n  s -->  ⬇️ \n  w -->  ⬆️ \n  a -->  ⬅️";
  console.log(instructions + "\n  e -->  exit\n");
}

function isExit(char) {
  return char === "e";
}

function areEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let index = 0; index < array1.length; index++) {
    if (array1[index] !== array2[index]) {
      return false;
    }
  }

  return true;
}

function playGame(array) {
  if (areEqual(array, ARRAY)) {
    return 1;
  }

  console.log(makeBox(array, 3, 3));
  displayNavigations();
  const readplayerInput = prompt("Enter direction :");

  if (isExit(readplayerInput)) {
    return 0;
  }

  wait();
  console.clear();
  array = getModifiedString(array, readplayerInput);
  return playGame(array);
}

function displayInstructions() {
  const banner = "\n\t*------------ 𝓼𝓵𝓲𝓭𝓲𝓷𝓰 𝓹𝓾𝔃𝔃𝓵𝓮 -------------*";
  const message = "\n\t Your target is to solve puzzle like below  ⤵️ \n";
  const array = makeBox(ARRAY, 3, 3);

  console.log(banner + message + array);
}

function start() {
  displayInstructions();
  const array = getArray();
  let doesGameWin = false;

  if (confirm("  can we start the GAME ..?")) {
    console.clear();
    doesGameWin = playGame(array) === 1;
  }

  if (doesGameWin) {
    console.log(" you solved the puzzle...");
  }

  console.log("\n    BYE see you next time      \n");
}

start();