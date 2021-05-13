-- MySQL dump 10.13  Distrib 8.0.17, for macos10.14 (x86_64)
--
-- Host: localhost    Database: movieTickets
-- ------------------------------------------------------
-- Server version	5.7.27

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
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `genre_id` int(11) NOT NULL AUTO_INCREMENT,
  `genre_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`genre_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'Fantasy'),(2,'Adventure'),(3,'Drama'),(4,'Action'),(5,'Sci-Fi'),(6,'Crime'),(7,'Thriller'),(8,'Comedy'),(9,'Romance'),(10,'Animaiton'),(11,'Suspense'),(12,'Horror');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `movie_id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_name` varchar(100) DEFAULT NULL,
  `movie_description` varchar(200) DEFAULT NULL,
  `movie_genre_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`movie_id`),
  KEY `movie_genre_id` (`movie_genre_id`),
  CONSTRAINT `movie_ibfk_1` FOREIGN KEY (`movie_genre_id`) REFERENCES `genre` (`genre_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (1,'Shadow And Bone','Dark forces conspire against orphan mapmaker Alina Starkov when she unleashes an extraordinary power that could change the fate of her war-torn world',1),(2,'The Sleep Over','A moms hidding past. A high-end heist, A string of clues... and spy gadgets? The sleepover just got interesting',2),(3,'Stowaway','A three-person crew on a mission to Mars faces an impossible choice when an unplanned passenger jeopardizes the lives of everyone on board',5),(4,'Super Me','A struggling screenwriter discovers his lucrative ability to bring antiques from his dreams into the real world - but his new life soon unravels',4),(5,'Real Steel','A struggling fighter-turned-promoter reconnects with his estranged son to convert an old-generation robot into a mighty Wold Robot Boxing contender',4),(6,'Sniper Ghost Shooter','Snipers ordered to protect a gas pipeline from terrorists suspect a security breach when they are targeted by a ghost shooter who knows their location',4),(7,'Waist Deep','In Los Angeles, recently paroled O2 teams up with a street-smart hustler when a gang hijacks his car and holds hi son for ransom.',2),(8,'Rim of the World','Stranded at a summer camp when aliens attack the planet, four teens with nothing in common embark on a perilous mission to save the world.',2),(9,'2012','When a flood of natural disasters begin to destroy the world, a divorced dad desperately tries to save his family by outrunning the catclysmic chaos',5),(10,'Bird Box','Stay silent. Stay alert. Stay blindfolded. As a terrifying force lies in wait, a mother leads her children on a harrowing journey.',5),(11,'Oxygen','After waking up in a crygoenic unit, Liz fights to survive and remember who she is before her oxygen runs out.',5),(12,'Dead Man Down','An enforcer plotting revenge against the ruthless criminal he works for is blackmailed by a mysterious neighbor looking to exact vengeance of her own',6),(13,'Lost Girls','Desperate to find her missing daughter, a mother fights to uncover the truth - and helps expose a string of unsolved murders. Based on a true story',6),(14,'Freaks','Hidden away by her eccentric father, a mysterious young girl uncovers frigtening truths when she starts to make contact with the outside world',11),(15,'Things Heard & Seen','A young woman discovers taht both her husband and their new home harbor snister secrets after they leave Manhattan for smalltown life',7),(16,'3 Idiots','While attending one of Indias premier colleges, three miserable engineering students and best friends struggle to beat school draconian system',8),(17,'Dear Affy','An engaged couple hit a number of speed bumps on their road to matrimony including major career complications and questions of fidelity',9),(18,'Gantz:o','Teams of recenlty deceased people who have been revived and given high-tech weapons must cooperate to defeat an army of monsters in Tokyo and Osaka',10),(19,'No Escape Room','A lighthearted bonding opportunity takes a dark and decidedly dangeours turn when a father and daughter try out and escape room in a small town',12);
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `showing`
--

DROP TABLE IF EXISTS `showing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `showing` (
  `show_id` int(11) NOT NULL AUTO_INCREMENT,
  `show_movie_id` int(11) DEFAULT NULL,
  `show_theater_id` int(11) DEFAULT NULL,
  `seats` int(11) DEFAULT NULL,
  `show_date` date DEFAULT NULL,
  PRIMARY KEY (`show_id`),
  KEY `show_movie_id` (`show_movie_id`),
  KEY `show_theater_id` (`show_theater_id`),
  CONSTRAINT `showing_ibfk_1` FOREIGN KEY (`show_movie_id`) REFERENCES `movie` (`movie_id`) ON DELETE CASCADE,
  CONSTRAINT `showing_ibfk_2` FOREIGN KEY (`show_theater_id`) REFERENCES `theater` (`theater_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `showing`
--

LOCK TABLES `showing` WRITE;
/*!40000 ALTER TABLE `showing` DISABLE KEYS */;
INSERT INTO `showing` VALUES (1,3,1,30,'2020-05-13'),(2,2,2,30,'2020-06-13'),(3,5,1,31,'2020-05-16'),(4,11,5,30,'2020-06-13'),(5,4,4,40,'2020-05-18'),(6,19,3,40,'2020-05-17'),(7,12,1,35,'2020-05-20'),(8,6,5,40,'2020-05-19'),(9,7,2,30,'2020-05-18');
/*!40000 ALTER TABLE `showing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `theater`
--

DROP TABLE IF EXISTS `theater`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `theater` (
  `theater_id` int(11) NOT NULL AUTO_INCREMENT,
  `theater_name` varchar(50) DEFAULT NULL,
  `address` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`theater_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theater`
--

LOCK TABLES `theater` WRITE;
/*!40000 ALTER TABLE `theater` DISABLE KEYS */;
INSERT INTO `theater` VALUES (1,'Cinemakr Tinseltown','2291 Buffalo Rd, NY 14624'),(2,'AMC','2190 Empire Blvd, Webster NY 14580'),(3,'Film Forum','209 W Huston St. New York, NY 10014'),(4,'AMC Empire 25','234 W 42nd St. New York, NY 10014'),(5,'Quad Cinema','34 W 13th St New York, NY 10014');
/*!40000 ALTER TABLE `theater` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `ticket_id` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_show_id` int(11) DEFAULT NULL,
  `ticket_price` double DEFAULT NULL,
  `seat_no` int(11) NOT NULL,
  PRIMARY KEY (`ticket_id`),
  KEY `ticket_show_id` (`ticket_show_id`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`ticket_show_id`) REFERENCES `showing` (`show_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (1,1,11.99,20),(2,2,12.99,14),(3,3,11.99,27),(4,4,8.99,20),(5,5,12.99,25),(6,6,10.99,20),(7,7,12.99,18),(8,8,8.99,15),(9,9,11.99,20);
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-13  5:08:18
