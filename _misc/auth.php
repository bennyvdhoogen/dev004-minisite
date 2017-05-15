<?php
session_start();
include 'keys.php';

if( array_search($_POST['firstname'], $authkeys, true) > -1 ){
  $_SESSION['allowed'] = true;
  echo "Authorised!";
}else {
  $_SESSION['allowed'] = false;
}
?>
