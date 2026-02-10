#!/bin/bash
# Run Ticketmaster sync every 2 hours
# Add to crontab: 0 */2 * * * /path/to/cron.sh

set -e
cd "$(dirname "$0")"
python manage.py sync_ticketmaster
