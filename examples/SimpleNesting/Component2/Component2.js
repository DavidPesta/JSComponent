/*
* Copyright (c) 2012-2013 David Pesta, https://github.com/DavidPesta/JSComponent
* This file is licensed under the MIT License.
* You should have received a copy of the MIT License along with this program.
* If not, see http://www.opensource.org/licenses/mit-license.php
*/

function Component2() {
	var _this = this;
	
	_this.JSComponentClass = "Component2";
	
	/****  Define All Object Properties Here  ****/
	_this.parent = null;
	_this.component3 = null;
	
	_this.init = function( DOMClassChain, parent ) {
		_this.attachToDOM( DOMClassChain );
		_this.parent = parent;
		
		/****  Initial View Rendering Operations and Adjustments  ****/
		/****   and Event Bindings for Element Functionalities    ****/
		
		_this.attachChild( Component3, "component3" );
		
		return _this;
	}
	
	/****  Controllers to Update the Object Properties  ****/
	/****    and Perform Corresponding View Changes     ****/
	
	_this.componentMethod = function() {
		alert( "This is component 2's Method" );
		_this.parent.componentMethod();
	}
}
Component2.prototype = new JSComponent();
