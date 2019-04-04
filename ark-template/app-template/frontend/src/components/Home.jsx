import React, { Component } from 'react';
import homeImage from '../image/home.png'
import chatImage from '../image/chat.png'
import crudImage from '../image/CRUD.png'
import arkwithIcon from '../image/ArkWith-logo-white.png'

export default class Home extends Component {

    render() {
        return (
    <div>
    <div className="jumbotron text-center" style={{marginBottom: 0}} >
     <h1>Arkwith Starter Template for FullStact developer</h1>
     <p>Seek after difference!</p> 
    </div>

    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
     <a className="navbar-brand" target="_blank" rel="noopener noreferrer" href="https://www.arkwith.com/"><img src={arkwithIcon} className="rounded-circle float-left" style={{width: "80px", height: "50px"}} alt="Logo" /></a>
     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span className="navbar-toggler-icon">
            
        </span>
     </button>
     <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav">
        <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" target="_blank" rel="noopener noreferrer" href="https://blog.naver.com/arkwith">Blog</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" target="_blank" rel="noopener noreferrer" href="https://github.com/arkwith7">Github</a>
        </li>    
        </ul>
     </div>  
    </nav>

    <div className="container" style={{marginTop:"30px"}}>
     <div className="row">
      <div className="col-sm-4">
       <h2>Arkwith</h2>
       <h5>An intelligent knowledge and information service provider that corresponds to a intellectual imagination of person and promotes creativity for human.</h5>
       <div className="fakeimg"></div>
       <p>Arkwith try to create a better world with customers and partner.</p>
       
       <h3>Some Links</h3>
       <p>Introducing sites related to Arkwith.</p>
        <ul className="nav nav-pills flex-column">
            <li className="nav-item">
            <a className="nav-link active" href="/">Home</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" target="_blank" rel="noopener noreferrer" href="https://blog.naver.com/arkwith">Blog</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" target="_blank" rel="noopener noreferrer" href="https://github.com/arkwith7">Github</a>
            </li>
            {/*
            <li className="nav-item">
            <a className="nav-link disabled" href="#">Disabled</a>
            </li>
             */}
        </ul>
        <hr className="d-sm-none"/>
      </div>

      <div className="col-sm-8">
        <h2>Why do you need an Starter Template?</h2>
        <p>Recently, many developers are developing application programs using cloud computing environment and machine learning. This phenomenon is required to collect and analyze information scattered throughout the application program development, and through this process, You can write application programs that provide valuable knowledge and information to your customers, In order to provide application programs, we had to face the situation where we have to show results using various complex technologies.</p>
        <p>In the past, the enterprise architecture was a development environment ecosystem led by a leading company focused on major components such as Java, .Net, Database, and Web Application server. But now it has been changed to an open source ecosystem with Linux as the leading open source, such as node.js, python, and react. The diversity of development technology choices has increased, but the knowledge required for discrimination has increased as to which one to choose. Also, it is increasingly complicated and the selection of suitable technology and development using it are becoming more and more difficult.</p>
        <p>The important thing in application development is that the technology architecture and the development language which are adopted and applied to the target domain of the problem domain to be solved are easy to develop the demo application, so that the application for the target domain can be developed and there is no problem in the future operation It should be possible to quickly judge the situation in a relatively short time. And it will be even better if the development technology to be adopted and applied has good reusability and high development productivity so that the time required for development can be shortened to be able to serve customers.</p>
        <p>It is necessary to solve these problems and suggest an alternative to the optimal method.</p>
        <br/>

        <h2>What is the Arkwith Starter Template?</h2>
        <p>The Arkwith Application Starter Template is a collection of diverse and complex technical elements required to develop application programs for end users. Without a broad knowledge base, such as a technical architecture or development experience using multiple languages, it is easy to develop application programs with little technical knowledge of Python and JavaScript coding techniques.</p>
        <p>Many companies have their own information systems and databases. There are also a variety of information and knowledge provided by public agencies and corporations on the Internet. The current trend is to integrate information and knowledge from these sources and provide API(Application Programming Interface) services to enable them to be used in various consumers. The API service mainly uses the Restfull API, which is a de facto standard. We need a framework or template that can produce an application program that reflects this trend and provides information and knowledge through various devices such as PC, Tablet, and Smart Phone. And it should be that technology and knowledge are integrated and easy to install and use. Arkwith Application Starter Templates are designed to meet these needs.</p>
        <p>Conceptually, the area where information and knowledge to be served by the Restfull API is collected and managed is called Back-End. And the area where the end user can inquire and collect the knowledge and information from the back-end through the device such as the smart phone that he uses is called the front-end.</p>
        <p>Arkwith Application Starter Template uses related modules such as Python Django and Django Rest Framework for back-end processing, which can be quickly and easily developed based on big data collection and analysis on the Internet, scientific technology calculation, algorithm implementation, machine learning and data information model. And the technology applied to Front-End uses React, Redux of Node.js ecosystem which has good reusability and development productivity based on JavaScript (ES5, ES6). This enables the reuse of screen components to implement new applications related to the user's screen, thereby ensuring development quality and shortening the time required. Mobile First, it is also integrated with Bootstrap, which is most widely used as HTML, CSS (Cascading Style Sheets), and JS (JavaScript) framework.</p>
        <p>As an example application, Using Arkwith Application Starter Template, There is an interpreter application for voice and text chat, and CRUD (Create, Read, Update, Delete) sample application for input, modification and deletion for information processing.</p>
        <br/>

        <h2>How can I use the Arkwith Starter Template?</h2>

        <h5>1. Prerequisites</h5>
        <p>It is assumed that the Python 3 and Node.js development environments have already been installed.</p>

        <h5>2. Install the Arkwith Starter Template.</h5>
        <p>To use this Arkwith Application Starter Template, follow these steps:</p>
         <ul>
          <li>Clone it</li>
          <li><code>$ git clone https://github.com/arkwith7/arkwith-app-template.git</code></li>
          <li>Create a virtual env for this project</li>
          <li><code>$ cd arkwith-app-template</code></li>
          <li><code>$ pipenv install</code></li>
          <li><code>$ pipenv shell</code></li>
          <li>Configure the development and execution environment.</li>
          <li><code>$ cd ark-template</code></li>
          <li><code>$ pip install -r requirements.txt</code></li>
          <li><code>$ cd app-template/frontend</code></li>
          <li><code>$ npm install</code></li>
          <li><code>$ npm run start</code></li>
          <li>Move to app-template directory, upper directory of current frontend directory</li>
          <li><code>$ python manage.py runserver</code></li>
         </ul>

        <h5>3. Screenshot</h5>
        <p>Execute as above and open the browser and enter http://127.0.0.1:8000/ in the address bar. Then the following screen is displayed.</p>
        <div className="thumbnail">
         <p><em>Home tab</em></p>
         <p>This is the screen displayed on the Home tab.</p>
         <img src={homeImage} alt="Home" style={{"width": "100%"}}/>
        </div>
        <br/>
        <div className="thumbnail">
         <p><em>Chat Translator</em></p>
         <p>This is the screen displayed on the Chat Translator tab.</p>
         <img src={chatImage} alt="Chat Translator" style={{"width":"100%"}}/>
        </div>
        <br/>
        <div className="thumbnail">
         <p><em>CRUD Sample App. tab</em></p>
         <p>This is the screen displayed on the CRUD Sample App. tab.</p>
         <img src={crudImage} alt="CRUD Sample App." style={{"width":"100%"}}/>
        </div>
        <br/>

        <h5>4. Describe key components.(Directory structure.)</h5>
        <div className="table-responsive">
         <table className="table table-condensed">
            <thead> 
            </thead>
            <tbody>
             <tr>
              <td><p className="fa fa-folder-open">&nbsp;ark-template</p></td>
              <td>The root directory cloned from github.</td>
             </tr>
             <tr>
              <td><p className="fa fa-folder-open">&nbsp;ark-template/ark-template</p></td>
              <td>Root directory is just a container for your project. you can rename it to anything you like.</td>
             </tr>
             <tr>
              <td><p className="fa fa-folder-open">&nbsp;ark-template/ark-template/app-template</p></td>
              <td>Django project called app-template created using django-admin tool.</td>
             </tr>
             <tr>
              <td><p className="fa fa-folder-open">&nbsp;ark-template/ark-template/app-template/app-template</p></td>
              <td>Django application called app-template in the project.</td>
             </tr>
             <tr>
              <td><p className="fa fa-file-code-o">&nbsp;ark-template/ark-template/app-template/app-template/settings.py</p></td>
              <td>Settings/configuration for this Django project.</td>
             </tr>
             <tr>
              <td><p className="fa fa-file-code-o">&nbsp;ark-template/ark-template/app-template/app-template/urls.py</p></td>
              <td>The URL declarations for this Django project</td>
             </tr>
             <tr>
              <td><p className="fa fa-folder-open">&nbsp;ark-template/ark-template/app-template/backend</p></td>
              <td>Django application called backend for the Restful API in server side Back-End area.</td>
             </tr>
             <tr>
              <td><p className="fa fa-file-code-o">&nbsp;ark-template/ark-template/app-template/backend/api.py</p></td>
              <td>Define API views using our serializer class for our RESTful API</td>
             </tr>
             <tr>
              <td><p className="fa fa-file-code-o">&nbsp;ark-template/ark-template/app-template/backend/endpoints.py</p></td>
              <td>Configure our urls using API views</td>
             </tr>
             <tr>
              <td><p className="fa fa-file-code-o">&nbsp;ark-template/ark-template/app-template/backend/models.py</p></td>
              <td>Define our database models, which Django automatically translates into database tables</td>
             </tr>
             <tr>
              <td><p className="fa fa-file-code-o">&nbsp;ark-template/ark-template/app-template/backend/serializers.py</p></td>
              <td>Define Serializers that can convert complex data such as querysets and model instances into native Python data types that can be easily rendered as JSON, XML, or other content types.</td>
             </tr>
             <tr>
              <td><p className="fa fa-file-code-o">&nbsp;ark-template/ark-template/app-template/backend/translator.py</p></td>
              <td>Language translation python object that uses the NAVER translation API.</td>
             </tr>
             <tr>
              <td><p className="fa fa-folder-open">&nbsp;ark-template/ark-template/app-template/frontend</p></td>
              <td>React application called frontend created by create-react-app as client side Front-End area.</td>
             </tr>
             <tr>
              <td><p className="fa fa-folder-open">&nbsp;ark-template/ark-template/app-template/frontend/src</p></td>
              <td>In an application that uses both React and Redux, Directory of program source file for React App.</td>
             </tr>
             <tr>
              <td><p className="fa fa-folder-open">&nbsp;ark-template/ark-template/app-template/frontend/src/actions</p></td>
              <td>The actions directory is a folder that contains the action types used by the application and the action methods that perform tasks such as API communication.</td>
             </tr>
             <tr>
              <td><p className="fa fa-folder-open">&nbsp;ark-template/ark-template/app-template/frontend/src/components</p></td>
              <td>The components directory is a folder made up of React components. Components can usually be further subdivided by domain.</td>
             </tr>
             <tr>
              <td><p className="fa fa-folder-open">&nbsp;ark-template/ark-template/app-template/frontend/src/css</p></td>
              <td>Directory of CSS(Cascading Style Sheets) file for React components.</td>
             </tr>
             <tr>
              <td><p className="fa fa-folder-open">&nbsp;ark-template/ark-template/app-template/frontend/src/lib</p></td>
              <td>Directory of libraries referenced by the React components, such as Pagination, Web Speech API ...</td>
             </tr>
             <tr>
              <td><p className="fa fa-folder-open">&nbsp;ark-template/ark-template/app-template/frontend/src/reducers</p></td>
              <td>The reducer directory is a folder made up of reducers. The reducer receives the changed state from the action method and changes the existing state to the new state.</td>
             </tr>
             <tr>
              <td><p className="fa fa-file-code-o">&nbsp;ark-template/ark-template/app-template/frontend/src/App.js</p></td>
              <td>The main App JavaScript component</td>
             </tr>
             <tr>
              <td><p className="fa fa-file-code-o">&nbsp;ark-template/ark-template/app-template/frontend/src/index.css</p></td>
              <td>Define bootstrap and theme applied css files.</td>
             </tr>
             <tr>
              <td><p className="fa fa-file-code-o">&nbsp;ark-template/ark-template/app-template/frontend/src/index.js</p></td>
              <td>index.js and its styles (index.css) provide an entry into the App and also kicks off the registerServiceWorker.js.</td>
             </tr>
             <tr>
              <td><p className="fa fa-folder-open">&nbsp;ark-template/ark-template/app-template/templates</p></td>
              <td>Template file directory such as html for Django project</td>
             </tr>
             <tr>
              <td><p className="fa fa-file-code-o">&nbsp;ark-template/ark-template/app-template/manage.py</p></td>
              <td>A command-line utility that lets you interact with this Django project in various ways.</td>
             </tr>
             <tr>
              <td><p className="fa fa-file">&nbsp;ark-template/ark-template/requirements.txt</p></td>
              <td>A list of python module files that need to be installed for this project.</td>
             </tr>
             <tr>
              <td><p className="fa fa-file">&nbsp;ark-template/README.md</p></td>
              <td>A readme file that describes this project in github.</td>
             </tr>
            </tbody>
         </table>
        </div>
        <h5>5. How to develop new application program using Arkwith Starter Template.</h5>
        <p>Here we describe only simple concepts, and detailed development methods are introduced through other blogs.</p>
        <h5>5-1. Back-end Development</h5>
        <p>Backend development is based on a data model. First, add a model, create a serializer using this model, create an API for the model, and register it in the Django Rest Framework router.</p>
        <h5>5-2. Front-end development</h5>
        <p>The API implemented at the Back-end is implemented by connecting to the Front-end using React, redux and redux-thunk. First, create the React Component, and then create the Redux Action and Reducer.</p>

      </div>
     </div>
    </div>

    <div className="jumbotron text-center" style={{marginBottom: 0}}>
     <p>They replied, "Believe in the Lord Jesus, and you will be saved--you and your household." (Acts 16:31)</p>
     <p>In him the whole building is joined together and rises to become a holy temple in the Lord. And in him you too are being built together to become a dwelling in which God lives by his Spirit.(Ephesians 2:21-22)</p>
    </div>

    </div>
        )
    }
}