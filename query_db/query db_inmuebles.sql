CREATE TABLE `TblInmuebles` (
  `id_inmueble` int NOT NULL AUTO_INCREMENT,
  `codigo_inmueble` varchar(10) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `codigo_ciudad` int NOT NULL,
  PRIMARY KEY (`id_inmueble`)
);
