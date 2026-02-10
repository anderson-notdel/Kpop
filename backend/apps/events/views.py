from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Event
from .serializers import EventDetailSerializer, EventSummarySerializer


class EventListView(generics.ListAPIView):
    serializer_class = EventSummarySerializer

    def get_queryset(self):
        qs = Event.objects.select_related("group").all()
        city = self.request.query_params.get("city")
        if city:
            qs = qs.filter(city__iexact=city)
        month = self.request.query_params.get("month")
        year = self.request.query_params.get("year")
        if month:
            qs = qs.filter(date_time__month=int(month))
        if year:
            qs = qs.filter(date_time__year=int(year))
        featured = self.request.query_params.get("featured")
        if featured and featured.lower() == "true":
            qs = qs.filter(is_featured=True)
        return qs


class EventDetailView(generics.RetrieveAPIView):
    queryset = Event.objects.select_related("group").all()
    serializer_class = EventDetailSerializer
    lookup_field = "slug"


@api_view(["GET"])
def cities_list(request):
    cities = (
        Event.objects.values_list("city", flat=True)
        .distinct()
        .order_by("city")
    )
    return Response(list(cities))
