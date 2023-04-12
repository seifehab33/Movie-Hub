from rest_framework import serializers
from .models import User, Post, Comment,Movie


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'bio','password','profile_pic')

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'user', 'post', 'content', 'created_at','updated_at')
class PostSerializer(serializers.ModelSerializer):
    # comments = CommentSerializer(many=True)
    user = UserSerializer(read_only=True)
    class Meta:
        model = Post
        fields = ('id','user', 'title', 'content')


class MovieSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'image', 'admin_post', 'user']
        read_only_fields = ['id', 'user']