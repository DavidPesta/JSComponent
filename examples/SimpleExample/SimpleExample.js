/*
 * Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JSComponent
 * Licensed under the MIT License.
 * You should have received a copy of the MIT License along with this program.
 * If not, see http://www.opensource.org/licenses/mit-license.php
 */

function SimpleExample() {
	var _this = this;
	
	_this.JSComponentClass = ".SimpleExample";
	_this.state = null;
	
	_this.init = function( component ) {
		_this.attach( component );
		
		_this.setState( ".firstState" );
		
		_this.select( ".toggleState" ).click( function() {
			if( _this.state == null ) _this.setState( ".firstState" );
			else if( _this.state == ".firstState" ) _this.setState( ".secondState" );
			else if( _this.state == ".secondState" ) _this.setState( ".firstState" );
		});
		
		return _this;
	}
	
	_this.setState = function( state ) {
		$( _this.state ).hide();
		_this.state = state;
		$( _this.state ).show();
	}
}
SimpleExample.prototype = new JSComponent();
