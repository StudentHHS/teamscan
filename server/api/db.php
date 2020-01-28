<?php
//MYSQL Configuration
define('MYSQLHost', "localhost");
define("MYSQLUser", "php");
define("MYSQLPass", "???");
define("MYSQLDatabase", "hhs-teamscan");
define("MYSQLPort", "56875");

class MYSQLConnection {
    private $mysqli;

    function __construct() {
        $this->mysqli = new mysqli(MYSQLHost, MYSQLUser, MYSQLPass, MYSQLDatabase, MYSQLPort);
        if ($this->mysqli->connect_errno) {
            printf("Connect failed: %s\n", $this->mysqli->connect_error);
            exit();
        }
        $this->mysqli->set_charset("utf8");

    }

    function __destruct() {
        $this->mysqli->close();
    }

    public function query($query, $paramtypes, $params) {
        $stmt = $this->mysqli->prepare($query);
        $stmt->bind_param($paramtypes, ...$params);
        $ex = $stmt->execute();
        if ( false===$ex ) {
            die('execute() failed: ' . htmlspecialchars($stmt->error));
        }
        return $stmt->get_result();
    }

    public function simple_query($query) {
        $stmt = $this->mysqli->prepare($query);
        $ex = $stmt->execute();
        if ( false===$ex ) {
            die('execute() failed: ' . htmlspecialchars($stmt->error));
        }
        return $stmt->get_result();
    }

    public function action_query($query, $paramtypes, $params) {
        $stmt = $this->mysqli->prepare($query);
        $stmt->bind_param($paramtypes, ...$params);
        $ex = $stmt->execute();
        if ( false===$ex ) {
            die('execute() failed: ' . htmlspecialchars($stmt->error));
        }
        return $stmt->affected_rows;
    }

    public function insert_query($query, $paramtypes, $params) {
        $stmt = $this->mysqli->prepare($query);
        $stmt->bind_param($paramtypes, ...$params);
        $ex = $stmt->execute();
        if ( false===$ex ) {
            die('execute() failed: ' . htmlspecialchars($stmt->error));
        }
        return $stmt->insert_id;
    }
}
?>