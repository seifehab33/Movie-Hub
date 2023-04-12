from django.urls import path

from django.conf import settings
from django.conf.urls.static import static
from .views import (MovieListView, MovieDetailView, MovieCreateView, MovieUpdateView, MovieDeleteView,
                    UserListView, UserCreateView, UserUpdateView, UserDeleteView,
                    PostListView,  PostUpdateView, PostDeleteView,
                    CommentListView,UserCommentCreateView,save_image,CommentUpdateView, CommentdetailView,CommentDeleteView,AdminMovieListGet,AdminMovieListCreate,PostCreateView,login_view)

app_name = 'api'

urlpatterns = [
    # Movies
    path('movies/', MovieListView.as_view(), name='movie-list'),
    path('movies/create/', MovieCreateView.as_view(), name='movie-create'),
    path('movies/<int:pk>/', MovieDetailView.as_view(), name='movie-detail'),
    path('movies/<int:pk>/update/', MovieUpdateView.as_view(), name='movie-update'),
    path('movies/<int:pk>/delete/', MovieDeleteView.as_view(), name='movie-delete'),
    path('admin/movies/', AdminMovieListGet.as_view(), name='admin_movie_list'),
    path('admin/movies/create/', AdminMovieListCreate.as_view(), name='admin_movie_create'),

    # Users
    path('save-image/<int:userid>/', save_image, name='save_image'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/create/', UserCreateView.as_view(), name='user-create'),
    path('users/<int:pk>/update/', UserUpdateView.as_view(), name='user-update'),
    path('users/<int:pk>/delete/', UserDeleteView.as_view(), name='user-delete'),
    path('users/login/', login_view, name='login'),
    # Posts
    path('posts/', PostListView.as_view(), name='post-list'),
    path('posts/create/<int:user_id>', PostCreateView.as_view(), name='post_create'),
    path('posts/<int:pk>/update/', PostUpdateView.as_view(), name='post-update'),
    # path('posts/<int:pk>/delete/', PostDeleteView.as_view(), name='post-delete'),

    # Comments
    path('posts/<int:post>/comments/', CommentdetailView.as_view(), name='post_comments'),
    path('users/<int:userid>/posts/<int:postid>/delete/',PostDeleteView.as_view(),name="post_delete"),
    path('comments/', CommentListView.as_view(), name='comment-list'),
    path('users/<int:userid>/posts/<int:postid>/comments/create/', UserCommentCreateView.as_view(), name='user_comment_create'),
    path('comments/<int:pk>/update/', CommentUpdateView.as_view(), name='comment-update'),
    path('comments/<int:pk>/delete/', CommentDeleteView.as_view(), name='comment-delete'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)