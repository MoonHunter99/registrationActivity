<?php
// Database connection
require_once 'db_connection.php';

// Initialize response array
$response = array(
    'status' => 'error',
    'message' => '',
    'errors' => array()
);

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize inputs
    $username = trim(htmlspecialchars($_POST['username']));
    $email = trim(htmlspecialchars($_POST['email']));
    $password = $_POST['password']; // Will be hashed, no need to sanitize
    $firstName = trim(htmlspecialchars($_POST['firstName']));
    $middleName = isset($_POST['middleName']) ? trim(htmlspecialchars($_POST['middleName'])) : '';
    $lastName = trim(htmlspecialchars($_POST['lastName']));
    $suffix = isset($_POST['suffix']) ? trim(htmlspecialchars($_POST['suffix'])) : '';
    $phoneNumber = trim(htmlspecialchars($_POST['phoneNumber']));
    $region = trim(htmlspecialchars($_POST['region']));
    $province = trim(htmlspecialchars($_POST['province']));
    $municipality = trim(htmlspecialchars($_POST['municipality']));
    $barangay = trim(htmlspecialchars($_POST['barangay']));

    // Validate required fields
    $required_fields = array(
        'username' => $username,
        'email' => $email,
        'password' => $password,
        'firstName' => $firstName,
        'lastName' => $lastName,
        'phoneNumber' => $phoneNumber,
        'region' => $region,
        'province' => $province,
        'municipality' => $municipality,
        'barangay' => $barangay
    );

    foreach ($required_fields as $field => $value) {
        if (empty($value)) {
            $response['errors'][$field] = ucfirst($field) . ' is required';
        }
    }

    // Validate email format
    if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['errors']['email'] = 'Invalid email format';
    }

    // Validate username (alphanumeric and underscore only)
    if (!empty($username) && !preg_match('/^[a-zA-Z0-9_]+$/', $username)) {
        $response['errors']['username'] = 'Username can only contain letters, numbers, and underscores';
    }

    // Validate password strength
    if (!empty($password)) {
        if (strlen($password) < 8) {
            $response['errors']['password'] = 'Password must be at least 8 characters long';
        } elseif (!preg_match('/[A-Z]/', $password)) {
            $response['errors']['password'] = 'Password must contain at least one uppercase letter';
        } elseif (!preg_match('/[a-z]/', $password)) {
            $response['errors']['password'] = 'Password must contain at least one lowercase letter';
        } elseif (!preg_match('/[0-9]/', $password)) {
            $response['errors']['password'] = 'Password must contain at least one number';
        } elseif (!preg_match('/[^A-Za-z0-9]/', $password)) {
            $response['errors']['password'] = 'Password must contain at least one special character';
        }
    }

    // Check if username already exists
    if (!empty($username)) {
        $stmt = $conn->prepare("SELECT username FROM users WHERE username = ?");
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            $response['errors']['username'] = 'Username already exists';
        }
        $stmt->close();
    }

    // Check if email already exists
    if (!empty($email)) {
        $stmt = $conn->prepare("SELECT email FROM users WHERE email = ?");
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            $response['errors']['email'] = 'Email already exists';
        }
        $stmt->close();
    }

    // If no errors, proceed with registration
    if (empty($response['errors'])) {
        // Hash password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        
        // Insert user into database
        $stmt = $conn->prepare("INSERT INTO users (username, email, password, first_name, middle_name, last_name, suffix, phone_number, region, province, municipality, barangay, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
        $stmt->bind_param('ssssssssssss', $username, $email, $hashed_password, $firstName, $middleName, $lastName, $suffix, $phoneNumber, $region, $province, $municipality, $barangay);
        
        if ($stmt->execute()) {
            $response['status'] = 'success';
            $response['message'] = 'Registration successful! Redirecting to login page...';
            
            // Wait 2 seconds and redirect to login page
            header("refresh:2;url=login.html");
        } else {
            $response['message'] = 'Registration failed: ' . $stmt->error;
        }
        $stmt->close();
    } else {
        $response['message'] = 'Please fix the errors below';
    }

    // Return JSON response for AJAX requests
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }

    // For non-AJAX requests, store response in session and redirect back to form
    session_start();
    $_SESSION['form_response'] = $response;
    $_SESSION['form_data'] = $_POST;
    
    if ($response['status'] == 'error') {
        header('Location: register.html');
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Status</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        .message-container {
            text-align: center;
            padding: 50px 20px;
        }
        .success-message {
            color: #2ecc71;
            font-size: 18px;
            margin-bottom: 20px;
        }
        .error-message {
            color: #e74c3c;
            font-size: 18px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="form-container message-container">
            <?php
            if (isset($response['status'])) {
                if ($response['status'] == 'success') {
                    echo '<h1>Registration Successful</h1>';
                    echo '<div class="success-message">' . $response['message'] . '</div>';
                    echo '<p>You will be redirected to the login page shortly.</p>';
                } else {
                    echo '<h1>Registration Failed</h1>';
                    echo '<div class="error-message">' . $response['message'] . '</div>';
                    echo '<ul class="error-list">';
                    foreach ($response['errors'] as $error) {
                        echo '<li>' . $error . '</li>';
                    }
                    echo '</ul>';
                    echo '<p><a href="register.html" class="btn">Try Again</a></p>';
                }
            }
            ?>
        </div>
    </div>
</body>
</html>