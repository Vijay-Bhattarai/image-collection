from rest_framework import serializers
from .models import ImageBookmark

class ImageBookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageBookmark
        fields = ('id', 'user', 'image_id')
