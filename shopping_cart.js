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

const sortItems = (table) => {
  const sorted = table.sort((x, y) => x.total - y.total);
  console.log(sorted);
  displayItems(sorted);
};

const filterItems = (table, command) => {
  const threshold = +command.slice(command.indexOf("above")).trim();
  console.log(threshold, typeof threshold);
  const filtered = table.filter(({ total }) => total > threshold);
  displayItems(filtered);
};

const commandToexcute = (command) => {
  const commands = {
    show: displayItems,
    remove: deleteItem,
    add: addItems,
    total: calculateAmount,
    discount: calculateDiscount,
    sort: sortItems,
    filter: filterItems,
  };

  const spaceIndex =
    command.indexOf(" ") < 0 ? command.length : command.indexOf(" ");
  const commandStarts = command.slice(0, spaceIndex).toLowerCase().trim();
  commands[commandStarts](table, command);
};

const readUserInput = (message) => prompt(message);

const getMessage = () => "\n\n Enter an Operation :";

const disPlayInstructions = () => {
  const heading = " Operations to Enter \n";
  let instructions = " -> Add item\n -> Remove item name\n -> show items";
  instructions += "\n -> Total amount \n -> Discount \n -> sort items";
  instructions += "\n -> filter by above or below total amount";

  console.log(heading + instructions);
};

const isValid = (command) => {
  const commands = [
    "add",
    "show",
    "remove",
    "total",
    "discount",
    "sort",
    "filter",
  ];

  const spaceIndex =
    command.indexOf(" ") < 0 ? command.length : command.indexOf(" ");
  const commandStarts = command.slice(0, spaceIndex).toLowerCase().trim();

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
