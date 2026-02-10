from rest_framework import serializers

from .models import Subscriber


class SubscriberCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = ["email"]

    def create(self, validated_data):
        subscriber, created = Subscriber.objects.get_or_create(
            email=validated_data["email"],
            defaults={"is_active": True},
        )
        if not created and not subscriber.is_active:
            subscriber.is_active = True
            subscriber.save(update_fields=["is_active"])
        return subscriber


class SubscriberResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = ["id", "email", "created_at"]


class UnsubscribeSerializer(serializers.Serializer):
    token = serializers.UUIDField()
