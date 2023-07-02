const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header for user is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    jwt.verify(token, process.env.TOKEN_SECRET);

    console.info("Token verification successful");

    next();
  } catch (err) {
    console.error("Token verification failed : ", err);
    // Envoyer un statut non autorisé
    res.sendStatus(401);
  }
};

module.exports = checkToken;
