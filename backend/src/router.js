const express = require("express");

const router = express.Router();
const rateLimit = require("express-rate-limit");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const mailer = require("./services/emailManager");
// const { v4: uuidv4 } = require("uuid");
const checkAdminToken = require("./services/checkAdminToken");
const checkToken = require("./services/checkToken");

require("dotenv").config();

// précise que le dossier uploads contient des fichiers statiques
router.use("/uploads", express.static("public/uploads"));

// *********** Routes multer upload OK fonctionne *******************************
function getUniqueFileName(originalName, basePath, suffix = 0) {
  const ext = path.extname(originalName);
  const baseName = path.basename(originalName, ext);
  const newFileName = suffix === 0 ? baseName : `${baseName}-${suffix}`;
  const fullPath = path.join(basePath, newFileName + ext);

  if (fs.existsSync(fullPath)) {
    return getUniqueFileName(originalName, basePath, suffix + 1);
  }
  return newFileName + ext;
}

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/files");
  },
  filename: (req, file, cb) => {
    const uniqueFileName = getUniqueFileName(
      file.originalname,
      "./public/uploads/files"
    );
    cb(null, uniqueFileName);
  },
});

const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/images");
  },
  filename: (req, file, cb) => {
    const uniqueFileName = getUniqueFileName(
      file.originalname,
      "./public/uploads/images"
    );
    cb(null, uniqueFileName);
  },
});

const uploadFile = multer({ storage: fileStorage });
const uploadImg = multer({ storage: imgStorage });

// Route POST pour recevoir un fichier
router.post(
  "/send/file",
  checkAdminToken,
  uploadFile.single("file"),
  (req, res) => {
    const baseUrl = process.env.BASE_URL;
    const filePath = `/uploads/files/${req.file.filename}`;
    res.send({
      url: baseUrl + filePath,
      message: "File uploaded",
    });
  }
);

// Route POST pour recevoir une image
router.post(
  "/send/img",
  checkAdminToken,
  uploadImg.single("img"),
  (req, res) => {
    const baseUrl = process.env.BASE_URL;
    const filePath = `/uploads/images/${req.file.filename}`;
    console.info(baseUrl);
    res.send({
      url: baseUrl + filePath,
      message: "Image uploaded",
    });
  }
);

// router.post(
//   "/send/img",
//   checkAdminToken,
//   uploadImg.single("img"),
//   (req, res) => {
//     const imageUrl = `http://localhost:5000/uploads/images/${req.file.filename}`;
//     res.send({ url: imageUrl, message: "Image uploaded" });
//   }
// );

// ******** Route pour gérer les soumissions de formulaire avec Honeypot (champ messText) et sans liens ********

// Limite le taux de requêtes à 10 requêtes par heure
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 10, // 10 requêtes par fenêtre
});

router.post("/send-email", limiter, (req, res) => {
  const { name, email, subject, message, messText } = req.body;

  // Vérifier si le messText a été rempli
  if (messText) {
    // La demande est probablement un bot, ignorez-la
    return res.status(400).json({ error: "Erreur détectée" });
  }

  // Vérifier si le message ou le sujet contient un lien
  const linkRegex = /(https?:\/\/[^\s]+)/g; // regex qui détecte les liens
  if (linkRegex.test(message) || linkRegex.test(subject)) {
    // ajout de la vérification pour le sujet
    // si le message ou le sujet contient un lien, rejet de la demande
    return res
      .status(400)
      .json({ error: "L'envoi de liens n'est pas autorisé" });
  }

  return new Promise((resolve, reject) => {
    mailer.sendMail(
      {
        from: email,
        to: process.env.SMTP_EMAIL,
        subject: `Nouveau message de ${name}: ${subject}`,
        text: message,
        html: `
          <h1>Nouveau message de ${name}</h1>
          <p>Sujet: ${subject}</p>
          <p>Email: ${email}</p>
          <p>Message: ${message}</p>
        `,
      },
      (err, info) => {
        if (err) {
          console.error(err);
          res.status(500).json({
            error: "Une erreur est survenue lors de l'envoi de l'e-mail",
          });
          reject(err);
        } else {
          console.info(info);
          res.status(200).json({ message: "E-mail envoyé avec succès" });
          resolve(info);
        }
      }
    );
  });
});

const articlesControllers = require("./controllers/articleControllers");
const documentControllers = require("./controllers/documentControllers");
const themeControllers = require("./controllers/themeControllers");
const welcomeControllers = require("./controllers/welcomeControllers");
const aboutControllers = require("./controllers/aboutControllers");
const consultControllers = require("./controllers/consultControllers");
const placeControllers = require("./controllers/placeControllers");
const priceControllers = require("./controllers/priceControllers");
const contactControllers = require("./controllers/contactControllers");
const adminControllers = require("./controllers/adminControllers");
const thDocControllers = require("./controllers/thDocControllers");
const passwordControllers = require("./controllers/passwordControllers");
const userControllers = require("./controllers/userControllers");

// --------------------------------------------------
// # # # # # # # # # ROUTES PUBLIQUES # # # # # # # # #

// ------------ Route de connexion admin ------------
router.post("/adminlogin", adminControllers.loginAdmin); // OK fonctionne
// --------------------------------------------------
router.get("/about", aboutControllers.read);
// --------------------------------------------------
router.get("/articles", articlesControllers.browsePublishedArticles); // OK
router.get("/articles/:id", articlesControllers.read); // OK
// --------------------------------------------------
router.get("/consultation", consultControllers.read);
// --------------------------------------------------
router.get("/contact", contactControllers.browse);
// --------------------------------------------------
router.get("/documents", checkToken, documentControllers.browse);
router.get("/documents/:id", checkToken, documentControllers.read);
router.get(
  "/documentsbytheme/:idThemesDoc",
  checkToken,
  documentControllers.browseByThemes
);
// --------------------------------------------------
router.get("/themes", themeControllers.browse);
router.get("/themes/:id", themeControllers.read);
// --------------------------------------------------
router.get("/welcome", welcomeControllers.read);
// --------------------------------------------------

router.get("/places", placeControllers.browse);
// --------------------------------------------------
router.get("/prices", priceControllers.browse);
// --------------------------------------------------
router.get("/thdoc", thDocControllers.browse);
// --------------------------------------------------

// ------------ Route provisoire---------------------
router.post("/createadmin", adminControllers.add); // OK Fonctionne

// ------------ Route de connexion admin ------------
router.post("/adminlogin", adminControllers.loginAdmin); // OK fonctionne

// ------------ Routes users ------------------------
router.post("/userlogin", userControllers.loginUser); //
router.get("/userlogin", userControllers.browse); // OK *** A ENLEVER AVANT DEPLOIEMENT

// ------------ Middleware Admin --------------------

router.use(checkAdminToken);

// # # # # # # # # # ROUTES PRIVÉES # # # # # # # # #

// --------------- Articles -------------------------
router.put("/articles/:id", articlesControllers.edit); // OK
router.post("/articles", articlesControllers.add); // OK
router.delete("/articles/:id", articlesControllers.destroy); // OK
// router.get("/articles/archived", articlesControllers.browseArchivedArticles);
router.get("/archivedarticles", articlesControllers.browseArchivedArticles);

// --------------- Documents ------------------------
router.put("/documents/:id", documentControllers.edit);
router.post("/documents", documentControllers.add);
router.delete("/documents/:id", documentControllers.destroy);

// --------------- Thèmes ---------------------------
router.put("/themes/:id", themeControllers.edit); // OK
router.post("/themes", themeControllers.add); // OK
router.delete("/themes/:id", themeControllers.destroy); // OK

// --------------- Welcome Text ---------------------
router.put("/welcome", welcomeControllers.edit); // OK

// --------------- About ----------------------------
router.put("/about", aboutControllers.edit);

// --------------- Consultation ---------------------
router.put("/consultation", consultControllers.edit); // OK

// --------------- Contact --------------------------
router.put("/contact", contactControllers.edit); // OK

// --------------- Places ---------------------------
router.put("/places/:id", placeControllers.edit);
router.post("/places", placeControllers.add);
router.delete("/places/:id", placeControllers.destroy);

// --------------- Prices ---------------------------
router.put("/prices/:id", priceControllers.edit);
router.post("/prices", priceControllers.add);
router.delete("/prices/:id", priceControllers.destroy);

// --------------- Themes espace documentaire -------
router.put("/thdoc/:id", thDocControllers.edit);
router.post("/thdoc", thDocControllers.add);
router.delete("/thdoc/:id", thDocControllers.destroy);

// --------------- Password -------------------------
router.get("/pass/", passwordControllers.browse);
router.get("/pass/:id", passwordControllers.read);
router.get("/passless", passwordControllers.browseWithoutTheme);
router.put("/pass/:id", passwordControllers.edit);
router.post("/pass", passwordControllers.add);
router.delete("/pass/:id", passwordControllers.destroy);

module.exports = router;
