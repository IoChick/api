from django.conf.urls import url

from api import views

urlpatterns = [
    url(r'^meus_dispositivos/$', views.meus_dispositivos),
    url(r'^dispositivos_conectados/$', views.dispositivos_conectados),
    url(r'^dispositivos_desconectados/$', views.dispositivos_desconectados),

    url(r'^obter_dados_dispositivo/(?P<device_uuid>[0-9a-f-]+)/$', views.obter_dados_dispositivo),
    url(r'^obter_dados_dispositivo/(?P<device_uuid>[0-9a-f-]+)/(?P<sensor_id>\d+)/$', views.obter_dados_dispositivo),
    url(r'^ativar_atuador/(?P<device_uuid>[0-9a-f-]+)/(?P<sensor_id>\d+)/$', views.ativar_atuador),
    url(r'^desativar_atuador/(?P<device_uuid>[0-9a-f-]+)/(?P<sensor_id>\d+)/$', views.desativar_atuador),
]