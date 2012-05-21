<?php
/*
 * Copyright (c) 2012 David Pesta, https://github.com/DavidPesta/JSComponent
 * This template file is licensed under a MODIFIED MIT License:
 * The intent of this template file is for you to remove this license and replace it with your own.
 * This applies only to template files in this project. All MIT liability disclaimers remain in effect.
 * David Pesta relinquishes copyright over just this file the instant you modify it for your own project.
 */
?>
<!DOCTYPE html>

<html>
	<head>
		<link href="BasicTemplate.css" rel="stylesheet" type="text/css">
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
		<script src="http://<?= $_SERVER[ 'HTTP_HOST' ] . $_SERVER[ 'REQUEST_URI' ] ?>../../JSComponent.js"></script>
		<script src="BasicTemplate.js"></script>
	</head>
	
	<body>
		<div id="JSComponents" style="display: none;">
			<? include "BasicTemplate.phtml" ?>
		</div>
		
		<div id="BasicTemplateInstance"></div>
	</body>
</html>

<script>
	window.BasicTemplateInstance = new BasicTemplate().init( "BasicTemplateInstance" );
</script>
