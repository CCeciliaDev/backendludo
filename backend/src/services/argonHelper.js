const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (plainPassword) => {
  return argon2
    .hash(plainPassword, hashingOptions)
    .then((hashedPassword) => {
      // console.info(hashedPassword);
      return hashedPassword;
    })

    .catch((err) => {
      console.error(err);
      throw new Error("Error hashing password");
    });
};

async function verifyPassword(hashedPassword, plainPassword) {
  try {
    return await argon2.verify(hashedPassword, plainPassword);
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
};
