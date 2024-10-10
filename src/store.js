// Singleton pattern example 1

// The main thing is wrong with this approach we make it the games available for all the files globally but what if someone new come or we might accidently initialize new GameManger() that means we declare the new GameManger() that have new whole games array

// So with singleton approach you need to make sure only one time instance of that class create that's why it called singleton right. it shouldn't be created multiple times.

// so we can not create the private methods or variables for the classes in normal javascript we can do only in typescript

// Typescript code example
// class GameManager {
//     games = [];
//   private static instance = null;

//   private constructor() {
//     this.games = [];
//   }

//   static getInstance() {
//     if (!GameManager.instance) {
//       GameManager.instance = new GameManager();
//       return GameManager.instance;
//     }
//     return GameManager.instance;
//   }
// }

//JS code example
class GameManager {
  static instance = null;
  games = [];

  constructor() {
    if (GameManager.instance) {
      throw new Error("Use GameManager.getInstance() to get the instance.");
    }
    this.games = [];
  }

  static getInstance() {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
      return GameManager.instance;
    }
    return GameManager.instance;
  }

  addGame(gameId) {
    const game = {
      gameId,
      whitePlayer: "user1",
      blackPlayer: "user2",
      moves: [],
    };

    this.games.push(game);
  }

  logger() {
    console.log("games", this.games);
  }
}
const gameManager = GameManager.getInstance();
module.exports = gameManager;
