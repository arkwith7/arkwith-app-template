export const dropdownButtonToggle  = () => {
  return {
    type: 'OPEN_DROPDOWN',
    //dropdownOpen,
  }
}

export const requestTranslation = (username, message) => {
  return {
    type: 'REQUEST_TRANSLATION',
    username,
    message,
  }
}

export const getTranslation = (source, target, message) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch("/api/translation?source="+source+"&target="+target+"&text="+message, {headers, })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          return dispatch({type: 'GET_TRANSLATION', message: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }


}
//speech recognition
export const speechRecognition = (username, text) => {
  return {
    type: 'SPEECH_TO_TEXT',
    username,
    text,
  }
}
//speech synthesis
export const speechSynthesis = (username, text) => {
  return {
    type: 'TEXT_TO_SPEECH',
    username,
    text,
  }
}

//Restart chatting
export const restartChatting = () => {
  return {
    type: 'RESTART_CHATTING',
  }
}

//Open Modal
export const openModal = () => {
  return {
    type: 'OPEN_MODAL',
  }
}

//Select Translation Source Language
export const selectedSourceLang = (sourceLang) => {
  return {
    type: 'SELECTED_SOURCE_LANG',
    sourceLang,
  }
}
//Select Translation Target Language
export const selectedTargetLang = (targetLang) => {
  return {
    type: 'SELECTED_TARGET_LANG',
    targetLang,
  }
}
