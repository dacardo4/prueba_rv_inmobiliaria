CREATE TABLE `TblPaises` (
  `id_pais` int NOT NULL AUTO_INCREMENT,
  `codigo_pais` varchar(2) NOT NULL,
  `nombre_pais` varchar(20) NOT NULL,
  PRIMARY KEY (`id_pais`)
);

CREATE TABLE `TblCiudades` (
  `id_ciudad` int NOT NULL AUTO_INCREMENT,
  `codigo_ciudad` varchar(5) NOT NULL,
  `codigo_depto` int NOT NULL,
  `nombre_ciudad` varchar(20) NOT NULL,
  PRIMARY KEY (`id_ciudad`)
);

CREATE TABLE `TblDepartamentos` (
  `id_depto` int NOT NULL AUTO_INCREMENT,
  `codigo_depto` varchar(2) NOT NULL,
  `codigo_pais` int NOT NULL,
  `nombre_depto` varchar(20) NOT NULL,
  PRIMARY KEY (`id_depto`)
);
