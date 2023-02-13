<?php

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

// Retrieve all rows from the database
$sql = "SELECT * FROM say_something";
$result = mysqli_query($conn, $sql);

// Convert the result into a JSON object
$data = array();
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);

// Close the database connection
mysqli_close($conn);

?>
