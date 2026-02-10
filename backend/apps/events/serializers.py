from rest_framework import serializers

from apps.artists.serializers import GroupSummarySerializer

from .models import Event


class EventSummarySerializer(serializers.ModelSerializer):
    group = GroupSummarySerializer(read_only=True)

    class Meta:
        model = Event
        fields = [
            "id", "title", "slug", "date_time", "venue", "city",
            "image_url", "group", "is_featured",
        ]


class EventDetailSerializer(serializers.ModelSerializer):
    group = GroupSummarySerializer(read_only=True)

    class Meta:
        model = Event
        fields = [
            "id", "title", "slug", "date_time", "venue", "city",
            "state_province", "country", "description", "ticket_url",
            "image_url", "group", "source", "is_featured",
        ]
