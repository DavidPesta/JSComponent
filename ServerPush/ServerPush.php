<?php

/*
* Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JSComponent
* This file is licensed under the MIT License.
* You should have received a copy of the MIT License along with this program.
* If not, see http://www.opensource.org/licenses/mit-license.php
*/

class ServerPush
{
	private static $nodeUrl = "http://127.0.0.1";
	private static $nodePort = 443;
	
	private static function postToNode( $pkg )
	{
		$ch = curl_init();
		curl_setopt( $ch, CURLOPT_URL, self::$nodeUrl );
		curl_setopt( $ch, CURLOPT_HEADER, 0 );
		curl_setopt( $ch, CURLOPT_HTTPHEADER, array( 'Expect:' ) );
		curl_setopt( $ch, CURLOPT_PORT, self::$nodePort );
		curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT, 2 );
		curl_setopt( $ch, CURLOPT_POST, true );
		curl_setopt( $ch, CURLOPT_POSTFIELDS, http_build_query( $pkg ) );
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
		$response = json_decode( curl_exec( $ch ), true );
		curl_close( $ch );
		
		return $response;
	}
	
	public static function sendToUser( $userId, $cmd, $data )
	{
		$response = self::postToNode( array(
			"nodeCmd" => "sendToUser",
			"cmd"     => $cmd,
			"userId"  => $userId,
			"data"    => $data
		));
		
		if( $response[ 'success' ] ) return true;
		else return false;
	}
	
	public static function sendToUsers( $userIds, $cmd, $data )
	{
		$response = self::postToNode( array(
			"nodeCmd" => "sendToUsers",
			"cmd"     => $cmd,
			"userIds" => $userIds,
			"data"    => $data
		));
		
		return $response[ 'userIdsFailed' ];
	}
	
	public static function sendToRoom( $roomId, $cmd, $data )
	{
		$response = self::postToNode( array(
			"nodeCmd" => "sendToRoom",
			"cmd"     => $cmd,
			"roomId"  => $roomId,
			"data"    => $data
		));
		
		if( $response[ 'success' ] ) return true;
		else return false;
	}
	
	public static function sendToRooms( $roomIds, $cmd, $data )
	{
		$response = self::postToNode( array(
			"nodeCmd" => "sendToRooms",
			"cmd"     => $cmd,
			"roomIds" => $roomIds,
			"data"    => $data
		));
		
		if( $response[ 'success' ] ) return true;
		else return false;
	}
	
	public static function sendToEveryone( $cmd, $data )
	{
		$response = self::postToNode( array(
			"nodeCmd" => "sendToEveryone",
			"cmd"     => $cmd,
			"data"    => $data
		));
		
		if( $response[ 'success' ] ) return true;
		else return false;
	}
	
	public static function setupCall( $component, $method, $vars )
	{
		if( is_array( $component ) ) {
			$data = array( "components" => $component );
		}
		elseif( is_array( $method ) ) {
			$data = array( "components" => array( $component => $method ) );
		}
		elseif( $component != null && $method != null ) {
			$data = array( "components" => array( $component => array( $method => $vars ) ) );
		}
		else {
			$data = array( "components" => array() );
		}
		
		return $data;
	}
	
	public static function callForUser( $userId, $component, $method = null, $vars = null )
	{
		$data = self::setupCall( $component, $method, $vars );
		
		$response = self::postToNode( array(
			"nodeCmd" => "sendToUser",
			"cmd"     => "components",
			"userId"  => $userId,
			"data"    => $data
		));
		
		if( $response[ 'success' ] ) return true;
		else return false;
	}
	
	public static function callForUsers( $userIds, $component, $method = null, $vars = null )
	{
		$data = self::setupCall( $component, $method, $vars );
		
		$response = self::postToNode( array(
			"nodeCmd" => "sendToUsers",
			"cmd"     => "components",
			"userIds" => $userIds,
			"data"    => $data
		));
		
		return $response[ 'userIdsFailed' ];
	}
	
	public static function callForRoom( $roomId, $component, $method = null, $vars = null )
	{
		$data = self::setupCall( $component, $method, $vars );
		
		$response = self::postToNode( array(
			"nodeCmd" => "sendToRoom",
			"cmd"     => "components",
			"roomId"  => $roomId,
			"data"    => $data
		));
		
		if( $response[ 'success' ] ) return true;
		else return false;
	}
	
	public static function callForRooms( $roomIds, $component, $method = null, $vars = null )
	{
		$data = self::setupCall( $component, $method, $vars );
		
		$response = self::postToNode( array(
			"nodeCmd" => "sendToRooms",
			"cmd"     => "components",
			"roomIds" => $roomIds,
			"data"    => $data
		));
		
		if( $response[ 'success' ] ) return true;
		else return false;
	}
	
	public static function callForEveryone( $component, $method = null, $vars = null )
	{
		$data = self::setupCall( $component, $method, $vars );
		
		$response = self::postToNode( array(
			"nodeCmd" => "sendToEveryone",
			"cmd"     => "components",
			"data"    => $data
		));
		
		if( $response[ 'success' ] ) return true;
		else return false;
	}
	
	public static function loginUser( $userId, $socketId )
	{
		$response = self::postToNode( array(
			"nodeCmd"  => "loginUser",
			"userId"   => $userId,
			"socketId" => $socketId
		));
		
		if( $response[ 'success' ] ) return true;
		else return false;
	}
	
	public static function logoutUser( $userId )
	{
		$response = self::postToNode( array(
			"nodeCmd" => "logoutUser",
			"userId"  => $userId
		));
		
		if( $response[ 'success' ] ) return true;
		else return false;
	}
	
	public static function addRoomUser( $roomId, $userId )
	{
		$response = self::postToNode( array(
			"nodeCmd" => "addRoomUser",
			"roomId"  => $roomId,
			"userId"  => $userId
		));
		
		if( $response[ 'success' ] ) return true;
		else return false;
	}
	
	public static function addUserToRoom( $userId, $roomId )
	{
		return self::addRoomUser( $roomId, $userId );
	}
	
	public static function addRoomUsers( $roomId, $userIds )
	{
		$response = self::postToNode( array(
			"nodeCmd" => "addRoomUsers",
			"roomId"  => $roomId,
			"userIds" => $userIds
		));
		
		return $response[ 'userIdsFailed' ];
	}
	
	public static function addUsersToRoom( $userIds, $roomId )
	{
		return self::addRoomUsers( $roomId, $userIds );
	}
	
	public static function addUserToRooms( $userId, $roomIds )
	{
		$response = self::postToNode( array(
			"nodeCmd" => "addUserToRooms",
			"userId"  => $userId,
			"roomIds" => $roomIds
		));
		
		if( $response[ 'success' ] ) return true;
		else return false;
	}
	
	public static function removeRoomUser( $roomId, $userId )
	{
		$response = self::postToNode( array(
			"nodeCmd" => "removeRoomUser",
			"roomId"  => $roomId,
			"userId"  => $userId
		));
		
		if( $response[ 'success' ] ) return true;
		else return false;
	}
	
	public static function removeUserFromRoom( $userId, $roomId )
	{
		return self::removeRoomUser( $roomId, $userId );
	}
	
	public static function removeRoomUsers( $roomId, $userIds )
	{
		$response = self::postToNode( array(
			"nodeCmd" => "removeRoomUsers",
			"roomId"  => $roomId,
			"userIds" => $userIds
		));
		
		return $response[ 'userIdsFailed' ];
	}
	
	public static function removeUsersFromRoom( $userIds, $roomId )
	{
		return self::removeRoomUsers( $roomId, $userIds );
	}
	
	public static function removeUserFromRooms( $userId, $roomIds )
	{
		$response = self::postToNode( array(
			"nodeCmd" => "removeUserFromRooms",
			"userId"  => $userId,
			"roomIds" => $roomIds
		));
		
		if( $response[ 'success' ] ) return true;
		else return false;
	}
	
	public static function shutDownServer()
	{
		$response = self::postToNode( array(
			"nodeCmd" => "shutDownServer"
		));
		
		if( $response[ 'success' ] ) return true;
		else return false;
	}
	
	public static function getServerRooms()
	{
		return self::postToNode( array(
			"nodeCmd" => "getServerRooms"
		));
	}
	
	public static function getUserRooms( $userId )
	{
		return self::postToNode( array(
			"nodeCmd" => "getUserRooms",
			"userId"  => $userId
		));
	}
	
	public static function getRoomUsers( $roomId )
	{
		return self::postToNode( array(
			"nodeCmd" => "getRoomUsers",
			"roomId"  => $roomId
		));
	}
}
