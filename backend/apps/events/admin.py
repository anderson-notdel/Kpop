from django.contrib import admin

from .models import Event


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "city", "date_time", "source", "is_featured")
    list_filter = ("city", "source", "is_featured")
    search_fields = ("title", "city", "venue")
    prepopulated_fields = {"slug": ("title",)}
