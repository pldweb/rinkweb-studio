<?php

// Vercel serverless function entry point for Laravel

// Set the correct path for Laravel
$_SERVER['SCRIPT_NAME'] = '/index.php';

// Include the Laravel public index file
require __DIR__ . '/../public/index.php';