from django.urls import path
from .views import home, signup, logins,logouts,project,imgstego,prolanding,dubindex
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', home, name='home'),
    path('signup/', signup, name='signup'),
    path('login/', logins, name='login'),
    path('logout/', logouts, name='logout'),
    path('project/',project,name='project'),
    path('imgstego/',imgstego,name='imgstego'),
    path('prolanding/',prolanding,name='prolanding'),
    # path('dubindex/',dubindex,name='dubindex'),




] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
