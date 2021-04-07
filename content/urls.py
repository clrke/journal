from django.urls import path
from .views import ContentList, ContentDetail

app_name = 'blog_api'

urlpatterns = [
    path('journal-entries/', ContentList.as_view(), name='content_list'),
    path('journal-entries/<uuid:pk>/', ContentDetail.as_view(), name='content_detail')
]
