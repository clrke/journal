from .serializers import JournalEntrySerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny
from .models import JournalEntry


class JournalEntryListAPIView(ListCreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = JournalEntrySerializer
    queryset = JournalEntry.objects.all()


class JournalEntryDetailAPIViewContentDetail(RetrieveUpdateAPIView):
    serializer_class = JournalEntrySerializer
    permission_classes = (AllowAny,)
    queryset = JournalEntry.objects.all()
