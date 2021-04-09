import subprocess
from django.http import HttpResponse


def load_default_data(request):
    cmd = "python3 manage.py create_default_data"
    loc = subprocess.run(cmd, shell=True, stdout=subprocess.PIPE)
    return HttpResponse(loc.stdout.decode().strip())

