# Generated by Django 3.2.10 on 2022-01-04 03:41
""" Migration definition for Vote model """
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_room_current_song'),
        ('spotify', '0002_rename_access_spotifytokens_access_token'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                                           primary_key=True,
                                           serialize=False,
                                           verbose_name='ID')),
                ('user', models.CharField(max_length=50, unique=True)),
                ('song', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                           to='api.room')),
            ],
        ),
    ]