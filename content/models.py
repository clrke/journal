import uuid
from django.db import models
from django.contrib.auth.models import User

class JournalEntry(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateField()
    body = models.TextField(max_length=500)
    user = models.ForeignKey(User, models.SET_NULL, null=True)

    def __str__(self):
        return f'{self.user}'

    class Meta:
        verbose_name = 'Journal Entry'
        verbose_name_plural = 'Journal Entries'
