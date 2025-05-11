<?php
// Database configuration
$db_host = 'localhost';
$db_user = 'root';       // Change to your database username
$db_pass = '';           // Change to your database password
$db_name = 'user_auth';  // Change to your database name

// Create database connection
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set character set to utf8mb4
$conn->set_charset("utf8mb4");
