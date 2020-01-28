<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Headers: origin, Content-Type, authorization, x-authentication-token, accept, cookie, X-Custom-Header");
header('Content-Type: application/json');
include 'functions.php';

$headers = apache_request_headers();
/*
if (!isset($headers['Authorization'])) {
    echo '{"error":"No authentication provided"}';
    exit();
}
//check if authentication token is provided via bearer authentication method
if (preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
    $auth_token = $matches[1];
}
else {
    echo '{"error":"Wrong authentication method provided"}';
    exit();
}
*/
if (isset($_GET['token'])) {
    $auth_token = $_GET['token'];
} elseif(isset($headers['Authorization'])) {
    if (preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
        $auth_token = $matches[1];
    }
    else {
        echo '{"error":"Wrong authentication method provided"}';
        exit();
    }
} else {
	header("HTTP/1.1 401 Unauthorized");
    echo '{"error":"No authentication token (&token=...) provided"}';
    exit();
}

$msal=false;
if($_GET['function'] == "userregistration") {
	$msal = true;
}
$params = $_GET;
if($_SERVER['REQUEST_METHOD'] == "POST") $params=$_POST;

$api = new APIFunctions($auth_token, $msal, $params);
switch ($_SERVER['REQUEST_METHOD']) {
    case "GET":
        switch ($_GET['function'] ?? "null") {
            //users
            case "user": //returns user information from database
				echo $api->user();
				break;
			case "userregistration":
				echo $api->userregistration($_GET['token']);
				break;
			case "saveuserinfo":
				echo $api->saveuserinfo();
				break;
			case "getuseridbymail":
				echo $api->getuseridbymail(null);
                break;
            //other
            case "invullijst":
				echo $api->invullijst();
				break;
            case "menu":
				echo $api->menu();
                break;
            case "faculteitenopleiding":
                echo $api->getFaculteitEnOpleiding();
                break;
            //teams
            case "getteams":
                echo $api->getteams();
                break;
			case "createnewteam":
				echo $api->createnewteam();
                break;
            case "getteam":
                echo $api->getteam();
                break;
            //teamscans
            case "addnewteamscan":
                echo $api->addnewteamscan();
                break;
            case "getteamscans":
                echo $api->getteamscans();
                break;
            case "scoren":
                echo $api->getscoring();
                break;
            case "getresults":
                echo $api->getresults();
                break;
            case "getindividualresults":
                echo $api->getindividualresults();
                break;
            default:
				header("HTTP/1.0 404 Not Found");
                echo '{"error":"No function provided in request or function is misspelled."}';
        }
        break;
    case "POST":
        switch ($_GET['function'] ?? "null") {
            case "invullijst":
				echo $api->saveinvullijst();
                break;
            case "teambeheerder":
                echo $api->updateteambeheer();
                break;
            case "updateteamscanstatus":
                echo $api->updateteamscanstatus();
                break;
            case "verwijderlid":
                echo $api->verwijderlid();
                break;
            case "nieuwlid":
                echo $api->nieuwlid();
                break;
            case "verwijderteam":
                echo $api->verwijderteam();
                break;
            case "verwijderteamscan":
                echo $api->verwijderteamscan();
                break;
            case "addOpenEndedQuestionScore":
	            echo $api->addOpenEndedQuestionScore();
	                break;
            default:
				header("HTTP/1.0 404 Not Found");
                echo '{"error":"No function provided in request or function is misspelled."}';
        }
        break;
    case "PUT":
		header("HTTP/1.0 404 Not Found");
        echo '{"error":"PUT is not supported"}';
    break;
}
