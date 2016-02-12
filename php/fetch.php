<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost","root","","angularlist");

$result = $conn->query("SELECT name, done, avaliable, id FROM freelist");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"name":"'  . $rs["name"] . '",';
    $outp .= '"done":"'   . $rs["done"]        . '",';
    $outp .= '"id":"'   . $rs["id"]        . '",';
    $outp .= '"avaliable":"'. $rs["avaliable"]     . '"}';

}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp);
?>