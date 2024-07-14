from rest_framework import generics, permissions
from .models import ImageBookmark
from .serializers import ImageBookmarkSerializer
from rest_framework.response import Response

class ImageBookmarkListCreateAPIView(generics.ListCreateAPIView):
    queryset = ImageBookmark.objects.all()
    serializer_class = ImageBookmarkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        image_id = self.request.data.get('image_id')
        if ImageBookmark.objects.filter(user=user, image_id=image_id).exists():
            return Response({"detail": "Bookmark already exists."}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save(user=user)

    def get_queryset(self):
        return ImageBookmark.objects.filter(user=self.request.user)



class ImageBookmarkDeleteAPIView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, image_id):
        user = request.user
        bookmarks = ImageBookmark.objects.filter(user=user, image_id=image_id)
        if bookmarks.exists():
            bookmarks.delete()
            return Response({"detail": "Bookmarks deleted."})
        return Response({"detail": "No bookmarks found to delete."})