CREATE TABLE `hp_signup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(254) NOT NULL,
  `business_name` varchar(100) DEFAULT NULL,
  `business_address` varchar(100) DEFAULT NULL,
  `business_phone` varchar(20) DEFAULT NULL,
  `verification_key` varchar(32) NOT NULL,
  `is_verified` bit(1) NOT NULL DEFAULT b'0',
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
