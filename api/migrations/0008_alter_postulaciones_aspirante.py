# Generated by Django 3.2.3 on 2021-11-30 10:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_rename_postulante_postulaciones_aspirante'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postulaciones',
            name='aspirante',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.usuarios'),
        ),
    ]
