#!/bin/bash
cd "$(dirname "$0")"
php artisan db:seed --class=JLPTN5QuestionsSeeder
