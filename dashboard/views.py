# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from knotpy import KnotConnection

def index(request):
    credentials = {
        'servername': 'knot04.local',
        'port': 3000,
        'uuid': '2944f1d1-8e9b-4fa2-b6c6-423e69d90000',
        'token': '9c42f59d48bc10d39806646bc8793de9c9de8be5'
    }
    conn = KnotConnection('http', credentials)
    dispositivos_ativos = filter(lambda x: x['online'] == True, conn.myDevices())
    return render(request, 'dashboard/index.html', locals())
