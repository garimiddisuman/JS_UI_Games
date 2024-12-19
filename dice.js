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

function getFaceValue([one, two, three]) {
  return topBorder() + addString(one, two, three) + bottomBorder();
}

function face(faceValue) {
  const face = [
    [EMPTY, ONE_MIDDLE, EMPTY], [ONE_LEFT, EMPTY, ONE_RIGHT],
    [ONE_LEFT, ONE_MIDDLE, ONE_RIGHT], [TWO_DOTS, EMPTY, TWO_DOTS],
    [TWO_DOTS, ONE_MIDDLE, TWO_DOTS], [TWO_DOTS, TWO_DOTS, TWO_DOTS]
  ];

  return getFaceValue(face[faceValue - 1]);
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

console.log(getDiceValue(12));