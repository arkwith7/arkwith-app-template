import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import Tooltip from "@material-ui/core/Tooltip";


// import ContentPaste from "@material-ui/icons/ContentPaste";
import Mic from "@material-ui/icons/Mic";
import MessageSend from "@material-ui/icons/Send"

import VoiceRecognition from "../../lib/VoiceRecognition.js"

const styles = ({
    sendMsgArea: {
        width: '95%',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        margin: 10
    },
});

class SendMessage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            message: "",
            voiceRecognitionStart: false,
        };
    }
    //네이버 번역 소스 텍스트의 언어 설정: 
    //(ko:한국어, en:영어, ja:일본어, zh-CN:중국어(간체), zh-TW:중국어(번체)
    //구글 음성인식 및 음성합성 언어코드
    //'한국어',            ['ko-KR']
    //'日本語',           ['ja-JP']
    //'中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
    //'English',         ['en-US', 'United States']
    
    //end of speech recognition
    onEnd = () => {
        this.setState({ 
            voiceRecognitionStart: false, 
        })
    }
    
    //result of speech recognition
    onResult = ({ finalTranscript }) => {
        const result = finalTranscript
    
        this.setState({ 
            message: result,
            voiceRecognitionStart: false, 
        })
        //this.props.action('result')(finalTranscript)
        console.log("result:",result)
        console.log("message : ",this.state.message);
        console.log("source language code :",this.props.selectedSourceLanguage)
        this.props.onSubmit(this.state.message);
        this.resetForm();

    }
    
    //error of speech recognition
    onERROR = (event) => {
        this.setState({ 
            voiceRecognitionStart: false, 
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

        console.log("error of speech recognition : ", event.error)
        console.log("error of speech recognition : ", event.message)
        //alert("There was a speech recognition error. \
        //        Please check translation language setting or network connection status.")
    }
    
    clickVoiceRecognition() {
        this.setState({voiceRecognitionStart: true })

        if (!('webkitSpeechRecognition' in window)) {
            window.alert("Web Speech Recognition is not support!")
            this.setState({voiceRecognitionStart: false })
        }
    }
    resetForm = () => {
        this.setState({message: "", });
        if (this.props.translationStatusCode === 500) {
            window.alert("Server Error!")
        }
    }
    
    submitMessage(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.message);
        this.resetForm();
    }


    render() {
        const { classes } = this.props;
        const iconOnStyle = { color: 'red' };
        const iconStyle = { color: 'inherit' };

        return (
            <form onSubmit={(e) => this.submitMessage(e)} >
                <div className={classes.sendMsgArea}>
                    <Tooltip title="Speech recognition">
                        <IconButton
                            name="mic"
                            onClick={() => this.clickVoiceRecognition()}
                            style={this.state.voiceRecognitionStart ? iconOnStyle : iconStyle}
                        >
                            <Mic />
                        </IconButton>
                    </Tooltip>
                    {this.state.voiceRecognitionStart && (
                        <VoiceRecognition
                            onStart={this.onStart}
                            onResult={this.onResult}
                            onEnd={this.onEnd}
                            onError={(e) => this.onERROR(e)}
                            continuous={true}
                            lang={this.props.selectedSourceLanguage}
                        />
                    )}
                    <TextField
                        id="input"
                        value={this.state.message}
                        onChange={(e) => this.setState({ message: e.target.value })}
                        placeholder="Type your message here..."
                        fullWidth={true}
                    />
                    <IconButton style={iconStyle} type="submit" name="send" >
                        <MessageSend />
                    </IconButton>
                </div>
            </form>
        );
    }
}
const mapStateToProps = state => {
    return {
        selectedSourceLanguage: state.chats.translationSettings.selectedSourceLanguage,
        selectedTargetLanguage: state.chats.translationSettings.selectedTargetLanguage,
        translationStatusCode: state.chats.translationStatus.code,
        translationStatusMessage: state.chats.translationStatus.message,
    };
}


SendMessage.propTypes = {
    classes: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
};

export default connect(mapStateToProps)(withStyles(styles)(SendMessage));
