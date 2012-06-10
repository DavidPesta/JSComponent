<?php

/*
* Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JSComponent
* This file is licensed under the MIT License.
* You should have received a copy of the MIT License along with this program.
* If not, see http://www.opensource.org/licenses/mit-license.php
*/

include "../../Ajax/Ajax.php";
include "../../ServerPush/ServerPush.php";

session_start();

$userId = $_SESSION[ 'userId' ];
$roomId = $_POST[ 'roomId' ];

$component = "";
if( $roomId == "leftRoom" ) $component = "leftChatBox";
if( $roomId == "rightRoom" ) $component = "rightChatBox";

ServerPush::removeRoomUser( $roomId, $userId );

Ajax::call( $component, "logout", array(
	"roomState" => ".notInRoomState"
));
