<?php 

$data = json_decode(file_get_contents("php://input"));
$name = mysql_real_escape_string($data->name);
$id = $data->id;


// Connect to database

$con=mysqli_connect("localhost","root","","angularlist");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$sql="UPDATE freelist SET name='$name' WHERE id='$id'";

if ($con->query($sql) === TRUE) {

  $sql2="SELECT * FROM freelist WHERE id='$id'";
  $result=mysqli_query($con,$sql2);


    while($row =mysqli_fetch_assoc($result))
    {
        $emparray = $row;
    }

   echo json_encode($emparray);
} else {
    echo "Error: " . $sql . "<br>" . $con->error;
}

mysqli_close($con);

?>