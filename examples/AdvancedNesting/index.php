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
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
		<script src="//<?= $_SERVER[ 'HTTP_HOST' ] . $_SERVER[ 'REQUEST_URI' ] ?>../../Ajax/Ajax.js"></script>
		<script src="//<?= $_SERVER[ 'HTTP_HOST' ] . $_SERVER[ 'REQUEST_URI' ] ?>../../JSComponent.js"></script>
		<script src="Component1/Component1.js"></script>
		<script src="Component2/Component2.js"></script>
		<script src="Component3/Component3.js"></script>
	</head>
	<body>
		<div id="JSComponents" style="display: none;">
			<?php
				include "Component1/Component1.phtml";
				include "Component2/Component2.phtml";
				include "Component3/Component3.phtml";
			?>
		</div>
		
		<div class="advancedNesting"></div>
	</body>
</html>

<script>
	window.advancedNesting = new Component1().init( "advancedNesting", this );
</script>
