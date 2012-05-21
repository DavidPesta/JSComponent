function parse_str (str, array) {
    // Parses GET/POST/COOKIE data and sets global variables
    // version: 1109.2015
    // Credits and discussion at: http://phpjs.org/functions/parse_str
	// Slightly modified by David Pesta
    var glue1 = '=',
        glue2 = '&',
        array2 = String(str).replace(/^&?([\s\S]*?)&?$/, '$1').split(glue2),
        i, j, chr, tmp, key, value, bracket, keys, evalStr, that = this,
        fixStr = function (str) {
			// David Pesta combined the php.js function "urldecode" with the line below
            return decodeURIComponent((str + '').replace(/\+/g, '%20')).replace(/([\\"'])/g, '\\$1').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
        };
	
	// David Pesta removed a small block of code
	
    for (i = 0; i < array2.length; i++) {
        tmp = array2[i].split(glue1);
        if (tmp.length < 2) {
            tmp = [tmp, ''];
        }
        key = fixStr(tmp[0]);
        value = fixStr(tmp[1]);
        while (key.charAt(0) === ' ') {
            key = key.substr(1);
        }
        if (key.indexOf('\0') !== -1) {
            key = key.substr(0, key.indexOf('\0'));
        }
        if (key && key.charAt(0) !== '[') {
            keys = [];
            bracket = 0;
            for (j = 0; j < key.length; j++) {
                if (key.charAt(j) === '[' && !bracket) {
                    bracket = j + 1;
                } else if (key.charAt(j) === ']') {
                    if (bracket) {
                        if (!keys.length) {
                            keys.push(key.substr(0, bracket - 1));
                        }
                        keys.push(key.substr(bracket, j - bracket));
                        bracket = 0;
                        if (key.charAt(j + 1) !== '[') {
                            break;
                        }
                    }
                }
            }
            if (!keys.length) {
                keys = [key];
            }
            for (j = 0; j < keys[0].length; j++) {
                chr = keys[0].charAt(j);
                if (chr === ' ' || chr === '.' || chr === '[') {
                    keys[0] = keys[0].substr(0, j) + '_' + keys[0].substr(j + 1);
                }
                if (chr === '[') {
                    break;
                }
            }
            evalStr = 'array';
            for (j = 0; j < keys.length; j++) {
                key = keys[j];
                if ((key !== '' && key !== ' ') || j === 0) {
                    key = "'" + key + "'";
                } else {
                    key = eval(evalStr + '.push([]);') - 1;
                }
                evalStr += '[' + key + ']';
                if (j !== keys.length - 1 && eval('typeof ' + evalStr) === 'undefined') {
                    eval(evalStr + ' = {};'); // David Pesta Changed [] to {}
                }
            }
            evalStr += " = '" + value + "';\n";
            eval(evalStr);
        }
    }
}

function date (format, timestamp) {
    // Format a local date/time  
    // version: 1109.2015
    // credits and discussion at: http://phpjs.org/functions/date
	
    var that = this,
        jsdate, f, formatChr = /\\?([a-z])/gi,
        formatChrCb,
        // Keep this here (works, but for code commented-out
        // below for file size reasons)
        //, tal= [],
        _pad = function (n, c) {
            if ((n = n + '').length < c) {
                return new Array((++c) - n.length).join('0') + n;
            }
            return n;
        },
        txt_words = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    formatChrCb = function (t, s) {
        return f[t] ? f[t]() : s;
    };
    f = {
        // Day
        d: function () { // Day of month w/leading 0; 01..31
            return _pad(f.j(), 2);
        },
        D: function () { // Shorthand day name; Mon...Sun
            return f.l().slice(0, 3);
        },
        j: function () { // Day of month; 1..31
            return jsdate.getDate();
        },
        l: function () { // Full day name; Monday...Sunday
            return txt_words[f.w()] + 'day';
        },
        N: function () { // ISO-8601 day of week; 1[Mon]..7[Sun]
            return f.w() || 7;
        },
        S: function () { // Ordinal suffix for day of month; st, nd, rd, th
            var j = f.j();
            return j > 4 && j < 21 ? 'th' : {1: 'st', 2: 'nd', 3: 'rd'}[j % 10] || 'th';
        },
        w: function () { // Day of week; 0[Sun]..6[Sat]
            return jsdate.getDay();
        },
        z: function () { // Day of year; 0..365
            var a = new Date(f.Y(), f.n() - 1, f.j()),
                b = new Date(f.Y(), 0, 1);
            return Math.round((a - b) / 864e5) + 1;
        },
 
        // Week
        W: function () { // ISO-8601 week number
            var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3),
                b = new Date(a.getFullYear(), 0, 4);
            return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
        },
 
        // Month
        F: function () { // Full month name; January...December
            return txt_words[6 + f.n()];
        },
        m: function () { // Month w/leading 0; 01...12
            return _pad(f.n(), 2);
        },
        M: function () { // Shorthand month name; Jan...Dec
            return f.F().slice(0, 3);
        },
        n: function () { // Month; 1...12
            return jsdate.getMonth() + 1;
        },
        t: function () { // Days in month; 28...31
            return (new Date(f.Y(), f.n(), 0)).getDate();
        },
 
        // Year
        L: function () { // Is leap year?; 0 or 1
            return new Date(f.Y(), 1, 29).getMonth() === 1 | 0;
        },
        o: function () { // ISO-8601 year
            var n = f.n(),
                W = f.W(),
                Y = f.Y();
            return Y + (n === 12 && W < 9 ? -1 : n === 1 && W > 9);
        },
        Y: function () { // Full year; e.g. 1980...2010
            return jsdate.getFullYear();
        },
        y: function () { // Last two digits of year; 00...99
            return (f.Y() + "").slice(-2);
        },
 
        // Time
        a: function () { // am or pm
            return jsdate.getHours() > 11 ? "pm" : "am";
        },
        A: function () { // AM or PM
            return f.a().toUpperCase();
        },
        B: function () { // Swatch Internet time; 000..999
            var H = jsdate.getUTCHours() * 36e2,
                // Hours
                i = jsdate.getUTCMinutes() * 60,
                // Minutes
                s = jsdate.getUTCSeconds(); // Seconds
            return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
        },
        g: function () { // 12-Hours; 1..12
            return f.G() % 12 || 12;
        },
        G: function () { // 24-Hours; 0..23
            return jsdate.getHours();
        },
        h: function () { // 12-Hours w/leading 0; 01..12
            return _pad(f.g(), 2);
        },
        H: function () { // 24-Hours w/leading 0; 00..23
            return _pad(f.G(), 2);
        },
        i: function () { // Minutes w/leading 0; 00..59
            return _pad(jsdate.getMinutes(), 2);
        },
        s: function () { // Seconds w/leading 0; 00..59
            return _pad(jsdate.getSeconds(), 2);
        },
        u: function () { // Microseconds; 000000-999000
            return _pad(jsdate.getMilliseconds() * 1000, 6);
        },
 
        // Timezone
        e: function () { // Timezone identifier; e.g. Atlantic/Azores, ...
            // The following works, but requires inclusion of the very large
            // timezone_abbreviations_list() function.
/*              return this.date_default_timezone_get();
*/
            throw 'Not supported (see source code of date() for timezone on how to add support)';
        },
        I: function () { // DST observed?; 0 or 1
            // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
            // If they are not equal, then DST is observed.
            var a = new Date(f.Y(), 0),
                // Jan 1
                c = Date.UTC(f.Y(), 0),
                // Jan 1 UTC
                b = new Date(f.Y(), 6),
                // Jul 1
                d = Date.UTC(f.Y(), 6); // Jul 1 UTC
            return 0 + ((a - c) !== (b - d));
        },
        O: function () { // Difference to GMT in hour format; e.g. +0200
            var tzo = jsdate.getTimezoneOffset(),
                a = Math.abs(tzo);
            return (tzo > 0 ? "-" : "+") + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
        },
        P: function () { // Difference to GMT w/colon; e.g. +02:00
            var O = f.O();
            return (O.substr(0, 3) + ":" + O.substr(3, 2));
        },
        T: function () { // Timezone abbreviation; e.g. EST, MDT, ...
            // The following works, but requires inclusion of the very
            // large timezone_abbreviations_list() function.
/*              var abbr = '', i = 0, os = 0, default = 0;
            if (!tal.length) {
                tal = that.timezone_abbreviations_list();
            }
            if (that.php_js && that.php_js.default_timezone) {
                default = that.php_js.default_timezone;
                for (abbr in tal) {
                    for (i=0; i < tal[abbr].length; i++) {
                        if (tal[abbr][i].timezone_id === default) {
                            return abbr.toUpperCase();
                        }
                    }
                }
            }
            for (abbr in tal) {
                for (i = 0; i < tal[abbr].length; i++) {
                    os = -jsdate.getTimezoneOffset() * 60;
                    if (tal[abbr][i].offset === os) {
                        return abbr.toUpperCase();
                    }
                }
            }
*/
            return 'UTC';
        },
        Z: function () { // Timezone offset in seconds (-43200...50400)
            return -jsdate.getTimezoneOffset() * 60;
        },
 
        // Full Date/Time
        c: function () { // ISO-8601 date.
            return 'Y-m-d\\Th:i:sP'.replace(formatChr, formatChrCb);
        },
        r: function () { // RFC 2822
            return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
        },
        U: function () { // Seconds since UNIX epoch
            return jsdate.getTime() / 1000 | 0;
        }
    };
    this.date = function (format, timestamp) {
        that = this;
        jsdate = ((typeof timestamp === 'undefined') ? new Date() : // Not provided
        (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
        new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
        );
        return format.replace(formatChr, formatChrCb);
    };
    return this.date(format, timestamp);
}

var isEmpty = function( obj ) {
	return Object.keys( obj ).length === 0;
}

/*
 * Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JSComponent
 * Licensed under the MIT License.
 * You should have received a copy of the MIT License along with this program.
 * If not, see http://www.opensource.org/licenses/mit-license.php
 */

function ServerPushNode() {
	var self = {
		_host: '127.0.0.1',
		_port: 443,
		_server: null,
		_io: null,
		_fs: null,
		_res: null,
		_userSockets: {}, // { userId: socket, ... }
		_rooms: {}, // { roomId: { userId: socket, userId: socket, ... }, roomId: { userId: socket, userId: socket, ... }, ... }
		
		init: function() {
			self._server = require( 'http' ).createServer(function( req, res ) {
				try {
					if( res.socket.remoteAddress == self._host ) {
						if( req.method == 'POST' ) {
							var body = '';
							
							req.on( 'data', function( data ) {
								try {
									body += data;
								}
								catch( err ) {
									self._log( "req on data: " + err );
								}
							});
							
							req.on( 'end', function() {
								try {
									var POST = {};
									parse_str( body, POST );
									
									self._res = res;
									
									if( typeof self[ POST[ 'nodeCmd' ] ] == "function" ) self[ POST[ 'nodeCmd' ] ]( POST );
									else self._sendResponse( { "error": "The command '" + POST[ 'nodeCmd' ] + "' does not exist." } );
								}
								catch( err ) {
									self._log( "req on end: " + err );
								}
							});
						}
					}
				}
				catch( err ) {
					self._log( "request: " + err );
				}
			});
			
			self._io = require( 'socket.io' ).listen( self._server );
			
			self._server.listen( self._port );
			
			self._io.sockets.on( 'connection', function( socket ) {
				try {
					socket.emit( 'connected', { 'socketId': socket.id } );
					
					socket.on( 'disconnect', function() {
						try {
							if( typeof socket.rooms != "undefined" ) {
								var userRooms = socket.rooms.slice( 0 ); // makes a separate clone of the array
								for( key in userRooms ) {
									var roomId = userRooms[ key ];
									self._removeRoomUser( roomId, socket.userId );
									self._notifyRoomUserLeft( roomId, socket.userId );
								}
							}
							
							delete self._userSockets[ socket.userId ];
						}
						catch( err ) {
							self._log( "socket on disconnect: " + err );
						}
					});
				}
				catch( err ) {
					self._log( "sockets on connection: " + err );
				}
			});
			
			self._fs = require( 'fs' );
			
			self._log( "server started" );
		},
		
		sendToUser: function( POST ) {
			try {
				var socket = self._userSockets[ POST[ 'userId' ] ];
				
				try {
					socket.emit( POST[ 'cmd' ], POST[ 'data' ] );
					self._sendResponse( { "success": true } );
				}
				catch( err ) {
					self._sendResponse( { "success": false } );
				}
			}
			catch( err ) {
				self._log( "sendToUser: " + err );
				self._sendResponse( { "success": false } );
			}
		},
		
		sendToUsers: function( POST ) {
			try {
				var userIdsFailed = [];
				
				for( var key in POST[ 'userIds' ] ) {
					var userId = POST[ 'userIds' ][ key ];
					var socket = self._userSockets[ userId ];
					
					try {
						socket.emit( POST[ 'cmd' ], POST[ 'data' ] );
					}
					catch( err ) {
						userIdsFailed.push( userId );
					}
				}
				
				self._sendResponse( { "userIdsFailed": userIdsFailed } );
			}
			catch( err ) {
				self._log( "sendToUsers: " + err );
				self._sendResponse( { "success": false } );
			}
		},
		
		_sendToRoom: function( roomId, cmd, data ) {
			try {
				var usersInRoom = self._rooms[ roomId ];
				for( var userId in usersInRoom ) {
					var socket = self._userSockets[ userId ];
					try {
						socket.emit( cmd, data, roomId );
					}
					catch( err ) {}
				}
			}
			catch( err ) {
				self._log( "_sendToRoom: " + err );
			}
		},
		
		sendToRoom: function( POST ) {
			try {
				self._sendToRoom( POST[ 'roomId' ], POST[ 'cmd' ], POST[ 'data' ] );
				self._sendResponse( { "success": true } );
			}
			catch( err ) {
				self._log( "sendToRoom: " + err );
				self._sendResponse( { "success": false } );
			}
		},
		
		sendToRooms: function( POST ) {
			try {
				for( var key in POST[ 'roomIds' ] ) {
					var roomId = POST[ 'roomIds' ][ key ];
					self._sendToRoom( roomId, POST[ 'cmd' ], POST[ 'data' ] );
				}
				
				self._sendResponse( { "success": true } );
			}
			catch( err ) {
				self._log( "sendToRooms: " + err );
				self._sendResponse( { "success": false } );
			}
		},
		
		sendToEveryone: function( POST ) {
			try {
				self._io.sockets.emit( POST[ 'cmd' ], POST[ 'data' ] );
				self._sendResponse( { "success": true } );
			}
			catch( err ) {
				self._log( "sendToEveryone: " + err );
				self._sendResponse( { "success": false } );
			}
		},
		
		loginUser: function( POST ) {
			try {
				var socket = self._io.sockets.sockets[ POST[ 'socketId' ] ];
				
				if( typeof socket != "undefined" ) {
					socket.emit( "loggedIn" );
					socket.userId = POST[ 'userId' ];
					socket.rooms = [];
					self._userSockets[ POST[ 'userId' ] ] = socket;
					self._sendResponse( { "success": true } );
				}
				else {
					self._sendResponse( { "success": false } );
				}
			}
			catch( err ) {
				self._log( "loginUser: " + err );
				self._sendResponse( { "success": false } );
			}
		},
		
		logoutUser: function( POST ) {
			try {
				var socket = self._userSockets[ POST[ 'userId' ] ];
				socket.disconnect(); // this triggers socket.on disconnect above, which notifies rooms
				self._sendResponse( { "success": true } );
			}
			catch( err ) {
				self._log( "logoutUser: " + err );
				self._sendResponse( { "success": false } );
			}
		},
		
		_addRoomUser: function( roomId, userId ) {
			try {
				var socket = self._userSockets[ userId ];
				if( typeof socket == "undefined" ) return false;
				
				if( typeof self._rooms[ roomId ] == "undefined" ) self._rooms[ roomId ] = {};
				self._rooms[ roomId ][ userId ] = self._userSockets[ userId ];
				socket.rooms.push( roomId );
				
				return true;
			}
			catch( err ) {
				self._log( "_addRoomUser: " + err );
			}
		},
		
		addRoomUser: function( POST ) {
			try {
				var result = self._addRoomUser( POST[ 'roomId' ], POST[ 'userId' ] );
				if( result == true ) self._notifyRoomUserJoined( POST[ 'roomId' ], POST[ 'userId' ] );
				self._sendResponse( { "success": result } );
			}
			catch( err ) {
				self._log( "addRoomUser: " + err );
				self._sendResponse( { "success": false } );
			}
		},
		
		addRoomUsers: function( POST ) {
			try {
				var userIdsFailed = [];
				
				for( var key in POST[ 'userIds' ] ) {
					var userId = POST[ 'userIds' ][ key ];
					var result = self._addRoomUser( POST[ 'roomId' ], userId );
					if( result == true ) self._notifyRoomUserJoined( POST[ 'roomId' ], userId );
					else userIdsFailed.push( userId );
				}
				
				self._sendResponse( { "userIdsFailed": userIdsFailed } );
			}
			catch( err ) {
				self._log( "addRoomUsers: " + err );
				self._sendResponse( { "success": false } );
			}
		},
		
		addUserToRooms: function( POST ) {
			try {
				for( var key in POST[ 'roomIds' ] ) {
					var roomId = POST[ 'roomIds' ][ key ];
					var result = self._addRoomUser( roomId, POST[ 'userId' ] );
					if( result == false ) break;
					self._notifyRoomUserJoined( roomId, POST[ 'userId' ] );
				}
				
				self._sendResponse( { "success": result } );
			}
			catch( err ) {
				self._log( "addUserToRooms: " + err );
				self._sendResponse( { "success": false } );
			}
		},
		
		_removeRoomUser: function( roomId, userId ) {
			try {
				var socket = self._userSockets[ userId ];
				if( typeof socket == "undefined" ) return false;
				
				for( var i = 0; i < socket.rooms.length; i++ ) {
					if( socket.rooms[ i ] == roomId ) {
						socket.rooms.splice( i, 1 );
						break;
					}
				}
				
				if( typeof self._rooms[ roomId ] != "undefined" ) {
					delete self._rooms[ roomId ][ userId ];
					if( isEmpty( self._rooms[ roomId ] ) ) delete self._rooms[ roomId ];
				}
				
				return true;
			}
			catch( err ) {
				self._log( "_removeRoomUser: " + err );
			}
		},
		
		removeRoomUser: function( POST ) {
			try {
				var result = self._removeRoomUser( POST[ 'roomId' ], POST[ 'userId' ] );
				if( result == true ) self._notifyRoomUserLeft( POST[ 'roomId' ], POST[ 'userId' ] );
				self._sendResponse( { "success": result } );
			}
			catch( err ) {
				self._log( "removeRoomUser: " + err );
				self._sendResponse( { "success": false } );
			}
		},
		
		removeRoomUsers: function( POST ) {
			try {
				var userIdsFailed = [];
				
				for( var key in POST[ 'userIds' ] ) {
					var userId = POST[ 'userIds' ][ key ];
					var result = self._removeRoomUser( POST[ 'roomId' ], userId );
					if( result == true ) self._notifyRoomUserLeft( POST[ 'roomId' ], userId );
					else userIdsFailed.push( userId );
				}
				
				self._sendResponse( { "userIdsFailed": userIdsFailed } );
			}
			catch( err ) {
				self._log( "removeRoomUsers: " + err );
				self._sendResponse( { "success": false } );
			}
		},
		
		removeUserFromRooms: function( POST ) {
			try {
				for( var key in POST[ 'roomIds' ] ) {
					var roomId = POST[ 'roomIds' ][ key ];
					var result = self._removeRoomUser( roomId, POST[ 'userId' ] );
					if( result == false ) break;
					self._notifyRoomUserLeft( roomId, POST[ 'userId' ] );
				}
				
				self._sendResponse( { "success": result } );
			}
			catch( err ) {
				self._log( "removeUserFromRooms: " + err );
				self._sendResponse( { "success": false } );
			}
		},
		
		shutDownServer: function() {
			try {
				process.exit();
			}
			catch( err ) {
				self._log( "shutDownServer: " + err );
			}
		},
		
		getServerRooms: function() {
			try {
				self._sendResponse( self._serverRooms() );
			}
			catch( err ) {
				self._log( "getServerRooms: " + err );
				self._sendResponse( { "success": false } );
			}
		},
		
		getUserRooms: function( POST ) {
			try {
				self._sendResponse( self._userRooms( POST[ 'userId' ] ) );
			}
			catch( err ) {
				self._log( "getUserRooms: " + err );
				self._sendResponse( { "success": false } );
			}
		},
		
		getRoomUsers: function( POST ) {
			try {
				self._sendResponse( self._roomUsers( POST[ 'roomId' ] ) );
			}
			catch( err ) {
				self._log( "getRoomUsers: " + err );
				self._sendResponse( { "success": false } );
			}
		},
		
		_sendResponse: function( response ) {
			try {
				self._res.writeHead( 200, [ [ "Content-Type", "text/plain" ] ] );
				self._res.write( JSON.stringify( response ) );
				self._res.end();
			}
			catch( err ) {
				self._log( "_sendResponse: " + err );
			}
		},
		
		_log: function( msg ) {
			try {
				msg = date( "Y-m-d H:i:s" ) + " - " + msg;
				console.log( "\n" + msg );
				var buffer = new Buffer( msg + "\n\n" );
				var fd = self._fs.openSync( 'ServerPushNode.log', 'a', 666 );
				self._fs.writeSync( fd, buffer, 0, buffer.length, null );
				self._fs.closeSync( fd );
			}
			catch( err ) {}
		},
		
		_notifyRoomUserJoined: function( roomId, userId ) {
			try {
				self._sendToRoom( roomId, "userJoinedRoom", userId );
			}
			catch( err ) {
				self._log( "_notifyRoomUserJoined: " + err );
			}
		},
		
		_notifyRoomUserLeft: function( roomId, userId ) {
			try {
				self._sendToRoom( roomId, "userLeftRoom", userId );
			}
			catch( err ) {
				self._log( "_notifyRoomUserLeft: " + err );
			}
		},
		
		// Return an array of all rooms on the server
		_serverRooms: function() {
			try {
				var rooms = new Array();
				for( roomId in self._rooms ) {
					rooms.push( roomId );
				}
				return rooms;
			}
			catch( err ) {
				self._log( "_serverRooms: " + err );
			}
		},
		
		// Return an array of all the rooms that this userId belongs in
		_userRooms: function( userId ) {
			try {
				var socket = self._userSockets[ userId ];
				
				if( typeof socket == "undefined" ) return new Array();
				else return socket.rooms;
			}
			catch( err ) {
				self._log( "_userRooms: " + err );
			}
		},
		
		// Return an array of all the rooms that this socket belongs in
		_socketRooms: function( socket ) {
			try {
				if( typeof socket == "undefined" ) return new Array();
				else return socket.rooms;
			}
			catch( err ) {
				self._log( "_socketRooms: " + err );
			}
		},
		
		// Return an array of all the userIds that exist inside of this room
		_roomUsers: function( roomId ) {
			try {
				if( typeof self._rooms[ roomId ] == "undefined" ) {
					return new Array();
				}
				else {
					var userIds = new Array();
					for( userId in self._rooms[ roomId ] ) {
						userIds.push( userId );
					}
					return userIds;
				}
			}
			catch( err ) {
				self._log( "_roomUsers: " + err );
			}
		},
		
		// Return an array of all the sockets that exist inside of this room
		_roomSockets: function( roomId ) {
			try {
				if( typeof self._rooms[ roomId ] == "undefined" ) {
					return new Array();
				}
				else {
					var sockets = new Array();
					for( userId in self._rooms[ roomId ] ) {
						sockets.push( self._rooms[ roomId ][ userId ] );
					}
					return sockets;
				}
			}
			catch( err ) {
				self._log( "_roomSockets: " + err );
			}
		}
	}
	
	self.init();
	
	return self;
}

ServerPushNode = ServerPushNode();
