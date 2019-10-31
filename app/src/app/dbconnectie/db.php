<?php
//MYSQL Configuration
define('MYSQLHost', "localhost");
define("MYSQLUser", "id11409543_root");
define("MYSQLPass", "Kp6JKaKQ2nhdqiRAye");
define("MYSQLDatabase", "id11409543_teamscan");

class MYSQLConnection {
    private $mysqli;

    function __construct() {
        $this->mysqli = new mysqli(MYSQLHost, MYSQLUser, MYSQLPass, MYSQLDatabase);
        if ($this->mysqli->connect_errno) {
            printf("Connect failed: %s\n", $mysqli->connect_error);
            exit();
        }

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
}
?>