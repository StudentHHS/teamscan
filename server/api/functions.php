<?php
include 'db.php';

/**
 * Teamscan API Functions Class
 */
class APIFunctions {
    private $db;
	private $userid = null;
	private $params;
	private $rights;

	/**
	 * Checks authorization, builds class
	 * 
	 * @param string $token Token from database table gebruikers
	 * @param boolean $msal True: In case of user registration, do not check authorization. False: check authorzation
	 * @param mixed $params The parameters from the HTTP-request
	 * @return void
	 */
    function __construct($token, $msal, $params) {
		$this->db = new MYSQLConnection();
		$this->params = $params;
		if(!$msal) {
			foreach ($this->db->query("SELECT gebruikers.id, teams_gebruikers.team_id, teams_gebruikers.beheerder
			FROM `gebruikers`
			left JOIN teams_gebruikers on gebruikers.userPrincipalName = teams_gebruikers.mail or gebruikers.mail = teams_gebruikers.mail
			where gebruikers.token =?", "s", array($token)) as $row) {
				$this->userid = $row["id"];
				$this->rights['view_team'][]=$row["team_id"];
				if($row["beheerder"]) {
					$this->rights['edit_team'][]=$row["team_id"];
				}
			}
			if($this->userid == null) {
				header("HTTP/1.1 401 Unauthorized");
				echo '{"error":"Wrong token provided"}';
				exit();
			}
		}
    }

    function __destruct() {
    }

	/**
	 * Convert a teamscan id to a team id
	 * 
	 * @param int $teamscan Teamscan ID
	 * @return int Team ID, returns -1 when not found
	 */
	function teamscanToTeam($teamscan) {
		foreach($this->db->query("SELECT team_id FROM `teamscans` where id=?","i",array($teamscan)) as $row) {
			return $row["team_id"];
		}
		return -1;
	}

	/**
	 * Returns teamscan question list. No params.
	 * 
	 * @return string|false  a JSON encoded string on success or FALSE on JSON encoding failure
	 */
    public function invullijst() {
		$result = array();
		foreach ($this->db->simple_query("SELECT * FROM `antwoorden` INNER JOIN dimensies on antwoorden.dimensie_id = dimensies.id ORDER BY dimensies.id, antwoorden.fase_id") as $row) {
			if (!isset($result[$row["categorie"]])) {
				$result[$row["categorie"]] = array();
			}
			$result[$row["categorie"]][] = $row;
		}
		return json_encode($result);
	}

	/**
	 * Returns faculties-studieslist. No params.
	 * 
	 * @return string|false  a JSON encoded string on success or FALSE on JSON encoding failure
	 */
	public function getFaculteitEnOpleiding() {
		function findInData($products, $field, $value) {
			foreach($products as $key => $product) {
			  if ( isset($product[$field])) {
				if ( $product[$field] === $value )
					return $key;
			  } else {
				  return -1;
			  }
			}
			return -1;
		}
		$result = array();
		foreach($this->db->simple_query("SELECT opleidingen.id, opleidingen.naam, opleidingen.faculteit_id, faculteiten.naam as faculteit_naam FROM `opleidingen` right join faculteiten on `faculteit_id`=faculteiten.id") as $row) {
			$where = findInData($result, "naam", $row["faculteit_naam"]);
			if($where >= 0) {
				$result[$where]["opleidingen"][]=$row["naam"];
			} else {
				$result[] =  ["naam"=>$row["faculteit_naam"], "opleidingen"=>($row["naam"]==null?[]:[$row["naam"]])];
			}
		}
		return json_encode($result);
	}

	/**
	 * Custom function for main page. See also getteams().
	 * 
	 * @return string|false  a JSON encoded string on success or FALSE on JSON encoding failure
	 */
	public function menu() {
		return $this->getteams();
	}
	
	/**
	 * Returns all user info of the current user from table gebruikers. No params.
	 * 
	 * @return string|false  a JSON encoded string on success or FALSE on JSON encoding failure
	 */
	public function user() {		
		foreach ($this->db->query("SELECT * FROM `gebruikers` where id=?", "s", array($this->userid)) as $row) {
			$result = $row;
		}
		return json_encode($result??["error"=>"Gebruiker niet gevonden"]);
	}

	/**
	 * Update user in table. 
	 * 
	 * Params:geslacht, opOfObp, contractsoort, locatie, geboortejaar, aanstellingsomvang, startjaarDienst, startjaarOnderwijs, startjaarFunctie.
	 * 
	 * @return string {"status":"OK"} (HTTP 200)
	 */
	public function saveuserinfo() {
		list($opleiding, $faculteit) = explode(" — ", $this->params["opleidingEnFaculteit"]);
		$aanstellingsomvang = str_replace(',', '.', $this->params["aanstellingsomvang"]);
		$rows_affected = $this->db->action_query(
			"UPDATE `gebruikers` SET `opleiding` = ?, `faculteit` = ?, `geslacht` = ?, `opOfObp` = ?, `contractsoort` = ?,
			`locatie` = ?, `geboortejaar` = ?, `aanstellingsomvang` = ?, `startjaarDienst` = ?, `startjaarOnderwijs` = ?, `startjaarFunctie` = ?
			WHERE `gebruikers`.`id` = ?",
			"ssssssidiiis",
			array($opleiding, $faculteit, $this->params["geslacht"], $this->params["opOfObp"], $this->params["contractsoort"], $this->params["locatie"],
			($this->params["geboortejaar"]=="" || $this->params["geboortejaar"]=="null")?NULL:$this->params["geboortejaar"],
			($this->params["aanstellingsomvang"]=="" || $this->params["aanstellingsomvang"]=="null")?NULL:$aanstellingsomvang,
			($this->params["startjaarDienst"]=="" || $this->params["startjaarDienst"]=="null")?NULL:$this->params["startjaarDienst"],
			($this->params["startjaarOnderwijs"]=="" || $this->params["startjaarOnderwijs"]=="null")?NULL:$this->params["startjaarOnderwijs"],
			($this->params["startjaarFunctie"]=="" || $this->params["startjaarFunctie"]=="null")?NULL:$this->params["startjaarFunctie"],
			$this->userid)
		);
		return '{"status":"OK"}';
	}
	
	/**
	 * Creates new team. 
	 * 
	 
	 * 
	 * Params:naam, beschrijving, opleidingEnFaculteit, teamledenstring
	 * 
	 * @return string {"status":"OK"} (HTTP 200) or {"error":...} (HTTP 400)
	 */
	public function createnewteam() {
		if(isset($this->params["opleidingEnFaculteit"])) {
			list($opleiding, $faculteit) = explode(" — ", $this->params["opleidingEnFaculteit"]);
		}
		$teamid = $this->db->insert_query(
			"INSERT INTO `teams` (`naam`, `teamleider`, `beschrijving`, `opleiding`, `faculteit`) VALUES (?, ?, ?, ?, ?)",
			"sssss",
			array($this->params["naam"], $this->userid, $this->params["beschrijving"], $opleiding??NULL, $faculteit??NULL)
		);
		$emails = explode(',', $this->params["teamledenstring"]);
		foreach ($this->db->query(
			"SELECT * FROM `gebruikers` WHERE id=?",
			"s",
			array($this->userid)
		) as $row) {
			$userPrincipalName = $row['userPrincipalName'];
		}
		$emails[] = $userPrincipalName;
		$emails = array_unique($emails);
		$querydata = array();
		$types = "";
		$data = array();

		foreach ($emails as $email) {
			$querydata [] = " (?, ?, ?)";
			$types .= "ssi";
			$data[] = $teamid;
			$data[] = $email;
			$data[] = ($email == $userPrincipalName) ? 1 : 0;
		}
		$query = "INSERT INTO `teams_gebruikers` (`team_id`, `mail`, `beheerder`) VALUES".implode(",", $querydata);
		$rows_affected = $this->db->action_query(
			$query,
			$types,
			$data
		);
		if($rows_affected<1) {
			header("HTTP/1.0 400 Bad Request");
			return '{"error":"Probleem tijdens het opslaan naar database"}';
		}
		return '{"status":"OK"}';
	}

	/**
	 * Returns all teams the current user is part of.
	 * 
	 * @return string|false  a JSON encoded string on success or FALSE on JSON encoding failure. Or {"error":...} (HTTP 404)
	 */
	public function getteams() {
		$element = array();
		foreach ($this->db->query(
			"SELECT teams.*, ts.id as teamscan, ts.start, ts.status,
			EXISTS(SELECT * FROM resultaten WHERE `gebruiker_id` =  gebruikers.id AND teamscan_id = ts.id) as ingevuld,
			EXISTS(SELECT * FROM scores WHERE `gebruiker_id` =  gebruikers.id AND teamscan_id = ts.id) as gescoord
			FROM `teams`
			inner JOIN teams_gebruikers on teams.id = teams_gebruikers.team_id
			inner JOIN gebruikers on gebruikers.userPrincipalName = teams_gebruikers.mail or gebruikers.mail = teams_gebruikers.mail
			left JOIN (
				SELECT ts.*
				FROM teamscans ts
				INNER JOIN
				 (SELECT team_id, MAX(start) AS MaxDateTime FROM teamscans GROUP BY team_id) tsgb 
				ON ts.team_id = tsgb.team_id 
				AND ts.start = tsgb.MaxDateTime
				LIMIT 0,1
				 ) ts on ts.team_id = teams.id
			where gebruikers.id = ?",
			"s",
			array($this->userid)
		  ) as $row) {
			$element[] = $row;
		}
		if(count($element) < 1) {
			header("HTTP/1.0 404 Not Found");
			return '{"error":"Geen teams gevonden."}';
		}
		return json_encode($element);
			
	}

	/**
	 * Returns team info
	 * 
	 * Params:teamid, [teamscan]
	 * 
	 * @return string|false  a JSON encoded string on success or FALSE on JSON encoding failure. Or {"error":...} (HTTP 403/404)
	 */
	public function getteam() {
		if(!in_array($this->params['teamid'], $this->rights["view_team"])) {
			header('HTTP/1.0 403 Forbidden');
			return '{"error":"Geen rechten om dit te doen."}';
		}
		$teamscanid = $this->params['teamscan']??NULL;
		$teamscaninfo = NULL;
		if(!isset($this->params['teamscan'])) {
			foreach ($this->db->query("SELECT * FROM `teamscans` WHERE teamscans.team_id = ? order by teamscans.start desc limit 0,1",
				"i",
				array($this->params['teamid'])
			) as $row) {
				$teamscanid = $row['id'];
				$teamscaninfo = $row;
			}
		} elseif(isset($this->params['teamscan'])) {
			foreach ($this->db->query("SELECT * FROM `teamscans` WHERE teamscans.id = ?",
			"i",
			array($this->params['teamscan'])
		) as $row) {
			$teamscaninfo = $row;
		}
		}
		foreach ($this->db->query("
            SELECT teams.*, teams_gebruikers.beheerder, teamscans.naam as teamscan_naam,
			  EXISTS(SELECT * FROM resultaten WHERE `gebruiker_id` =  gebruikers.id AND teamscan_id = ?) as ingevuld,
			  EXISTS(SELECT * FROM scores WHERE `gebruiker_id` =  gebruikers.id AND teamscan_id = ?) as gescoord
			FROM `teams`
			inner JOIN teams_gebruikers on teams.id = teams_gebruikers.team_id
			inner JOIN gebruikers on gebruikers.userPrincipalName = teams_gebruikers.mail or gebruikers.mail = teams_gebruikers.mail
			left JOIN teamscans on teamscans.team_id = teams.id
			where gebruikers.id = ? and teams.id=? and (? IS NULL OR teamscans.id = ?)",
			"iisiii",
			array($teamscanid, $teamscanid, $this->userid, $this->params['teamid'], $teamscanid, $teamscanid)
		) as $row) {
			$teaminfo = $row;
			$teaminfo["teamscan"]=$teamscanid;
			//left JOIN teamscans on teamscans.team_id = teams.id
		}

		$element = array();
		foreach ($this->db->query(
			"SELECT teams.*,
			 EXISTS(SELECT * FROM resultaten WHERE `gebruiker_id` =  me.id AND teamscan_id = ?) as ingevuld,
			 EXISTS(SELECT * FROM scores WHERE `gebruiker_id` =  me.id AND teamscan_id = ?) as gescoord,
			 teams_gebruikers.beheerder, me.givenName, me.surname, me.userPrincipalName as userPrincipalName, me.mail, CONCAT(tl.givenName, ' ', tl.surname) as leider_naam, tl.userPrincipalName as leider_mail
			FROM `teams`
			inner JOIN teams_gebruikers on teams.id = teams_gebruikers.team_id
			inner JOIN gebruikers me on me.userPrincipalName = teams_gebruikers.mail or me.mail = teams_gebruikers.mail
			inner JOIN gebruikers tl on tl.id = teams.teamleider
			where teams.id = ?
			union
			SELECT teams.*, NULL, NULL, teams_gebruikers.beheerder, NULL, NULL, teams_gebruikers.mail as userPrincipalName, NULL, CONCAT(tl.givenName, ' ', tl.surname) as leider_naam, tl.userPrincipalName as leider_mail
			FROM `teams`
			inner JOIN teams_gebruikers on teams.id = teams_gebruikers.team_id
			inner JOIN gebruikers tl on tl.id = teams.teamleider
			where teams.id = ?
			AND NOT EXISTS (SELECT * FROM gebruikers tg WHERE teams_gebruikers.mail = tg.mail OR teams_gebruikers.mail = tg.userPrincipalName)",
			"iiii",
			array($teamscanid??NULL,$teamscanid??NULL, $this->params['teamid'], $this->params['teamid'])
		  ) as $row) {
			$element[] = $row;
		}
		if(count($element) < 1) {
			header("HTTP/1.0 404 Not Found");
			return '{"error":"Geen teams gevonden."}';
		}

		$this->params["teamscan"]=$teamscanid;
		$indivResult = json_decode($this->getindividualresults());
		return json_encode(["team"=>$teaminfo, "teamscan"=>$teamscaninfo, "leden" => $element, "individueelResultaat" => $indivResult]);
	}

	/**
	 * Change team member to team admin or not. Returns getteam()
	 * 
	 * Params:beheerder (bool), teamid, userPrincipalName, mail
	 * 
	 * @return string|false  a JSON encoded string on success or FALSE on JSON encoding failure.  Or {"error":...} (HTTP 400/403)
	 */
	public function updateteambeheer() {
		if(!in_array($this->params['teamid'], $this->rights["edit_team"])) {
			header('HTTP/1.0 403 Forbidden');
			return '{"error":"Geen rechten om dit te doen."}';
		}
		$rows_affected = $this->db->action_query(
			"UPDATE `teams_gebruikers` SET `beheerder` = ? WHERE `teams_gebruikers`.`team_id` = ? AND (`teams_gebruikers`.`mail` = ? OR `teams_gebruikers`.`mail` = ?)",
			"iiss",
			array($this->params['beheerder'], $this->params['teamid'], $this->params['userPrincipalName'], $this->params['mail'])
		);
		$geenteambeheer = $this->db->query(
			"SELECT * FROM `teams_gebruikers` WHERE `teams_gebruikers`.`team_id` = ? AND `beheerder` = 1",
			"i",
			array($this->params['teamid'])
		);
		$num_rows = mysqli_num_rows($geenteambeheer);
		if($num_rows<1){
			$newteambeheerder = $this->db->action_query(
				"UPDATE `teams_gebruikers` SET `beheerder` = 1 WHERE `mail` IN (SELECT * FROM(SELECT `teams_gebruikers`.`mail` FROM `teams_gebruikers` WHERE `teams_gebruikers`.`team_id` = ? AND `teams_gebruikers`.`mail` IN (SELECT `teams_gebruikers`.`mail` FROM `teams_gebruikers` INNER JOIN `gebruikers` ON `teams_gebruikers`.`mail` = `gebruikers`.`userPrincipalName` OR `teams_gebruikers`.`mail` = `gebruikers`.`mail`) LIMIT 1)`newbeheerder`)",
				"i",
				array($this->params['teamid'])
			);
		}
		if($rows_affected<1) {
			header("HTTP/1.0 400 Bad Request");
			return '{"error":"Probleem tijdens het opslaan naar database"}';
		}
		return $this->getteam();
	}
	
	/**
	 * Returns userinfo
	 * 
	 * Params:mail
	 * 
	 * @param string $mail Can be given by function parameter or by the class variable params. Accepts mail or userPrinipalName
	 * @return string|false  a JSON encoded string on success or FALSE on JSON encoding failure. Or {"error":...} (HTTP 400/404)
	 */
	public function getuseridbymail($mail) {
		if($mail == null) {
			$mail = $this->params["mail"];
		}
		if(!isset($mail)) {
			header("HTTP/1.0 400 Bad Request");
			return '{"error":"Mail parameter not provided."}';
		}
		foreach ($this->db->query("SELECT id,givenName,surname,displayName,userPrincipalName,mail,preferredLanguage FROM `gebruikers` where lower(mail)=lower(?) OR lower(userPrincipalName)=lower(?)", "ss", array($mail,$mail)) as $row) {
			$user = $row;
		}
		if(!isset($user)) {
			header("HTTP/1.0 404 Not Found");
			return '{"error":"Gebruiker niet gevonden."}';
		}
		return json_encode($user);
			
	}

	/**
	 * Returns 'scoren verbeterpunten' list
	 * 
	 * Params:teamscan
	 * 
	 * @return string|false  a JSON encoded string on success or FALSE on JSON encoding failure
	 */
	public function getscoring() {
		if(!in_array($this->teamscanToTeam($this->params['teamscan']), $this->rights["view_team"])) {
			header('HTTP/1.0 403 Forbidden');
			return '{"error":"Geen rechten om dit te doen."}';
		}
		$element = array();
		foreach ($this->db->query(
			"SELECT * FROM resultaten where string=1 and teamscan_id=?",
			"i",
			array($this->params['teamscan'])
		  ) as $row) {
			$element[] = $row;
		}
		return json_encode($element);
	}

	/**
	 * Saves filled teamscan enquete list
	 * 
	 * @return string {"status":"OK"} (HTTP 200) or {"error":...} (HTTP 403/400)
	 */
	public function saveinvullijst() {
		if(!in_array($this->teamscanToTeam($this->params['teamscan']), $this->rights["view_team"])) {
			header('HTTP/1.0 403 Forbidden');
			return '{"error":"Geen rechten om dit te doen."}';
		}
		$types="";
		$data=array();
		foreach ($this->params as $key => $value) {
			if ($key == 'teamscan') continue;
			$querydata [] = " (?, ?, ?, ?, ?, ?)";
			$types .= "iisisi";
			$data[] = $key;
			$data[] = ($key=="feedback") ? NULL : $value;
			$data[] = ($key=="feedback") ? $value : NULL;
			$data[] = ($key=="feedback") ? 1 : 0;
			$data[] = $this->userid;
			$data[] = $this->params["teamscan"];
		}
		$query = "INSERT INTO `resultaten` (`dimensie`, `fase`, `antwoord`, `string`, `gebruiker_id`, `teamscan_id`) VALUES".implode(",", $querydata);
		$rows_affected = $this->db->action_query(
			$query,
			$types,
			$data
		);
		if($rows_affected<1) {
			header("HTTP/1.0 400 Bad Request");
			return '{"error":"Probleem tijdens het opslaan naar database"}';
		}

		foreach ($this->db->query("SELECT count(*) as teamleden,
		(SELECT count(*) FROM `resultaten` where teamscan_id=teamscans.id and dimensie=1) as ingevuld
		FROM `teams_gebruikers` inner join teamscans on teams_gebruikers.team_id = teamscans.team_id WHERE teamscans.id=?","i",array($this->params["teamscan"])) as $row) {
			if($row["teamleden"] == $row["ingevuld"]){
				$rows_affected = $this->db->action_query(
					"UPDATE `teamscans` SET `status` = ?
					WHERE `teamscans`.`id` = ?",
					"si",
					array("scoren", $this->params["teamscan"])
				);
			}
		}

		return '{"status":"OK"}';
	}
	
	/**
	 * Register new user, make access token for teamscan
	 * 
	 * @param string $MSALToken token given by Microsoft
	 * @return string|false  a JSON encoded string on success or FALSE on JSON encoding failure
	 */
	public function userregistration($MSALToken) {
		$ch = curl_init('https://graph.microsoft.com/v1.0/me'); // Initialise cURL
		$authorization = "Authorization: Bearer ".$MSALToken; // Prepare the authorisation token
		curl_setopt($ch, CURLOPT_HTTPHEADER, array( $authorization )); // Inject the token into the header
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); // This will follow any redirects
		$response = curl_exec($ch); // Execute the cURL statement
		curl_close($ch); // Close the cURL connection
		$data = json_decode($response);
		if(isset($data->error))
			return json_encode($data);
		$newtoken = hash('sha512', "accesstokenforhhsteamscan".$data->id.$MSALToken).".".bin2hex(random_bytes(512));
		//return $newtoken;
		$rows_affected = $this->db->action_query(
			"INSERT INTO `gebruikers`
				(`id`, `givenName`, `surname`, `displayName`, `userPrincipalName`, `mail`, `preferredLanguage`, `token`)
				VALUES (?, ?, ?, ?, ?, ?, ?, ?)
				ON DUPLICATE KEY UPDATE
				givenName=VALUES(givenName), surname=VALUES(surname), displayName=VALUES(displayName), userPrincipalName=VALUES(userPrincipalName), mail=VALUES(mail), preferredLanguage=VALUES(preferredLanguage)",
			"ssssssss",
			array($data->id, $data->givenName, $data->surname, $data->displayName, $data->userPrincipalName, $data->mail, $data->preferredLanguage, $newtoken)
		);
		
		foreach ($this->db->query("SELECT * FROM `gebruikers` where id=?", "s", array($data->id)) as $row) {
			$result = $row;
		}
		return json_encode($result??["error"=>"Gebruiker niet gevonden"]);
	}

	/**
	 * Create new teamscan
	 * 
	 * Params:teamscannaam, teamscanstartdatum, teamscaneinddatum, teamscanopenvraageinddatum, teamid
	 * 
	 * @return string {"status":"OK"} (HTTP 200) or {"error":...} (HTTP 403/400)
	 */
	public function addnewteamscan(){
		if(!in_array($this->params['teamId'], $this->rights["edit_team"])) {
			header('HTTP/1.0 403 Forbidden');
			return '{"error":"Geen rechten om dit te doen."}';
		}
		$status = "invullen";
		$rows_affected = $this->db->action_query(
			"INSERT INTO `teamscans` (`naam`, `start`, `eind`, `eindOpenVraag`, `status`, `team_id`) VALUES (?, ?, ?, ?, ?, ?)",
			"sssssi",
			array($this->params["teamscannaam"], $this->params["teamscanstartdatum"], $this->params["teamscaneinddatum"], $this->params["teamscanopenvraageinddatum"], $status, $this->params["teamId"])
		);
		if($rows_affected<1) {
			header("HTTP/1.0 400 Bad Request");
			return '{"error":"Probleem tijdens het opslaan naar database"}';
		}
		return '{"status":"OK"}';
	}

	/**
	 * Get list of teamscans for team
	 * 
	 * Params:teamid
	 * 
	 * @return string|false  a JSON encoded string on success or FALSE on JSON encoding failure. Or {"error":...} (HTTP 403/404)
	 */
	public function getteamscans(){
		if(!in_array($this->params['teamid'], $this->rights["view_team"])) {
			header('HTTP/1.0 403 Forbidden');
			return '{"error":"Geen rechten om dit te doen."}';
		}
		$element = array();
		$teamid = $this->params["teamid"];
		
		foreach ($this->db->query("SELECT * FROM teamscans WHERE team_id = ? order by start desc, eind desc, eindOpenVraag desc, id desc",
		"i",
		array($teamid)) 
		as $row){
			$element[] = $row;
		}
		if(count($element) < 1) {
			header("HTTP/1.0 404 Not Found");
			return '{"error":"Geen teamscans gevonden."}';
		}
		return json_encode($element);
	}

	/**
	 * Change teamscan status
	 * 
	 * Params:teamscanid, status: ('invullen', 'scoren', 'gesloten')
	 * 
	 * @return string {"status":"OK"} (HTTP 200) or {"error":...} (HTTP 403/400)
	 */
	public function updateteamscanstatus(){
		if(!in_array($this->teamscanToTeam($this->params['teamscanid']), $this->rights["edit_team"])) {
			header('HTTP/1.0 403 Forbidden');
			return '{"error":"Geen rechten om dit te doen."}';
		}
		$rows_affected = $this->db->action_query(
			"UPDATE `teamscans` SET `status` = ?
			WHERE `teamscans`.`id` = ?",
			"si",
			array($this->params["status"], $this->params["teamscanid"])
		);
		if($rows_affected < 1) {
			header("HTTP/1.0 400 Bad Request");
			return '{"error":"Probleem tijdens het opslaan naar database"}';
		}
		return '{"status":"OK"}';
	}

	/**
	 * Get team results
	 * 
	 * Params:teamscanid
	 * 
	 * @return string|false  a JSON encoded string on success or FALSE on JSON encoding failure. Or {"error":...} (HTTP 403/404)
	 */
	public function getresults(){
		if(!in_array($this->teamscanToTeam($this->params['teamscanid']), $this->rights["view_team"])) {
			header('HTTP/1.0 403 Forbidden');
			return '{"error":"Geen rechten om dit te doen."}';
		}
		$lijst = array();
		
		foreach ($this->db->query("SELECT dimensie,fase, count(fase) as aantal, dimensies.categorie as dimensie_naam FROM `resultaten` inner join dimensies on dimensies.id = resultaten.dimensie WHERE `teamscan_id`=? and string=0 group by dimensie, fase order by dimensie, fase",
		"i",
		array($this->params['teamscanid'])) 
		as $row){
			if(!isset($lijst[$row['dimensie']])) {
				$totaal=0;
				$lijst[$row['dimensie']]=array();
				$lijst[$row['dimensie']][1]=$row;
				$lijst[$row['dimensie']][2]=$row;
				$lijst[$row['dimensie']][3]=$row;
				$lijst[$row['dimensie']][4]=$row;
				$lijst[$row['dimensie']][1]['aantal']=0;
				$lijst[$row['dimensie']][2]['aantal']=0;
				$lijst[$row['dimensie']][3]['aantal']=0;
				$lijst[$row['dimensie']][4]['aantal']=0;
			}
			$lijst[$row['dimensie']][$row['fase']] = $row;
			$totaal += $row['aantal'];
			$lijst[$row['dimensie']][1]['totaal'] = $totaal;
			$lijst[$row['dimensie']][2]['totaal'] = $totaal;
			$lijst[$row['dimensie']][3]['totaal'] = $totaal;
			$lijst[$row['dimensie']][4]['totaal'] = $totaal;
		}
		if(count($lijst) < 1) {
			header("HTTP/1.0 404 Not Found");
			return '{"error":"Geen resultaten gevonden."}';
		}

		$scoren = array();
		
		foreach ($this->db->query("SELECT r.antwoord, sum(waarde) as aantal, count(scores.gebruiker_id) as deelnemers FROM `scores`
		inner join resultaten r on r.dimensie = 0 and r.gebruiker_id = scores.antwoord_gebruiker_id and r.teamscan_id = scores.teamscan_id
		WHERE scores.teamscan_id=? group by antwoord_gebruiker_id order by aantal desc",
		"i",
		array($this->params['teamscanid'])) 
		as $row){
			$scoren[] = $row;
		}

		$gemiddelde = 0;
		
		foreach ($this->db->query("SELECT avg(fase) as gem_fase FROM `resultaten` WHERE `teamscan_id`=? and string=0",
		"i",
		array($this->params['teamscanid'])) 
		as $row){
			$gemiddelde = round($row['gem_fase'],1);
		}
		return json_encode(["lijst"=>$lijst, "scoren"=>$scoren, "gemiddelde"=>$gemiddelde]);
	}

	/**
	 * Get list of results of enquete of current user
	 * 
	 * Params:teamcan
	 * 
	 * @return string|false  a JSON encoded string on success or FALSE on JSON encoding failure. Or {"error":...} (HTTP 403)
	 */
	public function getindividualresults(){
		$lijst = array();
		if(!isset($this->params['teamscan'])) {
			return null;
		}
		if(!in_array($this->teamscanToTeam($this->params['teamscan']), $this->rights["view_team"])) {
			header('HTTP/1.0 403 Forbidden');
			return '{"error":"Geen rechten om dit te doen."}';
		}
		foreach ($this->db->query("SELECT dimensie,fase, count(fase) as aantal, dimensies.categorie as dimensie_naam, gebruiker_id FROM `resultaten` inner join dimensies on dimensies.id = resultaten.dimensie WHERE `teamscan_id`=? and `gebruiker_id`=? and string=0 group by dimensie, fase order by dimensie, fase",
		"is",
		array($this->params['teamscan'], $this->userid)) 
		as $row){if(!isset($lijst[$row['dimensie']])) {
				$totaal=0;
				$lijst[$row['dimensie']]=array();
				$lijst[$row['dimensie']][1]=$row;
				$lijst[$row['dimensie']][2]=$row;
				$lijst[$row['dimensie']][3]=$row;
				$lijst[$row['dimensie']][4]=$row;
				$lijst[$row['dimensie']][1]['aantal']=0;
				$lijst[$row['dimensie']][2]['aantal']=0;
				$lijst[$row['dimensie']][3]['aantal']=0;
				$lijst[$row['dimensie']][4]['aantal']=0;
			}
			$lijst[$row['dimensie']][$row['fase']] = $row;
			$totaal += $row['aantal'];
			$lijst[$row['dimensie']][1]['totaal'] = $totaal;
			$lijst[$row['dimensie']][2]['totaal'] = $totaal;
			$lijst[$row['dimensie']][3]['totaal'] = $totaal;
			$lijst[$row['dimensie']][4]['totaal'] = $totaal; }
		return json_encode($lijst);
	}

	/**
	 * Removes given team member
	 * 
	 * Params:teamid, userPrincipalName, mail
	 * 
	 * @return string {"status":"OK"} (HTTP 200) or {"error":...} (HTTP 403/400)
	 */
	public function verwijderlid() {
		if(!in_array($this->params["teamid"], $this->rights["edit_team"])) {
			header('HTTP/1.0 403 Forbidden');
			return '{"error":"Geen rechten om dit te doen."}';
		}
		$rows_affected = $this->db->action_query(
			"DELETE FROM `teams_gebruikers` WHERE `teams_gebruikers`.`team_id` = ? AND (`teams_gebruikers`.`mail` = ? OR `teams_gebruikers`.`mail` = ?)",
			"iss",
			array($this->params["teamid"], $this->params["userPrincipalName"], $this->params["mail"])
		);
		if($rows_affected < 1) {
			header("HTTP/1.0 400 Bad Request");
			return '{"error":"Probleem tijdens het opslaan naar database"}';
		}
		return '{"status":"OK"}';
	}

	/**
	 * Adds team member to team
	 * 
	 * Params:teamid, email (references to mail or userPrincipalName)
	 * 
	 * @return string {"status":"OK"} (HTTP 200) or {"error":...} (HTTP 403/400)
	 */
	public function nieuwlid() {
		if(!in_array($this->params["teamid"], $this->rights["edit_team"])) {
			header('HTTP/1.0 403 Forbidden');
			return '{"error":"Geen rechten om dit te doen."}';
		}
		$rows_affected = $this->db->action_query(
			"INSERT INTO `teams_gebruikers` (`team_id`,`mail`, `beheerder`) VALUES (?,?,0)",
			"is",
			array($this->params["teamid"], $this->params["email"])
		);
		if($rows_affected < 1) {
			header("HTTP/1.0 400 Bad Request");
			return '{"error":"Probleem tijdens het opslaan naar database"}';
		}
		return '{"status":"OK"}';
	}

	/**
	 * Remove team
	 * 
	 * Params:teamid
	 * 
	 * @return string {"status":"OK"} (HTTP 200) or {"error":...} (HTTP 403/400)
	 */
	public function verwijderteam() {
		if(!in_array($this->params["teamid"], $this->rights["edit_team"])) {
			header('HTTP/1.0 403 Forbidden');
			return '{"error":"Geen rechten om dit te doen."}';
		}
		$rows_affected = $this->db->action_query(
			"DELETE FROM `teams` WHERE id=?",
			"i",
			array($this->params["teamid"])
		);
		if($rows_affected < 1) {
			header("HTTP/1.0 400 Bad Request");
			return '{"error":"Probleem tijdens het opslaan naar database"}';
		}
		return '{"status":"OK"}';
	}

	/**
	 * Remove teamscan
	 * 
	 * Params:teamscan
	 * 
	 * @return string {"status":"OK"} (HTTP 200) or {"error":...} (HTTP 403/400)
	 */
	public function verwijderteamscan() {
		if(!in_array($this->teamscanToTeam($this->params['teamscan']), $this->rights["edit_team"])) {
			header('HTTP/1.0 403 Forbidden');
			return '{"error":"Geen rechten om dit te doen."}';
		}
		$rows_affected = $this->db->action_query(
			"DELETE FROM `teamscans` WHERE id=?",
			"i",
			array($this->params["teamscan"])
		);
		if($rows_affected < 1) {
			header("HTTP/1.0 400 Bad Request");
			return '{"error":"Probleem tijdens het opslaan naar database"}';
		}
		return '{"status":"OK"}';
	}

	/**
	 * Save results of 'scoren verbeterpunten'
	 * 
	 * Params:teamscan, $userid=$value, $userid=$value, $userid=$value, ... <br />
	 * Params contain the id of each question (the $userid) and the value is the score (1 to 10) that is has given (the $value).
	 * 
	 * @return string {"status":"OK"} (HTTP 200) or {"error":...} (HTTP 403/400)
	 */
	public function addOpenEndedQuestionScore(){
		if(!in_array($this->teamscanToTeam($this->params['teamscan']), $this->rights["view_team"])) {
			header('HTTP/1.0 403 Forbidden');
			return '{"error":"Geen rechten om dit te doen."}';
		}
		$types="";
		$data=array();
		foreach ($this->params as $key => $value) {
			if ($key == 'teamscan') continue;
			$querydata [] = " (?, ?, ?, ?)";
			$types .= "ssii";
			$data[] = $this->userid;
			$data[] = $key;
			$data[] = $this->params["teamscan"];
			$data[] = $value;
		}
		$query = "INSERT INTO `scores` (`gebruiker_id`, `antwoord_gebruiker_id`, `teamscan_id`, `waarde`) VALUES".implode(",", $querydata);
		$rows_affected = $this->db->action_query(
			$query,
			$types,
			$data
		);
		if($rows_affected<1) {
			header("HTTP/1.0 400 Bad Request");
			return '{"error":"Probleem tijdens het opslaan naar database"}';
		}

		foreach ($this->db->query("SELECT count(*) as teamleden,
		(SELECT count(DISTINCT(scores.gebruiker_id)) FROM `scores` where teamscan_id=teamscans.id) as gescoord
		FROM `teams_gebruikers` inner join teamscans on teams_gebruikers.team_id = teamscans.team_id WHERE teamscans.id=?","i",array($this->params["teamscan"])) as $row) {
			if($row["teamleden"] == $row["gescoord"]){
				$rows_affected = $this->db->action_query(
					"UPDATE `teamscans` SET `status` = ?
					WHERE `teamscans`.`id` = ?",
					"si",
					array("gesloten", $this->params["teamscan"])
				);
			}
		}

		return '{"status":"OK"}';

	}
}
?>