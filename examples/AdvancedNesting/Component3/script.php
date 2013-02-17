<?php

/*
* Copyright (c) 2012-2013 David Pesta, https://github.com/DavidPesta/JSComponent
* This file is licensed under the MIT License.
* You should have received a copy of the MIT License along with this program.
* If not, see http://www.opensource.org/licenses/mit-license.php
*/

include "../../../Ajax/Ajax.php";

// Retrieve variables passed to this script from the Javascript Ajax call
$component = $_POST[ 'component' ];
$var1 = $_POST[ 'var1' ];
$var2 = $_POST[ 'var2' ];

$response = "The value of var1 is '$var1' and var2 is '$var2'\n\nThe component used in this ajax response is:\n$component";

Ajax::call( $component, "ajaxResponse", array(
	"response" => $response
));
