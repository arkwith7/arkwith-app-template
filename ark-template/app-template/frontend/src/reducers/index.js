import { combineReducers } from 'redux';
import notes from "./notes";
import auth from "./auth";
import chats from "./chats";
import tabs from "./tabs";


const templateApp = combineReducers({
    notes, auth, chats, tabs,
})

export default templateApp;
