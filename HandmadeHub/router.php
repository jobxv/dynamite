<?php
// router.php

$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

// Serve static files if they exist
if (file_exists(__DIR__ . $path) && !is_dir(__DIR__ . $path)) {
    return false; // Let PHP serve the file
}

// Route everything else to api/index.php
// But we need to make sure index.php can handle being included from root
chdir(__DIR__ . '/api');
require 'index.php';
