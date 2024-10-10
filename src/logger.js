const gameManager = require("./store");

const startLogger = () => {
  setInterval(() => {
    console.log(gameManager.logger());
  }, 5000);
};

module.exports = startLogger;
