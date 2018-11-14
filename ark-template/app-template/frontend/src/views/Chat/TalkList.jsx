import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Avatar from '@material-ui/core/Avatar';

import { chats } from "../../actions";

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
  
    pullRight: {
        float: 'right'
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
    }
    componentDidUpdate() {
        console.log("componentDidUpdate");
        this.scrollToBot();
    }
    scrollToBot() {
        // //스크롤이 항상 최신 대화가 보이도록 대화메시지 출력후 맨아래로 설정
        ReactDOM.findDOMNode(this.refs.panelBody).scrollTop = ReactDOM.findDOMNode(this.refs.panelBody).scrollHeight;
        //this.setState({voicePlaySwitch: true })
        // console.log("voicePlaySwitch : ",this.state.voicePlaySwitch);
    }
    
    render() {
        const { classes, botName, userAvatarUrl, botAvatarUrl } = this.props;
        const lastTalkIndex = this.props.chatList.length - 1;

        return (
            <Paper className={classes.paperChatBody} ref="panelBody">
                <ul className={classes.chatTalkList}>
                    {this.props.chatList.map((chat, index) => (
                        <div key={index}>
                            <Talk botName={botName}
                                avatarUrl={`${botName === chat.username ? botAvatarUrl : userAvatarUrl}`}
                                chat={chat}
                                classes={classes}
                            />
                            {((botName === chat.username) && (lastTalkIndex === index) && !(index === 0)) &&
                                <VoicePlayer
                                    play
                                    text={chat.content}
                                    lang={chats.setVoiceLanguage(chat.languageCode)}
                                />
                            }

                        </div>
                    ))}
                </ul>
            </Paper>
        );
  }
}

{/**
                        (() => {
                            if (botName === chat.username) {
                                return (
                                    <li key={index} className={classes.chatLiLeft}>
                                        <span className={`chat-img ${classes.pullLeft} `}>
                                            <Avatar alt={`${chat.username}'s avatar pic`}
                                                src={botAvatarUrl} className={classes.avatar} />
                                        </span>
                                        <div className={classes.chatTalkBody}>
                                            <div>
                                                <div className="header">
                                                    <strong className="primary-font">{chat.username}</strong>
                                                    <small className={classes.pullRight}>
                                                        <p className={classes.textMuted}>
                                                            [{this.displayCurrentLanguage(chat.languageCode)}]
                                                            <i className="fa fa-clock-o fa-fw"></i>
                                                             {chat.messageTime}
                                                        </p>
                                                    </small>
                                                    {(lastTalkIndex && !(index === 0)) && (
                                                        <VoicePlayer
                                                            play
                                                            text={chat.content}
                                                            lang={this.setVoiceLanguage(chat.languageCode)}
                                                        />
                                                    )}
                                                </div>
                                                <div className={classes.responseTalkBox}>
                                                    <p>{chat.content}</p>
                                                </div>
                                                <div className={classes.clear}></div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            } else {
                                return (
                                    <li key={index} className={classes.chatLiRight}>
                                        <span className={`chat-img ${classes.pullRight} `}>
                                            <Avatar alt={`${chat.username}'s avatar pic`}
                                                src={userAvatarUrl} className={classes.avatar} />
                                        </span>
                                        <div className={classes.chatTalkBody}>
                                            <div>
                                                <div className="header">
                                                    <small className={classes.textMuted}>
                                                        <i className="fa fa-clock-o fa-fw"></i> {chat.messageTime}
                                                        [{this.displayCurrentLanguage(chat.languageCode)}]
                                                    </small>
                                                    <strong className={classes.pullRight}>{chat.username}</strong>
                                                </div>
                                                <div className={classes.sendTalkBox}>
                                                    <p>{chat.content}</p>
                                                </div>
                                                <div className={classes.clear}></div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                        })()

*/}


const Talk = withStyles(styles)(({ botName, avatarUrl, chat, classes }) => {
    const {
      username,
      messageTime,
      content,
      languageCode,
    } = chat;
    if (botName === username) {
        return (
            <li className={classes.chatLiLeft}>
                <span className={`chat-img ${classes.pullLeft} `}>
                    <Avatar alt={`${username}'s avatar pic`}
                        src={avatarUrl} className={classes.avatar} />
                </span>
                <div className={classes.chatTalkBody}>
                    <div>
                        <div className="header">
                            <strong className="primary-font">{username}</strong>
                            <small className={classes.pullRight}>
                                <p className={classes.textMuted}>
                                    [{chats.displayCurrentLanguage(languageCode)}]
                                    <i className="fa fa-clock-o fa-fw"></i>
                                    {messageTime}
                                </p>
                            </small>
                        </div>
                        <div className={classes.responseTalkBox}>
                            <p>{chat.content}</p>
                        </div>
                        <div className={classes.clear}></div>
                    </div>
                </div>
            </li>
        )
    } else {
        return (
            <li className={classes.chatLiRight}>
                <span className={`chat-img ${classes.pullRight} `}>
                    <Avatar alt={`${username}'s avatar pic`}
                        src={avatarUrl} className={classes.avatar} />
                </span>
                <div className={classes.chatTalkBody}>
                    <div>
                        <div className="header">
                            <small className={classes.textMuted}>
                                <i className="fa fa-clock-o fa-fw"></i> {messageTime}
                                [{chats.displayCurrentLanguage(languageCode)}]
                                                    </small>
                            <strong className={classes.pullRight}>{username}</strong>
                        </div>
                        <div className={classes.sendTalkBox}>
                            <p>{content}</p>
                        </div>
                        <div className={classes.clear}></div>
                    </div>
                </div>
            </li>
        )
    }

});
  
const mapStateToProps = state => {
    return {
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
  