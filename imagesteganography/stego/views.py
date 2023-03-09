from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
# Create your views here.

def home(request):
    if request.user.is_authenticated:
        return render(request, 'index.html', {'user': request.user})
    else:
        return render(request, 'index.html')


def signup(request):
    if request.method=="POST":
        username = request.POST.get('username')
        email = request.POST.get('email')
        pass1 = request.POST.get('password1')
        pass2 = request.POST.get('password2')

        if User.objects.filter(username=username).exists():
            error="user already exists try differnt username"
            context={
                'error':error
            }
            return render(request,'signup.html',context=context)
        if pass1 != pass2:
            error="password not matching"
            context={
                'error':error
            }
            return render(request,'signup.html',context=context)
        user_name=User.objects.create_user(username,email,pass1)
        user_name.save()
        return redirect('login')
    
    return render(request,'signup.html')

def project(request):
    return render(request,'project.html')

def imgstego(request):
    return render(request,'imagestego.html')

@login_required
def prolanding(request):
    return render(request,'prolanding.html')

def dubindex(request):
    return render(request,'dubindex.html')

def logins(request):
    if request.method=="POST":
        username= request.POST.get('username')
        password= request.POST.get('password')
        user = authenticate(request,username=username,password=password)
        if user is not None:
            login(request,user)
            return redirect('home')
        else:
            error="user or password not matching"
            context={
                'error':error
            }
            return render(request,'login.html',context=context)
    return render(request,'login.html')
@login_required
def logouts(request):
    logout(request)
    return redirect('home')

