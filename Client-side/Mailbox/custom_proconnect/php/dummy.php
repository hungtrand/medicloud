<?php
	
	// if($_POST["userID"] == "notification-getter") {
		$data = array("messages" => 1,
					"notification" => 2, 
					"new-connection" => 1);  //expected return data for notification numbers
	// } else if($_POST["userID"] == "message-getter") {

		// $data = array( 
		// 				array("sender-name" => "name", 
		// 					"sender-href" => "../profile-public-POV/?userID=", 	// <------ I'm guessing we're going to use the userID and slap it onto the url and redirect the user to the public profile page
		// 					"sender-picture" => "/image/user_img.pngs",
		// 					"message-subject" => "company origin|school origin|message subjectasdhbahbjfhkjskhfjhjsFAHJKSVDFHJASJKDHFJHSADFJHASDH",
		// 					"sender-message" => "about 100 characterskhashksahjsdhjhjsdfjhbsdhjbf",
		// 					"message-time" => "Feb 1",			// <------ date should be within 2 months i guess, we dont need to display stuff that is more than 2 months old 
		// 					"isNewMessage" => true,
		// 					"messageID" => 123),
		// 				array("sender-name" => "name", 
		// 					"sender-href" => "../profile-public-POV/?userID=", 	// <------ I'm guessing we're going to use the userID and slap it onto the url and redirect the user to the public profile page
		// 					"sender-picture" => "/image/user_img.png",
		// 					"message-subject" => "company origin|school origin|message subject",
		// 					"sender-message" => "about 100 characters",
		// 					"message-time" => "Feb 1",			// <------ date should be within 2 months i guess, we dont need to display stuff that is more than 2 months old 
		// 					"isNewMessage" => true,
		// 					"messageID" => 1233)
		// 			);
	// } else {
	// 	$data = array("wtf" => $_POST["userID"]);
	// }
	echo json_encode($data);
?>