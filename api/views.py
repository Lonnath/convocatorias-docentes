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
                        'aspirante_nombre' : str(x.aspirante.user.nombre+ " "+x.aspirante.user.apellidos),
                        'aspirante_documento' : x.aspirante.user.documento,
                        'estado' : estado,
                        'id_aspirante' : x.aspirante.id,
                        'telefono' : x.aspirante.user.telefono,
                        'direccion' : x.aspirante.user.direccion,
                        'genero' : 'Masculino' if x.aspirante.user.genero == 'm' else 'Femenino',
                        'id_postulacion' : x.id,
                    })
                out = json.dumps(out)
                return JsonResponse({'CODE':1, 'MESSAGE':'Consulta Autorizada.', 'DATA': out})
            else:
                return JsonResponse({'CODE':2, 'MESSAGE':'Acceso Denegado.', 'DATA': "ERROR."})    
    except Exception as e:
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})
@csrf_exempt
def mi_perfil(request):
    try:
        jd = json.loads(request.body)
        if jd:
            user = jd['user'] if 'user' in jd else None
            if not user :
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})    
            cuenta = Cuentas.objects.get(id=user)
            out = [
                {
                    "email": cuenta.email,
                    "documento": cuenta.user.documento,
                    "nombre": cuenta.user.nombre,
                    "apellidos": cuenta.user.apellidos,
                    "direccion": cuenta.user.direccion,
                    "telefono": cuenta.user.telefono,
                    "fecha_nacimiento": cuenta.user.fecha_nacimiento.strftime('%Y-%m-%d'),
                    "genero": cuenta.user.genero
                }
            ]
            out = json.dumps(out)
            if out:
                return JsonResponse({'CODE':1, 'MESSAGE':'Consulta Autorizada.', 'DATA': out})
            else:
                return JsonResponse({'CODE':2, 'MESSAGE':'Acceso Denegado.', 'DATA': "ERROR."})    
    except Exception as e:
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})
@csrf_exempt
def modificar_usuarios(request):
    try:
        jd = json.loads(request.body)
        if jd:
            user = jd['user'] if 'user' in jd else None
            documento= jd['documento'] if 'documento' in jd else None
            nombre= jd['nombre'] if 'nombre' in jd else None
            apellidos= jd['apellidos'] if 'apellidos' in jd else None
            direccion= jd['direccion'] if 'direccion' in jd else None
            telefono= jd['telefono'] if 'telefono' in jd else None
            fecha_nacimiento= jd['fecha_nacimiento'] if 'fecha_nacimiento' in jd else None
            genero= jd['genero'] if 'genero' in jd else None
            email= jd['email'] if 'email' in jd else None
            if not user :
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})    
            cuenta = Cuentas.objects.get(id=user)
            cuenta.email = email
            usuario = Usuarios.objects.get(id=cuenta.user.id)
            usuario.documento = documento
            usuario.nombre = nombre
            usuario.apellidos = apellidos
            usuario.direccion = direccion
            usuario.telefono = telefono
            usuario.fecha_nacimiento = fecha_nacimiento
            usuario.genero = genero
            try:
                cuenta.save()
                usuario.save()
                return JsonResponse({'CODE':1, 'MESSAGE':'Actualización de Datos Realizada con Éxito.', 'DATA': "Ok."})
            except Exception as e:
                
                return JsonResponse({'CODE':2, 'MESSAGE':'Actualización falló.', 'DATA': "ERROR."})    
    except Exception as e:
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})
@csrf_exempt
def postular_aspirante(request):
    try:
        jd = json.loads(request.body)
        if jd:
            user = jd['user'] if 'user' in jd else None
            convocatoria = jd['convocatoria'] if 'convocatoria' in jd else None
            if not user or not convocatoria :
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
            usuario = Cuentas.objects.get(id = user)
            convocatoria_cons = Convocatorias.objects.get(id = convocatoria)
            try:
                postulacion = Postulaciones.objects.get(aspirante = usuario, convocatoria = convocatoria_cons)
                if postulacion :
                    return JsonResponse({'CODE':2, 'MESSAGE':'Aspirante ya se encuentra registrado en la convocatoria.', 'DATA': "ERROR."})
            except Exception as e:
                crear_postulacion = Postulaciones(convocatoria = convocatoria_cons, aspirante = usuario, fecha_postulacion = datetime.datetime.now().strftime("%Y-%m-%d"), estado = 2)
                crear_postulacion.save()
                if crear_postulacion:
                    return JsonResponse({'CODE':1, 'MESSAGE':'Aspirante registrado en la convocatoria.', 'DATA': "Ok."})
                return JsonResponse({'CODE':2, 'MESSAGE':'Error al intentar postularse en la convocatoria.', 'DATA': "ERROR."})
    except Exception as e:
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})
@csrf_exempt
def mis_estudios(request):
    try:
        jd = json.loads(request.body)
        if jd:
            user = jd['user'] if 'user' in jd else None
            if not user :
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
            
            usuario = Usuarios.objects.get(id = user)
            estudios = Estudios.objects.filter(usuario=usuario)
            out = []
            for x in estudios:
                out.append({
                    'id_estudio':x.id,
                    'institucion': x.institucion,
                    'titulo' : x.titulo,
                    'ingreso': x.inicio_estudio.strftime('%Y-%m-%d'),
                    'finalizacion' : x.fin_estudio.strftime('%Y-%m-%d'),
                })
            out = json.dumps(out)
            if len(out) > 0:
                return JsonResponse({'CODE':1, 'MESSAGE':'Estudios encontrados.', 'DATA': out})
            return JsonResponse({'CODE':2, 'MESSAGE':'No Data.', 'DATA': "ERROR."})
    except Exception as e:
        print(e)
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})
@csrf_exempt
def estudios_usuarios(request):
    try:
        jd = json.loads(request.body)
        if jd:
            user = jd['user'] if 'user' in jd else None
            titulo = jd['titulo'] if 'titulo' in jd else None
            institucion = jd['institucion'] if 'institucion' in jd else None
            fecha_ingreso = jd['fecha_ingreso'] if 'fecha_ingreso' in jd else None
            fecha_finalizacion = jd['fecha_finalizacion'] if 'fecha_finalizacion' in jd else None
            actual = jd['actual'] if 'actual' in jd else None
            if not user :
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
            
            usuario = Usuarios.objects.get(id = user)
            try:
                estudio = Estudios(usuario = usuario, inicio_estudio = fecha_ingreso, fin_estudio = fecha_finalizacion, institucion = institucion, titulo = titulo, actual_estudio = actual)
                estudio.save()
                return JsonResponse({'CODE':1, 'MESSAGE':'Estudio Registrado con Exito.', 'DATA': "Ok."})
            except Exception as e:
                print(e)
                return JsonResponse({'CODE':2, 'MESSAGE':'Error al intentar registrar estudios academicos.', 'DATA': "ERROR."})
    except Exception as e:
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})
@csrf_exempt
def eliminar_estudio(request):
    try:
        jd = json.loads(request.body)
        if jd:
            estudio = jd['estudio'] if 'estudio' in jd else None
            if not estudio:
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
            estudio_eliminar = Estudios.objects.get(id=estudio)
            try:
                estudio_eliminar.delete()
                return JsonResponse({'CODE':1, 'MESSAGE':'Estudio Eliminado con Exito.', 'DATA': "Ok."})
            except Exception as e:
                print(e)
                return JsonResponse({'CODE':2, 'MESSAGE':'No se pudo realizar la eliminación.', 'DATA': "ERROR."})
    except Exception as e:
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})
@csrf_exempt
def mis_experiencias(request):
    try:
        jd = json.loads(request.body)
        if jd:
            user = jd['user'] if 'user' in jd else None
            if not user :
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
            
            usuario = Usuarios.objects.get(id = user)
            experiencias = Experiencias.objects.filter(usuario=usuario)
            out = []
            for x in experiencias:
                out.append({
                    'id_experiencia':x.id,
                    'empresa': x.empresa,
                    'cargo' : x.cargo,
                    'ingreso': x.inicio_experiencia.strftime('%Y-%m-%d'),
                    'finalizacion' : x.fin_experiencia.strftime('%Y-%m-%d'),
                    'descripcion' : x.descripcion,
                    
                })
            out = json.dumps(out)
            if len(out) > 0:
                return JsonResponse({'CODE':1, 'MESSAGE':'Experiencias encontradas.', 'DATA': out})
            return JsonResponse({'CODE':2, 'MESSAGE':'No Data.', 'DATA': "ERROR."})
    except Exception as e:
        print(e)
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})
@csrf_exempt
def experiencias_usuarios(request):
    try:
        jd = json.loads(request.body)
        if jd:
            user = jd['user'] if 'user' in jd else None
            empresa = jd['empresa'] if 'empresa' in jd else None
            cargo = jd['cargo'] if 'cargo' in jd else None
            fecha_ingreso = jd['fecha_ingreso'] if 'fecha_ingreso' in jd else None
            fecha_fin = jd['fecha_finalizacion'] if 'fecha_finalizacion' in jd else None
            descripcion = jd['descripcion'] if 'descripcion' in jd else None
            actual = jd['actual'] if 'actual' in jd else None
            if not user :
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
            
            usuario = Usuarios.objects.get(id = user)
            try:
                experiencia = Experiencias(usuario = usuario, empresa = empresa, cargo = cargo, descripcion = descripcion, inicio_experiencia = fecha_ingreso, fin_experiencia = fecha_fin, actual_trabajo = actual)
                experiencia.save()
                return JsonResponse({'CODE':1, 'MESSAGE':'Experiencia Registrada con Exito.', 'DATA': "Ok."})
            except Exception as e:
                print(e)
                return JsonResponse({'CODE':2, 'MESSAGE':'Error al intentar registrar experiencia laboral.', 'DATA': "ERROR."})
    except Exception as e:
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})
@csrf_exempt
def eliminar_experiencia(request):
    try:
        jd = json.loads(request.body)
        if jd:
            experiencia = jd['experiencia'] if 'experiencia' in jd else None
            if not experiencia:
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
            experiencia_eliminar = Experiencias.objects.get(id = experiencia)
            try:
                experiencia_eliminar.delete()
                return JsonResponse({'CODE':1, 'MESSAGE':'Experiencia Eliminada con Exito.', 'DATA': "Ok."})
            except Exception as e:
                print(e)
                return JsonResponse({'CODE':2, 'MESSAGE':'No se pudo realizar la eliminación.', 'DATA': "ERROR."})
    except Exception as e:
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})
@csrf_exempt
def calificar_aspirante(request):
    try:
        jd = json.loads(request.body)
        if jd:
            postulacion = jd['postulacion'] if 'postulacion' in jd else None
            calificacion = jd['calificacion'] if 'calificacion' in jd else None
            if not postulacion or calificacion is None:
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
            postulacion = Postulaciones.objects.get(id = postulacion)
            if calificacion :
                postulacion.estado = 1
            else:
                postulacion.estado = 0
            
            try:
                postulacion.save()
                return JsonResponse({'CODE':1, 'MESSAGE':'Calificación realizada con Exito.', 'DATA': "Ok."})
            except Exception as e:
                print(e)
                return JsonResponse({'CODE':2, 'MESSAGE':'No se pudo realizar la Calificación.', 'DATA': "ERROR."})
    except Exception as e:
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})
@csrf_exempt
def ver_postulacion(request):
    try:
        jd = json.loads(request.body)
        if jd:
            user = jd['user'] if 'user' in jd else None
            if not user:
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
            usuario = Cuentas.objects.get(id = user)
            postulaciones = Postulaciones.objects.filter(aspirante = usuario)
            out = []
            for x in postulaciones:
                out.append({
                    "cargo_area": (x.convocatoria.cargo,' - ', x.convocatoria.area),
                    "estado" : 'Activa' if int(x.estado) == 1 else 'Finalizada',
                    "fecha_postulacion" : x.fecha_postulacion.strftime('%Y-%m-%d'),
                    "calificacion" : 'Aprobado' if int(x.estado) == 1 else "Rechazado" if int(x.estado) == 0 else "Pendiente",

                })
            out = json.dumps(out)
            if len(out)>0:
                return JsonResponse({'CODE':1, 'MESSAGE':'Consulta realizada con exito.', 'DATA': out})
            else:
                return JsonResponse({'CODE':1, 'MESSAGE':'No data.', 'DATA': {}})
    except Exception as e:
        print(e)
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})