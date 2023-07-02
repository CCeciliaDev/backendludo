const models = require("../models");
const { hashPassword } = require("../services/argonHelper");

const browse = (req, res) => {
  models.pass
    .findAllPass()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseWithoutTheme = (req, res) => {
  models.pass
    .findAllWithoutTheme()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.pass
    .findPass(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = async (req, res) => {
  try {
    const pass = req.body;

    // Récupérer l'id du mot de passe
    pass.id = parseInt(req.params.id, 10);

    // Hachez le mot de passe de l'espace patient
    const hashedPassword = await hashPassword(pass.password);

    // Remplacez le mot de passe en clair par le mot de passe haché
    pass.password = hashedPassword;

    const [result] = await models.pass.updatePass(pass);

    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const add = async (req, res) => {
  try {
    const pass = req.body;
    // console.info("Request data:", pass);
    // console.info("Table used by model:", models.pass.table);

    // Hachez le mot de passe de l'espace patient
    const hashedPassword = await hashPassword(pass.password);

    // Remplacez le mot de passe en clair par le mot de passe haché
    pass.password = hashedPassword;

    const result = await models.pass.insertPass(pass);
    res.location(`/pass/${result.insertId}`).sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const destroy = (req, res) => {
  models.pass
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  browseWithoutTheme,
  read,
  edit,
  add,
  destroy,
};
