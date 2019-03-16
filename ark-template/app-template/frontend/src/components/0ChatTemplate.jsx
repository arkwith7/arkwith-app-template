// This is a Chatting App Components template that 
// sends a message and receives a response by text or voice.
// To use this one, you can rename the class name, ChatTemplate
// and add the your logic.
import React, {Component} from "react";
import ReactDOM from 'react-dom';

// Redux
import { connect } from "react-redux"

// Bootstrap4
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Button, ButtonGroup, 
    Form, FormGroup, Label, InputGroup, Input, CustomInput,
    Card, CardHeader, CardFooter,//, CardBody
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

//Add Action for this application here.
import { chats } from "../actions";

//Add library for this application here
import VoicePlayer from '../lib/VoicePlayer.js'
import VoiceRecognition from "../lib/VoiceRecognition.js"

//Rename ChatTemplate into your components class name.
class ChatTemplate extends Component {

    //Declares a variable that represents the changing state value 
    // of the displayed screen
    state = {
        username: "ark-user",
        message: "",
        voiceRecognitionStart: false,
        voicePlaySwitch: false,

    }
    
    //end of speech recognition 
    //when inputting a message by voice by clicking the microphone button.
    onEnd = () => {
        this.setState({ 
            voiceRvoiceRecognitionStart: false, 
        })
    }
    
    //result of speech recognition
    //when inputting a message by voice by clicking the microphone button.
    onResult = ({ finalTranscript }) => {
        const result = finalTranscript
    
        this.setState({ 
            message: result,
            voiceRvoiceRecognitionStart: false, 
            voicePlaySwitch: true,
        })

        // add your logic for processing data from Back-End

    }
    
    //error of speech recognition
    //when inputting a message by voice by clicking the microphone button.
    onERROR = (event) => {
        this.setState({ 
            voiceRvoiceRecognitionStart: false, 
        })
        if (event.error === 'network') {
            window.alert("Please check network connection status.")
        } else if (event.error === 'no-speech') {
            window.alert("You did not say anything.")
        } else if (event.error === 'audio-capture') {
            window.alert("You need a microphone.")
        } else if (event.error === 'not-allowed') {
            window.alert("You did not click the allow button.")
        }

    }
    
    //when clicking the microphone button.
    clickVoiceRecognition() {
        this.setState({voiceRvoiceRecognitionStart: true })

        if (!('webkitSpeechRecognition' in window)) {
            window.alert("Web Speech Recognition is not support!")
            this.setState({voiceRvoiceRecognitionStart: false })
        }
    }

    // Reading data from back-end when this component first starts.
    componentDidMount() {
        // add your logic for processing data from Back-End

        //On the chat screen, scroll to the most recent message.
        this.scrollToBot();
    }

    // when updated a message on chat screen
    componentDidUpdate() {
        //On the chat screen, scroll to the most recent message.
        this.scrollToBot();
    }
    
    //Scroll to the bottom of the conversation message 
    //so that the conversation is always up-to-date.
    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.panelBody).scrollTop = ReactDOM.findDOMNode(this.refs.panelBody).scrollHeight;
    }

    //clear the message on input form.
    resetForm = () => {
        this.setState({message: "", });
        //console.log("Translation Status Code : ", this.props.translationStatusCode)
        //console.log("Translation Status Message : ", this.props.translationStatusMessage)
        if (this.props.translationStatusCode === 500) {
            window.alert("Server Error!")
        }
    }
    
    //Clears and initializes all messages on the chat screen.
    restartChatting = () => {
        console.log("Restart Chatting...");
        this.props.restartChatting();

        // add your logic for processing data from Back-End

        this.scrollToBot();

    }

    //Request a response from the back-end.
    submitMessage(e) {
        this.setState({voicePlaySwitch: true })
        e.preventDefault();

        // add your logic for processing data from Back-End

    }

    //Set up modal chat apps environment.
    submitLanguageSettings(e) {
        e.preventDefault();
        this.props.openModal();

        // add your logic for setting chat apps environment here.

    }
    // change language code from the code you use to Google.  
    setVoiceLanguage = (selectedLanguage) => {
 
        if (selectedLanguage === 'ko') {
            return 'ko-KR';
        } else if (selectedLanguage === 'en') {
            return 'en-US'
        } else if (selectedLanguage === 'ja') {
            return 'ja-JP'
        } else if (selectedLanguage === 'zh-CN') {
            return 'zh-CN'//'cmn-Hans-CN'
        }
    }

    // Display current language.
    displayCurrentLanguage = (selectedLanguage) => {
 
        if (selectedLanguage === 'ko') {
            return '한국어';
        } else if (selectedLanguage === 'en') {
            return 'English(United States)'
        } else if (selectedLanguage === 'ja') {
            return '日本語'
        } else if (selectedLanguage === 'zh-CN') {
            return '普通话(中国大陆)'
        }
    }

    render() {
        // response user name
        const username = "Translator Bot";
        // my avatar, image
        const leftImage = "http://placehold.it/50/55C1E7/fff";
        // response user's avatar, image
        const rightImage = "http://placehold.it/50/FA6F57/fff";
        //microphone icon on color of speeking
        const iconOnStyle = { color: 'red' };
        //microphone icon off color of normal
        const iconOffStyle = { color: 'white' };

        return(
            <div>
            <Form onSubmit={(e) => this.submitMessage(e)} >
            <Card className="chat-panel">
                <CardHeader>
                    <i className="fa fa-comments fa-fw"></i> Chat &nbsp;&nbsp;&nbsp;&nbsp;
                    [{this.displayCurrentLanguage(this.props.selectedSourceLanguage)}]&nbsp;
                    <i className="fa fa-arrow-circle-right"></i>&nbsp;
                    [{this.displayCurrentLanguage(this.props.selectedTargetLanguage)}]
                    <ButtonGroup className="float-right">
                        <ButtonDropdown isOpen={this.props.dropdownOpen} 
                                        toggle={() => { this.props.dropdownButtonToggle(); }}>
                            <DropdownToggle caret>
                            </DropdownToggle>
                            <DropdownMenu>
                            <DropdownItem header>Chat Configuration</DropdownItem>
                            <DropdownItem onClick={() => { this.restartChatting(); }}>
                                <i className="fa fa-refresh fa-fw"></i> Restart
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={() => { this.props.openModal(); }}>
                                <i className="fa fa-cog fa-fw"></i> Settings
                            </DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </ButtonGroup>
                </CardHeader>
			    <div className="panel-body card-body" ref="panelBody">
                    <ul className="chat">
                {/*
                Please write here the logic to display the chat messages you send and receive.
                Like the example code below. 

                    {this.props.chatList.map((chat, index) => (
                        <li key={index} className={`${username === chat.username ? "right " : "left "} clearfix`}>
                            <span className={`chat-img ${username === chat.username ? " float-right " : " pull-left "} clearfix`}>
                                <img src={`${username === chat.username ? rightImage : leftImage}`} alt={`${chat.username}'s avatar pic`} 
                                className="rounded-circle"
                                />
                            </span>
                            <div className="chat-body clearfix">
                            {
                                (() => {
                                if (username === chat.username) {
                                    return( 
                                        <div className="header">
                                            <strong className="primary-font">{chat.username}</strong>
                                            <small className="float-right text-muted">
                                                [{this.displayCurrentLanguage(this.props.selectedTargetLanguage)}]
                                                <i className="fa fa-clock-o fa-fw"></i> {chat.messageTime}
                                            </small>
                                            {(this.state.voicePlaySwitch && !(index === 0)) && (
                                            <VoicePlayer    
                                                play
                                                lang= {this.setVoiceLanguage(this.props.selectedTargetLanguage)}
                                                text= {chat.content}
                                            />
                                            )}
                                        </div>
                                    )
                                } else {
                                    return( 
                                        <div className="header">
                                            <small className=" text-muted">
                                                <i className="fa fa-clock-o fa-fw"></i> {chat.messageTime}
                                                [{this.displayCurrentLanguage(this.props.selectedSourceLanguage)}]
                                            </small>
                                            <strong className="float-right primary-font">{chat.username}</strong>
                                        </div>
                                    )
                                }
                                })()
                            }
                                <p>{chat.content}</p>
                            </div>                     
                        </li>
                    ))}

                */}


                   </ul>
                </div>
                <CardFooter>
                    <InputGroup>
                        <Button className="btn btn-sm" id="btnMicrophone" type="button" value="microphone" 
                        onClick={ () => this.clickVoiceRecognition() } data-toggle="tooltip" data-placement="bottom" title="음성채팅" >
                            <i className="fa fa-microphone fa-fw" style={this.state.voiceRvoiceRecognitionStart ? iconOnStyle : iconOffStyle} ></i></Button> 
                            {this.state.voiceRvoiceRecognitionStart && (
                            <VoiceRecognition
                                onStart={this.onStart}
                                onResult={this.onResult}
                                onEnd={this.onEnd}
                                onError={(e) => this.onERROR(e)}
                                continuous={true}
                                lang={this.setVoiceLanguage(this.props.selectedSourceLanguage)}
                            />
                            )}

                        <Input className="form-control input-sm" type="text" 
                        name="message" id="txtMessage" 
                        placeholder="Type your message here..." 
                        value={this.state.message}
                        onChange={(e) => this.setState({message: e.target.value})}
                        />
                        <Button className="btn btn-sm btn-default" type="submit" name="send" id="send" >Send</Button>
				    </InputGroup> 

                </CardFooter>
            </Card>

            </Form>
            <Modal isOpen={this.props.modal} toggle={() => { this.props.openModal(); }} className={this.props.className} >
            {/*
            Please write the logic for configuring your chat app here.
            Like the example code below. 

            <Form name="modalForm" onSubmit={(e) => this.submitLanguageSettings(e)}>
                <ModalHeader toggle={() => { this.props.openModal(); }}>Translation settings</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                        <Label for="Translation Source language">Your language</Label>
                        <div>
                            <CustomInput type="radio" id="S-en-US" name="Source" label="English(United States)" 
                                value="en"
                                checked={this.props.selectedSourceLanguage === 'en'} 
                                onChange={(e) => this.props.setSourceLang(e.target.value)} 
                            />
                            <CustomInput type="radio" id="S-ko-KR" name="Source" label="한국어" 
                                value="ko"
                                checked={this.props.selectedSourceLanguage === 'ko'} 
                                onChange={(e) => this.props.setSourceLang(e.target.value)} 
                            />
                            <CustomInput type="radio" id="S-cmn-Hans-CN" name="Source" label="普通话(中国大陆)" 
                                value="zh-CN"
                                checked={this.props.selectedSourceLanguage === 'zh-CN'} 
                                onChange={(e) => this.props.setSourceLang(e.target.value)} 
                            />
                            <CustomInput type="radio" id="S-ja-JP" name="Source" label="日本語" 
                                value="ja"
                                checked={this.props.selectedSourceLanguage === 'ja'} 
                                onChange={(e) => this.props.setSourceLang(e.target.value)} 
                            />
                            <CustomInput type="radio" id="S-vi-VN" name="Source" label="Tiếng Việt(Việt Nam)" disabled={true} />
                        </div>
                        </FormGroup>
                        <FormGroup>
                        <Label for="Translation Target language">Translator Bot language</Label>
                        <div>
                            <CustomInput type="radio" id="T-en-US" name="Target" label="English(United States)" 
                                value="en"
                                checked={this.props.selectedTargetLanguage === 'en'} 
                                onChange={(e) => this.props.setTargetLang(e.target.value)} 
                            />
                            <CustomInput type="radio" id="T-ko-KR" name="Target" label="한국어" 
                                value="ko"
                                checked={this.props.selectedTargetLanguage === 'ko'} 
                                onChange={(e) => this.props.setTargetLang(e.target.value)} 
                            />
                            <CustomInput type="radio" id="T-cmn-Hans-CN" name="Target" label="普通话(中国大陆)" 
                                value="zh-CN"
                                checked={this.props.selectedTargetLanguage === 'zh-CN'} 
                                onChange={(e) => this.props.setTargetLang(e.target.value)} 
                            />
                            <CustomInput type="radio" id="T-ja-JP" name="Target" label="日本語" 
                                value="ja"
                                checked={this.props.selectedTargetLanguage === 'ja'} 
                                onChange={(e) => this.props.setTargetLang(e.target.value)} 
                            />
                            <CustomInput type="radio" id="T-vi-VN" name="Target" label="Tiếng Việt(Việt Nam)" disabled={true} />
                        </div>
                        </FormGroup>
                    </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit" >Ok</Button>{' '}
                    <Button color="secondary" onClick={() => { this.props.openModal(); }}>Cancel</Button>
                </ModalFooter>
            </Form>

            */}
            </Modal>
            </div>
        )
    }
}


//The state to be globally referenced between components and components.
//This one is an application state variable that is used by a reducer 
//to set a variable handled by a specific action.
const mapStateToProps = state => {
    return {
        dropdownOpen: state.chats.dropdownOpen,
        modal: state.chats.modal,
        // add here your state variable that is used by a reducer for this application.
    };
}
  
//Declare a function that sends an action from one component to another.
//This one is action function of actions folder for this application
const mapDispatchToProps = dispatch => {
    return {
        dropdownButtonToggle: () => {
            return dispatch(chats.dropdownButtonToggle());
        },
        openModal: () => {
            return dispatch(chats.openModal());
        },
        restartChatting: () => {
            return dispatch(chats.restartChatting());
        },
        // add here your action function for this application.
    };
}
  
//Rename ChatTemplate into your components class name.
export default connect(mapStateToProps, mapDispatchToProps)(ChatTemplate);