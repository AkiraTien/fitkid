<?php
/*
	file:	db_rekisteri.php		
	desc:	Database connection to db rekisteri
	date:	5.9.2016
	auth:	Yrjö K
*/
$server='localhost';	
$database='fitkid';	
$dbuser='evgenii';		
$dbpassword='fitkid';	

$conn = new mysqli($server,$dbuser,$dbpassword,$database);
if($conn->connect_error){
	die("Db connection failed: ".$conn->connect_error);
}
mysqli_set_charset($conn,"utf8");
?>