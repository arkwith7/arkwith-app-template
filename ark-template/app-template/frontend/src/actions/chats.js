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

//Open Modal
export const openModal = () => {
  return {
    type: 'OPEN_MODAL',
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
