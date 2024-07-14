# models.py
from django.db import models
from myapp.models import CustomUser

class ImageBookmark(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    image_id = models.CharField(max_length=255) 

    class Meta:
        unique_together = ('user', 'image_id')
