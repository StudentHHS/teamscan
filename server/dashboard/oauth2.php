<?php
include 'db.php';
$db = new MYSQLConnection();

session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$ch = curl_init('https://login.microsoftonline.com/common/oauth2/v2.0/token'); // Initialise cURL

curl_setopt($ch, CURLOPT_POST, 1);

curl_setopt($ch, CURLOPT_POSTFIELDS, ['code' => $_GET['code'],

    'client_id' => 'aca21b69-ce31-42fd-a2a8-19c19cfc7812',

    'scope' => 'user.read openid profile',

    'redirect_uri' => 'https://hhs-teamscan.azurewebsites.net/dashboard/oauth2.php',

    'grant_type' => 'authorization_code',

    'client_secret' => 'x4N=Lc7eRb=-84wIdLMGkXTLE:Y/GR2c'

]); // Inject the token into the header

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); // This will follow any redirects

$access_data = json_decode(curl_exec($ch)); // Execute the cURL statement

curl_close($ch); // Close the cURL connection


$ch = curl_init('https://graph.microsoft.com/v1.0/me'); // Initialise cURL

$authorization = "Authorization: Bearer " . $access_data->access_token; // Prepare the authorisation token

curl_setopt($ch, CURLOPT_HTTPHEADER, array($authorization)); // Inject the token into the header

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); // This will follow any redirects

$response = curl_exec($ch); // Execute the cURL statement

curl_close($ch); // Close the cURL connection

echo $response;

$data = json_decode($response);

foreach ($db->query("SELECT * FROM gebruikers WHERE id=?", "s", array($data->id)) as $row) {
    if ($row['rol'] == 3) {
        $_SESSION['id'] = $data->id;
        header("Location: http://hhs-teamscan.azurewebsites.net/dashboard/dashboard.php");
    } else {
        session_abort();
        header("Location: http://hhs-teamscan.azurewebsites.net/dashboard/");
    }
}
?>