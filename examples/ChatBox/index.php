<?php

	/*
	* Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JSComponent
	* Licensed under the MIT License.
	* You should have received a copy of the MIT License along with this program.
	* If not, see http://www.opensource.org/licenses/mit-license.php
	*/
	
	session_start();
	$_SESSION[ 'userId' ] = mt_rand( 10000, 99999 );
	
	$url = $_SERVER[ 'HTTP_HOST' ];
	$folder = $_SERVER[ 'REQUEST_URI' ];

?>
<!DOCTYPE html>

<html>
	<head>
		<link href="ChatBox.css" rel="stylesheet" type="text/css">
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
		<script src="http://<?= $url ?>:443/socket.io/socket.io.js"></script>
		<script src="http://<?= $url . $folder ?>../../ServerPush/ServerPush.js"></script>
		<script src="http://<?= $url . $folder ?>../../Ajax/Ajax.js"></script>
		<script src="http://<?= $url . $folder ?>../../JSComponent.js"></script>
		<script src="ChatBox.js"></script>
	</head>
	
	<body>
		<div id="JSComponents" style="display: none;">
			<? include "ChatBox.phtml" ?>
		</div>
		
		<div style="margin-bottom: 20px;">userId: <?= $_SESSION[ 'userId' ] ?></div>
		
		<div id="leftChatBox" style="float: left; background-color: #FDD;"></div>
		<div id="rightChatBox" style="float: left; background-color: #DDF; margin-left: 10px;"></div>
		
		<div style="clear: both;"></div>
		
		<div id="messages" style="margin-top: 12px;"></div>
	</body>
</html>

<script>
	window.leftChatBox = new ChatBox().init( "leftChatBox", "leftRoom" );
	window.rightChatBox = new ChatBox().init( "rightChatBox", "rightRoom" );
	
	ServerPush = new ServerPush( 'http://<?= $url ?>', '/JSComponent/ServerPush/', 443 );
	
	ServerPush.socket.on( 'loggedIn', function() {
		$( "#messages" ).append( "<div>logged in</div>" );
	});
	
	ServerPush.socket.on( 'disconnect', function() {
		$( "#messages" ).append( "<div>disconnected</div>" );
	});
	
	ServerPush.socket.on( 'userLeftRoom', function( userId, roomId ) {
		var component = "";
		if( roomId == "leftRoom" ) component = "leftChatBox";
		if( roomId == "rightRoom" ) component = "rightChatBox";
		window[ component ].userLeft( userId );
	});
</script>
