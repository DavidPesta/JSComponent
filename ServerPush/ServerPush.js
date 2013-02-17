/*
 * Copyright (c) 2012-2013 David Pesta, https://github.com/DavidPesta/JSComponent
 * This file is licensed under the MIT License.
 * You should have received a copy of the MIT License along with this program.
 * If not, see http://www.opensource.org/licenses/mit-license.php
 */

function ServerPush( url, folder, port ) {
	this.socket = io.connect( url, { port: port, secure: false } );

	this.socket.on( 'connected', function( data ) {
		$.ajax({
			type: "POST",
			url: url + folder + "ServerPushLogin.php",
			data: { "socketId": data.socketId },
			dataType: "json",
			success: function( data ) {}
		});
	});
	
	this.socket.on( 'components', function( data ) {
		for( var component in data.components ) {
			if( typeof window[ component ] == "object" ) {
				for( var method in data.components[ component ] ) {
					if( typeof window[ component ][ method ] == "function" ) {
						window[ component ][ method ]( data.components[ component ][ method ] );
					}
				}
			}
		}
	});
}
