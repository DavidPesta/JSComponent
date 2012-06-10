<?php
/*
 * Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JSComponent
 * This template file is licensed under a MODIFIED MIT License:
 * The intent of this template file is for you to remove this license and replace it with your own.
 * This applies only to template files in this project. All MIT liability disclaimers remain in effect.
 * David Pesta relinquishes copyright over just this file the instant you modify it for your own project.
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
		<script src="http://<?= $_SERVER[ 'HTTP_HOST' ] . $_SERVER[ 'REQUEST_URI' ] ?>../../JSComponent.js"></script>
		<script src="FullTemplate.js"></script>
	</head>
	
	<body>
		<div id="JSComponents" style="display: none;">
			<? include "FullTemplate.phtml" ?>
		</div>
		
		<div id="fullTemplateInstance"></div>
	</body>
</html>

<script>
	window.fullTemplateInstance = new FullTemplate().init( "fullTemplateInstance" );
	
	ServerPush = new ServerPush( 'http://<?= $_SERVER[ 'HTTP_HOST' ] ?>', '/JSComponent/ServerPush/', 443 );
	
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
