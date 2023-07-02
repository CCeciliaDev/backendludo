const AbstractManager = require("./AbstractManager");

class AdminManager extends AbstractManager {
  constructor() {
    super({ table: "admin" });
  }

  insertAdmin(admin) {
    return this.database.query(
      `insert into ${this.table} (email, password, role) values (?, ?, 1)`,
      [admin.email, admin.password]
    );
  }

  findByEmail(email) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE email = ?`, [
      email,
    ]);
  }
}

module.exports = AdminManager;
