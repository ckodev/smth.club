<?php

//get contents and decode json into object
$id = file_get_contents('php://input');

require_once "dbinfo.php";
$host = DB_HOST;
$username = DB_USER;
$password = DB_PASS;
$dbname = DB_NAME;

// Connect to the database
$conn = mysqli_connect($host, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Delete the row with the corresponding id
$sql = "DELETE FROM say_something WHERE id=$id";

if (mysqli_query($conn, $sql)) {

} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}


// Close the database connection
mysqli_close($conn);

?>


