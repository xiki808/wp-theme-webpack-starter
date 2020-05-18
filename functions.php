<?php

if (!class_exists('\Psr4AutoloaderClass')) {
    require_once __DIR__.'/autoload.php';
}

// Load PSR 4 Autoloader class
$loader = new \Psr4AutoloaderClass();

// Add namespaces
$loader->addNamespace('WTS', __DIR__.'/Includes');

// Register namespaces
$loader->register();

// Start the theme
new WTS\Init();
