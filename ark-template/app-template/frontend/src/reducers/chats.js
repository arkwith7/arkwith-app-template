const initialState = {
    translationSettings: {
        selectedSourceLanguage: 'ko',
        selectedTargetLanguage: 'en',
    },
    translationStatus: {
        code: '',
        message: '',
    },
    chatList: [],
};

function currentTime() {
    const now = new Date();
    let currntTime = "";
    let year = "" + now.getFullYear();
    let month = "" + (now.getMonth() + 1); if (month.length === 1) { month = "0" + month; }
    let day = "" + now.getDate(); if (day.length === 1) { day = "0" + day; }
    let hour = "" + now.getHours(); if (hour.length === 1) { hour = "0" + hour; }
    let minute = "" + now.getMinutes(); if (minute.length === 1) { minute = "0" + minute; }
    let second = "" + now.getSeconds(); if (second.length === 1) { second = "0" + second; }
    currntTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    //console.log("currntTime",currntTime)
    return(currntTime);
}


export default function chats(state=initialState, action) {

    switch (action.type) {

        case 'RESTART_CHATTING':
        return {...state, chatList: [] };

        case 'SET_SOURCE_LANG':
            //console.log("action.setSourceLang :",action.sourceLang);
            //console.log("action.setTargetLang :",state.translationSettings.selectedTargetLanguage);
            return {...state, 
                translationSettings: {
                    selectedSourceLanguage: action.sourceLang,
                    selectedTargetLanguage: state.translationSettings.selectedTargetLanguage
                } };

        case 'SET_TARGET_LANG':
            //console.log("action.setSourceLang :",state.translationSettings.selectedSourceLanguage);
            //console.log("action.setTargetLang :",action.targetLang);
            return {...state, 
                translationSettings: {
                    selectedSourceLanguage: state.translationSettings.selectedSourceLanguage,
                    selectedTargetLanguage: action.targetLang
                } };

        case 'REQUEST_TRANSLATION':
            //console.log("REQUEST_TRANSLATION languageCode :",action.languageCode);
            return {...state, 
                chatList: state.chatList.concat({
                    username: action.username,
                    messageTime: currentTime(), 
                    content: action.message,
                    languageCode: action.languageCode
                }) 
            };


        case 'GET_TRANSLATION':
            return {...state, 
                translationStatus: {
                    code: action.statusCode,
                    message: action.statusMessage
                },
                chatList: state.chatList.concat({
                    username: "Translator Bot",
                    messageTime: currentTime(), 
                    content: action.message,
                    languageCode: action.languageCode
                }) 
            };

        case 'SERVER_ERROR':
        case 'AUTHENTICATION_ERROR':
            console.log("SERVER_ERROR action.statusCode :",action.statusCode);
            //console.log("SERVER_ERROR action.data :",action.data);
            return {...state, 
                translationStatus: {
                    code: action.statusCode,
                    message: action.statusMessage
                }
            };
            
        default:
            return state;
    }
}
