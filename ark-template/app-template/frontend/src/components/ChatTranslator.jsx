import React, {Component} from "react";
import ReactDOM from 'react-dom';
import { connect } from "react-redux"

import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Button, ButtonGroup, 
    Form, FormGroup, Label, InputGroup, Input, CustomInput,
    Card, CardHeader, CardFooter,//, CardBody
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import VoicePlayer from '../lib/VoicePlayer.js'
import VoiceRecognition from "../lib/VoiceRecognition.js"
import { chats } from "../actions";

class ChatTranslator extends Component {

    //네이버 번역 소스 텍스트의 언어 설정: 
    //(ko:한국어, en:영어, ja:일본어, zh-CN:중국어(간체), zh-TW:중국어(번체)
    //구글 음성인식 및 음성합성 언어코드
    //'한국어',            ['ko-KR']
    //'日本語',           ['ja-JP']
    //'中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
    //'English',         ['en-US', 'United States']
    state = {
        source: "ko",
        target: "en",
        username: "ark-user",
        message: "",
        voiceRecognitionStart: false,
        voiceRecognitionStop: false,

    }
    
    //end of speech recognition
    onEnd = () => {
        this.setState({ 
            voiceRvoiceRecognitionStart: false, 
            voiceRvoiceRecognitionStop: false,
        })
        //this.props.action('end')()
        console.log("voiceRvoiceRecognitionStart:",this.state.voiceRvoiceRecognitionStart)
        console.log("end of speech recognition")
    }
    
    //result of speech recognition
    onResult = ({ finalTranscript }) => {
        const result = finalTranscript
    
        this.setState({ 
            message: result,
            voiceRvoiceRecognitionStart: false, 
            voiceRvoiceRecognitionStop: false,
        })
        //this.props.action('result')(finalTranscript)
        console.log("result:",result)
        this.props.requestTranslation(this.state.username, this.state.message);
        this.props.getTranslation(
            this.state.source,
            this.state.target,
            this.state.message
        ).then(this.resetForm);

    }
    
    
    componentDidMount() {
        //alert(this.props.dropdownOpen);
        this.props.getTranslation(
            this.state.source,
            this.state.target,
            "채팅 번역 앱을 사용해 주셔서 감사합니다."
        );
        this.scrollToBot();
    }
    componentDidUpdate() {
        //console.log("componentDidUpdate");
        this.scrollToBot();
    }

    scrollToBot() {
        // //스크롤이 항상 최신 대화가 보이도록 대화메시지 출력후 맨아래로 설정
        ReactDOM.findDOMNode(this.refs.panelBody).scrollTop = ReactDOM.findDOMNode(this.refs.panelBody).scrollHeight;
    }


    resetForm = () => {
        this.setState({message: "", });
    }
    
    restartChatting = () => {
        console.log("Restart Chatting...");
        this.props.restartChatting();
        this.props.getTranslation(
            this.state.source,
            this.state.target,
            "채팅 번역 앱을 사용해 주셔서 감사합니다."
        );
        this.scrollToBot();

    }

    submitMessage(e) {
        e.preventDefault();
        console.log("message : ",this.state.message);
        this.props.requestTranslation(this.state.username, this.state.message);
        this.props.getTranslation(
            this.state.source,
            this.state.target,
            this.state.message
        ).then(this.resetForm);
        //this.setState({message: "", });
    }

    submitTranslationSettings(e) {
        e.preventDefault();
        this.props.openModal();
        this.setState({
            source: this.props.selectedSourceLanguage, 
            target: this.props.selectedTargetLanguage,
        });

        console.log("Voice Source : ",this.setVoiceLanguage(this.props.selectedSourceLanguage));
        console.log("Voice Target : ",this.setVoiceLanguage(this.props.selectedTargetLanguage));
        console.log("Translation Source : ",this.props.selectedSourceLanguage);
        console.log("Translation Target : ",this.props.selectedTargetLanguage);
    }
    // change language code from naver to google  
    setVoiceLanguage = (selectedLanguage) => {
 
        if (selectedLanguage === 'ko') {
            return 'ko-KR';
        } else if (selectedLanguage === 'en') {
            return 'en-US'
        } else if (selectedLanguage === 'ja') {
            return 'ja-JP'
        } else if (selectedLanguage === 'zh-CN') {
            return 'cmn-Hans-CN'
        }
    }

    render() {
        const username = "Translator Bot";
        const leftImage = "http://placehold.it/50/55C1E7/fff";
        const rightImage = "http://placehold.it/50/FA6F57/fff";
        const iconOnStyle = { color: 'red' };//white
        const iconOffStyle = { color: 'white' };//white

        return(
            <div>
            <Form onSubmit={(e) => this.submitMessage(e)} >
            <Card className="chat-panel">
                <CardHeader>
                    <i className="fa fa-comments fa-fw"></i> Chat
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
{/*---------------
                <CardBody >
                </CardBody>

---------------*/}
			    <div className="panel-body card-body" ref="panelBody">
                    <ul className="chat">
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
                                                <i className="fa fa-clock-o fa-fw"></i> {chat.messageTime}
                                            </small>
                                            <VoicePlayer    
                                                play
                                                lang= {this.setVoiceLanguage(this.props.selectedTargetLanguage)}
                                                text= {chat.content}
                                            />
                                        </div>
                                    )
                                } else {
                                    return( 
                                        <div className="header">
                                            <small className=" text-muted">
                                                <i className="fa fa-clock-o fa-fw"></i> {chat.messageTime}
                                            </small>
                                            <strong className="float-right primary-font">{chat.username}</strong>
                                            {/*
                                            <VoicePlayer    
                                                play
                                                lang= "ko-KR"
                                                text= {chat.content}
                                            />
                                            */}
                                        </div>
                                    )
                                }
                                })()
                            }
                                <p>{chat.content}</p>
                            </div>                     
                        </li>
                    ))}
                   </ul>
                </div>
                <CardFooter>
                    <InputGroup>
                        <Button className="btn btn-sm" id="btnMicrophone" type="button" value="microphone" 
                        onClick={() => this.setState({voiceRvoiceRecognitionStart: true })} data-toggle="tooltip" data-placement="bottom" title="음성채팅" >
                            <i className="fa fa-microphone fa-fw" style={this.state.voiceRvoiceRecognitionStart ? iconOnStyle : iconOffStyle} ></i></Button> 
                            {this.state.voiceRvoiceRecognitionStart && (
                            <VoiceRecognition
                                onStart={this.onStart}
                                onResult={this.onResult}
                                onEnd={this.onEnd}
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
            <Form name="modalForm" onSubmit={(e) => this.submitTranslationSettings(e)}>
                <ModalHeader toggle={() => { this.props.openModal(); }}>Translation settings</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                        <Label for="Translation Source language">Your language</Label>
                        <div>
                            <CustomInput type="radio" id="S-en-US" name="Source" label="English(United States)" 
                                value="en"
                                checked={this.props.selectedSourceLanguage === 'en'} 
                                onChange={(e) => this.props.selectedSourceLang(e.target.value)} 
                            />
                            <CustomInput type="radio" id="S-ko-KR" name="Source" label="한국어" 
                                value="ko"
                                checked={this.props.selectedSourceLanguage === 'ko'} 
                                onChange={(e) => this.props.selectedSourceLang(e.target.value)} 
                            />
                            <CustomInput type="radio" id="S-cmn-Hans-CN" name="Source" label="普通话(中国大陆)" 
                                value="zh-CN"
                                checked={this.props.selectedSourceLanguage === 'zh-CN'} 
                                onChange={(e) => this.props.selectedSourceLang(e.target.value)} 
                            />
                            <CustomInput type="radio" id="S-ja-JP" name="Source" label="日本語" 
                                value="ja"
                                checked={this.props.selectedSourceLanguage === 'ja'} 
                                onChange={(e) => this.props.selectedSourceLang(e.target.value)} 
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
                                onChange={(e) => this.props.selectedTargetLang(e.target.value)} 
                            />
                            <CustomInput type="radio" id="T-ko-KR" name="Target" label="한국어" 
                                value="ko"
                                checked={this.props.selectedTargetLanguage === 'ko'} 
                                onChange={(e) => this.props.selectedTargetLang(e.target.value)} 
                            />
                            <CustomInput type="radio" id="T-cmn-Hans-CN" name="Target" label="普通话(中国大陆)" 
                                value="zh-CN"
                                checked={this.props.selectedTargetLanguage === 'zh-CN'} 
                                onChange={(e) => this.props.selectedTargetLang(e.target.value)} 
                            />
                            <CustomInput type="radio" id="T-ja-JP" name="Target" label="日本語" 
                                value="ja"
                                checked={this.props.selectedTargetLanguage === 'ja'} 
                                onChange={(e) => this.props.selectedTargetLang(e.target.value)} 
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
            </Modal>
        </div>
)
    }
}


const mapStateToProps = state => {
    return {
        dropdownOpen: state.chats.dropdownOpen,
        modal: state.chats.modal,
        selectedSourceLanguage: state.chats.translationSettings.selectedSourceLanguage,
        selectedTargetLanguage: state.chats.translationSettings.selectedTargetLanguage,
        chatList: state.chats.chatList,
    };
}
  
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
        selectedSourceLang: (sourceLang) => {
            return dispatch(chats.selectedSourceLang(sourceLang));
        },
        selectedTargetLang: (targetLang) => {
            return dispatch(chats.selectedTargetLang(targetLang));
        },
        requestTranslation: (username, message) => {
            return dispatch(chats.requestTranslation(username, message));
        },
        getTranslation: (source, target, message) => {
            return dispatch(chats.getTranslation(source, target, message));
        },
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ChatTranslator);
