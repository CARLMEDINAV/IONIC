from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .serializers import *
from .models import *


class UsuarioViewSet(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuariosSerializer


class EstudianteViewSet(generics.ListCreateAPIView):
    queryset = Estudiantes.objects.all()
    serializer_class = EstudiantesSerializer


