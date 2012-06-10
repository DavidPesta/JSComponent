JSComponent
===========

A simple light weight framework and supporting libraries for Javascript component development.

<b>Initial Release:</b> May 15, 2012<br>
<b>Last Updated:</b> June 10, 2012


## Documentation

### Introduction

The examples folder contains ChatBox, which is a fully functional chat room that utilizes this framework and its supporting libraries. But before you study ChatBox, you may want to look at SimpleExample, which is an even easier introduction to how the framework works. Code templates for rapid component development can also be found in the examples folder. All of these examples are a helpful reference and should be looked at when studying this documentation to learn how to use JSComponents.

In short, a JSComponent is made up of 3 files and has 4 document hookups in order to get it to work:
- Files:
  - A phtml file: Used to define the html structure of the component (analogous to the component's view)
  - A css file: (optional) Used to style the html structure found in the phtml file
  - A js file: A customized Javascript class to hold all of the component's data and define all of its functionality (contains the component's data model as object properties and controllers as object methods)
- Hookups:
  - The js and css file dependencies need to be defined in the document head
  - The contents of the phtml file needs to be added to the inside of the hidden "JSComponents" div using a PHP "include" statement
  - A div needs to be created with the component's name as its id in the location that you want the component to appear
  - A line of javascript needs to execute the "new" statement to create the component's javascript object and immediately execute the init method through javascript call chaining, passing to init the component's name. All of this gets assigned to a javascript variable (preferably also of the same name) attached to the document's window object. This may sound confusing, but it can be seen near the bottom of the SimpleExample index.php file.

The Ajax and ServerPush systems were designed to compliment this framework by allowing PHP on the server to effectively make calls directly to a JSComponent on the client. This is well documented later.

### The phtml File (view)

What is a phtml file? A phtml file functions and behaves just like any other ordinary php file. However, the phtml file has a unique purpose that the developer is trying to make everyone aware of. When a developer labels the extension of their file with phtml instead of php, they are communicating that the file needs to be thought of (conceptually) as an HTML file. The developer can't just use a plain old HTML file because the file needs to have functional PHP inside of it. In short, a phtml file is an HTML file with the power to run PHP statements inside of it.

The phtml file's outermost div needs to have a unique CSS class name, and this name needs to be assigned to the "JSComponentClass" property near the beginning of the component's javascript file. Be sure to include the period in front of it, which is its CSS class selector. The outermost div should contain detailed html structure for various states that might be hidden or shown at different times based on the state functionality of the component.

Each html element may have a class that can be referred to (not as a hard rule) and may also be aided by classes that group various component elements that can be selected collectively. All of this can be supported by a CSS file (which should be given the same filename) that defines styles and images for the element's classes. A class should always be used instead of an id for every element in the phtml file just in case you want multiple instances of the component on the same page. It is invalid for two elements on the same page to have the same id.

### The js File (model and controllers)

A component's js file is where all of the interesting dynamic stuff happens.

All components should extend the JSComponent.js class--this can be seen at the very end of the js file. At the very top of the file, after the js class declaration, the first thing that appears inside of the class is "var _this = this;". This allows a reference to "this" via "_this" to be passed to the inside of jQuery command closures (such as the "click" function), as well as everywhere else throughout the class. Next, we want to add the "JSComponentClass" property and assign it's value to what we are calling the class name of the phtml's outer div. Be sure to put a period in front of this value so that it can be utilized as a CSS class selector and the system can find the component's html structure inside of the phtml file.

Next comes the init function. This is analogous to the constructor found in most object oriented programming languages. It can accept any number of parameters, but must accept at least one: component. The init function must accept the name of the component as an argument so that it can immediately "attach" the component to the div where you intend for it to appear in the html document. After this, we add whatever javascript we want, to make the component appear the way it is supposed to look the first time it is initialized. Then, define user interactivity triggers and attach events onto various view elements, along with any desired callback functionalities. At the very end of the init function, we need this line: "return _this;". That line will allow chaining to work properly so that the entire object is assigned to the object that gets created and attached to the document window.

Next comes the controllers: methods that get called whenever a change to the state of the component is supposed to happen, keeping object's data properties and html view appearance in sync. If you are wanting the html of the object to change in some way or update some data in the object's parameters, it is done inside of the object's methods (understood to be controllers). The most important thing is that all data property changes must stay in sync with any view changes, and vice versa. It is the job of the controller to keep all object data and the view in sync.

Any kind of supporting methods (that aren't controllers) can also be added, things that help with various calculations or formatting.

Again, don't forget to extend the JSComponent.js with this new class by adding "new JSComponent()" to the new class's prototype. This is done immediately after the class's definition at the bottom of the file.

### Sending Data From PHP to a JSComponent Using Ajax or ServerPush

What Ajax and ServerPush both have in common is how they allow a structured PHP array to communicate with a JSComponent on the client in very powerful ways. For Ajax::call and ServerPush::callFor[User][Users][Room][Rooms][Everyone], they both give you a lot of flexibility with how to send data back to the client's components, effectively executing calls directly on the component's controllers.

You can pass a single component to the $component parameter as a string, a single method to the $method parameter as a string, then pass an array of variables and values to the $vars parameter for that component's method:
``` php
$vars = array(
	"var1" => $val1,
	"var2" => $val2
);

// You might do either one of the following, or both, in a given controller:
ServerPush::callForEveryone( "someComponent", "someMethod", $vars ); // ServerPush calls could appear multiple times in a script
Ajax::call( "someComponent", "someMethod", $vars ); // This would be called only once as the response at the end of an ajax call
```
Doing the above from inside PHP is equivalent to calling something like this inside of javascript on the client:
``` javascript
window.someComponent.someMethod({
	"var1": 1,
	"var2": 2
});
```

Or you can pass a single component to the $component parameter as a string, then pass a multidimensional array of methods and variables and values to the $method parameter:
``` php
$methods = array(
	"method1" => array(
		"var1" => $val1,
		"var2" => $val2
	),
	"method2" => array(
		"var1" => $val1,
		"var2" => $val2
	)
);

// You might do either one of the following, or both, in a given controller:
ServerPush::callForRoom( $roomId, "someComponent", $methods ); // ServerPush calls could appear multiple times in a script
Ajax::call( "someComponent", $methods ); // This would be called only once as the response at the end of an ajax call
```
Doing the above from inside PHP is equivalent to calling something like this inside of javascript on the client:
``` javascript
window.someComponent.method1({
	"var1": 1,
	"var2": 2
});
window.someComponent.method2({
	"var1": 1,
	"var2": 2
});
```

Or you can send a whole lot of data to multiple different components by passing a huge multidimensional array structure to the $component parameter:
``` php
$components = array(
	"component1" => array(
		"method1" => array(
			"var1" => $val1,
			"var2" => $val2
		),
		"method2" => array(
			"var1" => $val1,
			"var2" => $val2
		)
	),
	"component2" => array(
		"method1" => array(
			"var1" => $val1,
			"var2" => $val2
		),
		"method2" => array(
			"var1" => $val1,
			"var2" => $val2
		)
	)
);

// You might do either one of the following, or both, in a given controller:
ServerPush::callForUser( $userId, $components ); // ServerPush calls could appear multiple times in a script
Ajax::call( $components ); // This would be called only once as the response at the end of an ajax call
```
Doing the above from inside PHP is equivalent to calling something like this inside of javascript on the client:
``` javascript
window.component1.method1({
	"var1": 1,
	"var2": 2
});
window.component1.method2({
	"var1": 1,
	"var2": 2
});
window.component2.method1({
	"var1": 1,
	"var2": 2
});
window.component2.method2({
	"var1": 1,
	"var2": 2
});
```

All you need to do is make sure that the instantiated JSComponent objects exist on the client with controller methods that can handle those variables and you're all set!

### Ajax Usage

For Ajax to work, you need to include the Ajax.js file inside of a script tag inside of the document's head.

To fire off an ajax call, inside of your Javascript, execute the following:
``` javascript
Ajax( "/path/to/ajaxScript.php", { // Passing the object of variables is completely optional
	"var1": val1,
	"var2": val2
}, function( data ) { // This callback function is completely optional
	// Code to execute when the PHP script responds back
});
```

Inside of your ajaxScript.php, you do the following:
- include "path/to/Ajax.php"; // include the PHP library file for Ajax
- Access variables passed to it from the client within $_POST, such as $_POST[ 'var1' ] or $_POST[ 'var2' ]
- Respond with either Ajax::respond( $anyArrayData ) or Ajax::call( $component, $method, $vars );
  - Gotcha: If your ajaxScript.php exits without sending a response, it will just hang

### ServerPush Usage

To get ServerPush to work, first you need to get ServerPushNode.js running inside of nodejs (with socket.io module installed) on the same server as the webserver. Then you need to hook it up to the client document:
``` html
<script src="http://<?= $_SERVER[ 'HTTP_HOST' ] ?>:443/socket.io/socket.io.js"></script>
<script src="http://path/to/ServerPush.js"></script>
```

And you'll need to run some scripts at the end of the document:
``` javascript
ServerPush = new ServerPush( 'http://www.this-domain.com', '/path/where/ServerPushLogin.php/can/be/found/', 443 );

ServerPush.socket.on( 'loggedIn', function() {
	// Execute code on login, if any
});

ServerPush.socket.on( 'disconnect', function() {
	// Execute code on disconnect, if any
});

ServerPush.socket.on( 'userLeftRoom', function( userId, roomId ) {
	// Execute code whenever a user leaves, if any
});
```

From then on, you'll be able to execute ServerPush messages inside of any PHP file anywhere from the system (even from a cron) and the clients will be able to intercept it. You will need to include ServerPush.php: include "path/to/ServerPush.php";

Here are some usage examples:
``` php
ServerPush::addRoomUser( $roomId, $userId );

ServerPush::callForRoom( $roomId, $component, "addParticipant", array( $userId => $username ) );

$roomUserIds = ServerPush::getRoomUsers( $roomId );

ServerPush::removeRoomUser( $roomId, $userId );

ServerPush::callForRoom( $roomId, $component, "newChat", array(
	"userId" => $userId,
	"message" => $message
));
```


## Helpful Tips and Best Practices

- Make good use of the templates found inside of the examples folder. When you want to create a new JSComponent, starting with a template is the quickest way to go and behaves as a guide to prevent mistakes and headaches.

- Very important tip: Make sure that whenever something about the html view needs to change, the data that supports this view also needs to be updated in the object's data properties; and vice versa! It is the job of the js file's controller methods to keep the data model and the view in sync.

- As a convention, an element class in the phtml file should be named in such a way that the <i>purpose</i> or <i>nature</i> of the element is appended to the end of its name
  - State: a block of elements that should be made visible or invisible at different times relative to other states
  - Interface: a block that contains a variety of complicated sets of elements, including displays and controls
  - Controls: a block that contains a set of user controls and labels
  - Container: a div or span that is intended to hold a (often dynamic) number of items
  - Item: a separate set of html elements that gets cloned, modified, and inserted into a Container
  - Textbox: an input box for the user to add text
  - Button: an element for the user to click to perform an action of some sort
  - Text: an ordinary label intended to be read by the user

- Think of phtml component structures as having states
  - Various flags in the data model get turned on and off to switch the component into different states
  - Create all of the HTML states inside of various divs and make them invisible
  - If an element should be visible, it needs to have a data variable in the object's data properties that says it is visible
  - A change to a state's visibility should also trigger the corresponding visibility of the other complimentary states

- If a window.component1 needs to talk to a window.component2, then the name of "component2" should be a value of some variable found somewhere in the data model (object's properties) of window.component1

- It is important to give phtml elements class names instead of ids just in case you want to have multiple instances of the JSComponent on the page at once

- Here's how to explicitly select multiple classes in jQuery: $( '.checkbox1, .checkbox2' )
  - We can also give them a common class and select them like this: $( '.commonClass' )

- All component objects should be explicitly assigned to the document's window so that it is clear where it is attached: window.component

- Keep in mind that you can have multiple elements on the page with the same class, which results from multiple instances of the same JSComponent in separate places on the page. You can still distinguish between them when selecting for them by selecting for its containing element, separated by space, followed by the selector for the class name of the element. For example: ".containerClass .commonClass" selects for the .commonClass element inside of .containerClass even if more than one element exists on the page with ".commonClass" as its class.

How to think about Ajax vs. ServerPush:
  - A normal Ajax call is made to a PHP script, and the script sends back a single response to the Ajax call to end the execution of the script
    - An Ajax call returns a message back to the individual client that invoked the Ajax call
  - A ServerPush call does not end the execution of the script; there may be multiple ServerPush calls throughout the execution of a script
    - A ServerPush call sends the message to everybody in the target room or individually targeted clients by userId
    - A ServerPush call can be made from any PHP script, not just from within Ajax calls, but also cron scripts or API scripts, etc

User room notification paradigm for ServerPush:
  - When a user joins a room, PHP should push all kinds of data for that user to the room so that the clients in that room can have all that data about the new user
  - But when a user leaves a room, PHP does not need to be involved in pushing that information to the clients because there's only 2 things that the clients need to know in this event:
    - roomId of the room that they have left
    - userId of the user that left the room
  - Both of those variables are sent to the clients in the room automatically as part of the serverpush's userLeftRoom broadcast when a user leaves a room. This is done via nodejs directly with no PHP involved.


## Troubleshooting and Gotchas

- An Ajax call will just hang if your PHP script exits without sending a response.

- If you cannot get an object's controllers to work (from anywhere, PHP or elsewhere), you might have neglected to put "return _this;" at the end of the init function.

- A considerable amount of time was spent debugging a problem that turned out to be a missing period in front of the JSComponentClass that was defined inside of the model. Always be attentive to class selectors being defined properly with periods.

- Make sure you utilize the cloneJSComponentClass method found in the JSComponent.js base class. If you attempt to do this manually, you may accidentally find yourself doing something like this: "$( ".ClassName" ).clone();", which may clone this from somewhere else on the page (and not from inside "#JSComponents") if it had already been attached somewhere. This is particularly nasty because it can lead to intermittent errors, where the initial state is messed up in the event that it already exists on the page, but perfectly normal when it does not already exist on the page.


## License

(The MIT License)

Copyright (c) 2012 David Pesta

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
