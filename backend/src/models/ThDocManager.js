const AbstractManager = require("./AbstractManager");

class ThDocManager extends AbstractManager {
  constructor() {
    super({ table: "themesdoc" });
  }

  insertThDoc(thDoc) {
    return this.database.query(
      `insert into ${this.table} (themesDocName) values (?)`,
      [thDoc.themesArticleName]
    );
  }

  updateThDoc(thDoc) {
    return this.database.query(
      `update ${this.table} set themesDocName = ? where id = ?`,
      [thDoc.themesArticleName, thDoc.id]
    );
  }
}

module.exports = ThDocManager;
