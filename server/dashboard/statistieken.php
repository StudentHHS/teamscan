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
if (!isset($_SESSION['id'])) {
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

<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>

<?php include 'includes/head.html'; ?>

<body class="">
<div class="wrapper ">
    <?php include 'includes/sidebar.html'; ?>
    <div class="main-panel">
        <?php include 'includes/navbar.html'; ?>

        <div class="content">
            <?php if ($gelukt == 1) { ?>
                <div class="alert alert-success">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <i class="material-icons">close</i>
                    </button>
                    <span>
                <b> Succes - </b> de wijziging is opgeslagen.</span>
                </div>
            <?php } ?>
            <?php if ($gelukt == -1) { ?>
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
                    <div class="container">
                        <div class="row">

                            <div class="card col-6">
                                <div class="card-header card-header-primary">
                                    <h4 class="card-title ">HHS</h4>
                                    <p class="card-category">Gemiddelde grootte van teams.</p>
                                </div>

                                <canvas id="averageTeamSize" width="400" height="400"></canvas>
                                <?php
                                foreach ($db->simple_query("SELECT AVG(aantal) as gemiddelde FROM (SELECT COUNT(team_id) as aantal FROM `teams_gebruikers` GROUP BY team_id) MyTable ") as $result3) {
                                    $row3 = $result3['gemiddelde'];
                                }
                                ?>
                                <script>
                                    var ctx = document.getElementById('averageTeamSize').getContext('2d');
                                    var myChart = new Chart(ctx, {
                                        type: 'bar',
                                        data: {
                                            labels: ['Totaal HHS'],
                                            datasets: [{
                                                label: 'Gemiddeld aantal mensen per team',
                                                data: [<?php echo $row3 ?>],
                                                backgroundColor: [
                                                    'rgba(75, 192, 192, 0.2)'
                                                ],
                                                borderColor: [
                                                    'rgba(75, 192, 192, 1)'
                                                ],
                                                borderWidth: 1
                                            }]
                                        },
                                        options: {
                                            scales: {
                                                yAxes: [{
                                                    ticks: {
                                                        beginAtZero: true
                                                    }
                                                }]
                                            }
                                        }
                                    });
                                </script>
                            </div>
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
