<?php
/*
* Copyright (c) 2012-2013 David Pesta, https://github.com/DavidPesta/JSComponent
* This file is licensed under the MIT License.
* You should have received a copy of the MIT License along with this program.
* If not, see http://www.opensource.org/licenses/mit-license.php
*/
?>
<!DOCTYPE html>

<?php
	$layout = "Layout1";
	
	$pages = [
		"Page1",
		"Page2",
		"Page3"
	];
	
	$rootURI = dirname( $_SERVER[ 'SCRIPT_NAME' ] );
	$initPage = trim( str_replace( $rootURI, "", $_SERVER[ 'REQUEST_URI' ] ), "/" ) ?: "page1";
?>

<html>
	<head>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
		<script src="<?= $rootURI ?>/../../JSComponent.js"></script>
		<script src="<?= $rootURI . "/layouts/$layout/$layout" ?>.js"></script>
		<? foreach( $pages as $page ): ?>
			<script src="<?= $rootURI . "/pages/$page/$page" ?>.js"></script>
		<? endforeach; ?>
	</head>
	<body>
		<div id="JSComponents" style="display: none;">
			<?php
				include "layouts/$layout/$layout.phtml";
				foreach( $pages as $page ) {
					include "pages/$page/$page.phtml";
				}
			?>
		</div>
		
		<div class="sitePages"></div>
	</body>
</html>

<script>
	window.sitePages = new <?= $layout ?>().init( "sitePages", "<?= $rootURI ?>" );
	<? foreach( $pages as $page ): ?>
		window.sitePages.addPage( <?= $page ?>, "<?= strtolower( $page ) ?>" );
	<? endforeach; ?>
	window.sitePages.changePage( "<?= $initPage ?>" );
	
	window.onpopstate = function( event ) {
		if( event.state ) {
			window.sitePages.changePage( event.state, true );
		}
	};
</script>
