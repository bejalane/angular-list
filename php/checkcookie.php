<?php

if(isset($_COOKIE['uid'])) {
  echo $_COOKIE['uid'];
} else {
	echo 'continue';
}

?>