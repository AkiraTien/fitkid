<?php
/*
	file:	login_rekisteri.php
	desc:	Username and password with AJAX. Checks them from database
	date:	8.9.2016
	auth:	Yrjö K
*/
header("Access-Control-Allow-Origin: * "); //can be accessed by any source
function clearstring($string){
	//removes unwanted characters
	$string=stripslashes($string);  
	$string=htmlentities($string);	
	$string=strip_tags($string);	
	return $string;
}
if(empty($_POST)) echo "Error";
else{
	include('db_rekisteri.php');
	$username=$_POST["username"];
	$password=$_POST["password"];
	$username=clearstring($username);
	$password=clearstring($password);
	$username=$conn->real_escape_string($username);	
	$sql="SELECT password,username, firstname FROM student WHERE username='$username'";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		$row = $result->fetch_assoc();
		if($password==$row['password']){
			echo $row['username'];
		}else echo "Error";
	}else echo "Error";
	$conn->close();
}
?>
