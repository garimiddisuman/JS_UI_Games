const NUMBER_OF_DIGITS = 10;

function doesNumberExist(string, number) {
  for (let i = 0; i < string.length; i++) {
    if (+string[i] === number) {
      return true;
    }
  }

  return false;
}

function randomDigit(limit) {
  return Math.floor(Math.random() * limit);
}

function getArray(digitsText, columnsCount) {
  if (columnsCount === 0) {
    return digitsText;
  }

  const digit = randomDigit(NUMBER_OF_DIGITS);

  if (!doesNumberExist(digitsText, digit)) {
    digitsText += digit + " ";
    return getArray(digitsText, columnsCount - 1);
  }

  return getArray(digitsText, columnsCount);
}

function readPlayerGuess() {
  return prompt("-->");
}


function getFeedBack(target, index, userInput) {
  for (let i = userInput.length - 1; i >= 0; i -= 2) {
    if (userInput[i] === target) {
      return i === index ? "🟢" : "⚪️";
    }
  }

  return "";
}

function generateFeedBack(generatedAns, guess) {
  let feedBack = "";

  for (let i = 0; i < generatedAns.length - 1; i += 2) {
    feedBack += getFeedBack(generatedAns[i], i, guess);
  }

  return feedBack;
}

function displayFeedback(feedBack, chances) {
  console.log("   ", feedBack);
  console.log("\t\t\t\t", "Chances left : ", (chances - 1), "\n");
}

function countGreens(string) {
  let noOfGreens = 0;

  for (let i = 0; i < string.length; i += 2) {
    if (string[i] + string[i + 1] === '🟢') {
      noOfGreens += 1;
    }
  }

  return noOfGreens;
}

function isAValidGuess(columns, guess) {
  return guess.length === (columns * 2) - 1;
}

function displayInvalid() {
  console.log("    you entered invalid input. \n");
}

function playGame(columns, chanceCount, generatedAns) {
  if (chanceCount === 0) {
    console.log("  answer :", generatedAns, "\n");
    return 0;
  }

  const guess = readPlayerGuess();

  if (!isAValidGuess(columns, guess)) {
    displayInvalid();
    return playGame(columns, chanceCount, generatedAns);
  }

  const feedback = generateFeedBack(generatedAns, guess);
  displayFeedback(feedback, chanceCount);

  if (countGreens(feedback) === columns) {
    return 1;
  }

  return playGame(columns, chanceCount - 1, generatedAns);
}

function displayInstructions() {
  let banner = "\n  *------------------ 👨‍🏫 🧠 ----------------------*\n\n";
  banner += "  *-----------* 𝓜 𝓐 𝓢 𝓣 𝓔 𝓡   𝓜  𝓘 𝓝 𝓓 *----------*\n";

  const symbolInstruction = "  This symbol indicates,there is correct number";
  let columnInstruction = "*- Enter numbers with spaces , if columns are 5,";
  columnInstruction += "type like below example -*\n";
  columnInstruction += '   Example : \n\t --> "1 2 3 4 5"\n';

  console.log(banner);
  console.log(columnInstruction);
  console.log(symbolInstruction, "& correct position.", "    --> 🟢");
  console.log(symbolInstruction, "but,incorrect position.", "--> ⚪️", "\n");
}

function startGame() {
  displayInstructions();
  const columns = +prompt("Enter number of digits:");
  const noOfChances = +prompt("Number of chances do you want :");
  const generatedCode = getArray("", columns);
  const banner = playGame(columns, noOfChances, generatedCode) === 1 ? 'WON 🏆 🥳' : "LOST 🙁";

  console.log("*------ YOU", banner, "------*");
}

startGame();