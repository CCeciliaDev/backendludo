-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema psycho
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `psycho` DEFAULT CHARACTER SET utf8mb3 ;
USE `psycho` ;

-- -----------------------------------------------------
-- Table `psycho`.`about`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psycho`.`about` (
  `about` MEDIUMTEXT NOT NULL,
  `qualifications` MEDIUMTEXT NOT NULL,
  `experiences` MEDIUMTEXT NOT NULL,
  `urlImgAbout` VARCHAR(255) NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

INSERT INTO `about` VALUES ('<p>Psychologue clinicien diplômé de l\'université de Bordeaux, je suis spécialisé en neuropsychologie du sujet âgé.</p><p>Je vous propose soutien et accompagnement psychologique à chaque étape de la thérapie.</p><p>Mon approche est intégrative tout en ayant une approche thérapeutique basée sur les Thérapies comportementale et cognitive dont la thérapie des schémas. J\'utilise aussi des outils basés sur la sophrologie et la méditation de pleine conscience.</p><p>J\'ai pu exercer de nombreux métiers avant de devenir psychologue. Ces expériences sont des outils très utiles lors des consultations et permettent une grande ouverture d\'esprit.</p><p>Une consultation repose sur une écoute et une dynamique, dans un cadre précis établi en accord avec le patient. Ponctuellement ou dans la durée, je reçois en consultation individuelle.</p><p>Le psychologue est tenu par le secret professionnel et s’engage à respecter le code de déontologie de la profession.</p><p><br></p><p>Je suis référencé par la <a href=\"https://cpts-medoc-sud.fr/\" rel=\"noopener noreferrer\" target=\"_blank\">CPTS MédocSud</a> (Communauté Professionnelle Territoriale de Santé).</p>','<ul><li>2021 Master de psychologie, psychopathologie et psychogérontologie : approche clinique, cognitive et comportementale - Université de Bordeaux</li><li>2021 Accompagnement en soins paliatifs - CFER</li></ul>','<ul><li>Depuis 2022 Psychologue - EHPAD Villa des Acacias - Pauillac - Psychologie</li><li>Depuis 2021 Cabinet - Eysines</li><li>2021 - 2022 Praticien - Centre d\'Information et d\'Orientation (CIO) - Pauillac - Collége</li><li>2004 - 2005 Stagiaire - Hôpital de jour de Cenon - Cenon - Psychiatrie</li></ul>','http://localhost:5000/uploads/images/Portrait_Ludo_3-8.png');

-- -----------------------------------------------------
-- Table `psycho`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psycho`.`admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(60) NULL DEFAULT NULL,
  `password` VARCHAR(200) NULL DEFAULT NULL,
  `role` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8mb3;

INSERT INTO `admin` VALUES (14,'ludovic.fournier.psychologue@gmail.com','$argon2id$v=19$m=65536,t=5,p=1$7CI4DKtJ4QM8ElkSmcbf9A$wD0nzURUSdA7uf2gC0KcYrhSsCB7U/o4bAclCt4nodA',1),(15,'ludovic.fournier.psychologue@gmail.com','$argon2id$v=19$m=65536,t=5,p=1$9hiUAJzZWH9TZUX/Rynw+g$hPML34h5keU4cZtHMifFyjhBdxZZAPJLgfNbNGEHKOg',1);

-- -----------------------------------------------------
-- Table `psycho`.`themesarticles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psycho`.`themesarticles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `themesArticleName` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8mb3;

INSERT INTO `themesarticles` VALUES (1,'dépression'),(2,'burn out'),(6,'autre thème darticle'),(11,'nouveau encore !'),(14,'test 16/06');

-- -----------------------------------------------------
-- Table `psycho`.`articles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psycho`.`articles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idThemesArticle` INT NULL DEFAULT NULL,
  `dateArticle` DATE NULL DEFAULT NULL,
  `titleArticle` VARCHAR(100) NULL DEFAULT NULL,
  `textArticle` MEDIUMTEXT NULL DEFAULT NULL,
  `urlImg` VARCHAR(255) NULL DEFAULT NULL,
  `archived` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_articles_themesArticles1_idx` (`idThemesArticle` ASC) VISIBLE,
  CONSTRAINT `fk_articles_themesArticles1`
    FOREIGN KEY (`idThemesArticle`)
    REFERENCES `psycho`.`themesarticles` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 43
DEFAULT CHARACTER SET = utf8mb3;

INSERT INTO `articles` VALUES (27,1,'2023-05-03','test article archivé','<p><br></p>','',1),(28,1,'2023-05-18','new test archived 16/06','','',1),(40,1,'2023-06-15','Article 16/06/23','<p>Article test 16/06/23</p>','http://localhost:5000/uploads/images/L-1.png',0),(42,1,'2023-06-15','blabla 4','<p>blabla</p>','',1);

-- -----------------------------------------------------
-- Table `psycho`.`consultation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psycho`.`consultation` (
  `reason` MEDIUMTEXT NOT NULL,
  `expertise` MEDIUMTEXT NOT NULL,
  `consultation` MEDIUMTEXT NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

INSERT INTO `consultation` VALUES ('Voici quelques exemples de motifs pouvant amener à me consulter :</p><p><br></p><p><br></p><ul><li>Dépression</li><li>Burn out</li><li>Anxiété</li><li>Phobie scolaire...</li></ul>','<ul><li>Sevrage tabagique</li><li>Orientation scolaire</li><li>Psychologie clinique</li><li>Thérapie cognitive et comportementale (TCC)</li><li>Bilan cognitif</li><li>Gérontologie</li><li>Aide aux aidants</li></ul>','<p>Mon approche est intégrative tout en ayant une approche thérapeutique basée sur les Thérapies comportementale et cognitive dont la thérapie des schémas. Jutilise aussi des outils basés sur la sophrologie et la méditation de pleine conscience.</p><p><br></p><p>Jai pu exercer de nombreux métiers avant de devenir psychologue. Ces expériences sont des outils très utiles lors des consultations et permettent une grande ouverture desprit.</p><p><br></p><p>Une consultation repose sur une écoute et une dynamique, dans un cadre précis établi en accord avec le patient. Ponctuellement ou dans la durée, je reçois en consultation individuelle.</p><p><br></p><p>Le psychologue est tenu par le secret professionnel et sengage à respecter le code de déontologie de la profession.</p>');

-- -----------------------------------------------------
-- Table `psycho`.`contact`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psycho`.`contact` (
  `tel` VARCHAR(50) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

INSERT INTO `contact` VALUES ('0766085621','ludovic.fournier.psychologue@gmail.com');

-- -----------------------------------------------------
-- Table `psycho`.`themesdoc`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psycho`.`themesdoc` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `themesDocName` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 26
DEFAULT CHARACTER SET = utf8mb3;

INSERT INTO `themesdoc` VALUES (1,'New space'),(2,'BurnOut'),(3,'Ados'),(26,'essai 3');

-- -----------------------------------------------------
-- Table `psycho`.`documents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psycho`.`documents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idThemesDoc` INT NOT NULL,
  `docName` VARCHAR(100) NULL DEFAULT NULL,
  `urlDoc` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_documents_themesDoc_idx` (`idThemesDoc` ASC) VISIBLE,
  CONSTRAINT `fk_documents_themesDoc`
    FOREIGN KEY (`idThemesDoc`)
    REFERENCES `psycho`.`themesdoc` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 34
DEFAULT CHARACTER SET = utf8mb3;

-- INUTILE ???
INSERT INTO `documents` VALUES (1,1,'Test','http://localhost:5000/uploads/files/check2.txt'),(2,2,'Questionnaire','http://localhost:5000/uploads/files/Your Gruyere instance id is 5500189.txt'),(3,2,'test perso','http://localhost:5000/uploads/files/AdminProductJsx-4.txt'),(10,3,'essai 2','http://localhost:5000/uploads/files/Voici un rÃ©cap de mes questions-2.docx'),(13,2,'truc','http://localhost:5000/uploads/files/Voici un rÃ©cap de mes questions-3.docx'),(18,3,'glou','http://localhost:5000/uploads/files/AdminProductJsx-2.txt'),(19,1,'test 25 mai','http://localhost:5000/uploads/files/Conseils jardin sec-7.docx'),(20,1,'test pdf','http://localhost:5000/uploads/files/Automatiser_lajout_de_materiels_dans_la_base_de_donnee.pdf');

-- -----------------------------------------------------
-- Table `psycho`.`passwords`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psycho`.`passwords` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `passName` VARCHAR(50) NULL DEFAULT NULL,
  `password` VARCHAR(200) NULL DEFAULT NULL,
  `idThemesDoc` INT NULL DEFAULT NULL,
  `role` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_passwords_themesDoc1_idx` (`idThemesDoc` ASC) VISIBLE,
  CONSTRAINT `fk_passwords_themesDoc1`
    FOREIGN KEY (`idThemesDoc`)
    REFERENCES `psycho`.`themesdoc` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8mb3;

INSERT INTO `passwords` VALUES (12,'espace3','$argon2id$v=19$m=65536,t=5,p=1$0Rx3uB++mrQEN4IRfiPQRw$fkglRBcmJLUNAZ23gPkfe4IHYxduK1ncMxM1SasCgrs',1,0),(13,'espace2','$argon2id$v=19$m=65536,t=5,p=1$lB1C+kiXb9BZ++wIeG1TzA$I0pisJ4UOQPm6olizNotWvJ9XQGPF8x1iTZOFN4wpg4',2,0),(23,'espace1','$argon2id$v=19$m=65536,t=5,p=1$TftSQnFU3xnQhElW6hZmRw$ZQu14bB1zFXmo9k6aG5ounzFpw5gCOAYiE1eBP8GK50',3,0),(24,'essai3','$argon2id$v=19$m=65536,t=5,p=1$T/lFAztjvjZUubKNoFYHuw$kXD6E43ziBJiWLcaWvtqM36IGNo5GXD0ADIv7vF7qxY',26,0);

-- -----------------------------------------------------
-- Table `psycho`.`places`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psycho`.`places` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `placeName` VARCHAR(50) NULL DEFAULT NULL,
  `address` VARCHAR(2555) NULL DEFAULT NULL,
  `CP` INT NULL DEFAULT NULL,
  `city` VARCHAR(50) NULL DEFAULT NULL,
  `urlImg` VARCHAR(255) NULL DEFAULT NULL,
  `time1` VARCHAR(150) NULL DEFAULT NULL,
  `time2` VARCHAR(150) NULL DEFAULT NULL,
  `time3` VARCHAR(150) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8mb3;

INSERT INTO `places` VALUES (2,'1 Soussans','4b place de la mairie',33480,'Soussans','http://localhost:5000/uploads/images/ai-generated-7516272_1920.jpg','Mercredi : 9h - 18h','Jeudi : 15h - 18h',NULL),(4,'2 Eysines','2 Allée de la Reinette',33320,'Eysines','http://localhost:5000/uploads/images/cab.jpg','Jeudi : 9h - 13h',NULL,NULL);

-- -----------------------------------------------------
-- Table `psycho`.`prices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psycho`.`prices` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `consultationType` VARCHAR(200) NULL DEFAULT NULL,
  `price` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb3;

INSERT INTO `prices` VALUES (4,'Consultation psychologique - 45min',55),(7,'Bilan psychogérontologique - 2h30	',180);

-- -----------------------------------------------------
-- Table `psycho`.`welcomemessage`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `psycho`.`welcomemessage` (
  `welcomeText` TEXT NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

INSERT INTO `welcomemessage` VALUES ('<p>Psychologue clinicien </p>');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
