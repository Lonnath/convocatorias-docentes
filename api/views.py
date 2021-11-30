from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from api.models import *
import datetime
import json

@csrf_exempt
def registrar_usuarios(request):
    try:
        jd = json.loads(request.body)
        if jd:
            documento= jd['documento'] if 'documento' in jd else None
            nombre= jd['nombre'] if 'nombre' in jd else None
            apellidos= jd['apellidos'] if 'apellidos' in jd else None
            direccion= jd['direccion'] if 'direccion' in jd else None
            telefono= jd['telefono'] if 'telefono' in jd else None
            fecha_nacimiento= jd['fecha_nacimiento'] if 'fecha_nacimiento' in jd else None
            genero= jd['genero'] if 'genero' in jd else None
            email= jd['email'] if 'email' in jd else None
            password=jd['password'] if 'password' in jd else None
            if not documento or not nombre or not email or not apellidos or not password:
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
            usuario = Usuarios(documento=documento, nombre=nombre, direccion = direccion, telefono = telefono, fecha_nacimiento = fecha_nacimiento, genero = genero)
            cuenta = Cuentas(email=email.lower(), password=password, tipo_usuario=2, user=usuario)
            usuario.save()
            cuenta.save()
            return JsonResponse({'CODE':1, 'MESSAGE':'Se ha registrado exitosamente en el portal, será redireccionado a la pagina principal en un momento.', 'DATA': 'Ok'})    
    except Exception as e:
        print(e)
        return JsonResponse({'CODE':2, 'MESSAGE':'Cuenta existente, intentelo nuevamente con un email o documento diferente.', 'DATA': 'ERROR'})
@csrf_exempt
def login(request):
    jd = json.loads(request.body)
    if jd:
        email = jd['email'] if 'email' in jd else None
        password = jd['password'] if 'password' in jd else None
        if not email or not password :
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
        acceso = Cuentas.objects.filter(email=email.lower(), password=password).values('id', 'email', 'tipo_usuario', 'user_id')
        if acceso:
            out = json.dumps(acceso[0])
            return JsonResponse({'CODE':1, 'MESSAGE':'Acceso Permitido', 'DATA': out})
        else:
            return JsonResponse({'CODE':2, 'MESSAGE':'Acceso Denegado, Verifique los datos de acceso.', 'DATA': 'ERROR'})
@csrf_exempt
def consultar_convocatorias(request):
    try:
        jd = json.loads(request.body)
        if jd:
            user = jd['user'] if 'user' in jd else None
            if not user :
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})     
            usuario = Cuentas.objects.get(id=user)
            if usuario:
                convocatorias = Convocatorias.objects.all()
                out = []
                for x in convocatorias:
                    archivo ="No hay registro."
                    if x.archivo :
                        archivo = x.archivo.id
                    estado = "Finalizada"
                    if int(x.estado) == 1:
                        estado = "Activa"
                    out.append({'id': x.id, 'fecha_creacion': x.fecha_creacion.strftime('%Y-%m-%d'),'cargo': x.cargo, 'area': x.area, 'fecha_inicio_inscripcion': x.fecha_inicio_inscripcion.strftime('%Y-%m-%d'), 'fecha_max_inscripcion': x.fecha_max_inscripcion.strftime('%Y-%m-%d'), 'descripcion': x.descripcion, 'estado': estado, 'archivo_id': archivo})
                out = json.dumps(out)
                return JsonResponse({'CODE':1, 'MESSAGE':'Consulta Autorizada.', 'DATA': out})
            return JsonResponse({'CODE':2, 'MESSAGE':'Acceso Denegado.', 'DATA': "ERROR."})    
    except Exception as e:
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})
@csrf_exempt
def crear_convocatoria(request):
    try:
        jd = json.loads(request.body)
        if jd:
            cargo = jd['cargo'] if 'cargo' in jd else None
            area = jd['area'] if 'area' in jd else None
            fecha_inicio_inscripcion = jd['fecha_inicio_inscripcion'] if 'fecha_inicio_inscripcion' in jd else None
            fecha_max_inscripcion = jd['fecha_max_inscripcion'] if 'fecha_max_inscripcion' in jd else None
            descripcion = jd['descripcion'] if 'descripcion' in jd else None
            if not cargo or not area or not fecha_inicio_inscripcion or not fecha_max_inscripcion:
                    return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
            convocatoria = Convocatorias(cargo=cargo, area=area, fecha_inicio_inscripcion=fecha_inicio_inscripcion, fecha_max_inscripcion= fecha_max_inscripcion, estado = 1, descripcion = descripcion, fecha_creacion = datetime.datetime.now().strftime("%Y-%m-%d"))
            convocatoria.save()
            return JsonResponse({'CODE':1, 'MESSAGE':'Convocatoria creada satisfactoriamente', 'DATA': "Ok."})        
    except Exception as e:
        print(e)
        return JsonResponse({'CODE':2, 'MESSAGE':'No se pudo crear la convocatoria, verifique la información suministrada.', 'DATA': 'ERROR'})
@csrf_exempt
def eliminar_convocatoria(request):
    try:
        jd = json.loads(request.body)
        if jd:
            id_user = jd['id_user'] if 'id_user' in jd else None
            id_convocatoria = jd['id_convocatoria'] if 'id_convocatoria' in jd else None
            if not id_user or not id_convocatoria :
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
            usuario = Cuentas.objects.get(id=id_user)
            if usuario and usuario.tipo_usuario == 1:
                convocatoria = Convocatorias.objects.get(id = id_convocatoria)
                try:
                    convocatoria.delete()
                    return JsonResponse({'CODE':1, 'MESSAGE':'Eliminación Realizada con Exito.', 'DATA': "Ok." })
                except Exception as e:
                    return JsonResponse({'CODE':2, 'MESSAGE':'Operación fallida, consultar con soporte.', 'DATA': "ERROR."})            
            return JsonResponse({'CODE':2, 'MESSAGE':'Acceso Denegado.', 'DATA': "ERROR."})    
    except Exception as e:
        print(e)
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})
@csrf_exempt
def consultar_aspirantes(request):
    try:
        jd = json.loads(request.body)
        if jd:
            id_convocatoria = jd['id_convocatoria'] if 'id_convocatoria' in jd else None
            if not id_convocatoria :
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})     
            postulaciones = Postulaciones.objects.filter(convocatoria = id_convocatoria)
            if postulaciones:
                out = []
                for x in postulaciones:
                    estado = ""
                    if x.estado == 1:
                        estado = "Aceptado"
                    elif x.estado == 0 :
                        estado = "Rechazado"
                    elif x.estado == 2 :
                        estado = "Pendiente"
                    out.append({
                        'fecha_postulacion': x.fecha_postulacion.strftime('%Y-%m-%d'),
                        'aspirante_nombre' : str(x.aspirante.nombre+ " "+x.aspirante.apellidos),
                        'aspirante_documento' : x.aspirante.documento,
                        'estado_postulacion' : estado,
                    })
                out = json.dumps(out)
                return JsonResponse({'CODE':1, 'MESSAGE':'Consulta Autorizada.', 'DATA': out})
            else:
                return JsonResponse({'CODE':2, 'MESSAGE':'Acceso Denegado.', 'DATA': "ERROR."})    
    except Exception as e:
        print(e)
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})