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
	_this.recentComponent3Id = 0;
	_this.component3s = {};
	
	_this.init = function( DOMClassChain, parent ) {
		_this.attachToDOM( DOMClassChain );
		_this.parent = parent;
		
		/****  Initial View Rendering Operations and Adjustments  ****/
		/****   and Event Bindings for Element Functionalities    ****/
		
		_this.select( "addComponent3" ).on( "click", _this.addComponent3 );
		
		return _this;
	}
	
	/****  Controllers to Update the Object Properties  ****/
	/****    and Perform Corresponding View Changes     ****/
	
	_this.addComponent3 = function() {
		_this.recentComponent3Id++;
		var newComponent3Id = _this.recentComponent3Id;
		var newDOMClass = "component3_" + newComponent3Id;
		
		_this.select( "component3Container" ).append( "<div class='" + newDOMClass + "'></div>" );
		_this.component3s[ newDOMClass ] = null;
		_this.attachChild( Component3, newDOMClass, _this.component3s, newDOMClass );
	}
}
Component2.prototype = new JSComponent();
