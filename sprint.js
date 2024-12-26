const getValues = (currentIndex, program) => {
  const value1 = +program[program[currentIndex + 1]];
  const value2 = +program[program[currentIndex + 2]];
  const index = program[currentIndex + 3];
  return [value1, value2, index];
};

const jump = (currentIndex, program) => {
  const nextIndex = program[currentIndex + 1];
  return [program[nextIndex], nextIndex];
};

const move = (currentIndex, program) => {
  const [value, a, nextIndex] = getValues(currentIndex, program);
  program.splice(program[currentIndex + 2], 1, `${value}`);
  return [program[nextIndex], currentIndex + 3];
};

const halt = (currentIndex, program) => program[currentIndex];

const add = (x, y) => x + y;

const sub = (x, y) => x - y;

const subtraction = (currentIndex, program) =>
  additionAndSubtraction(currentIndex, program, sub);

const addition = (currentIndex, program) =>
  additionAndSubtraction(currentIndex, program, add);

const additionAndSubtraction = (currentIndex, program, operation) => {
  const [value1, value2, index] = getValues(currentIndex, program);
  program.splice(index, 1, "" + operation(value1, value2));
  return [program[currentIndex + 4], currentIndex + 4];
};

const areEqual = (x, y) => x === y;

const isLessThan = (x, y) => x < y;

const lessThanOrEqualTo = (currentIndex, program, operation) => {
  const [value1, value2, nextIndex] = getValues(currentIndex, program);
  return operation(value1, value2)
    ? [program[nextIndex], currentIndex + 3]
    : [program[currentIndex + 4], currentIndex + 4];
};

const equalTo = (currentIndex, program) =>
  lessThanOrEqualTo(currentIndex, program, areEqual);

const lessThan = (currentIndex, program) =>
  lessThanOrEqualTo(currentIndex, program, isLessThan);

const opcodeToExcute = (currentIndex, program) => {
  const opcodes = {
    1: addition,
    2: subtraction,
    3: jump,
    4: equalTo,
    5: lessThan,
    7: move,
    9: halt,
  };

  if (!opcodes[program[currentIndex]] in opcodes) {
    console.log(`Invalid command ${program[currentIndex]} at ${currentIndex}`);
  }

  return opcodes[program[currentIndex]](currentIndex, program);
};

const addEmptyAtStarting = (input) => {
  const program = input.split(" ");
  program.unshift("");
  return program;
};

const runProgram = (program) => {
  let currentElement = program.at(1);
  let currentIndex = "1";

  while (currentElement !== "9") {
    [currentElement, currentIndex] = opcodeToExcute(+currentIndex, program);
  }

  return program;
};

const isValid = (program) => program.map((element) => +element >= 0);

const sprint = () => {
  const input = prompt("Write program here: ");
  const program = addEmptyAtStarting(input);

  if (!isValidProgram(program)) {
    console.error("Invalid program input. Please enter a valid program.");
    return;
  }

  const result = runProgram(program);
  console.log("Final program state:", result);
};

sprint();
