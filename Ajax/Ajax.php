<?php

/*
* Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JavascriptComponents
* Licensed under the MIT License.
* You should have received a copy of the MIT License along with this program.
* If not, see http://www.opensource.org/licenses/mit-license.php
*/

class Ajax
{
	public static function respond( $vars )
	{
		echo json_encode( $vars );
		exit;
	}
	
	public static function call( $component, $method = null, $vars = null )
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
		
		echo json_encode( $data );
		exit;
	}
}
