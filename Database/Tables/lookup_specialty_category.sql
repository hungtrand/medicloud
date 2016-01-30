CREATE DATABASE  IF NOT EXISTS `medicloud` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `medicloud`;
-- MySQL dump 10.13  Distrib 5.5.46, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: medicloud
-- ------------------------------------------------------
-- Server version	5.5.46-0ubuntu0.14.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `lookup_specialty_category`
--

DROP TABLE IF EXISTS `lookup_specialty_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lookup_specialty_category` (
  `specialty_category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  PRIMARY KEY (`specialty_category_id`),
  UNIQUE KEY `specialty_category_id_UNIQUE` (`specialty_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lookup_specialty_category`
--

LOCK TABLES `lookup_specialty_category` WRITE;
/*!40000 ALTER TABLE `lookup_specialty_category` DISABLE KEYS */;
INSERT INTO `lookup_specialty_category` VALUES (1,'General Practice'),(2,'Nuclear Medicine'),(3,'General Surgery'),(4,'Pediatric Medicine'),(5,'Allergy/Immunology'),(6,'Geriatric Medicine'),(7,'Otolaryngology'),(8,'Nephrology'),(9,'Anesthesiology'),(10,'Hand Surgery'),(11,'Cardiology'),(12,'Optometry'),(13,'Dermatology'),(14,'Infectious Disease'),(15,'Family Practice'),(16,'Endocrinology'),(17,'Interventional Pain Management'),(18,'Podiatry'),(19,'Gastroenterology'),(20,'Rheumatology'),(21,'Internal Medicine'),(22,'Pain Management'),(23,'Osteopathic Manipulative Medicine'),(24,'Peripheral Vascular Disease'),(25,'Neurology'),(26,'Vascular Surgery'),(27,'Neurosurgery'),(28,'Cardiac Surgery'),(29,'Obstetrics/Gynecology'),(30,'Addiction Medicine'),(31,'Hospice and Pallative Care'),(32,'Critical Care'),(33,'Intensivists'),(34,'Ophthalmology'),(35,'Hematology'),(36,'Oral Surgery'),(37,'dentists only'),(38,'Hematology/Oncology'),(39,'Orthopedic Surgery'),(40,'Preventive Medicine'),(41,'Cardiac Electrophysiology'),(42,'Maxillofacial Surgery'),(43,'Pathology'),(44,'Neuropsychiatry'),(45,'Sports Medicine'),(46,'Unknown Provider'),(47,'Plastic and Reconstructive Surgery'),(48,'Medical Oncology'),(49,'Physical Medicine and Rehabilitation'),(50,'Surgical Oncology'),(51,'Psychiatry'),(52,'Radiation Oncology'),(53,'Geriatric Psychiatry'),(54,'Emergency Medicine'),(55,'Colorectal Surgery'),(56,'Interventional Radiology'),(57,'Pulmonary Disease'),(58,'Gynecological/Oncology'),(59,'Diagnostic Radiology'),(60,'Unknown Physician Specialty'),(61,'Thoracic Surgery'),(62,'Sleep Medicine'),(63,'Urology'),(64,'Interventional Cardiology'),(65,'Chiropractic');
/*!40000 ALTER TABLE `lookup_specialty_category` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-11-23 15:21:12
