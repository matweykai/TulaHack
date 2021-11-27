from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from catalog.models import Good, Category
from catalog.serialazers import GoodSerializer, CategorySerializer


class GoodView(ModelViewSet):
    queryset = Good.objects.all()
    serializer_class = GoodSerializer


class CategoryView(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# class AllGoodsOfCategory(ModelViewSet):
#     queryset = Good.objects.all()
#     serializer_class = GoodSerializer
#     def get(self, *args, **kwargs):
#         cat_id = kwargs.get('id')
#         queryset = Good.objects.filter(category__id=cat_id)
#         serializer_class = GoodSerializer

