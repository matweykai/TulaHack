from django.contrib import admin
from .models import Category, Good, Service, GoodService, BuyInfo, Order, Customer

admin.site.register(Category)
admin.site.register(Service)
admin.site.register(Good)
admin.site.register(Customer)
admin.site.register(GoodService)

