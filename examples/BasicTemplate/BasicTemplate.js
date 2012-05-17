/*
 * Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JavascriptComponents
 * Licensed under the MIT License.
 * You should have received a copy of the MIT License along with this program.
 * If not, see http://www.opensource.org/licenses/mit-license.php
 */

function BasicTemplate() {
	var _this = this;
	
	_this.componentClass = ".BasicTemplate";
	/****  Define All Object Properties Here  ****/
	
	_this.init = function( component ) {
		_this.attach( component );
		
		/****  Initial View Rendering Operations and Adjustments  ****/
		/****   and Event Bindings for Element Functionalities    ****/
		
		return _this;
	}
	
	/****  Controllers to Update the Object Properties  ****/
	/****    and Perform Corresponding View Changes     ****/
}
BasicTemplate.prototype = new Component();
