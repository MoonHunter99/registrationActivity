<?php
// Start session
session_start();

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
    // Get form data
    $username = trim(htmlspecialchars($_POST['username']));
    $password = $_POST['password'];
    $remember = isset($_POST['remember']) ? $_POST['remember'] : 'off';

    // Validate required fields
    if (empty($username)) {
        $response['errors']['username'] = 'Username is required';
    }
    if (empty($password)) {
        $response['errors']['password'] = 'Password is required';
    }

    // If no validation errors, attempt login
    if (empty($response['errors'])) {
        // Check if username is actually an email
        $isEmail = filter_var($username, FILTER_VALIDATE_EMAIL);
        
        if ($isEmail) {
            $stmt = $conn->prepare("SELECT id, username, email, password, first_name, last_name FROM users WHERE email = ?");
        } else {
            $stmt = $conn->prepare("SELECT id, username, email, password, first_name, last_name FROM users WHERE username = ?");
        }
        
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows == 1) {
            $user = $result->fetch_assoc();
            
            // Verify password
            if (password_verify($password, $user['password'])) {
                // Password is correct, start a new session
                session_regenerate_id();
                
                // Store user data in session
                $_SESSION['loggedin'] = true;
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['email'] = $user['email'];
                $_SESSION['name'] = $user['first_name'] . ' ' . $user['last_name'];
                
                // If user wants to be remembered, set cookies
                if ($remember == 'on') {
                    $token = bin2hex(random_bytes(32));
                    $expire = time() + (30 * 24 * 60 * 60); // 30 days
                    
                    // Update remember token in database
                    $updateStmt = $conn->prepare("UPDATE users SET remember_token = ?, token_expires_at = FROM_UNIXTIME(?) WHERE id = ?");
                    $updateStmt->bind_param('sdi', $token, $expire, $user['id']);
                    $updateStmt->execute();
                    $updateStmt->close();
                    
                    // Set cookies
                    setcookie('remember_user', $user['id'], $expire, '/', '', false, true);
                    setcookie('remember_token', $token, $expire, '/', '', false, true);
                }
                
                $response['status'] = 'success';
                $response['message'] = 'Login successful! Redirecting to dashboard...';
                
                // Redirect to dashboard or home page
                header("refresh:1;url=dashboard.php");
            } else {
                $response['message'] = 'Invalid username or password';
            }
        } else {
            $response['message'] = 'Invalid username or password';
        }
        $stmt->close();
    } else {
        $response['message'] = 'Please fill in all required fields';
    }

    // Return JSON response for AJAX requests
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Status</title>
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
                    echo '<h1>Login Successful</h1>';
                    echo '<div class="success-message">' . $response['message'] . '</div>';
                    echo '<p>You will be redirected to the dashboard shortly.</p>';
                } else {
                    echo '<h1>Login Failed</h1>';
                    echo '<div class="error-message">' . $response['message'] . '</div>';
                    echo '<p><a href="login.html" class="btn">Try Again</a></p>';
                }
            } else {
                // Redirect back to login form if accessed directly
                header('Location: login.html');
                exit;
            }
            ?>
        </div>
    </div>
</body>
</html>
