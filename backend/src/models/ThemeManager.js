const AbstractManager = require("./AbstractManager");

class ThemeManager extends AbstractManager {
  constructor() {
    super({ table: "themesarticles" });
  }

  insertTheme(theme) {
    return this.database.query(
      `insert into ${this.table} (themesArticleName) values (?)`,
      theme.themesArticleName
    );
  }

  updateTheme(theme) {
    return this.database.query(
      `update ${this.table} set themesArticleName = ? where id = ?`,
      [theme.themesArticleName, theme.id]
    );
  }
}

module.exports = ThemeManager;
