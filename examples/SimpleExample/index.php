<?php
/*
* Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JavascriptComponents
* Licensed under the MIT License.
* You should have received a copy of the MIT License along with this program.
* If not, see http://www.opensource.org/licenses/mit-license.php
*/
?>
<!DOCTYPE html>

<html>
	<head>
		<link href="SimpleExample.css" rel="stylesheet" type="text/css">
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
		<script src="http://<?= $_SERVER[ 'HTTP_HOST' ] . $_SERVER[ 'REQUEST_URI' ] ?>../../Component.js"></script>
		<script src="SimpleExample.js"></script>
	</head>
	
	<body>
		<div id="components" style="display: none;">
			<? include "SimpleExample.phtml" ?>
		</div>
		
		<div id="SimpleExampleInstance"></div>
	</body>
</html>

<script>
	window.SimpleExampleInstance = new SimpleExample().init( "SimpleExampleInstance" );
</script>
