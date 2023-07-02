const AbstractManager = require("./AbstractManager");

class AboutManager extends AbstractManager {
  constructor() {
    super({ table: "about" });
  }

  findAllAbout() {
    return this.database.query(
      `select about, qualifications, experiences, urlImgAbout from  ${this.table}`
    );
  }

  updateAbout(about) {
    return this.database.query(
      `update ${this.table} set about = ?, qualifications = ?, experiences = ?, urlImgAbout = ?`,
      [about.about, about.qualifications, about.experiences, about.urlImgAbout]
    );
  }
}

module.exports = AboutManager;
