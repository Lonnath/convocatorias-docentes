# Generated by Django 3.2.3 on 2021-11-30 00:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Archivos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ruta', models.TextField()),
                ('nombre_archivo', models.CharField(max_length=255)),
                ('extension', models.CharField(max_length=5)),
            ],
            options={
                'db_table': 'archivos',
            },
        ),
        migrations.CreateModel(
            name='Convocatorias',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cargo', models.CharField(max_length=255)),
                ('area', models.CharField(max_length=255)),
                ('fecha_inicio_inscripcion', models.DateField()),
                ('fecha_max_inscripcion', models.DateField()),
                ('descripcion', models.TextField()),
                ('estado', models.IntegerField()),
                ('archivo', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.archivos')),
            ],
            options={
                'db_table': 'convocatorias',
            },
        ),
        migrations.CreateModel(
            name='Cuentas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=255)),
                ('password', models.CharField(max_length=10)),
                ('tipo_usuario', models.IntegerField()),
            ],
            options={
                'db_table': 'cuentas',
            },
        ),
        migrations.CreateModel(
            name='Usuarios',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('documento', models.CharField(max_length=16, unique=True)),
                ('nombre', models.CharField(max_length=255)),
                ('apellidos', models.CharField(max_length=255)),
                ('direccion', models.CharField(blank=True, max_length=255, null=True)),
                ('telefono', models.CharField(blank=True, max_length=255, null=True)),
                ('edad', models.IntegerField()),
                ('genero', models.CharField(max_length=1)),
            ],
            options={
                'db_table': 'usuarios',
            },
        ),
        migrations.CreateModel(
            name='Postulaciones',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_postulacion', models.DateField()),
                ('estado', models.IntegerField()),
                ('convocatoria', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.convocatorias')),
                ('postulante', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.cuentas')),
            ],
            options={
                'db_table': 'postulaciones',
            },
        ),
        migrations.CreateModel(
            name='Experiencias',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('inicio_experiencia', models.DateField()),
                ('fin_experiencia', models.DateField(blank=True, null=True)),
                ('empresa', models.CharField(max_length=255)),
                ('descripcion', models.TextField()),
                ('actual_trabajo', models.IntegerField()),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.usuarios')),
            ],
            options={
                'db_table': 'experiencias',
            },
        ),
        migrations.CreateModel(
            name='Estudios',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('inicio_estudio', models.DateField()),
                ('fin_estudio', models.DateField(blank=True, null=True)),
                ('institucion', models.CharField(max_length=255)),
                ('titulo', models.CharField(max_length=255)),
                ('actual_estudio', models.IntegerField()),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.usuarios')),
            ],
            options={
                'db_table': 'estudios',
            },
        ),
        migrations.AddField(
            model_name='cuentas',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.usuarios'),
        ),
    ]
