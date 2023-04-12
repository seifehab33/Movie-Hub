from django.shortcuts import render
from django.http import JsonResponse,HttpResponseServerError
from django.core.files.storage import FileSystemStorage
from rest_framework import  permissions,generics,status
from django.shortcuts import get_object_or_404
import json
from rest_framework.decorators import api_view
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage

from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from .models import User, Post, Comment,Movie
from .serilaizers import UserSerializer, PostSerializer, CommentSerializer,MovieSerializer

class MovieListView(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def get(self, request, *args, **kwargs):
        movies = self.get_queryset()
        serializer = self.get_serializer(movies, many=True)
        return Response(serializer.data)
class MovieDetailView(generics.RetrieveAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class MovieCreateView(generics.CreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class MovieUpdateView(generics.UpdateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAuthenticated]

class MovieDeleteView(generics.DestroyAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, args, **kwargs):
        movie = get_object_or_404(Movie, pk=kwargs['pk'], user=request.user)
        return self.destroy(request,args, **kwargs)

class AdminMovieListGet(generics.ListAPIView):
    queryset = Movie.objects.filter(admin_post=True)
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAdminUser]


class AdminMovieListCreate(generics.CreateAPIView):
    queryset = Movie.objects.filter(admin_post=True)
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAdminUser]
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    def perform_create(self, serializer):
        serializer.save()

class UserUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save()

class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'message': 'User deleted successfully'})

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data['email']
        password = data['password']
        users = User.objects.filter(email=email,password=password)
        print(users)
        if users.exists():
            user = users.first()
            return JsonResponse({'success': True,"user_id":user.id})
        else:
            return JsonResponse({'success': False, 'error': 'User not found'})
    else:
        return JsonResponse({'success': False, 'error': 'Invalid request method'})

class PostListView(generics.ListAPIView):
    queryset = Post.objects.select_related('user')
    lookup_field = 'pk'
    serializer_class = PostSerializer

    def get_object(self):
        obj = super().get_object()
        if not obj.user:
            raise NotFound('Post does not exist')
        return obj
class PostDeleteView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def delete(self, request, *args, **kwargs):
        user_id = kwargs.get('userid')
        post_id = kwargs.get('postid')
        if not post_id or not user_id:
            return Response({'message': 'Invalid URL parameters'})

        post = get_object_or_404(Post, id=post_id, user__id=user_id)
        post.delete()

        return Response({'message': 'Post deleted successfully'})
class PostCreateView(generics.CreateAPIView):
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        user_id = self.kwargs['user_id']
        user = User.objects.get(pk=user_id)
        post = Post.objects.create(
            user=user,
            title=serializer.validated_data.get('title'),
            content=serializer.validated_data.get('content')    
        )
        serializer = PostSerializer(post)
        return Response(serializer.data)


class PostUpdateView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save()


class CommentListView(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]
class UserCommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    print("error")
    def perform_create(self, serializer):
        user_id = self.kwargs['userid']
        user = User.objects.get(pk=user_id)
        post_id = self.kwargs['postid']
        post= Post.objects.get(pk=post_id)
        print(user)
        comment = Comment.objects.create(
            user=user,
            post=post,
            content=serializer.validated_data.get('content')
        )
        serializer = CommentSerializer(comment)
class CommentUpdateView(generics.UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_update(self, serializer):
        serializer.save()
class CommentdetailView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        post_id = self.kwargs['post']
        return Comment.objects.filter(post=post_id)
class CommentDeleteView(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def delete(self, request, *args, **kwargs):
        comment = self.get_object()
        if comment.user != request.user:
            return Response({'error': 'You are not authorized to delete this comment'})
        comment.delete()
        return Response({'message': 'Comment deleted successfully'})

def save_image(request, userid):
    if request.method == 'POST':
        try:
            user = User.objects.get(id=userid)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User matching query does not exist.'}, status=404)
        profile_pic = request.FILES.get('profile_pic')
        if not profile_pic:
            return JsonResponse({'error': 'Profile pic not provided.'}, status=400)
        filename = default_storage.save(f'profile_pics/{profile_pic.name}', ContentFile(profile_pic.read()))
        user.profile_pic = filename
        user.save()
        return JsonResponse({'success': True, 'url': filename})
    return JsonResponse({'error': 'Invalid request method.'}, status=400)


