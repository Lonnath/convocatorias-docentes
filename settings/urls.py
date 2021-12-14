"""settings URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from api.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # INTERFACE URLS
    path('Admin', TemplateView.as_view(template_name="index.html")),
    path('Aspirantes', TemplateView.as_view(template_name="index.html")),
    path('CrearConvocatoria', TemplateView.as_view(template_name="index.html")),
    path('RegistrarUsuario', TemplateView.as_view(template_name="index.html")),
    path('RecuperarCuenta', TemplateView.as_view(template_name="index.html")),
    path('', TemplateView.as_view(template_name="index.html")),
    path('VerAspirantes', TemplateView.as_view(template_name="index.html")),
    path('MiPerfilAspirantes', TemplateView.as_view(template_name="index.html")),
    path('MiPerfilAdmin', TemplateView.as_view(template_name="index.html")),
    path('MiPerfilProfesional', TemplateView.as_view(template_name="index.html")),
    path('MiPerfilAcademico', TemplateView.as_view(template_name="index.html")),
    path('VerPostulaciones', TemplateView.as_view(template_name="index.html")),
    # API URLS
    path('api/registrar_usuarios', registrar_usuarios, name='registrar_usuarios'),
    path('api/login', login, name='login'),
    path('api/consultar_convocatorias', consultar_convocatorias, name='consultar_convocatorias'),
    path('api/crear_convocatoria', crear_convocatoria, name='crear_convocatoria'),
    path('api/eliminar_convocatoria', eliminar_convocatoria, name='eliminar_convocatoria'),
    path('api/consultar_aspirantes', consultar_aspirantes, name='consultar_aspirantes'),
    path('api/mi_perfil', mi_perfil, name='mi_perfil'),
    path('api/modificar_usuarios', modificar_usuarios, name='modificar_usuarios'),
    path('api/postular_aspirante', postular_aspirante, name='postular_aspirante'),
    path('api/mis_estudios', mis_estudios, name='mis_estudios'),
    path('api/estudios_usuarios', estudios_usuarios, name='estudios_usuarios'),
    path('api/eliminar_estudio', eliminar_estudio, name='eliminar_estudio'),
    path('api/mis_experiencias', mis_experiencias, name='mis_experiencias'),
    path('api/experiencias_usuarios', experiencias_usuarios, name='experiencias_usuarios'),
    path('api/eliminar_experiencia', eliminar_experiencia, name='eliminar_experiencia'),
    path('api/calificar_aspirante', calificar_aspirante, name='calificar_aspirante'),
    path('api/ver_postulacion', ver_postulacion, name='ver_postulacion'),
]
