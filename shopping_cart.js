const table = [];

const displayItems = (table) => {
  if (table.length === 0) {
    console.table([" Empty cart "]);
    return;
  }

  console.table(table);
};

const deleteItem = (table, command) => {
  const itemName = command.slice(6).trim().toLowerCase();
  const index = table.findIndex((item) => item.name === itemName);
  if (index === -1) {
    console.log(" Item not found ");
    return;
  }

  table.splice(index, 1);
  console.log("\n Item removed form cart");
};

const addItems = (table) => {
  const item = readUserInput(" Enter item Name :");
  const itemPrice = +readUserInput(" Enter item Price :");
  const itemQuantity = +readUserInput(" Enter item Quantity :");

  const newItem = {
    name: item,
    price: itemPrice,
    quantity: itemQuantity,
    total: itemPrice * itemQuantity,
  };

  table.push(newItem);
  console.log("\n Item added into cart");
};

const calculateAmount = (table) => {
  const cost = table.reduce((x, item) => x + item.total, 0);
  console.log("\n Total Amount is ", cost);
  return cost;
};

const getDiscountPrice = (total, rate) => total - total * (rate / 100);

const calculateDiscount = (table) => {
  const rate = +readUserInput(" Enter discount percentage :");
  const total = calculateAmount(table);
  const totalWithDiscount = getDiscountPrice(total, rate);
  console.log("\n Total Amount is ", total);
  console.log("\n  Amount with Discount ", totalWithDiscount);
};

const commandToexcute = (command) => {
  const commands = {
    show: displayItems,
    remove: deleteItem,
    add: addItems,
    total: calculateAmount,
    discount: calculateDiscount,
  };

  const spaceIndex =
    command.indexOf(" ") < 0 ? command.length : command.indexOf(" ");
  const commandStarts = command.slice(0, spaceIndex).toLowerCase();
  commands[commandStarts](table, command);
};

const readUserInput = (message) => prompt(message);

const getMessage = () => "\n\n Enter an Operation :";

const disPlayInstructions = () => {
  const heading = " Operations to Enter \n";
  const instructions1 = " -> Add item\n -> Remove item name\n -> show items";
  const instructions2 = "\n -> Total amount \n Discount";

  console.log(heading + instructions1 + instructions2);
};

const isValid = (command) => {
  const commands = ["add", "show", "remove", "total", "discount"];
  const spaceIndex =
    command.indexOf(" ") < 0 ? command.length : command.indexOf(" ");
  const commandStarts = command.slice(0, spaceIndex).toLowerCase();

  return commands.includes(commandStarts);
};

const startShopping = () => {
  disPlayInstructions();

  while (true) {
    const userInput = readUserInput(getMessage());
    if (!isValid(userInput)) {
      console.log("\n Invalid input ");
      continue;
    }

    commandToexcute(userInput);
  }
};

startShopping();
