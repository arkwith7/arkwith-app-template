const initialState = {
    activeTab: '1',
};

export default function tabsReducer(state = initialState, action) {
    switch (action.type) {
    case 'CHANGE_SELECTED_TAB':
        //console.log("action.activeTab :",action.activeTab);
        //console.log("state.activeTab :",state.activeTab);
        return {...state, activeTab: action.activeTab };

    default:
        return state;
    }
}
