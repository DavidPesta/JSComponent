/*
 * Copyright (c) 2012-2013 David Pesta, https://github.com/DavidPesta/JSComponent
 * This file is licensed under the MIT License.
 * You should have received a copy of the MIT License along with this program.
 * If not, see http://www.opensource.org/licenses/mit-license.php
 */

function JSComponent() {
	
	// Attaches this component to the DOM at the location specified by the DOM class chain passed to it
	// DOMClassChain is the fully qualified selector to the element that this new component gets appended to
	this.attachToDOM = function( DOMClassChain ) {
		this.DOMClassChain = DOMClassChain;
		$( "#JSComponents ." + this.JSComponentClass ).clone().contents().appendTo( "." + DOMClassChain );
	}
	
	// Removes this component from the DOM
	this.clearFromDOM = function() {
		$( "." + this.DOMClassChain ).empty();
	}
	
	// Attaches a new component as a child to this component
	// ChildClass is the Javascript class of the component
	// DOMClass refers to the local DOM element where this child component is to be appended
	// AttachToMember is where the new child component's Javascript object should be referenced in this parent
	//   Javascript class. AttachToMember is either an object or a primitive type, depending on how it's stored.
	// MemberItem, if present, is a primitive type that determines where it is attached to the member object,
	//   assuming that the member that it is attached to is an object.
	this.attachChild = function( ChildClass, DOMClass, AttachToMember, MemberItem ) {
		
		// When AttachToMember is not defined at all, it is assumed the member has the same name as DOMClass
		if( typeof AttachToMember === 'undefined' ) {
			this[ DOMClass ] = new ChildClass().init( this.DOMClassChain + " ." + DOMClass, this );
		}
		
		// When AttachToMember is defined and MemberItem is not defined, AttachToMember is the name of the member
		if( typeof AttachToMember !== 'undefined' && typeof MemberItem === 'undefined' ) {
			this[ AttachToMember ] = new ChildClass().init( this.DOMClassChain + " ." + DOMClass, this );
		}
		
		// When they are both defined, AttachToMember is assumed to be an object and MemberItem is the index
		if( typeof AttachToMember !== 'undefined' && typeof MemberItem !== 'undefined' ) {
			AttachToMember[ MemberItem ] = new ChildClass().init( this.DOMClassChain + " ." + DOMClass, this );
		}
	}
	
	// Returns a jQuery object of a local DOM element that exists within this component
	// TargetClass refers to the class of the local DOM element that you are wanting for the returned object
	this.select = function( TargetClass ) {
		if( TargetClass == "this" ) return $( "." + this.DOMClassChain );
		else return $( "." + this.DOMClassChain + " ." + TargetClass );
	}
	
	// Returns a jQuery object clone of the initial DOM shell of a component
	// JSComponentClass is the DOM class of the initial DOM shell of the component
	this.cloneJSComponentClass = function( JSComponentClass ) {
		return $( "#JSComponents ." + JSComponentClass ).clone();
	}
	
	// Returns the class of this component object as it is found in the DOM
	this.DOMClass = function() {
		var chainParts = this.DOMClassChain.split( " " );
		return chainParts[ chainParts.length - 1 ].replace( /\./g, "" );
	}
	
	// Returns a unique signature for the component, based on its DOM class chain
	this.componentSignature = function() {
		return this.DOMClassChain.replace( / \./g, "-" );
	}
}
