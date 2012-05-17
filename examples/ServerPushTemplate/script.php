<?php

/*
* Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JavascriptComponents
* Licensed under the MIT License.
* You should have received a copy of the MIT License along with this program.
* If not, see http://www.opensource.org/licenses/mit-license.php
*/

include "../../ServerPush/ServerPush.php";

/* Example ServerPush Call:
	ServerPush::callForUser( $userId, "ServerPushTemplateInstance", "controller", array(
		"var1" => $val1,
		"var2" => $val2
	));
*/

// Quick Reference to ServerPush methods:

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
