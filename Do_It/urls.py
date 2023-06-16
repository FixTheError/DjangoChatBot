from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
app_name = 'Do_It'

urlpatterns = [
	path('chat_page/get_response/', views.get_response, name="get_response"),
	path('', views.landing_page, name="landing_page"),
	path('chat_page/', views.chat_page, name="chat_page")
	]