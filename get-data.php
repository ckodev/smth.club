<?php
require_once "dbinfo.php";

$host = DB_HOST;
$username = DB_USER;
$password = DB_PASS;
$dbname = DB_NAME;

$conn = mysqli_connect($host, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM say_something";
$result = mysqli_query($conn, $sql);

$data = array();
while ($row = mysqli_fetch_assoc($result)) {
    // Sanitize and validate the text value
    $text = $row['text'];
    $text = preg_replace('/\\\\+/', '\\\\', $text);
    $text = str_replace(array('\r', '\n', '\"', "\'", '\;', '\%'), array('', '<br>', '"', "'", ';', '%'), $text);
    $text = filter_var($text, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);

    // Add the sanitized and validated text value to the result array
    $row['text'] = $text;
    $data[] = $row;
}

// Return the result array as a JSON object
echo json_encode($data);

mysqli_close($conn);
?>

