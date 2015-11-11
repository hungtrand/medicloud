<?php
error_reporting(E_ALL); // debug
ini_set("display_errors", 1); // debug
require_once $_SERVER['DOCUMENT_ROOT']."/lib/php/sqlConnection.php";
require_once $_SERVER['DOCUMENT_ROOT']."/lib/php/classes/User.php";
require_once $_SERVER['DOCUMENT_ROOT']."/lib/php/classes/Message.php";
require_once $_SERVER['DOCUMENT_ROOT']."/lib/php/classes/Notification.php";

print_r($_POST);


?>