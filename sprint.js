const add = (x, y) => x + y;
const sub = (x, y) => x - y;
const isEqual = (x, y) => x === y;
const isLessThan = (x, y) => x < y;
const halt = (currentIndex, program) => program[currentIndex];

const jump = (currentIndex, program) => {
  const nextIndex = program[currentIndex + 1];
  return [program[nextIndex], nextIndex];
};

const getValues = (currentIndex, program) => {
  const value1 = program[program[currentIndex + 1]];
  const value2 = program[program[currentIndex + 2]];
  const index = program[currentIndex + 3];
  return [value1, value2, index];
};

const additionAndSubtraction = (currentIndex, program, operation) => {
  const [value1, value2, index] = getValues(currentIndex, program);
  program.splice(index, 1, operation(value1, value2));
  return [program[currentIndex + 4], currentIndex + 4];
};

const move = (currentIndex, program) => {
  const [value, _, opcode] = getValues(currentIndex, program);
  program.splice(program[currentIndex + 2], 1, value);
  return [opcode, currentIndex + 3];
};

const addition = (currentIndex, program) =>
  additionAndSubtraction(currentIndex, program, add);

const subtraction = (currentIndex, program) =>
  additionAndSubtraction(currentIndex, program, sub);

const lessThanOrEqualTo = (currentIndex, program, operation) => {
  const [value1, value2, nextIndex] = getValues(currentIndex, program);

  return operation(value1, value2)
    ? [program[nextIndex], nextIndex]
    : [program[currentIndex + 4], currentIndex + 4];
};

const equalTo = (currentIndex, program) =>
  lessThanOrEqualTo(currentIndex, program, isEqual);

const lessThan = (currentIndex, program) =>
  lessThanOrEqualTo(currentIndex, program, isLessThan);

const excuteOpcode = (currentIndex, program) => {
  const opcodes = {
    1: addition,
    2: subtraction,
    3: jump,
    4: equalTo,
    5: lessThan,
    7: move,
    9: halt,
  };

  if (!(program[currentIndex] in opcodes)) {
    console.log(`Invalid command ${program[currentIndex]} at ${currentIndex}`);
    return [undefined];
  }

  return opcodes[program[currentIndex]](+currentIndex, program);
};

const runProgram = (program) => {
  let opcode = program.at(1);
  let currentIndex = "1";

  while (opcode !== 9 && opcode !== undefined) {
    [opcode, currentIndex] = excuteOpcode(currentIndex, program);
  }

  return program;
};

const isValidProgram = (program) => program.every((element) => element >= 0);

const convertToArray = (input) => {
  const program = input.split(" ").map((x) => +x);
  program.unshift(0);
  return program;
};

const sprint = () => {
  const input = prompt("\nWrite Program Here :");
  const program = convertToArray(input);

  if (!isValidProgram(program)) {
    console.error("\nInvalid program input. Please enter a valid program.");
    return;
  }

  const result = runProgram(program);
  result.shift();
  console.log("\nFinal program state:", result.join(" "));
};

sprint();
