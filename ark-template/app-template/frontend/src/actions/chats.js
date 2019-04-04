
export const requestTranslation = (username, message,languageCode) => {
  return {
    type: 'REQUEST_TRANSLATION',
    username,
    message,
    languageCode,
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
          //throw res;
          return dispatch({type: "SERVER_ERROR",
                            data: res.data, 
                            statusCode: res.status,
                            statusMessage: 'Server Error!'
                          });
        }
      })
      .then(res => {
        if (res.status === 200) {
          return dispatch({type: 'GET_TRANSLATION', 
                            message: res.data, 
                            languageCode: target, 
                            statusCode: res.status,
                            statusMessage: 'success'
                          });
        } else if (res.status === 401 || res.status === 403) {
          return dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          //throw res.data;
        }
        
      })
  }
}


//Restart chatting
export const restartChatting = () => {
  return {
    type: 'RESTART_CHATTING',
  }
}

//Set Translation Source Language
export const setSourceLang = (sourceLang) => {
  return {
    type: 'SET_SOURCE_LANG',
    sourceLang,
  }
}
//Set Translation Target Language
export const setTargetLang = (targetLang) => {
  return {
    type: 'SET_TARGET_LANG',
    targetLang,
  }
}

// change language code from naver to google  
export const setVoiceLanguage = (selectedLanguage) => {

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
export const displayCurrentLanguage = (selectedLanguage) => {

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

