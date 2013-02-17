/*
* Copyright (c) 2012-2013 David Pesta, https://github.com/DavidPesta/JSComponent
* This file is licensed under the MIT License.
* You should have received a copy of the MIT License along with this program.
* If not, see http://www.opensource.org/licenses/mit-license.php
*/

function Component3() {
	var _this = this;
	
	_this.JSComponentClass = "Component3";
	
	/****  Define All Object Properties Here  ****/
	_this.parent = null;
	
	_this.init = function( DOMClassChain, parent ) {
		_this.attachToDOM( DOMClassChain );
		_this.parent = parent;
		window[ _this.componentSignature() ] = _this; // Add attachment to window so that ajax and serverpush calls can access this object
		
		/****  Initial View Rendering Operations and Adjustments  ****/
		/****   and Event Bindings for Element Functionalities    ****/
		
		_this.select( "component3Button" ).on( "click", function() {
			_this.componentMethod();
		});
		
		_this.select( "component3AjaxButton" ).on( "click", function() {
			Ajax( "Component3/script.php", {
				"component": _this.componentSignature(), // Let the ajax call know the window attachment to this object
				"var1": 1,
				"var2": "two"
			});
		});
		
		return _this;
	}
	
	/****  Controllers to Update the Object Properties  ****/
	/****    and Perform Corresponding View Changes     ****/
	
	_this.componentMethod = function() {
		alert( "This is a Component3 object.\n\nIts componentSignature is:\n" + _this.componentSignature() + "\n\nIts DOMClassChain is:\n" + _this.DOMClassChain + "\n\nIts DOMClass is: " + _this.DOMClass() + "\n\nIts parent DOMClass is: " + _this.parent.DOMClass() + "\n\nIts grandparent DOMClass is: " + _this.parent.parent.DOMClass() );
	}
	
	_this.ajaxResponse = function( data ) {
		alert( data.response );
	}
}
Component3.prototype = new JSComponent();
