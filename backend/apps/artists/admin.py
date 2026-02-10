from django.contrib import admin

from .models import ArtistGroup


@admin.register(ArtistGroup)
class ArtistGroupAdmin(admin.ModelAdmin):
    list_display = ("name", "is_active", "created_at")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}
