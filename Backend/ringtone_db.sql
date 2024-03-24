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
  `token` varchar(300) DEFAULT NULL,
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
INSERT INTO `admin_details` VALUES (1,'admin','admin@gmail.com','admin123','admin','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcxMDg1ODk0NiwiZXhwIjoxNzEwOTQ1MzQ2fQ.fuBfrSShigejwNtx4mHz-F47OlhHXNIuwUU13M5Wkhk','2024-03-19',1);
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
  `createdBy` varchar(20) NOT NULL,
  `createdDate` date NOT NULL,
  PRIMARY KEY (`AID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist_details`
--

LOCK TABLES `artist_details` WRITE;
/*!40000 ALTER TABLE `artist_details` DISABLE KEYS */;
INSERT INTO `artist_details` VALUES (1,'Kasun','Dananjaya','+94,0771234567','kasun@example.com','$2b$10$rNx.tgz2kU0Sb7SjdWD5M.AZnr3jKFjUaCvq0gutfcnAP/V/tohZC','alise','2024-03-10'),(3,'John','Carter','+94,0771234567','amal@gmail.com','$2b$10$bqk6w.CCwBE.Qb9NLx5iu.cabJmyF.KgyX83gR7jBfEnG3RRktaN2','alise','2024-03-15'),(5,'test','tsetst','+94,0771234567','test@example.com','$2b$10$aZzJk.dvQLeebseaaTzAKO8aTZzz4QuUb.BImok/ve/J88IAajIzW','twstts','2024-03-10'),(8,'Nadun','Madhusanka','+94,0775902667','nadun@gmail.com','$2b$10$735aq0FCVYMBtrIPE9Mo3.b./q91HcbkiuBxNMUOo9uXVaO5Q9Xze','Agent','2024-03-15'),(13,'Nadun Updated','Updated','+94771234567','nadun3@gmail.com','$2b$10$TW0NfSuh/DdmdcgFyYjvgeyR7L7CNGOCBrNkzHysu9fsQXbHjW7gy','John','2024-03-19'),(14,'dasun','mid dasun','+94775902667','dasun@gmail.com','$2b$10$IJbbkRbllGKX3hAsrYFhDO/9wGVzcpcsDRHAFUqS4kCTyfeGYg9bS','Agent','2024-03-19');
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
  `email` varchar(35) NOT NULL,
  `password` varchar(150) NOT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `token` varchar(300) DEFAULT NULL,
  `lastLogin` date DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authentication_details`
--

LOCK TABLES `authentication_details` WRITE;
/*!40000 ALTER TABLE `authentication_details` DISABLE KEYS */;
INSERT INTO `authentication_details` VALUES (6,5,'test@example.com','$2b$10$aZzJk.dvQLeebseaaTzAKO8aTZzz4QuUb.BImok/ve/J88IAajIzW',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBSUQiOjUsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTcxMDUxMTUwNywiZXhwIjoxNzEwNTk3OTA3fQ.wLsTkXLxWtgbldKvs50gKceJv4yZniLNlT_b--JGsks','2024-03-15'),(7,8,'nadun@gmail.com','$2b$10$735aq0FCVYMBtrIPE9Mo3.b./q91HcbkiuBxNMUOo9uXVaO5Q9Xze',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBSUQiOjgsImVtYWlsIjoibmFkdW5AZ21haWwuY29tIiwiaWF0IjoxNzEwODU2NjkyLCJleHAiOjE3MTA5NDMwOTJ9.4k_hjYekswZPhKiqk1EbG_ZOIVj2mNMRxw_N9XUzqyM','2024-03-19'),(8,14,'dasun@gmail.com','$2b$10$IJbbkRbllGKX3hAsrYFhDO/9wGVzcpcsDRHAFUqS4kCTyfeGYg9bS',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBSUQiOjE0LCJlbWFpbCI6ImRhc3VuQGdtYWlsLmNvbSIsImlhdCI6MTcxMDg1ODk1NiwiZXhwIjoxNzEwOTQ1MzU2fQ.6-mcOXO0EhyoeYrC_FgTflQF_cGKBU7va48x560z7Qk','2024-03-19');
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
  `SID` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`RID`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revenue_details`
--

LOCK TABLES `revenue_details` WRITE;
/*!40000 ALTER TABLE `revenue_details` DISABLE KEYS */;
INSERT INTO `revenue_details` VALUES (31,500,'13','Agent','2024-03-19','2024-03-13',5000.00,25,'Mobitel',NULL),(32,123,'1','alise','2024-03-10','2024-03-13',5000.00,25,'Dialog','1'),(33,200,'3','alise','2024-03-15','2024-03-20',10000.00,50,'Dialog','9');
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
  PRIMARY KEY (`RTID`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ringtone_details`
--

LOCK TABLES `ringtone_details` WRITE;
/*!40000 ALTER TABLE `ringtone_details` DISABLE KEYS */;
INSERT INTO `ringtone_details` VALUES (1,'1','Dialog','205','235',NULL),(2,'3','180','202','253','100'),(3,'3','Mobitel',NULL,NULL,NULL),(6,'1','100','123','234','52'),(7,'4','Airtel','130',NULL,NULL),(128,'9','181','200','283','110'),(154,'3','520','550','540','510');
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
  `SID` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=522 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_provider_details`
--

LOCK TABLES `service_provider_details` WRITE;
/*!40000 ALTER TABLE `service_provider_details` DISABLE KEYS */;
INSERT INTO `service_provider_details` VALUES (1,'1','Dialog','980123456V',0,NULL),(2,'2','Mobitel','982123456V',1,NULL),(3,'3','Airtel','982123856V',1,NULL),(4,'4','Hutch','987345671V',1,NULL),(5,'120','Dialog','980123456V',1,NULL),(6,'345','Mobitel','980123456V',1,NULL),(7,'200','Hutch','980123456V',1,NULL),(8,'205','Dialog','980123456V',1,NULL),(9,'200','Hutch','980123456V',1,NULL),(10,'100','Mobitel','980123456V',1,NULL),(11,'52','Airtel','980123457V',1,NULL),(12,'234','Hutch','980123456V',1,NULL),(13,'235','Hutch','980123456V',1,NULL),(14,'123','Dialog','980123459V',1,'1'),(15,'130','Dialog','980123459V',1,NULL),(16,'181','Mobitel','980123459V',1,NULL),(17,'200','Dialog','3',1,'9'),(18,'283','Hutch','980123459V',1,NULL),(19,'123','Dialog','980123459V',1,NULL),(514,'500','Mobitel','3',1,'3'),(517,'400','Airtel','3',1,'3'),(518,'520','Mobitel','3',1,'3'),(519,'550','Dialog','3',1,'3'),(520,'540','Hutch','3',1,'3'),(521,'510','Airtel','3',1,'3');
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
  `songName` varchar(50) NOT NULL,
  `AID` varchar(10) NOT NULL,
  `language` varchar(10) NOT NULL,
  `genreID` varchar(10) NOT NULL,
  `artistName` varchar(30) NOT NULL,
  `songLocationURL` varchar(200) DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL,
  `createdDate` date DEFAULT NULL,
  PRIMARY KEY (`SID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song_details`
--

LOCK TABLES `song_details` WRITE;
/*!40000 ALTER TABLE `song_details` DISABLE KEYS */;
INSERT INTO `song_details` VALUES (1,'castle of glass','1','English','2','Linken Park','https://www.youtube.com/results?search_query=castle+of+glass','',NULL),(3,'Double Faded','3','English','3','alan walker','https://www.youtube.com/results?search_query=castle+of+glass','',NULL),(5,'Faded','2','English','3','alan walker','https://www.youtube.com/results?search_query=castle+of+glass','',NULL),(7,'Faded','1','English','2','Artist Name','/Songs/Artist Name/Alan Walker - Faded_60ItHLz5WEA.mp3','Updated remarks',NULL),(8,'Dynasty','2','English','1','Alan Walker','/Songs/Alan Walker/[MP3juice.blog] MIIA - Dynasty (Lyrics).mp3','This is a test song 2',NULL),(9,'Dynasty','3','English','1','Nadun Madhusanka','/Songs/Nadun Madhusanka/[MP3juice.blog] MIIA - Dynasty (Lyrics).mp3','This is a test song 3',NULL),(10,'Faded Test','3','English','3','John Carter','/Songs/John Carter/Alan Walker - Faded_60ItHLz5WEA.mp3','This is a test song 4',NULL),(12,'Faded Test with new created date','8','English','3','Nadun Madhusanka','/Songs/Nadun Madhusanka/Alan Walker - Faded_60ItHLz5WEA.mp3','This is a test song 5','2024-03-19'),(13,'Faded 13','13','English','3','Nadun 2 Madhusanka 2','/Songs/Nadun 2 Madhusanka 2/Alan Walker - Faded_60ItHLz5WEA.mp3','This is a test song 6','2024-03-19'),(14,'Faded 8','8','English','2','Nadun Madhusanka','/Songs/Nadun Madhusanka/Alan Walker - Faded_60ItHLz5WEA.mp3','This is a test song 7','2024-03-19'),(15,'Faded 9','14','English','2','dasun mid dasun','/Songs/dasun mid dasun/Alan Walker - Faded_60ItHLz5WEA.mp3','This is a test song 8','2024-03-19');
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

-- Dump completed on 2024-03-20 18:16:24
