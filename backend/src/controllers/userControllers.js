const models = require("../models");

const { verifyPassword } = require("../services/argonHelper");
const { encodeJWTuser } = require("../services/jwtHelper");

const browse = (req, res) => {
  models.user
    .findAllUser()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const loginUser = async (req, res) => {
  try {
    const { passName, password } = req.body;
    if (!passName || !password) {
      return res.status(401).send("Missing name or password");
    }

    const [userResult] = await models.user.findByName(passName);
    const user = userResult[0] || userResult;
    const { password: storedPassword, idThemesDoc } = user;

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

    delete user.password;

    const token = encodeJWTuser(user);
    // console.info("Generated JWT user token:", token);

    res.header("Access-Control-Expose-Headers", "x-access-token, role");
    res.set("x-access-token", token);
    res.set("role", "user");

    return res
      .status(200)
      .send({ message: "Login successful", token, idThemesDoc, role: "user" });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

// const logoutUser = (req, res) => {
//   try {
//     res.clearCookie("auth_token");
//     res.status(200).send("Logout successful");
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(500);
//   }
// };

// module.exports = {
//   browse,
//   read,
//   loginUser,
//   logoutUser,
// };

module.exports = {
  browse,
  loginUser,
};
