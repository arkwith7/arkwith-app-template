const initialState = {
    dropdownOpen: false,
    modal: false,
    translationSettings: {
        selectedSourceLanguage: 'ko',
        selectedTargetLanguage: 'en',
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

        case 'OPEN_DROPDOWN':
            console.log("action.dropdownOpen :",state.dropdownOpen);
            return {...state, dropdownOpen: !state.dropdownOpen };

        case 'RESTART_CHATTING':
        return {...state, chatList: [] };

        case 'OPEN_MODAL':
            console.log("action.openModal :",state.modal);
            return {...state, modal: !state.modal };

        case 'SELECTED_SOURCE_LANG':
            console.log("action.selectedSourceLang :",action.sourceLang);
            console.log("action.selectedTargetLang :",state.translationSettings.selectedTargetLanguage);
            return {...state, 
                translationSettings: {
                    selectedSourceLanguage: action.sourceLang,
                    selectedTargetLanguage: state.translationSettings.selectedTargetLanguage
                } };

        case 'SELECTED_TARGET_LANG':
            console.log("action.selectedSourceLang :",state.translationSettings.selectedSourceLanguage);
            console.log("action.selectedTargetLang :",action.targetLang);
            return {...state, 
                translationSettings: {
                    selectedSourceLanguage: state.translationSettings.selectedSourceLanguage,
                    selectedTargetLanguage: action.targetLang
                } };

        case 'REQUEST_TRANSLATION':
            console.log("content :",action.message);
            return {...state, 
                chatList: state.chatList.concat({
                    username: action.username,
                    messageTime: currentTime(), 
                    content: action.message
                }) 
            };


        case 'GET_TRANSLATION':
            return {...state, 
                chatList: state.chatList.concat({
                    username: "Translator Bot",
                    messageTime: currentTime(), 
                    content: action.message
                }) 
            };

        case 'SPEECH_TO_TEXT':
            return {...state, 
                chatList: state.chatList.concat({
                    username: action.username,
                    messageTime: currentTime(), 
                    content: action.text
                }) 
            };

        case 'TEXT_TO_SPEECH':
            return {...state, 
                chatList: state.chatList.concat({
                    username: action.username,
                    messageTime: currentTime(), 
                    content: action.text
                }) 
            };
            
        default:
            return state;
    }
}
