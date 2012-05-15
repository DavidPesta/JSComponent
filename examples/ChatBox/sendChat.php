<?php

/*
* Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JavascriptComponents
* Licensed under the MIT License.
* You should have received a copy of the MIT License along with this program.
* If not, see http://www.opensource.org/licenses/mit-license.php
*/

include "../../Ajax/Ajax.php";
include "../../ServerPush/ServerPush.php";

session_start();

$userId = $_SESSION[ 'userId' ];
$roomId = $_POST[ 'roomId' ];
$message = $_POST[ 'message' ];

$component = "";
if( $roomId == "leftRoom" ) $component = "leftChatBox";
if( $roomId == "rightRoom" ) $component = "rightChatBox";

ServerPush::callForRoom( $roomId, $component, "newChat", array(
	"userId" => $userId,
	"message" => $message
));

Ajax::respond( array( "success" => 1 ) );
