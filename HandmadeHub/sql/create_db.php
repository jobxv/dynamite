<?php
$host = 'localhost';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec("CREATE DATABASE IF NOT EXISTS etsy_clone");
    echo "Database 'etsy_clone' created or already exists.\n";
} catch (PDOException $e) {
    die("DB Error: " . $e->getMessage());
}
