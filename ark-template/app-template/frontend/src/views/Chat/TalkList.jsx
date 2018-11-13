import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Avatar from '@material-ui/core/Avatar';

import VoicePlayer from "../../lib/VoicePlayer.js"

const styles = {
         
    avatar: {
        margin: 10,
    },
    
    paperChatPanel: {
//        width: '80vw',
        height: '80vh',
//        maxWidth: '400px',
        maxHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative'
    },
    paperChatBody: {
        width: 'calc( 100% - 20px )', 
        margin: 10,
        overflowY: 'scroll', 
        height: 'calc( 100% - 80px )'
    },
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
    chatTalkList: {
        margin: 0,
        marginRight: '5px',
        padding: 0,
        listStyle: 'none'
    },
    chatLiLeft: {
        marginLeft: 0,
        marginBottom: '10px',
        paddingBottom: '5px',
        borderBottom: '1px dotted #999999'
    },
    chatLiRight: {
        marginRight: 0,
        marginBottom: '10px',
        paddingBottom: '5px',
        borderBottom: '1px dotted #999999'
    },
    chatTalkBody: {
        marginLeft: '60px',
        marginRight: '60px'
    },

    pullLeft: {
        float: 'left'
    },
  
    floatRight: {
        float: 'right !important'
    },
  
    textMuted: {
        color: '#868e96 !important'
    },

    sendTalkBox: {
        border: '0px solid orange', 
        borderRadius: '20px 0px 20px 20px',
        margin: '2px 0px 2px 0px', 
        padding: '2px', 
        background: '#06b79a',
        color: '#fff',
        float: 'right',
        borderTopRightRadius: 0
    },

    responseTalkBox: {
        border: '0px solid orange', 
        borderRadius: '0px 20px 20px 20px',
        margin: '2px 0px 2px 0px', 
        padding: '2px', 
        background: '#efefef',
        color: '#6f6f6f',
        float: 'left',
        borderTopLeftRadius: 0
    },
    clear: {
        clear: 'both'
    }   
};

class TalkList extends React.Component {
    constructor(props) {
        super();
        this.state = {
            voicePlaySwitch: false,
            listLength: 0,
        };
    }
    componentDidMount() {
        console.log("componentDidMount");
        this.setState({listLength: this.props.chatList.length })
    }
    componentDidUpdate() {
        console.log("componentDidUpdate");
        console.log("this.state.listLength : ", this.state.listLength);
        console.log("this.props.chatList.length : ", this.props.chatList.length);
        if (this.props.chatList.length > this.state.listLength) {
            this.setState({listLength: this.props.chatList.length })
            this.setState({voicePlaySwitch: true })
        }
        this.scrollToBot();
    }
    scrollToBot() {
        // //스크롤이 항상 최신 대화가 보이도록 대화메시지 출력후 맨아래로 설정
        ReactDOM.findDOMNode(this.refs.panelBody).scrollTop = ReactDOM.findDOMNode(this.refs.panelBody).scrollHeight;
        //this.setState({voicePlaySwitch: true })
        console.log("voicePlaySwitch : ",this.state.voicePlaySwitch);
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
        const { classes, botName, userAvatarUrl, botAvatarUrl } = this.props;

        return (
            <Paper className={classes.paperChatBody} ref="panelBody">
                <ul className={classes.chatTalkList}>
                    {this.props.chatList.map((chat, index) => (
                        <li key={index} className={`${botName === chat.username ? classes.chatLiRight : classes.chatLiLeft} `}>
                            <span className={`chat-img ${botName === chat.username ? classes.pullLeft : classes.floatRight} `}>
                                <Avatar alt={`${chat.username}'s avatar pic`} 
                                        src={`${botName === chat.username ? botAvatarUrl : userAvatarUrl}`} className={classes.avatar} />
                            </span>
                            <div className={classes.chatTalkBody}>
                                {
                                    (() => {
                                        if (botName === chat.username) {
                                            return (
                                                <div>
                                                    <div className="header">
                                                        <strong className="primary-font">{chat.username}</strong>
                                                        <small className={classes.floatRight}>
                                                            <p className={classes.textMuted}>
                                                                [{this.displayCurrentLanguage(chat.languageCode)}]
                                                <i className="fa fa-clock-o fa-fw"></i> {chat.messageTime}
                                                            </p>
                                                        </small>
                                                        {(this.state.voicePlaySwitch && !(index === 0)) && (
                                                            <VoicePlayer
                                                                play
                                                                text={chat.content}
                                                                lang={this.setVoiceLanguage(this.props.selectedTargetLanguage)}
                                                            />
                                                        )}
                                                    </div>
                                                    <div className={classes.responseTalkBox}>
                                                        <p>{chat.content}</p>
                                                    </div>
                                                    <div className={classes.clear}></div>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div>
                                                    <div className="header">
                                                        <small className={classes.textMuted}>
                                                            <i className="fa fa-clock-o fa-fw"></i> {chat.messageTime}
                                                            [{this.displayCurrentLanguage(chat.languageCode)}]
                                            </small>
                                                        <strong className={classes.floatRight}>{chat.username}</strong>
                                                        {/*
                                            <VoicePlayer    
                                                play
                                                lang= "ko-KR"
                                                text= {chat.content}
                                            />
                                            */}
                                                    </div>
                                                    <div className={classes.sendTalkBox}>
                                                        <p>{chat.content}</p>
                                                    </div>
                                                    <div className={classes.clear}></div>
                                                </div>
                                            )
                                        }
                                    })()
                                }
                            </div>
                        </li>
                    ))}
                </ul>
            </Paper>
        );
  }
}

const mapStateToProps = state => {
    return {
        selectedSourceLanguage: state.chats.translationSettings.selectedSourceLanguage,
        selectedTargetLanguage: state.chats.translationSettings.selectedTargetLanguage,
        chatList: state.chats.chatList,
    };
}

TalkList.propTypes = {
    classes: PropTypes.object.isRequired,
    botName: PropTypes.string,
    userAvatarUrl: PropTypes.string,
    botAvatarUrl: PropTypes.string,
};
  
export default connect(mapStateToProps)(withStyles(styles)(TalkList));
  