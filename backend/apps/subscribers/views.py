from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Subscriber
from .serializers import (
    SubscriberCreateSerializer,
    SubscriberResponseSerializer,
    UnsubscribeSerializer,
)


@api_view(["POST"])
def subscribe(request):
    serializer = SubscriberCreateSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    subscriber = serializer.save()
    return Response(
        SubscriberResponseSerializer(subscriber).data,
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
def unsubscribe(request):
    serializer = UnsubscribeSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    try:
        subscriber = Subscriber.objects.get(
            id=serializer.validated_data["token"], is_active=True
        )
    except Subscriber.DoesNotExist:
        return Response(
            {"detail": "Invalid or already unsubscribed."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    subscriber.is_active = False
    subscriber.save(update_fields=["is_active"])
    return Response({"detail": "Successfully unsubscribed."})
