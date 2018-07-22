# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json

from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def teste(request):
    return Response(json.dumps({
        'teste': 'teste'
    }))