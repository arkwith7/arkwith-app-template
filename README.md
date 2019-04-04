# Arkwith Starter Template for FullStact developer

채팅 애플리케이션 뿐아니라 일반 업무용 애플리케이션 풀스택 개발자를 위한 백엔드의 Python Django Rest Framework로 만든 Restfull API를 연계하여 프런트엔드에 React로 SPA(Single-Page Application)을 개발 할 수 있게하는 스타터 템플리트.

チャットプログラムだけでなく、一般的な業務用プログラムを開発するフルスタックの開発者のためのバックエンドの Python Django Rest Framework で作成された Restfull API を連携して、フロントエンドの React に SPA（Single-Page Application）を開発することができるようにするスターターテンプレート。

It is a starter template for FullStact developer who can develop general business applications as well as chat applications. Back-End is developed with the Restfull API created with Python's Django Rest Framework. And Front-End screen is developed as React that supports SPA(Single-Page Application).

## Prerequisites

Python Django와 React로 백엔드, 프런트엔드 프로그램 작성 경험이 있다는 전제하에 개발환경은 파이썬 Anacond등을 포함해서 Python3, Node.js의 최신 버전이 설치 되어 있어야 합니다. 그러나 파이썬과 React에 대한 경험이 없어도 다른 환경에서 개발 경험이 있고 자바스크립트를 잘 이용 한다면 아래의 참조 문서를 통해서 쉽게 스타터 템플리트를 활용 할 수 있을 것입니다.

Python Django と React にバックエンド、フロントエンドプログラムを作成経験があることを前提に開発環境は、Python Anacond などを含めて Python3、Node.js の最新バージョンがインストールされている必要があります。しかし、Python と React の経験がなくても、他の環境での開発経験があり、JavaScript をうまく利用すれば、以下の参照文書を通って簡単にスターターテンプレートを活用することができます。

We assume you have experience with back-end and front-end Web applications using Python Django and React. It is assumed that the Python 3 and Node.js development environments have already been installed. However, even if you are not experienced in coding web applications into Python Django and React, you will be able to install and use arkwith-app-template by referring to the following reference and additional reading material.

## Features

> -   채팅 기반 어플리케이션 제작을 위한 백엔드와 프런트엔드의 연계 방안 제시
> -   제사용성 및 개발 생산성 향상을 위한 아키텍처 구성.
> -   채팅 어플리케이션을 활용하기 위한 다양한 디바이스 고려(스마트폰, 테블릿, PC등)

> -   チャットプログラムを作成するためのバックエンドとフロントエンドの連携方策提示
> -   第使いやすさと開発の生産性向上のためのアーキテクチャを構成する。
> -   チャットアプリケーションを活用するための様々なデバイスを考慮（スマートフォン、タブレット、PC など）

> -   Suggestions for connecting to the back-end and front-end for chat programs.
> -   An architectural guide to improving program reuse and development productivity.
> -   Consider various devices to use chat program (smartphone, tablet, PC etc)

## How to Use

To use this project, follow these steps:

-   Clone it
-   `$ git clone https://github.com/arkwith7/arkwith-app-template.git`
-   Create a virtual env for this project
-   `$ cd arkwith-app-template`
-   `$ pipenv install`
-   `$ pipenv shell`
-   or If anaconda is installed,
-   `$ conda create --name env python=3.5`
-   `$ source activate env`
-   Configure the development and execution environment.
-   `$ cd ark-template`
-   `$ pip install -r requirements.txt`
-   `$ cd app-template/frontend`
-   `$ npm install`
-   `$ npm run start`
-   Move to app-template directory, upper directory of current frontend directory
-   `$ python manage.py runserver`

http://localhost:8000/

## License

[MIT License][mit]

[mit]: ./LICENSE 'Mit License'

## Reference & Further Reading

-   [Modern Django.](http://v1k45.com/blog/modern-django-part-1-setting-up-django-and-react/)
-   [Django REST framework](https://www.django-rest-framework.org/)
-   [React](https://reactjs.org/docs/getting-started.html)
-   [Redux: Read Me](https://redux.js.org/)
-   [Web Speech API Specification](https://w3c.github.io/speech-api/speechapi.html)
-   [Web Speech API(react-voice-components)](https://github.com/grvcoelho/react-voice-components)
