# Generated by Django 3.2.3 on 2022-06-09 06:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_auto_20220609_0152'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='convocatorias',
            name='archivo',
        ),
        migrations.AddField(
            model_name='convocatorias',
            name='file',
            field=models.FileField(blank=True, null=True, upload_to='media/'),
        ),
        migrations.DeleteModel(
            name='Archivos',
        ),
    ]
