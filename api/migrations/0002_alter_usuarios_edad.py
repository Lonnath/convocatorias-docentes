# Generated by Django 3.2.3 on 2021-11-30 01:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuarios',
            name='edad',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
