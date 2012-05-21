/*
 * Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JSComponent
 * This template file is licensed under a MODIFIED MIT License:
 * The intent of this template file is for you to remove this license and replace it with your own.
 * This applies only to template files in this project. All MIT liability disclaimers remain in effect.
 * David Pesta relinquishes copyright over just this file the instant you modify it for your own project.
 */

function FullTemplate() {
	var _this = this;
	
	_this.JSComponentClass = ".FullTemplate";
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
FullTemplate.prototype = new JSComponent();
