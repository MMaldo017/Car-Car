from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Technician, Appointment
from .encoders import TechnicianEncoder, AppointmentEncoder
from django.views.decorators.http import require_http_methods
import json

# Create your views here.

@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
            safe=False,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
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

@require_http_methods(["GET", "PUT", "DELETE"])
def api_technician(request, id):
    technician = get_object_or_404(Technician, pk=id)

    if request.method == "GET":
        return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)

    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            for field in ['first_name', 'last_name', 'employee_id']:
                setattr(technician, field, content.get(field, getattr(technician, field)))
            technician.save()
            return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)
        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)

    else:
        technician.delete()
        return JsonResponse({"message": "Technician deleted successfully"})

@require_http_methods(["GET", "POST"])
def api_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
            safe=False,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.get(id=content.pop('technician_id'))
            appointment = Appointment.objects.create(**content, technician=technician)
            return JsonResponse(appointment, encoder=AppointmentEncoder, safe=False)

        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON"}, status=400)
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Technician does not exist"}, status=400)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)

@require_http_methods(["GET", "PUT", "DELETE"])
def api_appointment_detail(request, id):
    try:
        appointment = Appointment.objects.get(pk=id)
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment does not exist"}, status=404)

    if request.method == "GET":
        return JsonResponse(appointment, encoder=AppointmentEncoder, safe=False)

    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            for field, value in content.items():
                if hasattr(appointment, field):
                    setattr(appointment, field, value)
            appointment.save()
            return JsonResponse(appointment, encoder=AppointmentEncoder, safe=False)
        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)

    elif request.method == "DELETE":
        appointment.delete()
        return JsonResponse({"message": "Appointment deleted successfully"})

@require_http_methods(["PUT"])
def api_appointment_cancel(request, id):
    return update_appointment_status(request, id, "canceled")

@require_http_methods(["PUT"])
def api_appointment_finish(request, id):
    return update_appointment_status(request, id, "finished")

def update_appointment_status(request, id, new_status):
    try:
        appointment = Appointment.objects.get(pk=id)
        appointment.status = new_status
        appointment.save()
        return JsonResponse({"message": f"Appointment {new_status}"})
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment does not exist"}, status=404)


@require_http_methods(["GET"])
def api_appointment_by_vin(request, vin):
    try:
        appointment = Appointment.objects.filter(vin=vin)
        return JsonResponse(appointment, encoder=AppointmentEncoder, safe=False)
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment with provided VIN does not exist"}, status=404)
    except Exception as e:
        return JsonResponse({"message": str(e)}, status=400)
