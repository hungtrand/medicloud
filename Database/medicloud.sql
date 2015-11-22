CREATE DATABASE `medicloud` /*!40100 DEFAULT CHARACTER SET latin1 */;
CREATE USER 'medicloud'@'localhost' IDENTIFIED BY 'medicloud';
GRANT ALL PRIVILEGES ON *.* TO 'medicloud'@'localhost' WITH GRANT OPTION;
CREATE USER 'medicloud'@'%' IDENTIFIED BY 'medicloud';
GRANT ALL PRIVILEGES ON *.* TO 'medicloud'@'%' WITH GRANT OPTION;