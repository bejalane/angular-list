<?php 

header("Access-Control-Allow-Origin: *");
$data = json_decode(file_get_contents("php://input"));
$uname = mysql_escape_string($data->uname);
$pass = md5(mysql_escape_string($data->pass));

// Connect to database

require 'mysqlconnect.php';
// Check connection
if (mysqli_connect_errno())
  {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }



$sql="SELECT * FROM users WHERE uname='$uname' AND pass='$pass'" ;


	$result=mysqli_query($con,$sql);
  	if (mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){

        $expire = time()+60*60*24*30;//1 month
        setcookie("uid", $row["id"], $expire);

        echo $_COOKIE[$row["id"]];
        exit();
        
      } 		
  		exit();
  	} else {
  		echo 'not';
  		exit();
  	}
mysqli_close($con);

?>