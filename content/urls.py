from django.urls import path

from content.views import JournalEntryListAPIView, JournalEntryDetailAPIViewContentDetail

app_name = 'blog_api'

urlpatterns = [
    path('journal-entries/', JournalEntryListAPIView.as_view(), name='content_list'),
    path('journal-entries/<uuid:pk>/', JournalEntryDetailAPIViewContentDetail.as_view(), name='content_detail')
]
