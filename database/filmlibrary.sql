-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: localhost    Database: filmlibrary
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actorfilm`
--

DROP TABLE IF EXISTS `actorfilm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `actorfilm` (
  `name` char(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `filmId` varchar(50) NOT NULL,
  `actorRecordId` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`actorRecordId`),
  KEY `filmId` (`filmId`),
  CONSTRAINT `actorfilm_ibfk_1` FOREIGN KEY (`filmId`) REFERENCES `film` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actorfilm`
--

LOCK TABLES `actorfilm` WRITE;
/*!40000 ALTER TABLE `actorfilm` DISABLE KEYS */;
INSERT INTO `actorfilm` VALUES ('Daniel Radcliffe','9ee8dd17-1312-32ca-8630-74782bcb759f',22),(' Emma Watson','9ee8dd17-1312-32ca-8630-74782bcb759f',23),(' Roopert Green','9ee8dd17-1312-32ca-8630-74782bcb759f',24),('Daniel Radcliffe','85b6f6c1-7e35-cd6b-8628-ee462ee69ff5',25),(' Emma Watson','85b6f6c1-7e35-cd6b-8628-ee462ee69ff5',26),(' Roopert Green','85b6f6c1-7e35-cd6b-8628-ee462ee69ff5',27),(' Robert Pattisson','85b6f6c1-7e35-cd6b-8628-ee462ee69ff5',28),('Elijah Jordan Wood','21f46941-e60f-a295-1a78-8770306bab3c',29),(' Orlando Bloom','21f46941-e60f-a295-1a78-8770306bab3c',30),(' Billy Boyd','21f46941-e60f-a295-1a78-8770306bab3c',31),('Brad Pitt','5d076173-6e80-cf0f-e0a2-74133f52b639',32),(' Edward Norton','5d076173-6e80-cf0f-e0a2-74133f52b639',33),('Tom Welling','95aadbcd-13c8-9cce-9ede-c5a89d61bd17',34),(' Allison Mack','95aadbcd-13c8-9cce-9ede-c5a89d61bd17',35),(' Kristin Kreuk','95aadbcd-13c8-9cce-9ede-c5a89d61bd17',36),(' Michael Rosenbaum','95aadbcd-13c8-9cce-9ede-c5a89d61bd17',37),(' John Glover','95aadbcd-13c8-9cce-9ede-c5a89d61bd17',38);
/*!40000 ALTER TABLE `actorfilm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `film`
--

DROP TABLE IF EXISTS `film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `film` (
  `id` varchar(50) NOT NULL,
  `title` char(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `year` int(11) NOT NULL,
  `format` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `film`
--

LOCK TABLES `film` WRITE;
/*!40000 ALTER TABLE `film` DISABLE KEYS */;
INSERT INTO `film` VALUES ('21f46941-e60f-a295-1a78-8770306bab3c','The Lord of the Rings The Return of the King',2003,'Blue-ray'),('5d076173-6e80-cf0f-e0a2-74133f52b639','Fight Club',1999,'HD'),('85b6f6c1-7e35-cd6b-8628-ee462ee69ff5','Harry Potter And The Goblet Of Fire',2007,'Blue-ray'),('95aadbcd-13c8-9cce-9ede-c5a89d61bd17','Smallville',2001,'HD'),('9ee8dd17-1312-32ca-8630-74782bcb759f','Harry Potter And The Chamber Of Secrets',2003,'HD');
/*!40000 ALTER TABLE `film` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-20 13:04:21
