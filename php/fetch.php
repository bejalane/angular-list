<?php

$data = json_decode(file_get_contents("php://input"));
$row = $data->row;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require 'mysqlconnect.php';

$result = $con->query("SELECT name, done, avaliable, id, row FROM freelist WHERE row='$row'");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"name":"'  . $rs["name"] . '",';
    $outp .= '"done":"'   . $rs["done"]        . '",';
    $outp .= '"id":"'   . $rs["id"]        . '",';
    $outp .= '"row":"'   . $rs["row"]        . '",';
    $outp .= '"avaliable":"'. $rs["avaliable"]     . '"}';

}
$outp ='{"records":['.$outp.']}';
$con->close();

echo($outp);
?>