<?php
// error_reporting(E_ALL); // debug
// ini_set("display_errors", 1); // debug
require_once $_SERVER['DOCUMENT_ROOT']."/lib/php/sqlConnection.php";
require_once $_SERVER['DOCUMENT_ROOT']."/lib/php/classes/User.php";
require_once $_SERVER['DOCUMENT_ROOT']."/lib/php/classes/Message.php";
require_once $_SERVER['DOCUMENT_ROOT']."/lib/php/classes/Notification.php";
require_once $_SERVER['DOCUMENT_ROOT']."/lib/php/classes/NotificationView.php";
require_once $_SERVER['DOCUMENT_ROOT']."/lib/php/classes/MessageView.php";
require_once $_SERVER['DOCUMENT_ROOT']."/lib/php/classes/MessageViewManager.php";
require_once $_SERVER['DOCUMENT_ROOT']."/lib/php/classes/ConnectionManager.php";
require_once $_SERVER['DOCUMENT_ROOT']."/lib/php/classes/NotificationViewManager.php";

// Check if logged in
if (isset($_POST['Username']) && isset($_POST['Password'])) {
	$login = $_POST['Username'];
	$password = $_POST['Password'];
	$accAdm = new AccountAdmin();

	$acc = $accAdm->getAccount($login, $password);
	$uid = $acc->getUserID();
} else {
	session_start();
	$home = 'Location: ../../';
	if (!$UData = json_decode($_SESSION['__USERDATA__'], true)) {
		//header($home);
		echo 'Session Timed Out. <a href="/signin/">Sign back in</a>';
		die();
	}

	$uid = $UData['USERID'];
}

// $uid = 10;
if (!$User = new User($uid)) {
	header($home);
	die();
}

try {	
	/*
	* The following snippet is to handle read message flag
	*/
	$strict = $_POST['data']['itemName'];
	if(isset($_POST['data'])) {
		switch($strict) {
			case 'MessageItemID':
				$id = (int)$_POST['data']['id'];
				$messageObj = new MessageView( $id );
				$messageObj->setIsCreator(false);
				$messageObj->setRead(true);
				$messageObj->setArchived(false);
				$messageObj->setDeleted(false);
				$messageObj->update();
				break;
			case 'NotificationItemID':
				$notiObj = new NotificationView( (int)$_POST['data']['id'] );
				$notiObj->setRead(true);
				$notiObj->update();
				break;
		}
	} //end of snippet

	$counts = array("messages" => 0, "notification" => 0, "new-connection" => 0);
	
	$count = 0;
	$inbox = new MessageViewManager($User);
	if ($count = $inbox->getUnreadCount()) {
		$counts['messages'] = $count;
	}

	$count = 0;
	$notif = new NotificationViewManager($User);
	if ($count = $notif->getUnreadCount()) {
		$counts['notification'] = $count;
	}

	$count = 0;
	$connMan = new ConnectionManager($User);
	if ($count = $connMan->getPendingCount()) {
		$counts['new-connection'] = $count;
	}

	// echo "\n".json_encode($inbox->getData())."\n"; // debug only
} catch (Exception $e) {
	echo $e->getMessage();

	die();
}

echo json_encode($counts);

?>