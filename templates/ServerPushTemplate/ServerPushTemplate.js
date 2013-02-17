/*
 * Copyright (c) 2012-2013 David Pesta, https://github.com/DavidPesta/JSComponent
 * This template file is licensed under a MODIFIED MIT License:
 * The intent of this template file is for you to remove this license and replace it with your own.
 * This applies only to template files in this project. All MIT liability disclaimers remain in effect.
 * David Pesta relinquishes copyright over just this file the instant you modify it for your own project.
 */

function ServerPushTemplate() {
	var _this = this;
	
	_this.JSComponentClass = "ServerPushTemplate";
	
	/****  Define All Object Properties Here  ****/
	
	_this.init = function( DOMClassChain ) {
		_this.attachToDOM( DOMClassChain );
		
		/****  Initial View Rendering Operations and Adjustments  ****/
		/****   and Event Bindings for Element Functionalities    ****/
		
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
ServerPushTemplate.prototype = new JSComponent();
