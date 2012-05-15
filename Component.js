/*
 * Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JavascriptComponents
 * Licensed under the MIT License.
 * You should have received a copy of the MIT License along with this program.
 * If not, see http://www.opensource.org/licenses/mit-license.php
 */

function Component() {
	this.attach = function( component ) {
		if( component == null && this.model.component != null ) {
			$( "#" + this.model.component ).empty();
		}
		else {
			this.model.component = component;
			$( "#components " + this.model.componentClass ).clone().contents().appendTo( "#" + component );
		}
	}
	
	this.select = function( element ) {
		if( element == "component" ) return $( "#" + this.model.component );
		else return $( "#" + this.model.component + " " + element );
	}
	
	this.cloneComponentClass = function( componentClass ) {
		return $( "#components " + componentClass ).clone();
	}
}
