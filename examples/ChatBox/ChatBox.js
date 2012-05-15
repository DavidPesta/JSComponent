/*
 * Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JavascriptComponents
 * Licensed under the MIT License.
 * You should have received a copy of the MIT License along with this program.
 * If not, see http://www.opensource.org/licenses/mit-license.php
 */

function ChatBox( component, roomId ) {
	var _this = this;
	
	_this.model = {
		componentClass: ".ChatBox",
		roomId: roomId,
		roomState: ".notInRoomState",
		participants: {}
	};
	
	
	/****  Initial View Rendering Operations and Adjustments  ****/
	
	_this.attach( component );
	
	
	/****  Event Bindings for Element Functionalities  ****/
	
	_this.select( ".sendChatButton" ).click( function() {
		if( _this.select( ".chatInputTextbox" ).val() == "" ) {
			_this.select( ".chatInputTextbox" ).focus();
			return;
		}
		
		Ajax( "sendChat.php", {
			"roomId": _this.model.roomId,
			"message": _this.select( ".chatInputTextbox" ).val()
		});
		
		_this.select( ".chatInputTextbox" ).val( "" );
		_this.select( ".chatInputTextbox" ).focus();
	});
	
	_this.select( ".chatInputTextbox" ).keypress( function( evt ) {
		if( evt.keyCode == 13 ) _this.select( ".sendChatButton" ).trigger( "click" );
	});
	
	_this.select( ".chooseUsernameButton" ).click( function() {
		if( _this.select( ".enterUsernameTextbox" ).val() == "" ) {
			_this.select( ".enterUsernameTextbox" ).focus();
			return;
		}
		
		Ajax( "joinRoom.php", {
			"roomId": _this.model.roomId,
			"username": _this.select( ".enterUsernameTextbox" ).val()
		}, function( data ) {
			_this.select( ".chatInputTextbox" ).focus();
		});
	});
	
	_this.select( ".enterUsernameTextbox" ).keypress( function( evt ) {
		if( evt.keyCode == 13 ) _this.select( ".chooseUsernameButton" ).trigger( "click" );
	});
	
	_this.select( ".logoutButton" ).click( function() {
		Ajax( "logout.php", {
			"roomId": _this.model.roomId
		});
	});
	
	
	/****  Controllers to Update the Data Model and Perform Corresponding View Changes  ****/
	
	_this.joinRoom = function( data ) {
		_this.select( _this.model.roomState ).hide();
		_this.model.roomState = data.roomState;
		_this.select( _this.model.roomState ).show();
		
		_this.model.participants = data.participants;
		_this.refreshParticipants();
	}
	
	_this.logout = function( data ) {
		_this.select( _this.model.roomState ).hide();
		_this.model.roomState = data.roomState;
		_this.select( _this.model.roomState ).show();
	}
	
	_this.addParticipant = function( participant ) {
		$.extend( _this.model.participants, participant );
		_this.refreshParticipants();
	}
	
	_this.refreshParticipants = function() {
		var container = $( "<div></div>" );
		$.each( _this.model.participants, function( userId, username ) {
			var participantItem = _this.cloneComponentClass( ".ParticipantItem" );
			participantItem.find( ".usernameText" ).html( username );
			participantItem.appendTo( container );
		});
		_this.select( ".participantContainer" ).empty();
		_this.select( ".participantContainer" ).append( container.contents() );
	}
	
	_this.newChat = function( chat ) {
		var username = _this.model.participants[ chat.userId ];
		
		var chatItem = _this.cloneComponentClass( ".ChatItem" );
		chatItem.find( ".usernameText" ).html( username );
		chatItem.find( ".chatText" ).html( chat.message );
		_this.select( ".chatContentContainer" ).append( chatItem );
	}
	
	_this.userLeft = function( userId ) {
		delete _this.model.participants[ userId ];
		_this.refreshParticipants();
	}
	
	
	/****  Supporting Methods  ****/
	
	// No supporting methods present
}
ChatBox.prototype = new Component();
