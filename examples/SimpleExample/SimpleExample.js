/*
 * Copyright (c) 2012-2013 David Pesta, https://github.com/DavidPesta/JSComponent
 * This file is licensed under the MIT License.
 * You should have received a copy of the MIT License along with this program.
 * If not, see http://www.opensource.org/licenses/mit-license.php
 */

function SimpleExample() {
	var _this = this;
	
	_this.JSComponentClass = "SimpleExample";
	
	/****  Define All Object Properties Here  ****/
	_this.state = null;
	
	_this.init = function( DOMClassChain ) {
		_this.attachToDOM( DOMClassChain );
		
		/****  Initial View Rendering Operations and Adjustments  ****/
		/****   and Event Bindings for Element Functionalities    ****/
		
		_this.setState( "firstState" );
		
		_this.select( "toggleState" ).click( function() {
			if( _this.state == null ) _this.setState( "firstState" );
			else if( _this.state == "firstState" ) _this.setState( "secondState" );
			else if( _this.state == "secondState" ) _this.setState( "firstState" );
		});
		
		return _this;
	}
	
	/****  Controllers to Update the Object Properties  ****/
	/****    and Perform Corresponding View Changes     ****/
	
	_this.setState = function( state ) {
		$( "." + _this.state ).hide();
		_this.state = state;
		$( "." + _this.state ).show();
	}
}
SimpleExample.prototype = new JSComponent();
