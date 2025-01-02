const readlineSync = require("readline-sync");

const table = [];

const displayItems = (table) => {
  if (table.length === 0) {
    console.table(["Empty cart"]);
    return;
  }
  console.table(table);
};

const deleteItem = (table, command) => {
  const itemName = command.slice(6).trim().toLowerCase();
  const index = table.findIndex((item) => item.name.toLowerCase() === itemName);
  if (index === -1) {
    console.log("Item not found");
    return;
  }
  table.splice(index, 1);
  console.log("\nItem removed from cart");
};

const addItems = (table) => {
  const item = readlineSync.question("Enter item Name: ").trim();
  const itemPrice = +readlineSync.question("Enter item Price: ");
  const itemQuantity = +readlineSync.question("Enter item Quantity: ");

  if (!item || itemPrice <= 0 || itemQuantity <= 0) {
    console.log("Invalid input. Please try again.");
    return;
  }

  const newItem = {
    name: item,
    price: itemPrice,
    quantity: itemQuantity,
    total: itemPrice * itemQuantity,
  };

  table.push(newItem);
  console.log("\nItem added into cart");
};

const calculateAmount = (table) => {
  const cost = table.reduce((sum, item) => sum + item.total, 0);
  console.log("\nTotal Amount is", cost);
  return cost;
};

const getDiscountPrice = (total, rate) => total - total * (rate / 100);

const calculateDiscount = (table) => {
  const rate = +readlineSync.question("Enter discount percentage: ");
  if (rate < 0 || rate > 100) {
    console.log("Invalid discount percentage. Please try again.");
    return;
  }
  const total = calculateAmount(table);
  const totalWithDiscount = getDiscountPrice(total, rate);
  console.log("\nTotal Amount is", total);
  console.log("\nAmount with Discount", totalWithDiscount);
};

const sortItems = (table) => {
  const sorted = [...table].sort((x, y) => x.total - y.total);
  displayItems(sorted);
};

const filterItems = (table, command) => {
  const threshold = +command.match(/\d+/)?.[0];
  if (isNaN(threshold)) {
    console.log("Invalid filter value. Please try again.");
    return;
  }
  const filtered = table.filter(({ total }) => total > threshold);
  displayItems(filtered);
};

const commandToExecute = (command) => {
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

  if (commands[commandStarts]) {
    commands[commandStarts](table, command);
  } else {
    console.log("Unknown command.");
  }
};

const disPlayInstructions = () => {
  const instructions = `
Operations to Enter:
-> Add
-> Remove <item name>
-> Show
-> Total
-> Discount
-> Sort
-> Filter above <amount>
-> Quit
`;
  console.log(instructions);
};

const startShopping = () => {
  disPlayInstructions();

  while (true) {
    const userInput = readlineSync.question("\nEnter an operation: ").trim();
    if (userInput.toLowerCase() === "quit") {
      console.log("Thank you for shopping!");
      break;
    }
    commandToExecute(userInput);
  }
};

startShopping();
