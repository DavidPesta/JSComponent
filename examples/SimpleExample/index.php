<?php
/*
* Copyright (c) 2012-2013 David Pesta, https://github.com/DavidPesta/JSComponent
* This file is licensed under the MIT License.
* You should have received a copy of the MIT License along with this program.
* If not, see http://www.opensource.org/licenses/mit-license.php
*/
?>
<!DOCTYPE html>

<html>
	<head>
		<link href="SimpleExample.css" rel="stylesheet" type="text/css">
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
		<script src="//<?= $_SERVER[ 'HTTP_HOST' ] . $_SERVER[ 'REQUEST_URI' ] ?>../../JSComponent.js"></script>
		<script src="SimpleExample.js"></script>
	</head>
	
	<body>
		<div id="JSComponents" style="display: none;">
			<? include "SimpleExample.phtml" ?>
		</div>
		
		<div class="simpleExampleInstance"></div>
	</body>
</html>

<script>
	window.simpleExampleInstance = new SimpleExample().init( "simpleExampleInstance" );
</script>
