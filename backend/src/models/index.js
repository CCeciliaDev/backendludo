require("dotenv").config();

const mysql = require("mysql2/promise");

// create a connection pool to the database

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// try a connection

pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

// declare and fill models: that's where you should register your own managers

const models = {};

const ArticleManager = require("./ArticleManager");
const WelcomeManager = require("./WelcomeManager");
const ThemeManager = require("./ThemeManager");
const DocumentManager = require("./DocumentManager");
const PlaceManager = require("./PlaceManager");
const PriceManager = require("./PriceManager");
const ContactManager = require("./ContactManager");
const AdminManager = require("./AdminManager");
const ThDocManager = require("./ThDocManager");
const PasswordManager = require("./PasswordManager");
const AboutManager = require("./AboutManager");
const ConsultManager = require("./ConsultManager");
const UserManager = require("./UserManager");

models.article = new ArticleManager();
models.article.setDatabase(pool);

models.welcome = new WelcomeManager();
models.welcome.setDatabase(pool);

models.theme = new ThemeManager();
models.theme.setDatabase(pool);

models.document = new DocumentManager();
models.document.setDatabase(pool);

models.place = new PlaceManager();
models.place.setDatabase(pool);

models.price = new PriceManager();
models.price.setDatabase(pool);

models.contact = new ContactManager();
models.contact.setDatabase(pool);

models.admin = new AdminManager();
models.admin.setDatabase(pool);

models.thDoc = new ThDocManager();
models.thDoc.setDatabase(pool);

models.pass = new PasswordManager();
models.pass.setDatabase(pool);

models.about = new AboutManager();
models.about.setDatabase(pool);

models.consult = new ConsultManager();
models.consult.setDatabase(pool);

models.user = new UserManager();
models.user.setDatabase(pool);

// bonus: use a proxy to personalize error message,
// when asking for a non existing model

// bonus : utilisez un proxy pour personnaliser le message d'erreur,
// lors de la demande d'un modèle non existant

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = new Proxy(models, handler);
