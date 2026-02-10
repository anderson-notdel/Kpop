from django.core.management.base import BaseCommand

from apps.subscribers.services.email import send_new_event_notifications


class Command(BaseCommand):
    help = "Send email notifications about new events to active subscribers"

    def handle(self, *args, **options):
        self.stdout.write("Sending notifications...")
        result = send_new_event_notifications()
        self.stdout.write(
            self.style.SUCCESS(
                f"Done — sent: {result['sent']}, errors: {result['errors']}"
            )
        )
