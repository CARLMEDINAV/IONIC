from .models import *
from rest_framework import serializers



class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model= Usuario
        fields= "__all__"


class EstudiantesSerializer(serializers.ModelSerializer): 
    class Meta:
        model= Estudiantes
        fields= "__all__"