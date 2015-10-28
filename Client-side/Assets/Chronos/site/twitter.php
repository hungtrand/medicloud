<?php

global $user, $consumerkey, $consumersecret, $accesstoken, $accesstokensecret;
$user = 'twitter'; //user whose twits you want to display
$consumerkey = 'igMukP1KzexoMcGWCSfA'; // Customer key from twitter API
$consumersecret = '6goNB7yF9ItazqcWx0Viuck3E9T1SbD5nyUoMi6ys'; // Customer secret from twitter API
$accesstoken = '856858076-DYpXmC936ipQlL9zubgXrEkjAAuXJHWcWiY0OtVM';  // Access token from twitter API
$accesstokensecret = '4pyDlYhvGPLKvMJHrqhj2lOfraq3ZPruqwQOzJ68';  // Access secret from twitter API
	 




// functions.php
include_once('twitteroauth/twitteroauth.php');

// Get Conn
function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
	$connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
	return $connection;
}

function chronos_time_ago($date) {
	$chunks = array(
		array( 60 * 60 * 24 * 365 , 'year', 'years' ),
		array( 60 * 60 * 24 * 30 , 'month', 'months' ),
		array( 60 * 60 * 24 * 7, 'week', 'weeks' ),
		array( 60 * 60 * 24 , 'day', 'days' ),
		array( 60 * 60 , 'hour', 'hours' ),
		array( 60 , 'minute', 'minutes' ),
		array( 1, 'second', 'seconds' )
	);
	if ( !is_numeric( $date ) ) {
		$time_chunks = explode( ':', str_replace( ' ', ':', $date ) );
		$date_chunks = explode( '-', str_replace( ' ', '-', $date ) );
		$date = gmmktime( (int)$time_chunks[1], (int)$time_chunks[2], (int)$time_chunks[3], (int)$date_chunks[1], (int)$date_chunks[2], (int)$date_chunks[0] );
	}
	$current_time = gmdate( 'Y-m-d H:i:s');
	$newer_date = strtotime( $current_time );
	$since = $newer_date - $date;
	if ( 0 > $since )
		return 'sometime';
	for ( $i = 0, $j = count($chunks); $i < $j; $i++) {
		$seconds = $chunks[$i][0];
		if ( ( $count = floor($since / $seconds) ) != 0 )
			break;
	}
	$output = ( 1 == $count ) ? '1 <span class="text-ago">'. $chunks[$i][1] : $count . ' <span class="text-ago">' . $chunks[$i][2];
	if ( !(int)trim($output) ){
		$output = '0' . 'seconds';
	}
	$output .= ' ago</span>';
	return $output;
}


// Twitted Feed
function chronos_twitter_feed($count = '1', $list = false){
	global $user, $consumerkey, $consumersecret, $accesstoken, $accesstokensecret;
	$output = '';
	$i = 1;
	$twitteruser = $user;
	$notweets = $count;

	$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
	$tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".$twitteruser."&count=".$notweets);
	$data = json_decode( json_encode($tweets) );
	if ( is_array( $data ) ) :
	while ( $i <= $count ) {
		if( isset( $data[$i-1] ) ) {
			$feed = $data[( $i - 1 )]->text;
			$feed = str_pad( $feed, 3, ' ', STR_PAD_LEFT );
			$startat = stripos( $feed, '@' );
			$numat = substr_count( $feed, '@' );
			$numhash = substr_count( $feed, '#' );
			$numhttp = substr_count( $feed, 'http' );
			$feed = preg_replace( "#(^|[\n ])([\w]+?://[\w]+[^ \"\n\r\t< ]*)#", "\\1<a href=\"\\2\" target=\"_blank\">\\2</a>", $feed );
			$feed = preg_replace( "#(^|[\n ])((www|ftp)\.[^ \"\t\n\r< ]*)#", "\\1<a href=\"http://\\2\" target=\"_blank\">\\2</a>", $feed );
			$feed = preg_replace( "/@(\w+)/", "<a href=\"http://www.twitter.com/\\1\" target=\"_blank\">@\\1</a>", $feed );
			$feed = preg_replace( "/#(\w+)/", "<a href=\"http://search.twitter.com/search?q=\\1\" target=\"_blank\">#\\1</a>", $feed );
			if(!$list)
				$output .= sprintf('<div class="">%2$s</div><div class="">%1$s</div>', $feed, chronos_time_ago( strtotime( $data[($i-1)]->created_at ) ) );
			else
				$output .= sprintf('<div class="single_row margin-bottom24"><i class="fa fa-twitter icon_element"></i><div class="text border-box">%1$s</div><div class="clearfix"></div></div><!-- single_row -->', $feed);
			
			if ($i !== $count && $list) $output .= '<div class="small_separator background-color-passive margin-bottom24"></div>';
		}
		$i++;
	}
	return $output;
	else :
		return 'Twitter unaviable';	
	endif;
}
if(isset($_GET)) {
	echo chronos_twitter_feed();
}
?>