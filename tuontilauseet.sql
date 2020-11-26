CREATE TABLE `customer`.`tuote` ( `id` INT(10) NOT NULL AUTO_INCREMENT , `nimi` VARCHAR(50) NOT NULL , `valmistaja` VARCHAR(50) NOT NULL , `tuotetyyppi` INT(10) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB; 
ALTER TABLE `tuote` ADD `hinta` INT(10) NOT NULL AFTER `tuotetyyppi`; 
ALTER TABLE `tuote` ADD `selite` VARCHAR(50) NOT NULL AFTER `hinta`; 
ALTER TABLE `tuote` ADD `ostopvm` VARCHAR(50) NOT NULL AFTER `selite`; 
ALTER TABLE `tuote` CHANGE `tuotetyyppi` `tyyppi_id` INT(10) NOT NULL; 

CREATE TABLE `customer`.`tuotetyyppi` ( `id` INT(10) NOT NULL AUTO_INCREMENT , `nimi` VARCHAR(50) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB; 
ALTER TABLE `tuotetyyppi` ADD `koodi` VARCHAR(10) NOT NULL AFTER `nimi`; 

INSERT INTO `tuotetyyppi` (`id`, `nimi`) VALUES ('1', 'kivi'), ('2', 'kasvi'), ('3', 'eläin') 
INSERT INTO `tuote` (`id`, `nimi`, `valmistaja`, `tuotetyyppi`, `hinta`) VALUES ('1', 'Graniitti', 'Kotiteollisuus', '1', '10'), ('2', 'Mesimäyrä', 'Luonto', '3', '200000'), ('3', 'Moraani', 'Moraanifilosofian laitos', '1', '20'), ('4', 'Elephantti', 'Ahrikka tahi India', '3', '30'), ('5', 'Stone', 'Stoned. Höhö.', '1', '30'), ('6', 'Kissa', 'Miau', '3', '40'), ('7', 'Kukka', 'Luontoäiti', '2', '50'), ('8', 'Hippunen', 'Rippunen', '1', '23'), ('9', 'Peruna', 'Maa', '2', '54'), ('10', 'Hiiri', 'Microsoft', '3', '66') 