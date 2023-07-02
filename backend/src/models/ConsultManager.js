const AbstractManager = require("./AbstractManager");

class ConsultManager extends AbstractManager {
  constructor() {
    super({ table: "consultation" });
  }

  findAllConsult() {
    return this.database.query(
      `select reason, expertise, consultation from  ${this.table}`
    );
  }

  updateConsult(consult) {
    return this.database.query(
      `update ${this.table} set reason = ?, expertise = ?, consultation = ?`,
      [consult.reason, consult.expertise, consult.consultation]
    );
  }
}

module.exports = ConsultManager;
