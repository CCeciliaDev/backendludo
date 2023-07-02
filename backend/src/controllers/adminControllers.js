const models = require("../models");
const { hashPassword, verifyPassword } = require("../services/argonHelper");
const { encodeJWTadmin } = require("../services/jwtHelper");

const browse = (req, res) => {
  models.admin
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.admin
    .find(req.params.id)
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

const add = async (req, res) => {
  try {
    const admin = req.body;

    // Hachez le mot de passe de l'administrateur
    const hashedPassword = await hashPassword(admin.password);

    // Remplacez le mot de passe en clair par le mot de passe haché
    admin.password = hashedPassword;

    const result = await models.admin.insertAdmin(admin);
    res.location(`/admin/${result.insertId}`).sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send("Missing email or password");
    }

    const [adminResult] = await models.admin.findByEmail(email);
    const admin = adminResult[0] || adminResult;
    const storedPassword = admin.password;

    // Testez le hachage et la vérification avec un mot de passe connu
    // const testPassword = "password123";
    // const testHash = await hashPassword(testPassword);
    // const testVerification = await verifyPassword(testHash, testPassword);
    // console.info("Test hashing and verification result:", testVerification);

    if (!storedPassword) {
      return res.status(401).send("Invalid Credentials");
    }

    const passwordVerification = await verifyPassword(storedPassword, password);

    if (!passwordVerification) {
      return res.status(401).send("Invalid Credentials");
    }

    delete admin.password;

    const token = encodeJWTadmin(admin);
    // console.info("Generated JWT admin token:", token);

    res.header("Access-Control-Expose-Headers", "x-access-token, role");
    res.set("x-access-token", token);
    res.set("role", "admin");

    return res
      .status(200)
      .send({ message: "Login successful", token, role: "admin" });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

// const logoutAdmin = (req, res) => {
//   try {
//     res.clearCookie("auth_token");
//     res.status(200).send("Logout successful");
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(500);
//   }
// };

// const destroy = (req, res) => {
//   models.admin
//     .delete(req.params.id)
//     .then(([result]) => {
//       if (result.affectedRows === 0) {
//         res.sendStatus(404);
//       } else {
//         res.sendStatus(204);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

// module.exports = {
//   browse,
//   read,
//   add,
//   loginAdmin,
//   logoutAdmin,
// };

module.exports = {
  browse,
  read,
  add,
  loginAdmin,
};
