import React, {Component} from "react";
import { connect } from "react-redux"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


// import ContentPaste from "@material-ui/icons/ContentPaste";
import ArrowRight from "@material-ui/icons/ArrowRight";
import MoreVertIcon from '@material-ui/icons/MoreVert';

// core components
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";

import LanguageSettingDialog from "./LanguageSettingDialog.jsx"
import TalkList from "./TalkList.jsx"
import SendMessage from "./SendMessage.jsx"

import { chats } from "../../actions";

const styles = {
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
          color: "#777",
          fontSize: "65%",
          fontWeight: "400",
          lineHeight: "1"
        }
    },
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
        display: "inline-flex",
        verticalAlign: "middle"
    
    },
           
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

class ChatTranslator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            openDialog: false,
            source: "ko",
            target: "en",
            username: "ark-user",
            message: "",
            voicePlaySwitch: false,
    
        }
    }
    componentDidMount() {
        //alert(this.props.dropdownOpen);
        this.props.getTranslation(
            this.state.source,
            this.state.target,
            "채팅 번역 앱을 사용해 주셔서 감사합니다."
        );
    }

    componentWillUnmount() {
        console.log("컴포넌트가 언마운트 됩니다.");
        this.props.restartChatting();
    }

    handleMoreMenuClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMoreMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    handleClickSettings = () => {
        this.setState({ openDialog: true });
    };
  
    handleLanguageSettingDialogClose = (source, target) => {
        this.setState({
            source: source, 
            target: target,
            openDialog: false,
            anchorEl: null 
        });
        // set to the global variable witch changed source, target
        this.props.setSourceLang(source);
        this.props.setTargetLang(target);
    }    

    restartChatting = () => {
        console.log("Restart Chatting...");
        this.handleMoreMenuClose();
        this.props.restartChatting();
        this.props.getTranslation(
            this.state.source,
            this.state.target,
            "채팅 번역 앱을 사용해 주셔서 감사합니다."
        );
    }

    sendMessage = (message) => {
        // console.log("voicePlaySwitch : ",this.state.voicePlaySwitch);
        // console.log("source language code : ",this.state.source);
        // console.log("message : ",message);
        this.setState({voicePlaySwitch: true })
        this.props.requestTranslation(
            this.state.username, 
            message, 
            this.state.source
        );
        this.props.getTranslation(
            this.state.source,
            this.state.target,
            message
        );
    }
   
    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const username = "Translator Bot";
        const leftAvataImage = "http://placehold.it/50/55C1E7/fff";
        const rightAvataImage = "http://placehold.it/50/FA6F57/fff";

        return(
            <div>
            <Card>
                <CardHeader color="primary">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                  <h4 className={classes.cardTitleWhite}>
                    Chat &nbsp;&nbsp;&nbsp;&nbsp;
                  </h4>
                  <p className={classes.cardCategoryWhite}>
                    [{chats.displayCurrentLanguage(this.state.source)}]&nbsp;
                    <ArrowRight/>
                    [{chats.displayCurrentLanguage(this.state.target)}]
                  </p>
                  </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <div className={classes.floatRight}>
                       <IconButton 
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMoreMenuClick}
                        >
                        <MoreVertIcon />
                       </IconButton>
                       <Menu 
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleMoreMenuClose}
                       >
                        <MenuItem onClick={ () => { this.restartChatting();  }}>Restart</MenuItem>
                        <MenuItem onClick={ () => { this.handleClickSettings(); }}>Settings</MenuItem>
                        <LanguageSettingDialog
                            classes={{ paper: classes.paper, }}
                            open={this.state.openDialog}
                            onClose={this.handleLanguageSettingDialogClose}
                            source={this.state.source}
                            target={this.state.target}
                        />
                       </Menu>
                  </div>
                  </GridItem>
                </GridContainer>
                <div className={classes.clear}></div>
                </CardHeader>
                <Paper className={classes.paperChatPanel} >
                  <TalkList
                    classes={{ paper: classes.paper, }}
                    botName={username}
                    userAvatarUrl={rightAvataImage}
                    botAvatarUrl={leftAvataImage}
                  />
                  <SendMessage 
                    classes={{ paper: classes.paper, }}
                    onSubmit={this.sendMessage}
                  />
                </Paper>
            </Card>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        selectedSourceLanguage: state.chats.translationSettings.selectedSourceLanguage,
        selectedTargetLanguage: state.chats.translationSettings.selectedTargetLanguage,
        translationStatusCode: state.chats.translationStatus.code,
        translationStatusMessage: state.chats.translationStatus.message,
        chatList: state.chats.chatList,
    };
}
  
const mapDispatchToProps = dispatch => {
    return {
        restartChatting: () => {
            return dispatch(chats.restartChatting());
        },
        setSourceLang: (sourceLang) => {
            return dispatch(chats.setSourceLang(sourceLang));
        },
        setTargetLang: (targetLang) => {
            return dispatch(chats.setTargetLang(targetLang));
        },
        requestTranslation: (username, message, languageCode) => {
            return dispatch(chats.requestTranslation(username, message, languageCode));
        },
        getTranslation: (source, target, message) => {
            return dispatch(chats.getTranslation(source, target, message));
        },
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChatTranslator));
