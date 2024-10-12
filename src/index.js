const gameManager = require("../src/store");
const startLogger = require("./logger");
const pubsubInstance = require("./pubsub-singleton/pubsubManager");

console.log("ggggg", gameManager);

setInterval(() => {
  // gameManager.addGame(Math.random().toString());
  pubsubInstance.userSubscribe(Math.random().toString(), "Apple");
  console.log("--->", pubsubInstance.subscriptions);
}, 5000);

// startLogger();
