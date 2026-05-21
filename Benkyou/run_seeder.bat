@echo off
cd /d "%~dp0"
php artisan db:seed --class=JLPTN5QuestionsSeeder
pause
