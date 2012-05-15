/*
 * Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JavascriptComponents
 * Licensed under the MIT License.
 * You should have received a copy of the MIT License along with this program.
 * If not, see http://www.opensource.org/licenses/mit-license.php
 */

function Ajax( url, dataObject, callback ) {
	if( typeof dataObject == "undefined" ) dataObject = {};
	
	$.ajax({
		type: "POST",
		url: url,
		data: dataObject,
		dataType: "json",
		success: function( data ) {
			for( var component in data.components ) {
				if( typeof window[ component ] == "object" ) {
					for( var method in data.components[ component ] ) {
						if( typeof window[ component ][ method ] == "function" ) {
							window[ component ][ method ]( data.components[ component ][ method ] );
						}
					}
				}
			}
			
			if( typeof callback == "function" ) {
				callback( data );
			}
		}
	});
}
