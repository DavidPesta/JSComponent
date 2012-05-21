<?php

/*
* Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JSComponent
* Licensed under the MIT License.
* You should have received a copy of the MIT License along with this program.
* If not, see http://www.opensource.org/licenses/mit-license.php
*/

include "../../Ajax/Ajax.php";
include "../../ServerPush/ServerPush.php";

// Retrieve variables passed to this script from the Javascript Ajax call
//$var1 = $_POST[ 'var1' ];
//$var2 = $_POST[ 'var2' ];

/* Example Ajax Response:
	Ajax::call( "FullTemplateInstance", "controller", array(
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
