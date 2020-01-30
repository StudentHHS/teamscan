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

    /**
     * Run a query and return the result table. Works with prepared statements. Accepts variables in SQL as question mark.
     *
     * @param string $query SQL query, should have at least one question mark.
     * @param string $paramtypes Corresponding datatype for each question mark. E.g. "sid" for a string, an integer, and a digit.
     * @param array $params array() including variables which replaces the question marks
     * @return mysqli_result|false Returns a resultset
     */
    public function query(string $query, string $paramtypes, array $params) {
        $stmt = $this->mysqli->prepare($query);
        $stmt->bind_param($paramtypes, ...$params);
        $ex = $stmt->execute();
        if ( false===$ex ) {
            die('execute() failed: ' . htmlspecialchars($stmt->error));
        }
        return $stmt->get_result();
    }

    /**
     * Run a query and return results without using any variables
     * 
     * @param string $query SQL query, should not have question marks.
     * @return mysqli_result|false Returns a resultset
     */
    public function simple_query(string $query) {
        $stmt = $this->mysqli->prepare($query);
        $ex = $stmt->execute();
        if ( false===$ex ) {
            die('execute() failed: ' . htmlspecialchars($stmt->error));
        }
        return $stmt->get_result();
    }

    /**
     * Run a query and return the affected rows. Can be useful for insert and update queries. Works with prepared statements. Accepts variables in SQL as question mark.
     *
     * @param string $query SQL query, should have at least one question mark.
     * @param string $paramtypes Corresponding datatype for each question mark. E.g. "sid" for a string, an integer, and a digit.
     * @param array $params array() including variables which replaces the question marks
     * @return int Affected rows
     */
    public function action_query(string $query, string $paramtypes, array $params) {
        $stmt = $this->mysqli->prepare($query);
        $stmt->bind_param($paramtypes, ...$params);
        $ex = $stmt->execute();
        if ( false===$ex ) {
            die('execute() failed: ' . htmlspecialchars($stmt->error));
        }
        return $stmt->affected_rows;
    }

    /**
     * Run a query and return the created id (primary key). Can be useful for insert queries. Works with prepared statements. Accepts variables in SQL as question mark.
     *
     * @param string $query SQL query, should have at least one question mark.
     * @param string $paramtypes Corresponding datatype for each question mark. E.g. "sid" for a string, an integer, and a digit.
     * @param array $params array() including variables which replaces the question marks
     * @return int Insert ID
     */
    public function insert_query(string $query, string $paramtypes, array $params) {
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