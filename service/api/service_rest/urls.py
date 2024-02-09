from django.urls import path
from .views import api_technicians, api_appointments, api_technician, api_appointment_cancel, api_appointment_detail, api_appointment_finish, api_appointment_by_vin

urlpatterns = [
    path('technicians/', api_technicians, name='technicians_list'),
    path('technicians/<int:id>/', api_technician, name='technician_detail'),
    path('appointments/', api_appointments, name='appointments_list'),
    path('appointments/<int:id>/', api_appointment_detail, name='appointment_detail'),
    path('appointments/<int:id>/cancel/', api_appointment_cancel, name='appointment_cancel'),
    path('appointments/<int:id>/finish/', api_appointment_finish, name='appointment_finish'),
     path('appointments/vin/<str:vin>/', api_appointment_by_vin, name='api_appointment_by_vin'),
]
