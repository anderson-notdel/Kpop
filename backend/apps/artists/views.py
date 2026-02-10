from rest_framework import generics

from .models import ArtistGroup
from .serializers import GroupDetailSerializer, GroupSummarySerializer


class GroupListView(generics.ListAPIView):
    queryset = ArtistGroup.objects.filter(is_active=True)
    serializer_class = GroupSummarySerializer


class GroupDetailView(generics.RetrieveAPIView):
    queryset = ArtistGroup.objects.all()
    serializer_class = GroupDetailSerializer
    lookup_field = "slug"
