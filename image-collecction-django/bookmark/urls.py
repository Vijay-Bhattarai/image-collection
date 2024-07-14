from django.urls import path
from .views import ImageBookmarkListCreateAPIView
from .views import ImageBookmarkDeleteAPIView


urlpatterns = [
    path('bookmark/', ImageBookmarkListCreateAPIView.as_view(), name='image-bookmark-list-create'),
    path('bookmarks/delete/<str:image_id>/', ImageBookmarkDeleteAPIView.as_view(), name='image-bookmark-delete'),
]
