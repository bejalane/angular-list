<?php 


// Connect to database

require 'mysqlconnect.php';
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$sql="DELETE FROM freelist";

if ($con->query($sql) === TRUE) {
    echo 1;
} else {
    echo "Error: " . $sql . "<br>" . $con->error;
}

mysqli_close($con);

?>