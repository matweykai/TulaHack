from rest_framework.serializers import ModelSerializer

from catalog.models import Good, Category


class GoodSerializer(ModelSerializer):
    class Meta:
        model = Good
        fields = ['name', 'description', 'img_id']


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category_name']
