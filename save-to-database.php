<?php

//get contents and decode json into object
$json = file_get_contents('php://input');
$data = json_decode($json);

// store object properties in variables
$text = trim($data->text);
$time = strip_tags(trim($data->time));
$color = strip_tags(trim($data->color));

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

// Set the connection charset to UTF-8
mysqli_set_charset($conn, 'utf8');
 // Replace multiple backslashes with a single backslash character
 $text = preg_replace('/\\\\+/', '\\\\', $text);

$text = str_replace(array("\r\n", "\r", "\n", "\"", "'", ";", "%"), array('\n', '\n', '\n', '\"', "\'", '\;', '\%'), $text);


$text = mysqli_real_escape_string($conn, $text);


// Insert text, time and color into the database
$sql = "INSERT INTO say_something (text, time, color) VALUES ('$text', '$time', '$color')";

if (mysqli_query($conn, $sql)) {

     // Get the newly inserted entry from the database
     $sql = "SELECT * FROM say_something ORDER BY time DESC LIMIT 1";
     $result = mysqli_query($conn, $sql);
     if (mysqli_num_rows($result) > 0) {
         $row = mysqli_fetch_assoc($result);
         $id = $row['id'];
         $text = $row['text'];
         $time = $row['time'];
         $color = $row['color'];

         // Replace multiple backslashes with a single backslash character
        $text = preg_replace('/\\\\+/', '\\\\', $text);

        // Decode newline characters, double quotes, single quotes, semicolons, and percent signs
        $text = str_replace(array('\n', '\"', "\'", '\;', '\%', '\n'), array("\n", '"', "'", ';', '%', '<br>'), $text);
         
        

         
         // Encode the result as a JSON object and send it back to the front-end
         $response = array('id' => $id, 'text' => $text, 'time' => $time, 'color' => $color);
         echo json_encode($response);
     }

} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}



// Close the database connection
mysqli_close($conn);


?>