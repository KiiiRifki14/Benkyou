#!/bin/sh
set -e

PORT=${PORT:-80}
sed -i "s/80/$PORT/g" /etc/apache2/ports.conf /etc/apache2/sites-available/000-default.conf

# Cache configuration
php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

exec apache2-foreground
