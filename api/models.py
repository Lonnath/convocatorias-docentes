from django.db import models
# Create your models here.

class Usuarios(models.Model):
    documento = models.CharField(max_length=16, unique=True)
    nombre = models.CharField(max_length=255)
    apellidos = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255, null=True, blank=True)
    telefono = models.CharField(max_length=255, null=True, blank=True)
    fecha_nacimiento = models.DateField(null=True, blank=True)
    genero = models.CharField(max_length=1, default='m')
    class Meta:
        db_table = 'usuarios'
class Experiencias(models.Model):
    usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    inicio_experiencia = models.DateField()
    fin_experiencia = models.DateField(null=True, blank=True)
    empresa = models.CharField(max_length=255)
    cargo = models.CharField(max_length=255, default="")
    descripcion = models.TextField()
    actual_trabajo = models.IntegerField()
    class Meta:
        db_table = 'experiencias'
class Estudios(models.Model):
    usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    inicio_estudio = models.DateField()
    fin_estudio = models.DateField(null=True, blank=True)
    institucion = models.CharField(max_length=255)
    titulo = models.CharField(max_length=255)
    actual_estudio = models.IntegerField()
    class Meta:
        db_table = 'estudios'
class Cuentas(models.Model):
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=10)
    user = models.ForeignKey(Usuarios, on_delete=models.SET_NULL, null=True, blank=True)
    tipo_usuario = models.IntegerField()
    class Meta:
        db_table = 'cuentas'
class Convocatorias(models.Model):
    cargo = models.CharField(max_length=255)
    area = models.CharField(max_length=255)
    fecha_inicio_inscripcion = models.DateField()
    fecha_max_inscripcion = models.DateField()
    fecha_creacion = models.DateField(null=True, blank=True)
    descripcion = models.TextField(null=True, blank=True)
    estado = models.IntegerField()
    file = models.FileField(upload_to='convocatorias/', null=True, blank=True)
    class Meta:
        db_table = 'convocatorias'
class Postulaciones (models.Model):
    convocatoria = models.ForeignKey(Convocatorias, on_delete=models.CASCADE, null=True, blank=True)
    aspirante = models.ForeignKey(Cuentas, on_delete=models.CASCADE, null=True, blank=True)
    fecha_postulacion = models.DateField()
    estado = models.IntegerField()
    class Meta:
        db_table = 'postulaciones'
