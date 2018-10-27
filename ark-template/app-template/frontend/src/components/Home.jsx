import React, { Component } from 'react';
import homeImage from '../image/home.png'
import chatImage from '../image/chat.png'
import crudImage from '../image/CRUD.png'

export default class Home extends Component {

    render() {
        return (
    <div>
    <div className="jumbotron text-center" style={{marginBottom: 0}} >
     <h1>Arkwith Application Starter Template</h1>
     <p>Seek after difference!</p> 
    </div>

    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
     <a className="navbar-brand" href="#">Arkwith</a>
     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span className="navbar-toggler-icon"></span>
     </button>
     <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav">
        <li className="nav-item">
            <a className="nav-link" href="#">Home</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="#">Blog</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="#">Github</a>
        </li>    
        </ul>
     </div>  
    </nav>

    <div className="container" style={{marginTop:"30px"}}>
     <div className="row">
      <div className="col-sm-4">
       <h2>Arkwith</h2>
       <h5>An intelligent knowledge information service provider that fits intellectual imagination of a person and promotes creativity for human.</h5>
       <div className="fakeimg"></div>
       <p>Arkwith try to create a better world with customers and partner.</p>
       
       <h3>Some Links</h3>
       <p>Introducing sites related to Arkwith.</p>
        <ul className="nav nav-pills flex-column">
            <li className="nav-item">
            <a className="nav-link active" href="#">Home</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#">Blog</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#">Github</a>
            </li>
            <li className="nav-item">
            <a className="nav-link disabled" href="#">Disabled</a>
            </li>
        </ul>
        <hr className="d-sm-none"/>
      </div>

      <div className="col-sm-8">
        <h2>Why do you need an Application Starter Template?</h2>
        <h5></h5>
        <p>Recently, many developers are developing application programs using cloud computing environment and machine learning. This phenomenon is required to collect and analyze information scattered throughout the application program development, and through this process, You can write application programs that provide valuable knowledge and information to your customers, In order to provide application programs, we had to face the situation where we have to show results using various complex technologies.</p>
        <p>In the past, the enterprise architecture was a development environment ecosystem led by a leading company focused on major components such as Java, .Net, Database, and Web Application server. But now it has been changed to an open source ecosystem with Linux as the leading open source, such as node.js, python, and react. The diversity of development technology choices has increased, but the knowledge required for discrimination has increased as to which one to choose. Also, it is increasingly complicated and the selection of suitable technology and development using it are becoming more and more difficult.</p>
        <p>The important thing in application development is that the technology architecture and the development language which are adopted and applied to the target domain of the problem domain to be solved are easy to develop the demo application, so that the application for the target domain can be developed and there is no problem in the future operation It should be possible to quickly judge the situation in a relatively short time. And it will be even better if the development technology to be adopted and applied has good reusability and high development productivity so that the time required for development can be shortened to be able to serve customers.</p>
        <p>It is necessary to solve these problems and suggest an alternative to the optimal method.</p>
        <br/>

        <h2>What is the Arkwith Application Starter Template?</h2>
        <h5></h5>
        <p>The Arkwith Application Starter Template is a collection of diverse and complex technical elements required to develop application programs for end users. Without a broad knowledge base, such as a technical architecture or development experience using multiple languages, it is easy to develop application programs with little technical knowledge of Python and JavaScript coding techniques.</p>
        <p>Many companies have their own information systems and databases. There are also a variety of information and knowledge provided by public agencies and corporations on the Internet. The current trend is to integrate information and knowledge from these sources and provide API(Application Programming Interface) services to enable them to be used in various consumers. The API service mainly uses the Restfull API, which is a de facto standard. We need a framework or template that can produce an application program that reflects this trend and provides information and knowledge through various devices such as PC, Tablet, and Smart Phone. And it should be that technology and knowledge are integrated and easy to install and use. Arkwith Application Starter Templates are designed to meet these needs.</p>
        <p>Conceptually, the area where information and knowledge to be served by the Restfull API is collected and managed is called Back-End. And the area where the end user can inquire and collect the knowledge and information from the back-end through the device such as the smart phone that he uses is called the front-end.</p>
        <p>Arkwith Application Starter Template uses related modules such as Python Django and Django Rest Framework for back-end processing, which can be quickly and easily developed based on big data collection and analysis on the Internet, scientific technology calculation, algorithm implementation, machine learning and data information model. And the technology applied to Front-End uses React, Redux of Node.js ecosystem which has good reusability and development productivity based on JavaScript (ES5, ES6). This enables the reuse of screen components to implement new applications related to the user's screen, thereby ensuring development quality and shortening the time required. Mobile First, it is also integrated with Bootstrap, which is most widely used as HTML, CSS (Cascading Style Sheets), and JS (JavaScript) framework.</p>
        <p>As an example application, Using Arkwith Application Starter Template, There is an interpreter application for voice and text chat, and CRUD (Create, Read, Update, Delete) sample application for input, modification and deletion for information processing.</p>
        <br/>

        <h2>How can I use the Arkwith Application Starter Template?</h2>

        <h5>Prerequisites</h5>
        <p>It is assumed that the Python 3 and Node.js development environments have already been installed.</p>

        <h5>Install the Arkwith Application Starter Template.</h5>
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

        <h5>Screenshot</h5>
        <p>Execute as above and open the browser and enter http://127.0.0.1:8000/ in the address bar. Then the following screen is displayed.</p>
        <div className="thumbnail">
         <p><strong>Home tab</strong></p>
         <p>This is the screen displayed on the Home tab.</p>
         <img src={homeImage} alt="Home" width="600" height="400"/>
        </div>
        <br/>
        <div className="thumbnail">
         <p><strong>Chat Translator</strong></p>
         <p>This is the screen displayed on the Chat Translator tab.</p>
         <img src={chatImage} alt="Chat Translator" width="600" height="400"/>
        </div>
        <br/>
        <div className="thumbnail">
         <p><strong>CRUD Sample App. tab</strong></p>
         <p>This is the screen displayed on the CRUD Sample App. tab.</p>
         <img src={crudImage} alt="CRUD Sample App." width="600" height="400"/>
        </div>
        <br/>

      </div>
     </div>
    </div>

    <div className="jumbotron text-center" style={{marginBottom: 0}}>
     <p>In him the whole building is joined together and rises to become a holy temple in the Lord. And in him you too are being built together to become a dwelling in which God lives by his Spirit.(Ephesians 2:21-22)</p>
     <p>They replied, "Believe in the Lord Jesus, and you will be saved--you and your household." (Acts 16:31)</p>
    </div>

    </div>
        )
    }
}