CREATE DATABASE  IF NOT EXISTS `db_ringingtone` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_ringingtone`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: db_ringingtone
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_details`
--

DROP TABLE IF EXISTS `admin_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_details` (
  `adminID` int NOT NULL,
  `userName` varchar(15) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(150) NOT NULL,
  `userType` varchar(5) NOT NULL,
  `token` varchar(200) DEFAULT NULL,
  `lastLogin` date DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`adminID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_details`
--

LOCK TABLES `admin_details` WRITE;
/*!40000 ALTER TABLE `admin_details` DISABLE KEYS */;
INSERT INTO `admin_details` VALUES (1,'admin','admin@gmail.com','admin123','admin','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcxMDQxMzc0MiwiZXhwIjoxNzEwNTAwMTQyfQ.QptvlMfOugFJDvDHYMWLhNK5K5JTHBJnylnkkPmnYOU','2024-03-14',1);
/*!40000 ALTER TABLE `admin_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artist_details`
--

DROP TABLE IF EXISTS `artist_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artist_details` (
  `AID` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(15) NOT NULL,
  `lastName` varchar(15) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(150) NOT NULL,
  `ownerID` varchar(10) NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` date NOT NULL,
  PRIMARY KEY (`AID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist_details`
--

LOCK TABLES `artist_details` WRITE;
/*!40000 ALTER TABLE `artist_details` DISABLE KEYS */;
INSERT INTO `artist_details` VALUES (1,'Kasun','Dananjaya','+94,0771234567','kasun@example.com','$2b$10$rNx.tgz2kU0Sb7SjdWD5M.AZnr3jKFjUaCvq0gutfcnAP/V/tohZC','980123456V','alise','2024-03-10'),(2,'Kasun','Dananjaya','+94,0771234567','kasun@example.com','$2b$10$cGcPPqwgIKwnyQ0DAEJRSuUnY3ftrxlJbFke2DTd4dYXNiCYK5gUa','980123457V','alise','2024-03-14'),(3,'Nadun','Madhusanka','+94,0771234567','alice@example.com','$2b$10$h4jhtk/xc7Z3a9lRveUzYOTXqonjRrYtdvHVu70uDu3t.XY6Ron82','200123456V','alise','2024-03-10'),(5,'test','tsetst','+94,0771234567','test@example.com','$2b$10$aZzJk.dvQLeebseaaTzAKO8aTZzz4QuUb.BImok/ve/J88IAajIzW','980123456V','twstts','2024-03-10'),(6,'test','tsetst','+94,0771234567','test@example.com','$2b$10$jaTN9zlSHLb5OYPTPhfHau5rFBqS/ikqXYLpIWQLLVwazA.eGJEUi','980123456V','twstts','2024-03-10'),(7,'userfirst','userlast','+94,0771234567','user@gmail.com','$2b$10$ek0imGLykILwkYePAl59oexWKFEHelXYik/vpHcZfg.mRJn97gesC','980123456V','twstts','2024-03-14');
/*!40000 ALTER TABLE `artist_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authentication_details`
--

DROP TABLE IF EXISTS `authentication_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authentication_details` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `AID` int NOT NULL,
  `ownerID` varchar(12) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(150) NOT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `token` varchar(200) DEFAULT NULL,
  `lastLogin` date DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authentication_details`
--

LOCK TABLES `authentication_details` WRITE;
/*!40000 ALTER TABLE `authentication_details` DISABLE KEYS */;
INSERT INTO `authentication_details` VALUES (6,5,'980123456V','test@example.com','$2b$10$aZzJk.dvQLeebseaaTzAKO8aTZzz4QuUb.BImok/ve/J88IAajIzW',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBSUQiOjUsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTcxMDQwNzIyNiwiZXhwIjoxNzEwNDkzNjI2fQ.1xwp7sW8Gj1cC7kUA_6RUQ-E0rngRNPlIRBZykxfH4A','2024-03-14');
/*!40000 ALTER TABLE `authentication_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre_details`
--

DROP TABLE IF EXISTS `genre_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre_details` (
  `GID` int NOT NULL AUTO_INCREMENT,
  `genre_name` varchar(15) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`GID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre_details`
--

LOCK TABLES `genre_details` WRITE;
/*!40000 ALTER TABLE `genre_details` DISABLE KEYS */;
INSERT INTO `genre_details` VALUES (1,'action','action'),(2,'horror','horror'),(3,'comedy','comedy');
/*!40000 ALTER TABLE `genre_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revenue_details`
--

DROP TABLE IF EXISTS `revenue_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `revenue_details` (
  `RID` int NOT NULL AUTO_INCREMENT,
  `RTID` int NOT NULL,
  `ownerID` varchar(12) NOT NULL,
  `createdBy` varchar(35) NOT NULL,
  `createdDate` date NOT NULL,
  `date` date NOT NULL,
  `revenue` decimal(12,2) DEFAULT NULL,
  `downloads` int DEFAULT NULL,
  `service_provider` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`RID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revenue_details`
--

LOCK TABLES `revenue_details` WRITE;
/*!40000 ALTER TABLE `revenue_details` DISABLE KEYS */;
INSERT INTO `revenue_details` VALUES (1,123,'980123456V','alise','2024-03-10','2024-03-13',5000.00,25,'Dialog');
/*!40000 ALTER TABLE `revenue_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ringtone_details`
--

DROP TABLE IF EXISTS `ringtone_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ringtone_details` (
  `RTID` int NOT NULL AUTO_INCREMENT,
  `SID` varchar(10) NOT NULL,
  `Mobitel` varchar(10) DEFAULT NULL,
  `Dialog` varchar(10) DEFAULT NULL,
  `Hutch` varchar(10) DEFAULT NULL,
  `Airtel` varchar(10) DEFAULT NULL,
  `RingToneURL` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`RTID`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ringtone_details`
--

LOCK TABLES `ringtone_details` WRITE;
/*!40000 ALTER TABLE `ringtone_details` DISABLE KEYS */;
INSERT INTO `ringtone_details` VALUES (1,'1','Dialog',NULL,'235',NULL,NULL),(2,'3','180','212','253','100','https://hsdvdajdssaj.com'),(3,'3','Mobitel',NULL,NULL,NULL,NULL),(6,'1','100','205','234','52','https://newdsjhsdssabj.com'),(7,'4','Airtel',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `ringtone_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_provider_details`
--

DROP TABLE IF EXISTS `service_provider_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_provider_details` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `SPID` varchar(15) NOT NULL,
  `service_provider` varchar(20) NOT NULL,
  `ownerID` varchar(12) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=368 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_provider_details`
--

LOCK TABLES `service_provider_details` WRITE;
/*!40000 ALTER TABLE `service_provider_details` DISABLE KEYS */;
INSERT INTO `service_provider_details` VALUES (1,'1','Dialog','980123456V',0),(2,'2','Mobitel','982123456V',1),(3,'3','Airtel','982123856V',1),(4,'4','Hutch','987345671V',1),(5,'120','Dialog','980123456V',1),(6,'345','Mobitel','980123456V',1),(7,'200','Hutch','980123456V',1),(8,'205','Dialog','980123456V',1),(9,'200','Hutch','980123456V',1),(10,'100','Mobitel','980123456V',1),(11,'52','Airtel','980123457V',1),(12,'234','Hutch','980123456V',1),(13,'235','Hutch','980123456V',1),(14,'180','Mobitel',NULL,1),(15,'212','Dialog',NULL,1),(16,'253','Hutch',NULL,1),(17,'100','Airtel',NULL,1);
/*!40000 ALTER TABLE `service_provider_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `song_details`
--

DROP TABLE IF EXISTS `song_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `song_details` (
  `SID` int NOT NULL AUTO_INCREMENT,
  `songName` varchar(30) NOT NULL,
  `AID` varchar(10) NOT NULL,
  `language` varchar(10) NOT NULL,
  `genreID` varchar(10) NOT NULL,
  `artistName` varchar(30) NOT NULL,
  `songLocationURL` varchar(200) DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`SID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song_details`
--

LOCK TABLES `song_details` WRITE;
/*!40000 ALTER TABLE `song_details` DISABLE KEYS */;
INSERT INTO `song_details` VALUES (1,'castle of glass','1','English','2','Linken Park','https://www.youtube.com/results?search_query=castle+of+glass',''),(3,'Double Faded','3','English','3','alan walker','https://www.youtube.com/results?search_query=castle+of+glass',''),(5,'Faded','2','English','3','alan walker','https://www.youtube.com/results?search_query=castle+of+glass',''),(7,'Faded Updated','1','English','2','Updated Artist','/Songs/Artist Name/Alan Walker - Faded_60ItHLz5WEA.mp3','Updated remarks'),(8,'Faded','2','English','1','Alan Walker','/Songs/Alan Walker/Alan Walker - Faded_60ItHLz5WEA.mp3','This is a test song 2');
/*!40000 ALTER TABLE `song_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-15  2:49:51
