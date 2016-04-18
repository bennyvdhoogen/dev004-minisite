<?php
session_start();
if($_SESSION['allowed'] == true){
  header('Location: 3d.php', true);
  exit();
}else{
  header('Location: login.html', true);
  exit();
}
?>
