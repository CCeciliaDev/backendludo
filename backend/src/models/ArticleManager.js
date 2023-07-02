const AbstractManager = require("./AbstractManager");

class ArticleManager extends AbstractManager {
  constructor() {
    super({ table: "articles" });
  }

  findPublishedArticles() {
    return this.database.query(
      `select articles.id, articles.idThemesArticle, articles.dateArticle, articles.titleArticle, articles.textArticle, articles.urlImg, articles.archived, themesArticleName 
      FROM ${this.table}
      JOIN themesArticles ON articles.idThemesArticle = themesArticles.id
      WHERE articles.archived = 0
      ORDER BY articles.dateArticle DESC`
    );
  }

  findArchivedArticles() {
    return this.database.query(
      `select articles.id, articles.idThemesArticle, articles.dateArticle, articles.titleArticle, articles.textArticle, articles.urlImg, articles.archived, themesArticleName 
      FROM ${this.table}
      JOIN themesArticles ON articles.idThemesArticle = themesArticles.id
      WHERE articles.archived = 1
      ORDER BY articles.dateArticle DESC`
    );
  }

  findArticles(id) {
    return this.database.query(
      `select articles.id, articles.idThemesArticle, articles.dateArticle, articles.titleArticle, articles.textArticle, articles.urlImg, articles.archived, themesArticleName 
      FROM ${this.table}
      JOIN themesArticles ON articles.idThemesArticle = themesArticles.id
      WHERE articles.id = ?`,
      [id]
    );
  }

  insertArticles(article) {
    return this.database.query(
      `insert into ${this.table} (titleArticle, dateArticle, textArticle, urlImg, archived, idThemesArticle) values (?, ?, ?, ?, ?, ?)`,
      [
        article.titleArticle,
        article.dateArticle,
        article.textArticle,
        article.urlImg,
        article.archived,
        article.idThemesArticle,
      ]
    );
  }

  updateArticles(article) {
    return this.database.query(
      `update ${this.table} set titleArticle = ?, dateArticle = ?, textArticle = ?, urlImg = ?, archived = ?, idThemesArticle = ?
      where id = ?`,
      [
        article.titleArticle,
        article.dateArticle,
        article.textArticle,
        article.urlImg,
        article.archived,
        article.idThemesArticle,
        article.id,
      ]
    );
  }
}

module.exports = ArticleManager;
