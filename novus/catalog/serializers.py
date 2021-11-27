from rest_framework.serializers import ModelSerializer

from catalog.models import Good, Category, Customer, BuyInfo, Order, GoodService


class GoodSerializer(ModelSerializer):
    class Meta:
        model = Good
        fields = '__all__'
        # depth = 2


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category_name']


class UserSerializer(ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class BuySerializer(ModelSerializer):
    class Meta:
        model = BuyInfo
        fields = ['gs', 'count']
        depth = 2


class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
        depth = 2


class GoodServiceSerializer(ModelSerializer):
    class Meta:
        model = GoodService
        fields = '__all__'
        depth = 2