from django.urls import path
from .views import api_salespeople, api_customer, api_sale

urlpatterns = [
    path("salespeople/", api_salespeople, name="api_salespeople"),
    path("customers/", api_customer, name="api_customer"),
    path("sales/", api_sale, name="api_sale"),
]