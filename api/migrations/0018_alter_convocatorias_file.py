# Generated by Django 3.2.3 on 2022-06-09 06:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_auto_20220609_0154'),
    ]

    operations = [
        migrations.AlterField(
            model_name='convocatorias',
            name='file',
            field=models.FileField(blank=True, null=True, upload_to='convocatorias/'),
        ),
    ]
