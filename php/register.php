<?php 

// Connect to database

require 'mysqlconnect.php';
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }


if(isset($_POST['submit'])){

  $email1 = $_POST['email1'];
  $email2 = $_POST['email2'];
  $pass1 = $_POST['pass1'];
  $pass2 = $_POST['pass2'];

  if($email1 == $email2) {
    if($pass1 == $pass2) {
      //All good, carry on.
      $name = mysql_escape_string($_POST['name']);
      $lname = mysql_escape_string($_POST['lname']);
      $uname = mysql_escape_string($_POST['uname']);
      $email1 = mysql_escape_string($email1);
      $email2 = mysql_escape_string($email2);
      $pass1 = mysql_escape_string($pass1);
      $pass2 = mysql_escape_string($pass2);

      $pass1 = md5($pass1);

$sql="INSERT INTO users (name, lname, uname, email, pass) VALUES ('$name','$lname','$uname','$email1','$pass1')" ;

    } else {
      echo "Sorry, your passwords did not match.<br/>";
      exit();
    }

  } else {
    echo "Sorry, your emails did not match.<br/>";
      exit();
  }


} else {
  $form = <<<EOT
  <form action="register.php" method="POST">
  First Name: <input type="text" name="name" /> <br />
  Last Name: <input type="text" name="lname" /> <br />
  Username: <input type="text" name="uname" /> <br />
  Email: <input type="text" name="email1" /> <br />
  Confirm Email: <input type="text" name="email2" /> <br />
  Password: <input type="password" name="pass1" /> <br />
  Confirm Password: <input type="password" name="pass2" /> <br />
  <input type="submit" value="Register" name="submit">
  </form>
EOT;

echo $form;
}




if ($con->query($sql) === TRUE) {
    echo 'Thank you, '.$name.' ,you are successfully registered!';
} else {
    echo "Error: " . $sql . "<br>" . $con->error;
}
mysqli_close($con);

?>