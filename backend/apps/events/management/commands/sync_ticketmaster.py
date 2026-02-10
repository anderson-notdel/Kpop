from django.core.management.base import BaseCommand

from apps.events.services.ticketmaster import sync_events


class Command(BaseCommand):
    help = "Sync K-pop events from Ticketmaster Discovery API"

    def handle(self, *args, **options):
        self.stdout.write("Starting Ticketmaster sync...")
        result = sync_events()
        self.stdout.write(
            self.style.SUCCESS(
                f"Done — created: {result['created']}, "
                f"updated: {result['updated']}, "
                f"errors: {result['errors']}"
            )
        )
