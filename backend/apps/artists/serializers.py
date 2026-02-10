from rest_framework import serializers

from .models import ArtistGroup


class GroupSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistGroup
        fields = ["id", "name", "slug", "image_url"]


class GroupDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistGroup
        fields = ["id", "name", "slug", "image_url", "description", "is_active"]
