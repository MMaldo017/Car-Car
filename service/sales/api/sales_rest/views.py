from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import Salesperson, AutomobileVO, Customer, Sale
from common.json import ModelEncoder
from django.http import JsonResponse
import json
from decimal import Decimal
class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["sold", "vin", "id",]

class SalesPersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
        
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


class SalesEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "price",
        "automobile",
        "salesperson",
        "customer",
    ]
    encoders = {
        "automobile": AutomobileVODetailEncoder(),
        "customer": CustomerEncoder(),
        "salesperson": SalesPersonEncoder()
    }
    def default(self, obj):
        if isinstance(obj, Decimal):
            return str(obj)  # Convert Decimal to string
        return super().default(obj)
    

# Create your views here.



@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": list(salespeople.values())},  
            safe=False,
        )
    else:  # POST
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except json.JSONDecodeError:
            return JsonResponse(
                {"message": "Invalid JSON"},
                status=400,
            )
        except Exception as e:
            return JsonResponse(
                {"message": str(e)},
                status=400,
            )


@require_http_methods(["GET", "POST"])
def api_customer(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customer": list(customer.values())},  
            safe=False,
        )
    else:  # POST
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except json.JSONDecodeError:
            return JsonResponse(
                {"message": "Invalid JSON"},
                status=400,
            )
        except Exception as e:
            return JsonResponse(
                {"message": str(e)},
                status=400,
            )


@require_http_methods(["GET", "POST"])
def api_sale(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(vin=content['automobile'])
            salesperson = Salesperson.objects.get(employee_id=content['salesperson'])
            customer = Customer.objects.get(first_name=content['customer'])
            sale = Sale.objects.create(
                price=content['price'],
                automobile=automobile,
                salesperson=salesperson,
                customer=customer
            )
            return JsonResponse(
                sale,
                encoder=SalesEncoder,
                safe=False)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)