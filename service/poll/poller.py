import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()
# from sales_rest.models import AutomobileVO
# from sales_rest.models import AutomobileVO
# Import models from service_rest, here. Ignore vs-code error hinting
# from service_rest.models import Something


# def get_automobiles():
#     response = requests.get("http://project-beta-inventory-api-1:8000/api/automobiles/")
#     content = json.loads(response.content)
#     print(content)
#     for auto in content["automobiles"]:
#         auto_vo, created = AutomobileVO.objects.update_or_create(
#             vin=auto["vin"],
#             defaults={
#                 'sold': auto["sold"]
#             }
        # )
        # print(f"{'Created' if created else 'Updated'} automobile: {auto_vo.vin}")

def poll():
    while True:
        print('Automobile poller polling for data')
        try:
            get_automobiles()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)

if __name__ == "__main__":
    poll()