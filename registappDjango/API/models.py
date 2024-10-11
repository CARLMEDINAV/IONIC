from django.db import models

# Create your models here.

class Usuario(models.Model):
    idusuario= models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45, null=False, blank=False)
    apellido = models.CharField(max_length=45, default='S/A', blank=True)
    correo = models.EmailField(max_length=45, unique=True)
    clave = models.CharField(max_length=128, null=False, blank=False)

    def __str__(self) :
        return self.nombre
    
    
class Estudiantes(models.Model):
    idestudiante= models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45, null=False, blank=False)
    apellido = models.CharField(max_length=45, default='S/A', blank=True)
    correo = models.EmailField(max_length=45, unique=True)
    clave = models.CharField(max_length=128, null=False, blank=False)
    asistencia = models.CharField(max_length=20, blank=True)  
    clases_asistidas = models.PositiveIntegerField(default=0)
    estado = models.CharField(max_length=20, blank=True)  

    def __str__(self) :
        return self.nombre 


