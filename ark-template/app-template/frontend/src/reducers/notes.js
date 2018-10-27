//const initialState = [];
const initialState = {
    noteList: [],
    pageOfItems: []
};


export default function notes(state=initialState, action) {
    let noteList = state.noteList.slice();

    switch (action.type) {

        case 'FETCH_NOTES':
            return {...state, noteList: action.notes};

        case 'ADD_NOTE':
            //console.log("ADD_NOTE, action.note : ",action.note)
            return {...state, 
                noteList: state.noteList.concat({ id:action.note.id, text:action.note.text})
            };

        case 'UPDATE_NOTE':
            let noteToUpdate = noteList[action.index]
            noteToUpdate.text = action.note.text;
            noteList.splice(action.index, 1, noteToUpdate);
            return {...state, noteList: noteList};
//            return noteList;

        case 'DELETE_NOTE':
            noteList.splice(action.index, 1);
            return {...state, noteList: noteList};
//            return noteList;

        case 'ON_CHANGE_PAGE':
            //console.log("Reducers ON_CHANGE_PAGE processing...");
            return {...state, 
                pageOfItems: action.pageOfItems
            };
            
        default:
            return state;
    }
}
