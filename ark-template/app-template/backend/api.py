from rest_framework import viewsets, permissions, generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from knox.models import AuthToken

from .serializers import (NoteSerializer, CreateUserSerializer,
                          UserSerializer, LoginUserSerializer)
from .translator import Task, Translator


class NoteViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = NoteSerializer

    def get_queryset(self):
        return self.request.user.notes.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


# view for NAVER Translation API
class TranslatorAPI(APIView):

    def get(self, request):
        # Process any get params that you may need
        # If you don't need to process get params,
        # you can skip this part
        
        #번역 소스 텍스트의 언어 설정: (ko:한국어, en:영어, ja:일본어, zh-CN:중국어(간체), zh-TW:중국어(번체)
        #?source=ko&target=en&text='국민 도두를 사랑 합니다.'
        get_arg1 = self.request.query_params.get('source', None)
        get_arg2 = self.request.query_params.get('target', None)
        get_arg3 = self.request.query_params.get('text', None)

        if get_arg3 is None:
            get_arg1 = 'ko'
            get_arg2 = 'en'
            get_arg3 = '번역대상 텍스트가 없습니다.'

        # Any URL parameters get passed in **kw
        myTranslator = Translator(get_arg1, get_arg2, ' ', ' ')
        result = myTranslator.get_translation(get_arg3)
        response = Response(result, status=status.HTTP_200_OK)
        return response


