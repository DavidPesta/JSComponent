/*
 * Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JSComponent
 * Licensed under the MIT License.
 * You should have received a copy of the MIT License along with this program.
 * If not, see http://www.opensource.org/licenses/mit-license.php
 */

function JSComponent() {
	this.attach = function( component ) {
		if( component == null && this.component != null ) {
			$( "#" + this.component ).empty();
		}
		else {
			this.component = component;
			$( "#JSComponents " + this.JSComponentClass ).clone().contents().appendTo( "#" + component );
		}
	}
	
	this.select = function( element ) {
		if( element == "component" ) return $( "#" + this.component );
		else return $( "#" + this.component + " " + element );
	}
	
	this.cloneJSComponentClass = function( JSComponentClass ) {
		return $( "#JSComponents " + JSComponentClass ).clone();
	}
}
