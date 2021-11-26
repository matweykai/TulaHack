# from datetime import timedelta, datetime
# from django.db import models
#
#
# class Product(models.Model):
#     name = models.CharField(max_length=20)
#     price = models.IntegerField(default=10)
#     time = models.IntegerField(default=10)
#     service = models.CharField(max_length=20)
#
#     def __str__(self) -> str:
#         return self.name

from django.db import models


class Author(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()


class Article(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    body = models.TextField()
    author = models.ForeignKey('Author', related_name='articles', on_delete=models.CASCADE)
