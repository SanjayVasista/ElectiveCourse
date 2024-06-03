-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: elective
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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `username` varchar(20) NOT NULL,
  `password` date NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('CS','1995-01-01'),('CS1234','1995-01-01');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `details`
--

DROP TABLE IF EXISTS `details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `details` (
  `usn` varchar(20) NOT NULL,
  `courseCode` varchar(20) DEFAULT NULL,
  `sem` int DEFAULT NULL,
  PRIMARY KEY (`usn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `details`
--

LOCK TABLES `details` WRITE;
/*!40000 ALTER TABLE `details` DISABLE KEYS */;
/*!40000 ALTER TABLE `details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `username` varchar(10) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('4MC21CS133','$2b$10$6ElaodLCIwj0ob5HBCd1BOd7tvx8huI0ST6PUyoEfdfcQvhBJycM.'),('4MC21CS134','$2b$10$xf0GY1oU77MPcVKIHS2RWuQI5wiRzFDL77EKByVBG7cwrNBe27OAy'),('4MC21CS135','$2b$10$cImRB/6cHH5kkKFg2E7WMe2bq/90hzIzIwFDfO6EwlzJIeP8BMRIi');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sem1`
--

DROP TABLE IF EXISTS `sem1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sem1` (
  `courseTitle` varchar(50) NOT NULL,
  `courseCode` varchar(20) NOT NULL,
  `maxLimit` int DEFAULT NULL,
  `registration` int DEFAULT NULL,
  PRIMARY KEY (`courseCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sem1`
--

LOCK TABLES `sem1` WRITE;
/*!40000 ALTER TABLE `sem1` DISABLE KEYS */;
INSERT INTO `sem1` VALUES ('abc','123',20,0),('abc','1234',20,NULL),('adfadf','dsafdfa',50,NULL);
/*!40000 ALTER TABLE `sem1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sem2`
--

DROP TABLE IF EXISTS `sem2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sem2` (
  `courseTitle` varchar(50) NOT NULL,
  `courseCode` varchar(20) NOT NULL,
  `maxLimit` int DEFAULT NULL,
  `registration` int DEFAULT NULL,
  PRIMARY KEY (`courseCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sem2`
--

LOCK TABLES `sem2` WRITE;
/*!40000 ALTER TABLE `sem2` DISABLE KEYS */;
INSERT INTO `sem2` VALUES ('adfadf','dsafdfa',50,NULL);
/*!40000 ALTER TABLE `sem2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sem3`
--

DROP TABLE IF EXISTS `sem3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sem3` (
  `courseTitle` varchar(50) NOT NULL,
  `courseCode` varchar(20) NOT NULL,
  `maxLimit` int DEFAULT NULL,
  `registration` int DEFAULT NULL,
  PRIMARY KEY (`courseCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sem3`
--

LOCK TABLES `sem3` WRITE;
/*!40000 ALTER TABLE `sem3` DISABLE KEYS */;
INSERT INTO `sem3` VALUES ('abc','1234',20,NULL);
/*!40000 ALTER TABLE `sem3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sem4`
--

DROP TABLE IF EXISTS `sem4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sem4` (
  `courseTitle` varchar(50) NOT NULL,
  `courseCode` varchar(20) NOT NULL,
  `maxLimit` int DEFAULT NULL,
  `registration` int DEFAULT NULL,
  PRIMARY KEY (`courseCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sem4`
--

LOCK TABLES `sem4` WRITE;
/*!40000 ALTER TABLE `sem4` DISABLE KEYS */;
/*!40000 ALTER TABLE `sem4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sem5`
--

DROP TABLE IF EXISTS `sem5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sem5` (
  `courseTitle` varchar(50) NOT NULL,
  `courseCode` varchar(20) NOT NULL,
  `maxLimit` int DEFAULT NULL,
  `registration` int DEFAULT NULL,
  PRIMARY KEY (`courseCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sem5`
--

LOCK TABLES `sem5` WRITE;
/*!40000 ALTER TABLE `sem5` DISABLE KEYS */;
/*!40000 ALTER TABLE `sem5` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sem6`
--

DROP TABLE IF EXISTS `sem6`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sem6` (
  `courseTitle` varchar(50) NOT NULL,
  `courseCode` varchar(20) NOT NULL,
  `maxLimit` int DEFAULT NULL,
  `registration` int DEFAULT NULL,
  PRIMARY KEY (`courseCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sem6`
--

LOCK TABLES `sem6` WRITE;
/*!40000 ALTER TABLE `sem6` DISABLE KEYS */;
/*!40000 ALTER TABLE `sem6` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sem7`
--

DROP TABLE IF EXISTS `sem7`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sem7` (
  `courseTitle` varchar(50) NOT NULL,
  `courseCode` varchar(20) NOT NULL,
  `maxLimit` int DEFAULT NULL,
  `registration` int DEFAULT NULL,
  PRIMARY KEY (`courseCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sem7`
--

LOCK TABLES `sem7` WRITE;
/*!40000 ALTER TABLE `sem7` DISABLE KEYS */;
/*!40000 ALTER TABLE `sem7` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `usn` varchar(10) NOT NULL,
  `dob` date NOT NULL,
  PRIMARY KEY (`usn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES ('4MC21CS133','2003-08-13'),('4MC21CS134','2003-08-19'),('4MC21CS135','2003-05-29');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-03 13:35:13
