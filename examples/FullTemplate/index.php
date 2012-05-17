<?php
/*
* Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JavascriptComponents
* Licensed under the MIT License.
* You should have received a copy of the MIT License along with this program.
* If not, see http://www.opensource.org/licenses/mit-license.php
*/
?>
<!DOCTYPE html>

<html>
	<head>
		<link href="FullTemplate.css" rel="stylesheet" type="text/css">
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
		<script src="http://<?= $_SERVER[ 'HTTP_HOST' ] ?>:443/socket.io/socket.io.js"></script>
		<script src="http://<?= $_SERVER[ 'HTTP_HOST' ] . $_SERVER[ 'REQUEST_URI' ] ?>../../ServerPush/ServerPush.js"></script>
		<script src="http://<?= $_SERVER[ 'HTTP_HOST' ] . $_SERVER[ 'REQUEST_URI' ] ?>../../Ajax/Ajax.js"></script>
		<script src="http://<?= $_SERVER[ 'HTTP_HOST' ] . $_SERVER[ 'REQUEST_URI' ] ?>../../Component.js"></script>
		<script src="FullTemplate.js"></script>
	</head>
	
	<body>
		<div id="components" style="display: none;">
			<? include "FullTemplate.phtml" ?>
		</div>
		
		<div id="FullTemplateInstance"></div>
	</body>
</html>

<script>
	window.FullTemplateInstance = new FullTemplate().init( "FullTemplateInstance" );
	
	ServerPush = new ServerPush( 'http://<?= $_SERVER[ 'HTTP_HOST' ] ?>', '/JavascriptComponents/ServerPush/', 443 );
	
	ServerPush.socket.on( 'loggedIn', function() {
		// Execute code on login, if any
	});
	
	ServerPush.socket.on( 'disconnect', function() {
		// Execute code on disconnect, if any
	});
	
	ServerPush.socket.on( 'userLeftRoom', function( userId, roomId ) {
		// Execute code whenever a user leaves, if any
	});
</script>
