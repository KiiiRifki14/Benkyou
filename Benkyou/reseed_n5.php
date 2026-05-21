<?php
require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Run the seeder
$seeder = new \Database\Seeders\JLPTN5QuestionsSeeder();
$seeder->setCommand(new \Illuminate\Console\Command());
$seeder->run();

echo "✓ N5 questions reseeded successfully!\n";
?>
