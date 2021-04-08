from django.contrib.admin import ModelAdmin
from django.contrib import admin

from .models import JournalEntry


@admin.register(JournalEntry)
class JournalEntryAdmin(ModelAdmin):
    model = JournalEntry
    fields = ('date', 'body', 'user', 'created_at', 'updated_at',)
    list_display = ('date', 'user', 'body', 'created_at', 'updated_at',)
