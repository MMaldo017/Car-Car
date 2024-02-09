from django.db import models

# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=100)
    sold = models.BooleanField()

class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=50)
    vin = models.CharField(max_length=100)
    customer = models.CharField(max_length=100)
    technician = models.ForeignKey(
        Technician,
        on_delete=models.CASCADE,
    )
