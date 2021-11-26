from django.db import models


class Service(models.Model):
    service_name = models.CharField(max_length=25)
    delivery_price = models.FloatField()

    def __str__(self):
        return self.service_name


class Category(models.Model):
    category_name = models.CharField(max_length=25)

    def __str__(self):
        return self.category_name


class Customer(models.Model):
    login_email = models.CharField(max_length=25)
    password = models.CharField(max_length=20)
    user_token = models.CharField(max_length=20)

    def __str__(self):
        return self.login_email


class Good(models.Model):
    name = models.CharField(max_length=25)
    description = models.TextField()
    img_id = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class GoodService(models.Model):
    good = models.ForeignKey(Good, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    price = models.FloatField()
    time = models.IntegerField()

    def __str__(self):
        return f'{self.id}. {self.good} в сервисе {self.service}'


class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    date = models.DateTimeField()

    def __str__(self):
        return f'{self.id}. {self.customer}'


class BuyInfo(models.Model):
    gs = models.ForeignKey(GoodService, on_delete=models.CASCADE)
    count = models.IntegerField()
    order = models.ForeignKey(Order, on_delete=models.CASCADE)



