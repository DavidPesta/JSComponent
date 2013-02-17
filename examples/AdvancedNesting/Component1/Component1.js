/*
* Copyright (c) 2012-2013 David Pesta, https://github.com/DavidPesta/JSComponent
* This file is licensed under the MIT License.
* You should have received a copy of the MIT License along with this program.
* If not, see http://www.opensource.org/licenses/mit-license.php
*/

function Component1() {
	var _this = this;
	
	_this.JSComponentClass = "Component1";
	
	/****  Define All Object Properties Here  ****/
	_this.parent = null;
	_this.recentComponent2Id = 0;
	_this.component2s = {};
	
	_this.init = function( DOMClassChain, parent ) {
		_this.attachToDOM( DOMClassChain );
		_this.parent = parent;
		
		/****  Initial View Rendering Operations and Adjustments  ****/
		/****   and Event Bindings for Element Functionalities    ****/
		
		_this.select( "addComponent2" ).on( "click", _this.addComponent2 );
		
		return _this;
	}
	
	/****  Controllers to Update the Object Properties  ****/
	/****    and Perform Corresponding View Changes     ****/
	
	_this.addComponent2 = function() {
		_this.recentComponent2Id++;
		var newComponent2Id = _this.recentComponent2Id;
		var newDOMClass = "component2_" + newComponent2Id;
		
		_this.select( "component2Container" ).append( "<div class='" + newDOMClass + "'></div>" );
		_this.component2s[ newDOMClass ] = null;
		_this.attachChild( Component2, newDOMClass, _this.component2s, newDOMClass );
	}
}
Component1.prototype = new JSComponent();
