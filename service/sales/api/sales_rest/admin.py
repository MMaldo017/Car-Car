from django.contrib import admin
from sales_rest.models import Sale, AutomobileVO, Customer, Salesperson
# Register your models here.
admin.site.register(Sale)
admin.site.register(AutomobileVO)
admin.site.register(Customer)
admin.site.register(Salesperson)