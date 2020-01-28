<!--
=========================================================
 Material Dashboard - v2.1.1
=========================================================

 Product Page: https://www.creative-tim.com/product/material-dashboard
 Copyright 2019 Creative Tim (https://www.creative-tim.com)
 Licensed under MIT (https://github.com/creativetimofficial/material-dashboard/blob/master/LICENSE.md)

 Coded by Creative Tim

=========================================================

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. -->
<?php
include 'db.php';
$db = new MYSQLConnection();
$gelukt = 0;

session_start();
if(!isset($_SESSION['id'])){
    header("Location: http://hhs-teamscan.azurewebsites.net/dashboard/");
    exit();
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (isset($_POST['function'])) {
    switch ($_POST['function']) {
        case 'rol-aanpassen':
            $rows_affected = $db->action_query("UPDATE `gebruikers` SET rol=? WHERE id=?", 'is', array($_POST['rol'], $_POST['userid']));
            if ($rows_affected) {
                $gelukt = 1;
            } else {
                $gelukt = -1;
            }
            break;
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<?php include 'includes/head.html'; ?>

<body class="">
<div class="wrapper ">
    <?php include 'includes/sidebar.html'; ?>
    <div class="main-panel">
        <?php include 'includes/navbar.html'; ?>
        <div class="content">
            <?php if($gelukt == 1) { ?>
                <div class="alert alert-success">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <i class="material-icons">close</i>
                    </button>
                    <span>
                <b> Succes - </b> de wijziging is opgeslagen.</span>
                </div>
            <?php } ?>
            <?php if($gelukt == -1) { ?>
                <div class="alert alert-warning">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <i class="material-icons">close</i>
                    </button>
                    <span>
                <b> Let op - </b> er zijn geen wijzigingen doorgevoerd.</span>
                </div>
            <?php } ?>

            <div class="container-fluid">
                <div class="card">
                    <div class="card-header card-header-primary">
                        <h4 class="card-title ">Gebruikers</h4>
                        <p class="card-category">Overzicht van alle gebruikers en hun rechten.</p>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead class=" text-primary">
                                <tr>
                                    <th>
                                        Voornaam
                                    </th>
                                    <th>
                                        Achternaam
                                    </th>
                                    <th>
                                        Mail
                                    </th>
                                    <th>
                                        Opleiding
                                    </th>
                                    <th>
                                        Faculteit
                                    </th>
                                    <th>
                                        Rol
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php
                                foreach (($db->simple_query("SELECT * FROM `gebruikers`")) as $row) {
                                    ?>
                                    <tr>
                                        <td>
                                            <?php
                                            echo $row['givenName']
                                            ?>
                                        </td>
                                        <td>
                                            <?php
                                            echo $row['surname']
                                            ?>
                                        </td>
                                        <td>
                                            <?php
                                            echo $row['userPrincipalName']
                                            ?>
                                        </td>
                                        <td>
                                            <?php
                                            echo $row['opleiding']
                                            ?>
                                        </td>
                                        <td>
                                            <?php
                                            echo $row['faculteit']
                                            ?>
                                        </td>
                                        <td class="text-primary">
                                            <form method="POST">
                                                <input type="hidden" name="function" value="rol-aanpassen"/>
                                                <input type="hidden" name="userid" value="<?php echo $row['id'] ?>"/>
                                                <select name="rol" class="btn btn-secondary rol" type="button">
                                                    <option value="1" <?php echo (1 == $row['rol']) ? "selected" : ""; ?>>
                                                        Gebruiker
                                                    </option>
                                                    <option value="2" <?php echo (2 == $row['rol']) ? "selected" : ""; ?>>
                                                        Beheerder
                                                    </option>
                                                    <option value="3" <?php echo (3 == $row['rol']) ? "selected" : ""; ?>>
                                                        Admin
                                                    </option>
                                                </select>
                                            </form>
                                        </td>
                                    </tr>
                                    <?php
                                }
                                ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php include 'includes/script.html'; ?>
    </div>
</div>

</body>

</html>
