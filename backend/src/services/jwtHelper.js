const jwt = require("jsonwebtoken");

// const encodeJWT = (payload) => {
//   return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1h" });
// };

// const decodeJWT = (token) => {
//   return jwt.decode(token, process.env.TOKEN_SECRET);
// };

const encodeJWTadmin = (admin) => {
  const payload = {
    email: admin.email,
    role: "admin",
  };

  const options = {
    expiresIn: "2h", // Expiration du token en 2 heures
  };

  const token = jwt.sign(payload, process.env.TOKEN_SECRET, options);
  return token;
};

const encodeJWTuser = (user) => {
  const payload = {
    email: user.passName,
    role: "user",
  };

  const options = {
    expiresIn: "1h", // Expiration du token en 1 heure
  };

  const token = jwt.sign(payload, process.env.TOKEN_SECRET, options);
  return token;
};

const decodeJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded;
  } catch (err) {
    console.error("JWT verification error:", err);
    return null;
  }
};

// module.exports = { encodeJWT, decodeJWT };
module.exports = { encodeJWTadmin, encodeJWTuser, decodeJWT };
