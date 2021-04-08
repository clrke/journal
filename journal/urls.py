from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('content.urls', namespace='journal_content')),
    path('', include(('frontend.urls', 'frontend'), namespace='frontend')),
]
