# Arkwith Application Starter Template

A development project start template that links the Restful API of the back-end(Django Rest Framework) to the front-end UI(React) to build a chat application.

채팅 어플리케이션 제작을 위해 Django Rest Framework로 만든 Restfull API를 React와 연계하여 개발 할 수 있게하는 프로젝트 스타트 템플리트.

チャットアプリケーション制作のためにDjango Rest Frameworkで作成されたRestfull APIをReactと連携して開発することができるようにするプロジェクトスタートテンプレート。

## Prerequisites

We assume you have experience with back-end and front-end Web applications using Python Django and React. It is assumed that the Python 3 and Node.js development environments have already been installed. However, even if you are not experienced in coding web applications into Python Django and React, you will be able to install and use arkwith-app-template by referring to the following reference and additional reading material.

## Features

- 채팅 기반 어플리케이션 제작을 위한 백엔드와 프런트엔드의 연계 방안 제시
- 제사용성 및 개발 생산성 향상을 위한 아키텍처 구성.
- 채팅 어플리케이션을 활용하기 위한 다양한 디바이스 고려(스마트폰, 테블릿, PC등)

## How to Use

To use this project, follow these steps:

- Clone it
- `$ git clone https://github.com/arkwith7/arkwith-app-template.git`
- Create a virtual env for this project
- `$ cd arkwith-app-template`
- `$ pipenv install`
- `$ pipenv shell`
- Configure the development and execution environment.
- `$ cd ark-template`
- `$ pip install -r requirements.txt`
- `$ cd app-template/frontend`
- `$ npm install`
- `$ npm run start`
- Move to app-template directory, upper directory of current frontend directory
- `$ python manage.py runserver`


## License

[MIT License][MIT]

[MIT]: ./LICENSE "Mit License"

## Reference & Further Reading

- [Modern Django.](http://v1k45.com/blog/modern-django-part-1-setting-up-django-and-react/)
- [Django REST framework](https://www.django-rest-framework.org/)
- [React](https://reactjs.org/docs/getting-started.html)
- [Redux: Read Me](https://redux.js.org/)
- [Web Speech API Specification](https://w3c.github.io/speech-api/speechapi.html)
- [Web Speech API(react-voice-components)](https://github.com/grvcoelho/react-voice-components)

