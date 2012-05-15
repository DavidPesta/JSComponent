<?php

/*
* Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JavascriptComponents
* Licensed under the MIT License.
* You should have received a copy of the MIT License along with this program.
* If not, see http://www.opensource.org/licenses/mit-license.php
*/

include "ServerPush.php";

session_start();

$userId = $_SESSION[ 'userId' ];
$socketId = $_POST[ 'socketId' ];

if( ServerPush::loginUser( $userId, $socketId ) ) {
	echo json_encode( array( "response" => "loginSuccess" ) );
}
else {
	echo json_encode( array( "response" => "loginFail" ) );
}
