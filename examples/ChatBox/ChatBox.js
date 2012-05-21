/*
 * Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JSComponent
 * Licensed under the MIT License.
 * You should have received a copy of the MIT License along with this program.
 * If not, see http://www.opensource.org/licenses/mit-license.php
 */

function ChatBox() {
	var _this = this;
	
	_this.JSComponentClass = ".ChatBox";
	_this.roomId = null;
	_this.roomState = ".notInRoomState";
	_this.participants = {};
	
	_this.init = function( component, roomId ) {
		_this.attach( component );
		
		_this.roomId = roomId;
		
		_this.select( ".sendChatButton" ).click( function() {
			if( _this.select( ".chatInputTextbox" ).val() == "" ) {
				_this.select( ".chatInputTextbox" ).focus();
				return;
			}
			
			Ajax( "sendChat.php", {
				"roomId": _this.roomId,
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
				"roomId": _this.roomId,
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
				"roomId": _this.roomId
			});
		});
		
		return _this;
	}
	
	_this.joinRoom = function( data ) {
		_this.select( _this.roomState ).hide();
		_this.roomState = data.roomState;
		_this.select( _this.roomState ).show();
		
		_this.participants = data.participants;
		_this.refreshParticipants();
	}
	
	_this.logout = function( data ) {
		_this.select( _this.roomState ).hide();
		_this.roomState = data.roomState;
		_this.select( _this.roomState ).show();
	}
	
	_this.addParticipant = function( participant ) {
		$.extend( _this.participants, participant );
		_this.refreshParticipants();
	}
	
	_this.refreshParticipants = function() {
		var container = $( "<div></div>" );
		$.each( _this.participants, function( userId, username ) {
			var participantItem = _this.cloneJSComponentClass( ".ParticipantItem" );
			participantItem.find( ".usernameText" ).html( username );
			participantItem.appendTo( container );
		});
		_this.select( ".participantContainer" ).empty();
		_this.select( ".participantContainer" ).append( container.contents() );
	}
	
	_this.newChat = function( chat ) {
		var username = _this.participants[ chat.userId ];
		
		var chatItem = _this.cloneJSComponentClass( ".ChatItem" );
		chatItem.find( ".usernameText" ).html( username );
		chatItem.find( ".chatText" ).html( chat.message );
		_this.select( ".chatContentContainer" ).append( chatItem );
	}
	
	_this.userLeft = function( userId ) {
		delete _this.participants[ userId ];
		_this.refreshParticipants();
	}
}
ChatBox.prototype = new JSComponent();
