<?php
	//setting database
	define("DB_HOST", "localhost");
	define("DB_USER", "root");
	define("DB_PASS", "");
	define("DB_NAME", "mvc");

	//site
	define("WEB_TITLE", "MVC");
	define("SITE_PATH", "http://localhost/mvc");

	require_once './app/core/app.php';
	require_once './app/core/controller.php';
?>
