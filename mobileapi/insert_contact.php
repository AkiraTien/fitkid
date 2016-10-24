<?php
/*
	file:	insert_contact.php
	desc:	Inserts data into mobilecontact database, contact -table
	Fields in table: contactID	lastname	firstname	email	phone	street	city
	POST-data from mobile app
	Returns "OK" when done, "failed" when error
*/
header("access-control-allow-origin: *");
include('db_rekisteri.php');
$error=false;
if(isset($_POST['lastname'])) $lastname=$_POST['lastname']; else $error=true;
if(isset($_POST['firstname'])) $firstname=$_POST['firstname']; else $error=true;
if(isset($_POST['email'])) $email=$_POST['email']; else $error=true;
if(isset($_POST['phone'])) $phone=$_POST['phone']; else $phone='';
if(isset($_POST['street'])) $street=$_POST['street']; else $street='';
if(isset($_POST['city'])) $city=$_POST['city']; else $city='';

if(!$error){
	$sql="insert into contact(lastname,firstname,email,phone,street,city) ";
	$sql.="values('$lastname','$firstname','$email','$phone','$street','$city')";
	if($conn->query($sql)===TRUE){
			//insert was successful!
			echo "OK";
		}else echo "failed to insert";
}else echo "failed with fields";
$conn->close();
?>