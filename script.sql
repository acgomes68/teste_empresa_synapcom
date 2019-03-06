DROP SCHEMA IF EXISTS 'db_api';
CREATE SCHEMA IF NOT EXISTS 'db_api';

CREATE USER 'synapcom'@'localhost' IDENTIFIED BY 'synapcom';
GRANT ALL PRIVILEGES ON db_api.* TO 'synapcom'@'localhost';
FLUSH PRIVILEGES;

USE 'db_api';

DROP TABLE IF EXISTS `veiculo`;
DROP TABLE IF EXISTS `marca`;

CREATE TABLE IF NOT EXISTS `marca` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

INSERT INTO `db_api`.`marca` (`id`, `nome`) VALUES ('1', 'Ford');
INSERT INTO `db_api`.`marca` (`id`, `nome`) VALUES ('2', 'Peugeot');
INSERT INTO `db_api`.`marca` (`id`, `nome`) VALUES ('3', 'Volkswagen');
INSERT INTO `db_api`.`marca` (`id`, `nome`) VALUES ('4', 'GM');
INSERT INTO `db_api`.`marca` (`id`, `nome`) VALUES ('5', 'Fiat');
INSERT INTO `db_api`.`marca` (`id`, `nome`) VALUES ('6', 'Citroen');

CREATE TABLE IF NOT EXISTS `veiculo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `id_marca` int(11) NOT NULL,
  `ano` smallint NULL,
  `descricao` text NULL,
  `vendido` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY(id_marca) REFERENCES marca(id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;


INSERT INTO `db_api`.`veiculo` (`id`, `nome`, `id_marca`, `ano`, `descricao`) VALUES ('1', 'Fiesta Hatch 1.0', '1', '2005', 'Carro velho, mas funciona');
INSERT INTO `db_api`.`veiculo` (`id`, `nome`, `id_marca`, `ano`, `descricao`) VALUES ('2', '206', '2', '2007', 'Cor Prata Completo');
INSERT INTO `db_api`.`veiculo` (`id`, `nome`, `id_marca`, `ano`, `descricao`) VALUES ('3', 'Golf', '3', '1998', 'Cor Preto Completo');
INSERT INTO `db_api`.`veiculo` (`id`, `nome`, `id_marca`, `ano`, `descricao`) VALUES ('4', 'Corsa', '4', '2010', 'Cor Cinza Básico');
INSERT INTO `db_api`.`veiculo` (`id`, `nome`, `id_marca`, `ano`, `descricao`) VALUES ('5', 'Uno', '5', '1995', 'Cor Azul Zoado');
INSERT INTO `db_api`.`veiculo` (`id`, `nome`, `id_marca`, `ano`, `descricao`) VALUES ('6', 'C4 Pallais', '6', '2009', 'Cor Preto Automático');
