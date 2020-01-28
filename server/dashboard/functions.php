<?php

include 'db.php';

class DashboardFunctions {
    private $db;
    private $userid;
    private $params;

    function __construct($token, $msal, $params) {
        $this->db = new MYSQLConnection();
        $this->params = $params;
        $userid = null;
        if(!$msal) {
            foreach ($this->db->query("SELECT id FROM `gebruikers` where token=?", "s", array($token)) as $row) {
                $userid = $row["id"];
            }
            if($userid == null) {
                header("HTTP/1.1 401 Unauthorized");
                echo '{"error":"Wrong token provided"}';
                exit();
            }
            $this->userid = $userid;
        }
    }

    function __destruct() {
    }

    public function users() {
        foreach ($this->db->query("SELECT * FROM `gebruikers`", "s", array($this->userid)) as $row) {
            $element[] = $row;
        }
        if(count($element) < 1) {
            header("HTTP/1.0 404 Not Found");
            return '{"error":"Geen gebruikers gevonden."}';
        }
        return json_encode($element);
    }

}
?>