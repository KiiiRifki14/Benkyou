<?php
require __DIR__ . '/vendor/autoload.php';

use Illuminate\Database\Capsule\Manager as DB;

$app = require_once __DIR__ . '/bootstrap/app.php';

try {
    // Update all N5 reading questions that are marked as multiple-choice but have context (reading indicator)
    $updated = \App\Models\Question::where('type', 'n5')
        ->where('question_type', 'multiple-choice')
        ->whereNotNull('context')
        ->update(['question_type' => 'reading']);

    echo "✓ Fixed {$updated} reading questions in database!\n";

    // Show summary
    $typeCounts = \App\Models\Question::where('type', 'n5')
        ->groupBy('question_type')
        ->selectRaw('question_type, count(*) as total')
        ->get();

    echo "\nN5 Question Type Summary:\n";
    foreach ($typeCounts as $row) {
        echo "  - {$row->question_type}: {$row->total}\n";
    }

} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    exit(1);
}
?>
