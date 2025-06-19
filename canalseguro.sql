-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-06-2025 a las 05:46:11
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `canalseguro`
--
CREATE DATABASE IF NOT EXISTS `canalseguro` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `canalseguro`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `concurrencia`
--

DROP TABLE IF EXISTS `concurrencia`;
CREATE TABLE `concurrencia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `concurrencia`
--

INSERT INTO `concurrencia` (`id`, `nombre`) VALUES
(1, 'Es la primera vez'),
(2, 'Ha ocurrido pocas veces'),
(3, 'Ocurre frecuentemente'),
(4, 'Es constante/diario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `denuncia`
--

DROP TABLE IF EXISTS `denuncia`;
CREATE TABLE `denuncia` (
  `id` int(11) NOT NULL,
  `codigo` varchar(15) NOT NULL,
  `institucion_id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `lugar` text NOT NULL,
  `tipinc_id` int(11) NOT NULL,
  `personas` text NOT NULL,
  `descripcion` text NOT NULL,
  `nivelurgencia` tinyint(4) NOT NULL,
  `testigos` text NOT NULL,
  `concurrencia_id` int(11) NOT NULL,
  `informacionadicional` text NOT NULL,
  `estado_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

DROP TABLE IF EXISTS `estado`;
CREATE TABLE `estado` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`id`, `nombre`) VALUES
(1, 'Pendiente'),
(2, 'Revisión'),
(3, 'Finalizada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `institucion`
--

DROP TABLE IF EXISTS `institucion`;
CREATE TABLE `institucion` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `institucion`
--

INSERT INTO `institucion` (`id`, `nombre`) VALUES
(1, 'CENTRO EDUCATIVO PACIFICO'),
(2, 'I.E AGROPECUARIA TAGACHI'),
(3, 'I.E ANTONIO MARIA CLARET'),
(4, 'I.E ANTONIO RICAURTE'),
(5, 'I.E ANTONIO ROLDAN BETANCUR'),
(6, 'I.E CACIQUE NOANAMÁ'),
(7, 'I.E ESCUELA NORMAL SUPERIOR DE QUIBDÓ'),
(8, 'I.E FEMENINA DE ENSEÑANZA MEDIA'),
(9, 'I.E GIMNASIO DE EDUCACIÓN MEDIA'),
(10, 'I.E ISAAC RODRIGUEZ'),
(11, 'I.E MANUEL ENCARNACIÓN DE BEBEDÓ'),
(12, 'I.E PEDRO GRAU Y AROLA'),
(13, 'I.E SANTO DOMINGO SALVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

DROP TABLE IF EXISTS `rol`;
CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `nombre`) VALUES
(1, 'Administrador'),
(2, 'Estudiante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoincidente`
--

DROP TABLE IF EXISTS `tipoincidente`;
CREATE TABLE `tipoincidente` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `tipoincidente`
--

INSERT INTO `tipoincidente` (`id`, `nombre`) VALUES
(1, 'Acoso Verbal (insultos, amenazas, burlas)'),
(2, 'Acoso Físico (golpes, empujones, agresión)'),
(3, 'Exclusión Social (aislamiento, rechazo)'),
(4, 'Ciberacoso (redes sociales, mensajes)'),
(5, 'Acoso Sexual o de Género'),
(6, 'Discriminación (racial, religiosa, etc.)'),
(7, 'Vandalismo o Daño a Propiedad'),
(8, 'Otro tipo de incidente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `usuario` varchar(250) NOT NULL,
  `clave` varchar(250) NOT NULL,
  `rol_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `usuario`, `clave`, `rol_id`) VALUES
(1, 'Admin1', '0192023a7bbd73250516f069df18b500', 1),
(2, '12345', '827ccb0eea8a706c4c34a16891f84e7b', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `concurrencia`
--
ALTER TABLE `concurrencia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `denuncia`
--
ALTER TABLE `denuncia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_denuncia_institucion` (`institucion_id`),
  ADD KEY `fk_denuncia_tipoincidente` (`tipinc_id`),
  ADD KEY `fk_denuncia_concurrencia` (`concurrencia_id`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `institucion`
--
ALTER TABLE `institucion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipoincidente`
--
ALTER TABLE `tipoincidente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario_rol` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `concurrencia`
--
ALTER TABLE `concurrencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `denuncia`
--
ALTER TABLE `denuncia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `institucion`
--
ALTER TABLE `institucion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipoincidente`
--
ALTER TABLE `tipoincidente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `denuncia`
--
ALTER TABLE `denuncia`
  ADD CONSTRAINT `fk_denuncia_concurrencia` FOREIGN KEY (`concurrencia_id`) REFERENCES `concurrencia` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_denuncia_institucion` FOREIGN KEY (`institucion_id`) REFERENCES `institucion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_denuncia_tipoincidente` FOREIGN KEY (`tipinc_id`) REFERENCES `tipoincidente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
