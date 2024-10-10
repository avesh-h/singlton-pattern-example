const gameManager = require("../src/store");
const startLogger = require("./logger");

console.log("ggggg", gameManager);

setInterval(() => {
  gameManager.addGame(Math.random().toString());
}, 5000);

startLogger();
