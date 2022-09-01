from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ViewSet
from math import ceil
import hashlib
from datetime import datetime
from .graph import *

from catalog.models import Good, Category, Customer, Order, BuyInfo, GoodService, Service
from catalog.serializers import GoodSerializer, CategorySerializer, GoodServiceSerializer, OrderSerializer, BuySerializer


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
            serializer = BuySerializer(buys, many=True)
            return Response(serializer.data)

        order = None
        gs = None
        gs = GoodService.objects.filter(pk=gs_id)
        if len(gs) == 0:
            return Response({'msg': 'Invalid id of product'})
        gs = gs[0]
        if len(buys) == 0:
            order = Order(status=Order.Status.INPROGRESS, customer=customer[0], date=datetime.now())
            order.save()
        else:
            order = Order.objects.filter(customer__user_token=user_token, status=Order.Status.INPROGRESS).first()
        buy = BuyInfo(gs=gs, order=order, count=1)
        buy.save()
        buys = BuyInfo.objects.filter(order__customer__user_token=user_token, order__status=Order.Status.INPROGRESS)
        serializer = BuySerializer(buys, many=True)
        return Response(serializer.data)


class CartUpdateView(ViewSet):
    def create(self, request):  # что-то не то
        # Params
        query_params = self.request.query_params
        token = query_params.get('token')
        # Check token
        # Post
        mode = request.data.get("mode")
        cart = request.data.get("cart")
        if mode is None or cart is None:
            return Response({'msg': 'None objects'})

        result = list()
        for item in cart:
            old_buy = BuyInfo.objects.filter(pk=item.get("id")).first()
            old_buy.count = item.get("count")
            result.append(old_buy)

        # В зависимости от мода обрабатывать данные и возвращать меняя price

        #return Response(BuySerializer(result, many=True).data)
        result = self.find_min_by_price(result)
        return Response(GoodServiceSerializer(result, many=True).data)

    def find_min_by_price(self, buys_list):

        temp_gs_list = list() # Gs with updated prices
        for buy in buys_list:
            temp_gs = buy.gs
            temp_gs.price *= buy.count
            temp_gs_list.append(temp_gs) # May be bug

        # start_point = Node("start_point")
        # services_list = [Node(str(i.service.id)) for i in temp_gs_list]
        # goods_list = list({Node(str(i.good.id)) for i in temp_gs_list})
        #
        # graph = Graph.create_from_nodes([start_point] + services_list + goods_list)
        #
        # for service in services_list:
        #     graph.connect(service, start_point, GoodService.objects.get(pk=int(service.data)).delivery_price)
        #
        # #for temp_gs in temp_gs_list:

        start_point = Node("start_point")
        # Services and goods should be unique
        services_ids = {t_gs.service.id for t_gs in temp_gs_list}
        goods_ids = {t_gs.good.id for t_gs in temp_gs_list}
        # Creating nodes
        service_nodes_dict = {s_id: Node(s_id) for s_id in services_ids} # We can get service id from node
        good_nodes_dict = {g_id: Node(g_id) for g_id in goods_ids}

        graph = Graph.create_from_nodes([start_point] + list(service_nodes_dict.values()) +
                                        list(good_nodes_dict.values()))

        # Connecting service nodes
        for s_node in service_nodes_dict.values():
            graph.connect(s_node, start_point,
                          GoodService.objects.filter(pk=s_node.data).first().service.delivery_price)
        # Connecting goods nodes
        # Every connection is unique by good_id and service_id
        for t_gs in temp_gs_list:
            # Good, Service
            graph.connect(good_nodes_dict[t_gs.good.id], service_nodes_dict[t_gs.service.id],
                          t_gs.price, t_gs.time)

        graph_result = graph.greedy_zero(start_point, list(good_nodes_dict.values()))

        gs_result = list()

        for price_time in graph_result.keys():
            good_id = graph_result.get(price_time)[2]
            service_id = graph_result.get(price_time)[1]
            gs_result.append(GoodService(good=Good.objects.filter(pk=good_id).first(),
                             service=Service.objects.filter(pk=service_id).first(),
                             price=price_time[0],
                             time=price_time[1]))

        return gs_result




        # Adding dependencies
        # for good_id in goods_id_list:
        #     for temp_gs in temp_gs_list:
        #         if temp_gs.good.id == good_id:
        #             graph.connect(good_id, temp_gs.service.id, temp_gs.price, temp_gs.time)

        # Too much dependecies
        # for temp_gs in temp_gs_list:
        #     graph.connect(Node(str(temp_gs.service.id)), start_point, temp_gs.service.delivery_price)
        #     graph.connect(Node(str(temp_gs.good.id)), Node(str(temp_gs.service.id)), temp_gs.price, temp_gs.time)
        #
        # return graph.greedy_zero(start_point, goods_id_list)



class HistoryView(ViewSet):
    def list(self, request):
        query_params = self.request.query_params
        user_token = query_params.get('token')
        if user_token is None:
            return Response({'msg': 'None objects'})
        orders = Order.objects.filter(customer__user_token=user_token, status=Order.Status.DONE)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class DoneOrderView(ViewSet):
    def list(self, request):
        query_params = self.request.query_params
        user_token = query_params.get('token')
        if user_token is None:
            return Response({'msg': 'None objects'})
        orders = Order.objects.filter(customer__user_token=user_token, status=Order.Status.INPROGRESS)
        for order in orders:
            order.status = Order.Status.DONE
            order.date = datetime.now()
            order.save()
        return Response({'msg': 'Success'})  # Возможна замена на status_code
