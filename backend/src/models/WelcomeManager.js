const AbstractManager = require("./AbstractManager");

class WelcomeManager extends AbstractManager {
  constructor() {
    super({ table: "welcomemessage" });
  }

  findWelMess() {
    return this.database.query(`select welcomeText from  ${this.table}`);
  }

  updateWelmess(message) {
    return this.database.query(
      `update ${this.table} set welcomeText = ?`,
      message.welcomeText
    );
  }
}

module.exports = WelcomeManager;
