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
from django.urls import path, include
from django.views.generic import TemplateView
from api.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # INTERFACE URLS
    path('Admin', TemplateView.as_view(template_name="index.html")),
    path('Postulante', TemplateView.as_view(template_name="index.html")),
    path('CrearConvocatoria', TemplateView.as_view(template_name="index.html")),
    path('RegistrarUsuario', TemplateView.as_view(template_name="index.html")),
    path('RecuperarCuenta', TemplateView.as_view(template_name="index.html")),
    path('', TemplateView.as_view(template_name="index.html")),
    path('VerPostulados', TemplateView.as_view(template_name="index.html")),

    # API URLS

    path('api/registrar_usuarios', registrar_usuarios, name='registrar_usuarios' ),
    path('api/login', login, name='login' ),
    path('api/consultar_convocatorias', consultar_convocatorias, name='consultar_convocatorias' ),
    path('api/crear_convocatoria', crear_convocatoria, name='crear_convocatoria' ),
    path('api/eliminar_convocatoria', eliminar_convocatoria, name='eliminar_convocatoria' ),
]
