# Generated by Django 3.2.3 on 2021-12-14 11:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_experiencias_cargo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postulaciones',
            name='aspirante',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.cuentas'),
        ),
    ]
