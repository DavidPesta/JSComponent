/*
 * Copyright (c) 2012-2013 David Pesta, https://github.com/DavidPesta/JSComponent
 * This file is licensed under the MIT License.
 * You should have received a copy of the MIT License along with this program.
 * If not, see http://www.opensource.org/licenses/mit-license.php
 */

function Layout1() {
	var _this = this;
	
	_this.JSComponentClass = "Layout1";
	
	/****  Define All Object Properties Here  ****/
	_this.rootURI = null;
	_this.pages = {};
	_this.curPage = null;
	
	_this.init = function( DOMClassChain, rootURI ) {
		_this.attachToDOM( DOMClassChain );
		_this.rootURI = rootURI;
		
		/****  Initial View Rendering Operations and Adjustments  ****/
		/****   and Event Bindings for Element Functionalities    ****/
		
		return _this;
	}
	
	/****  Controllers to Update the Object Properties  ****/
	/****    and Perform Corresponding View Changes     ****/
	
	_this.addPage = function( PageClass, newDOMClass ) {
		_this.select( "pages" ).append( "<div class='" + newDOMClass + "' style='display: none;'></div>" );
		_this.pages[ newDOMClass ] = null;
		_this.attachChild( PageClass, newDOMClass, _this.pages, newDOMClass );
	}
	
	_this.changePage = function( page, fromPopState ) {
		fromPopState = typeof fromPopState !== 'undefined' ? fromPopState : false;
		
		document.title = "SitePages - " + page;
		
		if( _this.curPage != null ) _this.select( _this.curPage ).css( "display", "none" );
		_this.select( page ).css( "display", "inline" );
		
		if( ! fromPopState ) window.history.pushState( page, page, _this.rootURI + "/" + page );
		
		_this.curPage = page;
	}
}
Layout1.prototype = new JSComponent();
