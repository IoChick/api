# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from knotpy import KnotConnection
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def meus_dispositivos(request):
    credentials = {
        'servername': settings.KNOT_SETTINGS.get('URL'),
        'port': settings.KNOT_SETTINGS.get('PORT'),
        'uuid': settings.KNOT_SETTINGS.get('UUID'),
        'token': settings.KNOT_SETTINGS.get('TOKEN')
    }
    conn = KnotConnection('http', credentials)
    return Response(conn.myDevices())


@api_view(['GET'])
def dispositivos_conectados(request):
    credentials = {
        'servername': settings.KNOT_SETTINGS.get('URL'),
        'port': settings.KNOT_SETTINGS.get('PORT'),
        'uuid': settings.KNOT_SETTINGS.get('UUID'),
        'token': settings.KNOT_SETTINGS.get('TOKEN')
    }
    conn = KnotConnection('http', credentials)
    return Response(
        filter(lambda x: x['online'] == True, conn.myDevices())
    )


@api_view(['GET'])
def dispositivos_desconectados(request):
    credentials = {
        'servername': settings.KNOT_SETTINGS.get('URL'),
        'port': settings.KNOT_SETTINGS.get('PORT'),
        'uuid': settings.KNOT_SETTINGS.get('UUID'),
        'token': settings.KNOT_SETTINGS.get('TOKEN')
    }
    conn = KnotConnection('http', credentials)
    return Response(
        filter(lambda x: x['online'] == False, conn.myDevices())
    )


@api_view(['GET'])
def obter_dados_dispositivo(request, device_uuid, sensor_id=None):
    credentials = {
        'servername': settings.KNOT_SETTINGS.get('URL'),
        'port': settings.KNOT_SETTINGS.get('PORT'),
        'uuid': settings.KNOT_SETTINGS.get('UUID'),
        'token': settings.KNOT_SETTINGS.get('TOKEN')
    }
    conn = KnotConnection('http', credentials)

    data = conn.getData(device_uuid, limit=1)

    if not sensor_id:
        return Response(data)
    else:
        return Response(
            filter(lambda x: x['sensor_id'] == sensor_id, data['schema'])
        )


@api_view(['GET'])
def ativar_atuador(request, device_uuid, sensor_id):
    credentials = {
        'servername': settings.KNOT_SETTINGS.get('URL'),
        'port': settings.KNOT_SETTINGS.get('PORT'),
        'uuid': settings.KNOT_SETTINGS.get('UUID'),
        'token': settings.KNOT_SETTINGS.get('TOKEN')
    }
    conn = KnotConnection('http', credentials)
    return Response(conn.setData(device_uuid, sensor_id, True))


@api_view(['GET'])
def desativar_atuador(request, device_uuid, sensor_id):
    credentials = {
        'servername': settings.KNOT_SETTINGS.get('URL'),
        'port': settings.KNOT_SETTINGS.get('PORT'),
        'uuid': settings.KNOT_SETTINGS.get('UUID'),
        'token': settings.KNOT_SETTINGS.get('TOKEN')
    }
    conn = KnotConnection('http', credentials)
    return Response(conn.setData(device_uuid, sensor_id, False))
