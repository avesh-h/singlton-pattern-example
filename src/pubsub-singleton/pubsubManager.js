const { createClient } = require("redis");

// This is example of how we can implement the pubsub with singleton pattern

class PubsubManager {
  static instance = null;
  static redisClient = null;
  static subscriptions = null;

  constructor() {
    this.redisClient = createClient();
    this.redisClient.connect();
    this.subscriptions = new Map();
  }

  //Add for subs
  userSubscribe(userId, stock) {
    if (!this.subscriptions.has(stock)) {
      this.subscriptions.set(stock, []);
    }
    this.subscriptions.get(stock).push(userId);

    //So here we want to only subscribe for the perticular stock only for once when atleast have one user , don't need to do resubscribe again and again whenever new user add to that stock ticker.
    if (this.subscriptions.get(stock)?.length === 1) {
      this.redisClient.subscribe(stock, (msg) => {
        this.handleMessage(stock, msg);
      });
      console.log("User subscribe to channel " + stock);
    }
  }

  //Remove subscription
  userUnsubscribe(userId, stock) {
    this.subscriptions.set(
      stock,
      this.subscriptions.get(stock).filter((uId) => uId !== userId) || []
    );

    //Here we need to unsubscribe for the event when there is no user is intrested for the stock price so we did unsubscribe.
    if (this.subscriptions.get(stock)?.length === 0) {
      this.redisClient.unsubscribe(stock);
      console.log("Unsubscribe for the this " + stock);
    }
  }

  handleMessage(stock, price) {
    // send latest price of the stock to all the user who wants to notified for that perticular stock
    this.subscriptions.get(stock).forEach((sub) => {
      console.log(
        "Send this " + price + " of stock price " + stock + " to user " + sub
      );
    });
  }

  static getInstance() {
    if (PubsubManager.instance) {
      return PubsubManager.instance;
    }
    PubsubManager.instance = new PubsubManager();
    return PubsubManager.instance;
  }
}

const pubsubInstance = PubsubManager.getInstance();

module.exports = pubsubInstance;
