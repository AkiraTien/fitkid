<?php
/*
	File: getContacts.php
	Desc: MySQL query -> JSON
*/
include('db_rekisteri.php');
//create an array
$emparray = array();
//fetch table rows from mysql db
$sql="select * from contact order by lastname, firstname";
$result = $conn->query($sql);
if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
     $emparray[] = $row;  //add each row into the array
	}
} 
$conn->close();

//return JSON
 echo json_encode($emparray);
?>