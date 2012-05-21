<?php

/*
* Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JSComponent
* Licensed under the MIT License.
* You should have received a copy of the MIT License along with this program.
* If not, see http://www.opensource.org/licenses/mit-license.php
*/

include "../../ServerPush/ServerPush.php";
include "../../Ajax/Ajax.php";

session_start();

$userId = $_SESSION[ 'userId' ];
$username = $_POST[ 'username' ];
$roomId = $_POST[ 'roomId' ];
$_SESSION[ $roomId ] = $username;

$component = "";
if( $roomId == "leftRoom" ) $component = "leftChatBox";
if( $roomId == "rightRoom" ) $component = "rightChatBox";

// Add to APC so that new people who join can get the full manifest of participants
apc_store( "chat:$roomId:$userId", $username );

ServerPush::addRoomUser( $roomId, $userId );
ServerPush::callForRoom( $roomId, $component, "addParticipant", array( $userId => $username ) );

$participants = array();
$roomUserIds = ServerPush::getRoomUsers( $roomId );
foreach( $roomUserIds as $roomUserId ) {
	$roomUsername = apc_fetch( "chat:$roomId:$roomUserId" );
	if( $roomUsername != null ) $participants[ $roomUserId ] = $roomUsername;
}

Ajax::call( $component, "joinRoom", array(
	"roomState"    => ".insideRoomState",
	"participants" => $participants
));
