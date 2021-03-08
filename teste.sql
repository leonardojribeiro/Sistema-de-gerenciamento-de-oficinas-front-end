

CREATE TABLE IF NOT EXISTS `publicacoes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `autor` VARCHAR(45) NOT NULL,
  `titulo` VARCHAR(255) NOT NULL,
  `corpo` LONGTEXT NOT NULL,
  `oculto` TINYINT(1) NOT NULL,
  `data` DATE NOT NULL,
  PRIMARY KEY (`id`)
) 


INSERT INTO `publicacoes` 
(`autor`, `titulo`, `oculto`, `data`, `corpo`) VALUES 
("Maria", "Título da publicação", false, now(), "Texto da publicação....");





SELECT `autor`, `titulo`, `corpo` FROM `publicacoes`
WHERE `autor` = "Maria";


UPDATE `publicacoes`
SET `corpo` = "Texto do corpo que foi alterado"
WHERE `id` = 1



CREATE TABLE IF NOT EXISTS `reacoes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `curtidas` INT NOT NULL DEFAULT 0,
  `favoritos` INT NOT NULL DEFAULT 0,
  `publicacao_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`publicacao_id`) 
  REFERENCES `publicacoes` (`id`) 
  ON DELETE CASCADE 
  ON UPDATE NO ACTION
) 

CREATE TABLE IF NOT EXISTS `comentarios` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `corpo` LONGTEXT NOT NULL,
  `data` DATE NOT NULL,
  `publicacao_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`publicacao_id`) 
  REFERENCES `publicacoes` (`id`) 
  ON DELETE CASCADE 
  ON UPDATE NO ACTION
)

