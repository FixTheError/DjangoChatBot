from django.shortcuts import render
from django.http import JsonResponse
from django.template.context_processors import csrf

# Create your views here.

def landing_page(request):
    description = "Welcome!"
    return render(request, 'Landing.html', {'description': description})

def get_response(request):
    message = request.POST.get("message")
    response = "This is a public service announcement, this is only a test"
    return JsonResponse({"response": str(response)})

def chat_page(request):
    c = {}
    c.update(csrf(request))
    return render(request, 'Chat.html', c)
