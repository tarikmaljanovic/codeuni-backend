-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: localhost    Database: codeuni
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `badges`
--

DROP TABLE IF EXISTS `badges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `badges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `badge_name` varchar(255) NOT NULL,
  `badge_description` varchar(255) NOT NULL,
  `badge_image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badges`
--

LOCK TABLES `badges` WRITE;
/*!40000 ALTER TABLE `badges` DISABLE KEYS */;
INSERT INTO `badges` VALUES (1,'Senior','By completing all but one course, you have earned the \'Senior\' badge.','https://res.cloudinary.com/ds2qt32nd/image/upload/v1703408920/vk5jsxsm0yrkfpesq7af.svg'),(3,'First Course','By starting your first course, you have earned the \'First Course\' badge','https://res.cloudinary.com/ds2qt32nd/image/upload/v1717528123/sqxrg1lfcwtbimohvihc.svg'),(4,'Smart Cookie','By completing a quiz the first try, you have earned the \'Smart Cookie\' badge','https://res.cloudinary.com/ds2qt32nd/image/upload/v1717530285/l3isrxew5tjrrxf5ycmn.svg'),(5,'Finish Line','By completing every course, you have earned the \'Finish Line\' badge!','https://res.cloudinary.com/ds2qt32nd/image/upload/v1717530417/kaui99xfmq8ms04xndzn.svg'),(6,'Freshmen','By completing your first course, you have earned the \'Freshmen\' badge!','https://res.cloudinary.com/ds2qt32nd/image/upload/v1717530588/mnz5qphoyhdladwprych.svg'),(7,'Frontend Dev','By completing the HTML, CSS and JavaScript courses, you have earned the \'Frontend Dev\' badge!','https://res.cloudinary.com/ds2qt32nd/image/upload/v1717530741/hnvrjlvj3vtnkwy9ikm2.svg'),(8,'Backend Dev','By completing the MongoDB, Express.js and Node.js courses, you have earned the \'Backend Dev\' badge!','https://res.cloudinary.com/ds2qt32nd/image/upload/v1717530835/uywwamuk32jvfzkjyiiv.svg'),(9,'Overachiever','By acquiring every badge, you have earned the \'Overachiever\' badge!','https://res.cloudinary.com/ds2qt32nd/image/upload/v1717531079/euymx9skjxegvw42ufkc.svg'),(10,'Full Stack Developer','By earning both the \'Frontend Dev\' and \'Backend Dev\', you have earned the \'Full Stakc Developer\' badge!','https://res.cloudinary.com/ds2qt32nd/image/upload/v1717718633/virjaquwrsh7fj0xkc79.svg');
/*!40000 ALTER TABLE `badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_title` varchar(255) NOT NULL,
  `course_image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (14,'JavaScript','http://res.cloudinary.com/ds2qt32nd/image/upload/v1707681155/cmmezyvkml5rcxobml9x.svg',0),(15,'Python','http://res.cloudinary.com/ds2qt32nd/image/upload/v1703152913/lwjdtjd3iatu3onbr4wg.svg',0),(16,'PHP','http://res.cloudinary.com/ds2qt32nd/image/upload/v1703152936/tou3amfzfot73ww8kz6p.svg',0),(17,'Java','http://res.cloudinary.com/ds2qt32nd/image/upload/v1706056041/h4bijmf7bar5jww1rxky.svg',0),(18,'Ruby','http://res.cloudinary.com/ds2qt32nd/image/upload/v1707623223/bw8c6daccg3qfa1i3q5q.svg',0),(21,'Test','http://res.cloudinary.com/ds2qt32nd/image/upload/v1707681302/kxtskgawvyxkhsg6pqte.svg',1);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lessons`
--

DROP TABLE IF EXISTS `lessons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lessons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lesson_title` varchar(255) NOT NULL,
  `lesson_content` json NOT NULL,
  `course_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lessons`
--

LOCK TABLES `lessons` WRITE;
/*!40000 ALTER TABLE `lessons` DISABLE KEYS */;
INSERT INTO `lessons` VALUES (2,'Objects','\"{\\\"content\\\":\\\"<p>This is test content</p>\\\"}\"',14),(9,'Lesson','\"{\\\"content\\\":[]}\"',14),(10,'Lesson','\"{\\\"content\\\":[]}\"',14),(11,'kddbfd','\"{\\\"content\\\":[]}\"',15);
/*!40000 ALTER TABLE `lessons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_title` varchar(255) NOT NULL,
  `project_content` json NOT NULL,
  `course_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (2,'Proj','\"{\\\"content\\\":\\\"<p>something</p><h1>Hello</h1><pre class=\\\\\\\"ql-syntax\\\\\\\" spellcheck=\\\\\\\"false\\\\\\\">programmer\\\\n</pre><p>sd</p>\\\"}\"',14);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quizzes`
--

DROP TABLE IF EXISTS `quizzes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quizzes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quiz_content` json NOT NULL,
  `lesson_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `lesson_id` (`lesson_id`),
  CONSTRAINT `quizzes_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quizzes`
--

LOCK TABLES `quizzes` WRITE;
/*!40000 ALTER TABLE `quizzes` DISABLE KEYS */;
INSERT INTO `quizzes` VALUES (1,'\"[{\\\"question\\\":\\\"What is JavaScript\\\",\\\"answers\\\":[\\\"Programming Language\\\",\\\"Scripting Language\\\"],\\\"correctIndex\\\":\\\"1\\\",\\\"chosenIndex\\\":null},{\\\"question\\\":\\\"What is React?\\\",\\\"answers\\\":[\\\"A Library\\\"],\\\"correctIndex\\\":\\\"0\\\"}]\"',2),(2,'\"[{\\\"question\\\":\\\"\\\",\\\"answers\\\":[\\\"\\\"],\\\"correctIndex\\\":0,\\\"chosenIndex\\\":null}]\"',9),(3,'\"[{\\\"question\\\":\\\"What\\\",\\\"answers\\\":[\\\"yes\\\",\\\"no\\\"],\\\"correctIndex\\\":0,\\\"chosenIndex\\\":null}]\"',10),(4,'\"[]\"',11);
/*!40000 ALTER TABLE `quizzes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_badges`
--

DROP TABLE IF EXISTS `user_badges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_badges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `badge_id` int NOT NULL,
  `earning_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `badge_id` (`badge_id`),
  CONSTRAINT `user_badges_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_badges_ibfk_2` FOREIGN KEY (`badge_id`) REFERENCES `badges` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_badges`
--

LOCK TABLES `user_badges` WRITE;
/*!40000 ALTER TABLE `user_badges` DISABLE KEYS */;
INSERT INTO `user_badges` VALUES (4,17,3,'2024-06-06'),(5,17,5,'2024-06-06'),(6,17,6,'2024-06-06'),(7,17,1,'2024-06-06'),(15,17,4,'2024-06-22');
/*!40000 ALTER TABLE `user_badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_courses`
--

DROP TABLE IF EXISTS `user_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `progress` double NOT NULL,
  `certificate` tinyint(1) NOT NULL,
  `user_id` int NOT NULL,
  `course_id` int NOT NULL,
  `starred` tinyint(1) NOT NULL,
  `completed_lessons` text,
  `completed_projects` text,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `user_courses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_courses_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_courses`
--

LOCK TABLES `user_courses` WRITE;
/*!40000 ALTER TABLE `user_courses` DISABLE KEYS */;
INSERT INTO `user_courses` VALUES (1,1,1,17,14,1,'2,9,10','0,2'),(2,1,0,17,15,1,NULL,NULL),(3,1,0,17,16,0,NULL,NULL),(4,0,0,1,18,1,NULL,NULL),(5,0,0,1,14,1,NULL,NULL),(6,0.5,0,17,18,0,NULL,NULL),(7,0,0,1,17,0,NULL,NULL),(8,1,0,17,17,1,NULL,NULL);
/*!40000 ALTER TABLE `user_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `disabled` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Tarik','Maljanovic','tarikmaljanovic123@gmail.com','15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225',1,0),(17,'Naim','Pjanic','naim@gmail.com','15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225',0,0),(18,'Tarik','Maljanovic','tarik@gmail.com','15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225',0,0),(20,'Melisa','Geca','melisa@gmail.com','15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225',0,0),(21,'Amina','Meric','amina@gmail.com','15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225',0,0),(23,'Test','Account','test@gmail.com','15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225',0,0),(27,'John','Doe','john@gmail.com','3700adf1f25fab8202c1343c4b0b4e3fec706d57cad574086467b8b3ddf273ec',0,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-13 15:37:04
