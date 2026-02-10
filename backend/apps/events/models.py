import uuid

from django.db import models
from django.utils.text import slugify


class Event(models.Model):
    SOURCE_CHOICES = [
        ("manual", "Manual"),
        ("ticketmaster", "Ticketmaster"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=500)
    slug = models.SlugField(max_length=550, unique=True, blank=True)
    description = models.TextField(blank=True, null=True)
    date_time = models.DateTimeField()
    venue = models.CharField(max_length=300)
    city = models.CharField(max_length=100)
    state_province = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=2, default="US")
    ticket_url = models.URLField(max_length=500, blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    group = models.ForeignKey(
        "artists.ArtistGroup",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="events",
    )
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES, default="manual")
    ticketmaster_id = models.CharField(max_length=100, null=True, blank=True, unique=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["date_time"]
        indexes = [
            models.Index(fields=["date_time"], name="idx_event_date_time"),
            models.Index(fields=["city"], name="idx_event_city"),
        ]

    def __str__(self) -> str:
        return f"{self.title} — {self.city} ({self.date_time:%Y-%m-%d})"

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(f"{self.title}-{self.date_time:%Y%m%d}" if self.date_time else self.title)
            self.slug = base[:550]
        super().save(*args, **kwargs)
