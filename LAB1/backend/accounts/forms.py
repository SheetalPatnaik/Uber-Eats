# forms.py
from django import forms
from .models import Profile

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['nickname', 'date_of_birth', 'city', 'state', 'country', 'profile_picture', 'favorites']

        widgets = {
            'date_of_birth': forms.DateInput(attrs={'type': 'date'}),
            'country': forms.Select(choices=[
                ('USA', 'USA'),
                ('India', 'India'),
                ('UK', 'UK'),
                # Add more country choices as needed
            ]),
        }



##menuitem form 
from .models import MenuItem

class MenuItemForm(forms.ModelForm):
    class Meta:
        model = MenuItem
        fields = ['category', 'name', 'description', 'image', 'price']
