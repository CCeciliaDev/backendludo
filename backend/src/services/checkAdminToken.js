const jwt = require('jsonwebtoken') // eslint-disable-line

// ------------ Extraction du token -----------
// const extractBearer = (authorization) => {
//   if (typeof authorization !== "string") {
//     return false;
//   }

//   // On isole le token
//   const matches = authorization.match(/(bearer)\s+(\S+)/i);

//   return matches && matches[2];
// };
// --------------------------------------------

const checkAdminToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header for admin is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    // v&rification du role admin
    if (payload.role !== "admin") {
      throw new Error("User does not have 'admin' role");
    }

    // si token + role ok, stocké le payload
    req.payload = payload;

    console.info("Token and role verification successful");
    // console.info("Token and role verification successful: ", payload);

    next();
  } catch (err) {
    console.error("Token or role verification failed: ", err);
    // envoie statut non autorisé
    res.sendStatus(401);
  }
};

module.exports = checkAdminToken;
