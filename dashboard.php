<?php
// Start session
session_start();

// Check if user is logged in
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header('Location: login.html');
    exit;
}

// Include database connection
require_once 'db_connection.php';

// Get user information
$user_id = $_SESSION['user_id'];
$stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
$stmt->bind_param('i', $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Dashboard</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        .dashboard-container {
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            padding: 30px;
            margin-bottom: 30px;
        }
        
        .welcome-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            border-bottom: 1px solid #eee;
            padding-bottom: 20px;
        }
        
        .user-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .info-card {
            background-color: #f9f9f9;
            border-radius: 8px;
            padding: 15px;
            border: 1px solid #eee;
        }
        
        .info-title {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
        }
        
        .info-value {
            font-size: 16px;
            font-weight: 500;
            color: #333;
        }
        
        .logout-btn {
            background-color: #e74c3c;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
        }
        
        .logout-btn:hover {
            background-color: #c0392b;
        }
        
        @media (max-width: 768px) {
            .user-info {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="dashboard-container">
            <div class="welcome-header">
                <h1>Welcome, <?php echo htmlspecialchars($user['first_name']); ?>!</h1>
                <a href="logout.php" class="logout-btn">Logout</a>
            </div>
            
            <h2>Personal Information</h2>
            <div class="user-info">
                <div class="info-card">
                    <div class="info-title">Full Name</div>
                    <div class="info-value">
                        <?php 
                            echo htmlspecialchars($user['first_name']) . ' ' . 
                                 htmlspecialchars($user['middle_name']) . ' ' . 
                                 htmlspecialchars($user['last_name']);
                            
                            if (!empty($user['suffix'])) {
                                echo ' ' . htmlspecialchars($user['suffix']);
                            }
                        ?>
                    </div>
                </div>
                
                <div class="info-card">
                    <div class="info-title">Username</div>
                    <div class="info-value"><?php echo htmlspecialchars($user['username']); ?></div>
                </div>
                
                <div class="info-card">
                    <div class="info-title">Email</div>
                    <div class="info-value"><?php echo htmlspecialchars($user['email']); ?></div>
                </div>
                
                <div class="info-card">
                    <div class="info-title">Phone Number</div>
                    <div class="info-value"><?php echo htmlspecialchars($user['phone_number']); ?></div>
                </div>
            </div>
            
            <h2>Address Information</h2>
            <div class="user-info">
                <div class="info-card">
                    <div class="info-title">Region</div>
                    <div class="info-value"><?php echo htmlspecialchars($user['region']); ?></div>
                </div>
                
                <div class="info-card">
                    <div class="info-title">Province</div>
                    <div class="info-value"><?php echo htmlspecialchars($user['province']); ?></div>
                </div>
                
                <div class="info-card">
                    <div class="info-title">Municipality</div>
                    <div class="info-value"><?php echo htmlspecialchars($user['municipality']); ?></div>
                </div>
                
                <div class="info-card">
                    <div class="info-title">Barangay</div>
                    <div class="info-value"><?php echo htmlspecialchars($user['barangay']); ?></div>
                </div>
            </div>
            
            <h2>Account Information</h2>
            <div class="user-info">
                <div class="info-card">
                    <div class="info-title">Member Since</div>
                    <div class="info-value">
                        <?php 
                            $date = new DateTime($user['created_at']);
                            echo $date->format('F j, Y'); 
                        ?>
                    </div>
                </div>
                
                <div class="info-card">
                    <div class="info-title">Last Login</div>
                    <div class="info-value">
                        <?php 
                            echo isset($user['last_login']) ? (new DateTime($user['last_login']))->format('F j, Y g:i A') : 'Now'; 
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
