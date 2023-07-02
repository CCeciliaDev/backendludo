const AbstractManager = require("./AbstractManager");

class PasswordManager extends AbstractManager {
  constructor() {
    super({ table: "passwords" });
  }

  findAllWithoutTheme() {
    return this.database.query(
      `SELECT themesdoc.id, themesdoc.themesDocName
      FROM themesdoc
      LEFT JOIN passwords ON themesdoc.id = passwords.idThemesDoc
      WHERE passwords.idThemesDoc IS NULL`
    );
  }

  findAllPass() {
    return this.database.query(
      `select passwords.id, passwords.passName, passwords.idThemesDoc, passwords.role, themesdoc.themesDocName
      FROM ${this.table}
      JOIN themesdoc ON passwords.idThemesDoc = themesdoc.id
      ORDER BY themesdoc.themesDocName ASC`
    );
  }

  findPass(id) {
    return this.database.query(
      `select passwords.id, passwords.passName, passwords.idThemesDoc,  passwords.role, themesdoc.themesDocName
      FROM ${this.table}
      JOIN themesdoc ON passwords.idThemesDoc = themesdoc.id
      WHERE passwords.id = ?`,
      [id]
    );
  }

  insertPass(pass) {
    return this.database.query(
      `INSERT INTO ${this.table} (passName, password, idThemesDoc, role) VALUES (?, ?, ?, 0)`,
      [pass.passName, pass.password, pass.idThemesDoc]
    );
  }

  updatePass(pass) {
    return this.database.query(
      `UPDATE ${this.table} SET passName = ?, password = ?, idThemesDoc = ?, role = 0 WHERE id = ?`,
      [pass.passName, pass.password, pass.idThemesDoc, pass.id]
    );
  }
}

module.exports = PasswordManager;
