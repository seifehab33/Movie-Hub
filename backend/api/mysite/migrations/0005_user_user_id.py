# Generated by Django 4.1.7 on 2023-04-02 04:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mysite', '0004_rename_first_name_user_name_remove_user_last_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='user_id',
            field=models.IntegerField(default=1, unique=True),
            preserve_default=False,
        ),
    ]
