const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "passwords" });
  }

  findAllUser() {
    return this.database.query(`select * from  ${this.table}`);
  }

  findByName(passName) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE passName = ?`,
      [passName]
    );
  }
}

module.exports = UserManager;
