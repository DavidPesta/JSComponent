<?php
/*
* Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JSComponent
* Licensed under the MIT License.
* You should have received a copy of the MIT License along with this program.
* If not, see http://www.opensource.org/licenses/mit-license.php
*/
?>
<!DOCTYPE html>

<html>
	<head>
		<link href="AjaxTemplate.css" rel="stylesheet" type="text/css">
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
		<script src="http://<?= $_SERVER[ 'HTTP_HOST' ] . $_SERVER[ 'REQUEST_URI' ] ?>../../Ajax/Ajax.js"></script>
		<script src="http://<?= $_SERVER[ 'HTTP_HOST' ] . $_SERVER[ 'REQUEST_URI' ] ?>../../JSComponent.js"></script>
		<script src="AjaxTemplate.js"></script>
	</head>
	
	<body>
		<div id="JSComponents" style="display: none;">
			<? include "AjaxTemplate.phtml" ?>
		</div>
		
		<div id="AjaxTemplateInstance"></div>
	</body>
</html>

<script>
	window.AjaxTemplateInstance = new AjaxTemplate().init( "AjaxTemplateInstance" );
</script>
