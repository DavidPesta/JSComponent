/*
 * Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JSComponent
 * Licensed under the MIT License.
 * You should have received a copy of the MIT License along with this program.
 * If not, see http://www.opensource.org/licenses/mit-license.php
 */

function AjaxTemplate() {
	var _this = this;
	
	_this.JSComponentClass = ".AjaxTemplate";
	/****  Define All Object Properties Here  ****/
	
	_this.init = function( component ) {
		_this.attach( component );
		
		/****  Initial View Rendering Operations and Adjustments  ****/
		/****   and Event Bindings for Element Functionalities    ****/
		
		/* Example Ajax Call:
			Ajax( "script.php", {
				"var1": 1,
				"var2": 2
			}, function( data ) {
				console.log( data );
			});
		*/
		
		return _this;
	}
	
	/****  Controllers to Update the Object Properties  ****/
	/****    and Perform Corresponding View Changes     ****/
	
	/* Example Controller:
		_this.controller = function( data ) {
			console.log( data );
		}
	*/
}
AjaxTemplate.prototype = new JSComponent();
