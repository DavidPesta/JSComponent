<?php

/*
 * Copyright (c) 2012-2013 David Pesta, https://github.com/DavidPesta/JSComponent
 * This template file is licensed under a MODIFIED MIT License:
 * The intent of this template file is for you to remove this license and replace it with your own.
 * This applies only to template files in this project. All MIT liability disclaimers remain in effect.
 * David Pesta relinquishes copyright over just this file the instant you modify it for your own project.
 */

include "../../Ajax/Ajax.php";
include "../../ServerPush/ServerPush.php";

// Retrieve variables passed to this script from the Javascript Ajax call
//$var1 = $_POST[ 'var1' ];
//$var2 = $_POST[ 'var2' ];

/* Example Ajax Response:
	Ajax::call( "fullTemplateInstance", "controller", array(
		"var1" => $val1,
		"var2" => $val2
	));
*/

// Quick Reference to ServerPush and Ajax methods:

//ServerPush::callForUser( $userId, $component, $method = null, $vars = null );
//ServerPush::callForUsers( $userIds, $component, $method = null, $vars = null );
//ServerPush::callForRoom( $roomId, $component, $method = null, $vars = null );
//ServerPush::callForRooms( $roomIds, $component, $method = null, $vars = null );
//ServerPush::callForEveryone( $component, $method = null, $vars = null );
//ServerPush::logoutUser( $userId );
//ServerPush::addRoomUser( $roomId, $userId );
//ServerPush::addUserToRoom( $userId, $roomId );
//ServerPush::addRoomUsers( $roomId, $userIds );
//ServerPush::addUsersToRoom( $userIds, $roomId );
//ServerPush::addUserToRooms( $userId, $roomIds );
//ServerPush::removeRoomUser( $roomId, $userId );
//ServerPush::removeUserFromRoom( $userId, $roomId );
//ServerPush::removeRoomUsers( $roomId, $userIds );
//ServerPush::removeUsersFromRoom( $userIds, $roomId );
//ServerPush::removeUserFromRooms( $userId, $roomIds );
//ServerPush::shutDownServer();
//ServerPush::getServerRooms();
//ServerPush::getUserRooms( $userId );
//ServerPush::getRoomUsers( $roomId );

//Ajax::respond( $vars );
//Ajax::call( $component, $method = null, $vars = null );
