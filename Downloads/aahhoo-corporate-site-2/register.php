<?php ob_start(); ?><!doctype html>
<html class="no-js no-touch"  lang="es">
<head>
    <meta charset="utf-8" />
	<title>REGISTER ASSOCIATE</title>

	<meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

	<meta name="theme-version" content="6.20.0" />
	<meta name="foundation-version" content="6.9.0" />

	
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="robots" content="index, follow" />
		<meta name="generator" content="RapidWeaver" />
		<link rel="apple-touch-icon" sizes="180x180" href="https://aahhoo.com/resources/logo_aahhoo_transparente_150.png" />
<link rel="apple-touch-icon" sizes="167x167" href="https://aahhoo.com/resources/medium.png" />
<link rel="icon" type="image/png" href="https://aahhoo.com/resources/favicon_large.png" sizes="64x64" />
<link rel="icon" type="image/png" href="https://aahhoo.com/resources/favicon_medium.png" sizes="32x32" />
<link rel="apple-touch-icon" sizes="152x152" href="https://aahhoo.com/resources/small.png" />
<link rel="icon" type="image/png" href="https://aahhoo.com/resources/favicon_small.png" sizes="16x16" />

	<meta name="twitter:card" content="summary">
	<meta name="twitter:site" content="@pidasalud">
	<meta name="twitter:creator" content="@pidasalud">
	<meta name="twitter:title" content="REGISTER ASSOCIATE">
	<meta name="twitter:image" content="https://aahhoo.com/resources/vitiligo_kid_banner_2800.jpeg">
	<meta name="twitter:url" content="https://aahhoo.com/register.php">
	<meta property="og:type" content="website">
	<meta property="og:site_name" content="My Website">
	<meta property="og:title" content="REGISTER ASSOCIATE">
	<meta property="og:image" content="https://aahhoo.com/resources/vitiligo_kid_banner_2800.jpeg">
	<meta property="og:url" content="https://aahhoo.com/register.php">

	

	<link rel="stylesheet" type="text/css" media="all" href="rw_common/themes/foundation6/consolidated-8.css?rwcache=767474743" />
		

	<template id="plugin-header">
        		<link rel='stylesheet' type='text/css' media='all' href='rw_common/plugins/stacks/stacks.css?rwcache=767474743' />
		<link rel='stylesheet' type='text/css' media='all' href='register_files/stacks_page_page8.css?rwcache=767474743' />
        <script type='text/javascript' charset='utf-8' src='rw_common/plugins/stacks/jquery-2.2.4.min.js?rwcache=767474743'></script>
        
        
        
		

		<script type='text/javascript' charset='utf-8' src='register_files/stacks_page_page8.js?rwcache=767474743'></script>
        <meta name="formatter" content="Stacks v5.3.0 (6353)" >
		<meta class="stacks 5 stack version" id="com.joeworkman.stacks.sitelok.access" name=" Sitelok Prefix" content="1.2.0">
		<meta class="stacks 5 stack version" id="ws.foundation.styles" name=" Site Styles" content="6.20.0">
		<meta class="stacks 5 stack version" id="ws.foundation.html" name="HTML" content="6.20.0">
		

	</template>

	<script integrity="sha384-L6Plmo9wRdbut7vf9+1Uod3iRjzt/Q3BvxIIr3SGZQlQh47LOxwfUSL/APINqgi7">const pluginHeader=document.getElementById("plugin-header").content.cloneNode(!0),pluginScripts=Array.from(pluginHeader.querySelectorAll("script")).filter((e=>!e.outerHTML.match(/jquery-\d\.\d\.\d\.min\.js/))),pluginStyles=Array.from(pluginHeader.querySelectorAll("link"));!function(){const e="127.0.0.1"===location.hostname,t=e=>e+"?v="+Math.random().toString(36).substring(2,15);pluginScripts.map((r=>(e&&r.hasAttribute("src")&&(r.src=t(r.src)),r)));let r=!1;const n=r=>{if("stylesheet"!==r.rel)return void document.head.appendChild(r);const n=["stacks_page_page"];for(const e of n)if(r.href.match(e))return void document.write(r.outerHTML);e&&(r.href=t(r.href)),r.media="print",r.addEventListener("load",(e=>e.target.media="all"),{once:!0}),document.head.appendChild(r)};for(const e of pluginStyles)"preload"!==e.rel&&(e.href.match("stacks.css")||(e.href.match("fa5pro.css")&&(r=!0),e.href.match("js-fa5pro.css")||!0===r&&e.href.match("font-awesome.min.css")||n(e)));const o=e=>{const t=document.createElement("link");t.rel="preload",t.as="script",t.href=e.src,document.head.appendChild(t)},c=pluginScripts.filter((e=>e.hasAttribute("src")));for(const e of c)o(e)}();</script>

    <link rel="preload" as="script" href="rw_common/themes/foundation6/foundation.js?rwcache=767474743" />
    <link rel="preload" as="script" href="rw_common/themes/foundation6/jquery.min.js?rwcache=767474743" />
    <link rel="preload" as="script" href="rw_common/themes/foundation6/what-input.min.js?rwcache=767474743" />

	
	<!-- 4/27/25 -->
</head>

<body class="antialiased">


<div id='stacks_out_1' class='stacks_top'><div id='stacks_in_1' class=''>
<?php
$sitelokbuffer = ob_get_clean();

$import_contact     = false;
$import_login       = false;
$import_reg         = true;
$import_update      = false;
$import_userfiles   = false;
$custom_installpath = false;
$groupswithaccess = '';

$installpath = $custom_installpath ? '/home/user/public_html/slpw' : 'slpw';

function appendGroupAccess($groups,$add) {
	if (empty($groups)) return $add;
	if (strpos($groups,$add) !== false) return $groups;
	return "$groups,$add";
}


$groupswithaccess="PUBLIC";

if ($import_contact) $groupswithaccess = appendGroupAccess($groupswithaccess,"PUBLIC");
if ($import_reg)     $groupswithaccess = appendGroupAccess($groupswithaccess,"PUBLIC");
if ($import_update)  $groupswithaccess = appendGroupAccess($groupswithaccess,"ALL");

if ($import_login) {
	require_once("$installpath/slloginform.php");
	$groupswithaccess = appendGroupAccess($groupswithaccess,"PUBLIC");
	$loginpage=$slpagename;
	$logoutpage=$slpagename;
	$loginredirect=False;
}
require_once("$installpath/sitelokpw.php");

if ($import_contact) require_once("$installpath/slcontactform.php");
if ($import_update)  require_once("$installpath/slupdateform.php");
if ($import_reg) {
	require_once("$installpath/sitelokregister.php");
	require_once("$installpath/slregisterform.php");
}
if ($import_userfiles) require_once("$installpath/plugin_userfiles/sluserfiles.php");

if (isset($_GET["logout"])) {
	if (function_exists(sl_logout)) { sl_logout(); }
	session_destroy();
	$page = $_SERVER['PHP_SELF'];
	header("Location: $page");
}
ob_start();
echo $sitelokbuffer;
?>







  <link type="text/css" rel="stylesheet" media="all" href="rw_common/plugins/stacks/utility.css?rwcache=767474743" />   <link type="text/css" rel="stylesheet" media="print" onload="this.media='all'" href="rw_common/plugins/stacks/utility-extra.css?rwcache=767474743" />     <div class='slice empty out'><div class='slice empty in'></div></div>  <div class='slice empty out'><div class='slice empty in'></div></div>  <div class='slice empty out'><div class='slice empty in'></div></div>  <div class='slice empty out'><div class='slice empty in'></div></div>   
<?php
require_once("slpw/sitelokregister.php");
require_once("slpw/slregisterform.php");
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Asociado - AAHHOO</title>
    <?php if (function_exists('sl_registerformhead')) sl_registerformhead(230,false); ?>
    <script src="/slref.js?rwcache=767474743"></script>

    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        header {
            background-color: #333;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 40px auto;
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .video-container {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        .video-container video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 10px;
        }
        h1.alt {
            color: #007bff;
            font-size: 30px;
        }
        form {
            display: flex;
            flex-direction: column;
        }
        input[type="text"], input[type="email"], input[type="password"] {
            padding: 10px;
            margin-bottom: 20px;
            border-radius: 5px;
            border: 1px solid #ddd;
            font-size: 16px;
            width: 100%;
            box-sizing: border-box;
        }
        input[type="submit"] {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 18px;
            text-align: center;
        }
        input[type="submit"]:hover {
            background-color: #0056b3;
        }
        footer {
            text-align: center;
            margin-top: 20px;
            color: #777;
        }
    </style>
</head>
<body>

<header>
    <h1 class="alt">Registro de Asociado</h1>
</header>

<div class="container">

    <!-- Video nuevo añadido -->
    <div class="video-container">
        <video controls autoplay muted playsinline>
            <source src="https://aahhoo.com/assets/videos/lpw1-sub.MP4" type="video/mp4">
            Tu navegador no soporta la reproducción de video.
        </video>
    </div>

    <!-- Formulario Sitelok -->
    <?php if (function_exists('sl_registerformbody')) sl_registerformbody(230,false); ?>
</div>

<footer>
    <p>&copy; 2024 AAHHOO Corp. Todos los derechos reservados.</p>
</footer>

</body>
</html>
 
</div></div>



<script async src="rw_common/themes/foundation6/what-input.min.js?rwcache=767474743"></script>
<script src="rw_common/themes/foundation6/jquery.min.js?rwcache=767474743"></script>
<script integrity="sha384-LhLG2dDsbyGi75OY57kTvI/WowYrKuxeYai9iS1yqYwOPQX7qD1lOw0qMBa2Xh/J">for(const o of pluginScripts)document.write(o.outerHTML);</script>
<script integrity="sha384-BFzxG6ij/HP+1InLX57rEA5TpDIb8xIeQFChGPYQ0eoQgHLpXwuEuBi0+G6uxBt+">if("object"==typeof stacks&&"function"==typeof stacks.jQuery)var jQuery=stacks.jQuery,$=jQuery;</script>
<script src="rw_common/themes/foundation6/foundation.js?rwcache=767474743"></script>

<script integrity="sha384-qRDjLKBnurzIEk3LoUNl2PqqiI2LI+34U5RuRRHWvJeEw8XGQWNOea741DzP0/YB">$(document).foundation();</script>
</body>
</html>
