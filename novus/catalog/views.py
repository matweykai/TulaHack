from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ViewSet
from math import ceil
import hashlib
from datetime import datetime

from catalog.models import Good, Category, Customer, Order, BuyInfo, GoodService
from catalog.serializers import GoodSerializer, CategorySerializer, GoodServiceSerializer


# checked
class GoodView(ViewSet):

    def list(self, request):
        N = 6
        query_params = self.request.query_params
        page = query_params.get('page')
        goods = Good.objects.all()
        count = len(goods)
        end_page = ceil(count / N)
        if page is None:
            serializer = GoodSerializer(goods, many=True)
            return Response(serializer.data)
        else:
            page = int(page)
            if page > end_page or page == 0:
                return Response([])
            else:
                start = (page - 1) * N
                end = page * N
                serializer = GoodSerializer(goods[start:end], many=True)
                return Response(serializer.data)


# checked
class CategoryView(ViewSet):

    def list(self, request):
        query_params = self.request.query_params
        cat_id = query_params.get('id')
        if not cat_id is None:
            queryset = Good.objects.filter(category__id=cat_id)
            serializer = GoodSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            queryset = Category.objects.all()
            serializer = CategorySerializer(queryset, many=True)
            return Response(serializer.data)


# checked
class AuthorizationView(ViewSet):

    def list(self, request):
        query_params = self.request.query_params
        login = query_params.get('login')
        password = query_params.get('pass')
        if login is None or password is None:
            return Response({'msg': 'None objects'})
        else:
            user = Customer.objects.filter(login_email=login, password=password)
            if len(user) == 0:
                return Response({'msg': 'No user'})
            else:
                return Response(user[0].user_token)


# checked
class RegistrationView(ViewSet):

    def list(self, request):
        query_params = self.request.query_params
        login = query_params.get('login')
        password = query_params.get('pass')
        if login is None or password is None:
            return Response({'msg': 'None objects'})
        else:
            user = Customer.objects.filter(login_email=login)
            if len(user) == 0:
                hash_object = hashlib.sha1((login + password).encode())
                hex_dig = hash_object.hexdigest()
                user = Customer(login_email=login, password=password, user_token=hex_dig)
                user.save()
                return Response(user.user_token)
            else:
                return Response({'msg': 'exist'})


class CartView(ViewSet):
    def list(self, request):
        query_params = self.request.query_params
        gs_id = query_params.get('id')
        user_token = query_params.get('token')

        if user_token is None:
            return Response({'msg': 'None objects'})

        customer = Customer.objects.filter(user_token=user_token)

        if len(customer) == 0:
            return Response({'msg': 'Invalid customer'})
        buys = BuyInfo.objects.filter(order__customer__user_token=user_token, order__status=Order.Status.INPROGRESS)

        if gs_id is None:
            if len(buys) == 0:
                return Response({'msg': 'Empty cart'})
            serializer = GoodServiceSerializer([buy.gs for buy in buys], many=True)
            return Response(serializer.data)

        order = None
        gs = None
        gs = GoodService.objects.filter(pk=gs_id)
        if len(gs) == 0:
            return Response({'msg': 'Invalid id of product'})
        gs = gs[0]
        if len(buys) == 0:
            order = Order(status=Order.Status.INPROGRESS, customer=customer[0], date=datetime.now().date())
            order.save()
        else:
            order = Order.objects.filter(customer__user_token=user_token, status=Order.Status.INPROGRESS).first()
        buy = BuyInfo(gs=gs, order=order, count=1)
        buy.save()
        buys = BuyInfo.objects.filter(order__customer__user_token=user_token, order__status=Order.Status.INPROGRESS)
        serializer = GoodServiceSerializer([buy.gs for buy in buys], many=True)
        return Response(serializer.data)

    def create(self, request):
        mode = request.data.get("mode")
        cart = request.data.get("cart")
        if mode is None or cart is None:
            return Response({'msg': 'None objects'})
        result = list()
        for item in cart:
            gs = GoodSerializer.deserialize(item)
        return Response(result)


class History(ViewSet):
    pass
