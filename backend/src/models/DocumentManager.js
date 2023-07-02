const AbstractManager = require("./AbstractManager");

class DocumentManager extends AbstractManager {
  constructor() {
    super({ table: "documents" });
  }

  findAllDoc() {
    return this.database.query(
      `select documents.id, documents.idThemesDoc, documents.docName, documents.urlDoc, themesdoc.themesDocName
      FROM ${this.table}
      JOIN themesdoc ON documents.idThemesDoc = themesdoc.id
      ORDER BY themesdoc.themesDocName, documents.docName ASC`
    );
  }

  findAllDocByThemes(idThemesDoc) {
    return this.database.query(
      `select documents.id, documents.idThemesDoc, documents.docName, documents.urlDoc
      FROM ${this.table}
      WHERE documents.idThemesDoc = ?`,
      [idThemesDoc]
    );
  }

  insertDoc(document) {
    return this.database.query(
      `insert into ${this.table} (idThemesDoc, docName, urlDoc) values (?, ?, ?)`,
      [document.idThemesDoc, document.docName, document.urlDoc]
    );
  }

  updateDoc(document) {
    return this.database.query(
      `update ${this.table} set idThemesDoc = ?, docName = ?, urlDoc = ?
      where id = ?`,
      [document.idThemesDoc, document.docName, document.urlDoc, document.id]
    );
  }
}

module.exports = DocumentManager;
