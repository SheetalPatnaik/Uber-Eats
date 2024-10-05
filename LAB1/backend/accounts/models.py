# from django.db import models
# from django.contrib.auth.models import User

# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     nickname = models.CharField(max_length=100, blank=True)
#     date_of_birth = models.DateField(null=True, blank=True)
#     city = models.CharField(max_length=100, blank=True)
#     state = models.CharField(max_length=100, blank=True)
#     country = models.CharField(max_length=100, blank=True)
#     profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
#     favorites = models.TextField(blank=True)

#     def __str__(self):
#         return self.user.username


# models.py
# models.py
from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=255, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)  # Ensure this field is here
    country = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    favorites = models.TextField(blank=True, null=True)  # Ensure this field is here
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    def __str__(self):
        return self.user.username



