<?php
//Dit script verandert automatisch de status van de teamscan naar de volgende fase op de opgegeven einddata. Teambeheerders kunnen de status nog steeds veranderen.

//MYSQL Configuration
define('MYSQLHost', "localhost");
define("MYSQLUser", "php");
define("MYSQLPass", "???");
define("MYSQLDatabase", "hhs-teamscan");
define("MYSQLPort", "56875");

$mysqli = new mysqli(MYSQLHost, MYSQLUser, MYSQLPass, MYSQLDatabase, MYSQLPort);
if ($mysqli->connect_errno) {
	printf("Connect failed: %s\n", $this->mysqli->connect_error);
	exit();
}
$mysqli->set_charset("utf8");

$stmt = $mysqli->prepare("UPDATE `teamscans` set status='scoren' WHERE eind=CURDATE() and status='invullen'");
$ex = $stmt->execute();
if ( false===$ex ) {
	echo 'Query 1 execute() failed: ' . htmlspecialchars($stmt->error).'\n';
}
echo "Query 1 affected rows: ".$stmt->affected_rows.'\n';

$stmt = $mysqli->prepare("UPDATE `teamscans` set status='gesloten' WHERE eindOpenVraag=CURDATE() and status='scoren'");
$ex = $stmt->execute();
if ( false===$ex ) {
	echo 'Query 2 execute() failed: ' . htmlspecialchars($stmt->error).'\n';
}
echo "Query 2 affected rows: ".$stmt->affected_rows.'\n';	
?>
