
# 네이버 기계번역 API processing
import os
import sys
import urllib.request
import json

# 네이버 번역 사용필드 
# 입력필드 번역요청언어(source), 번역대상언어(target), UTF-8번역할 문장(text),
# 출력필드 번역된 문장(translatedText)
client_id = "yerEA6aZpWGL63nGl12H" #"YOUR_CLIENT_ID"
client_secret = "PscybrtjyM" #"YOUR_CLIENT_SECRET"
#번역 소스 텍스트의 언어 설정: (ko:한국어, en:영어, ja:일본어, zh-CN:중국어(간체), zh-TW:중국어(번체)
LANGUAGE = (
    'ko',
    'en',
    'ja',
    'zh-CN',
    'zh-TW',
)

class Task(object):
    def __init__(self, **kwargs):
        for field in ('id', 'name', 'owner', 'status'):
            setattr(self, field, kwargs.get(field, None))

class Translator(object):
    def __init__(self, source, target, source_text, target_text):
        self.source = source
        self.target = target
        self.source_text = source_text
        self.target_text = target_text

    def get_translation(self, text="번역할 문장을 입력하세요"):
        # 번역 소스 텍스트를 quotation으로 묶음
        encText = urllib.parse.quote(text)
        # 네이버 번역 API에 보내기 위한 query를 만듬
        data = "source="+self.source+"&target="+self.target+"&text=" + encText
        url = "https://openapi.naver.com/v1/language/translate"
        request = urllib.request.Request(url)

        # 네이버에서 받은  client_id, client_secret추가
        request.add_header("X-Naver-Client-Id",client_id)
        request.add_header("X-Naver-Client-Secret",client_secret)
        response = urllib.request.urlopen(request, data=data.encode("utf-8"))
        rescode = response.getcode()
        if(rescode==200):
            response_body = response.read()
            # print(response_body.decode('utf-8'))
            # JSON 디코딩
            result_dict = json.loads(response_body.decode('utf-8')) # message -> result -> translatedText
            # print(result_dict["message"]["result"]["translatedText"])
            return result_dict["message"]["result"]["translatedText"]
        else:
            print("Error Code:" + rescode)
            return rescode

#rescode=500, 400[TR99, TR01, TR02, TR03, TR04, TR05, TR06, TR07, TR08, TR99]