<?php

header('Content-Type: application/json');

include 'db.php';

$db = new MYSQLConnection();


$headers = apache_request_headers();

if (!isset($headers['Authorization'])) {

   echo "{error:\"No authentication provided\"}";

   exit();

}


//check if authentication token is provided via bearer authentication method

if (preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {

   $auth_token = $matches[1];

} else {

   echo "{error:\"Wrong authentication method provided\"}";

   exit();

}


switch ($_SERVER['REQUEST_METHOD']) {

    case "GET":

        switch ($_GET['function'] ?? "null") {

            case "invullijst":

                $result = array();

                foreach ($db->simple_query("SELECT * FROM `antwoorden` INNER JOIN dimensies on antwoorden.dimensie_id = dimensies.id ORDER BY dimensies.id, antwoorden.fase_id") as $row) {

                    if (!isset($result[$row["categorie"]])) {

                        $result[$row["categorie"]] = array();

                    }

                    $result[$row["categorie"]][] = $row;

                }

                echo json_encode($result);

                break;

            default:

                echo "{error:\"No function provided in request or function is misspelled.\"}";

        }

        break;

    case "POST":

        echo '{error:"POST is not supported yet"}';

        break;

    case "PUT":

        echo '{error:"PUT is not supported"}';

        break;

}


?>