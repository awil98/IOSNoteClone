
const initalState = {
  folder: {
    Notes: [],
    Deleted: []
  },
  selectedItemId: null,
  selcetedFolderValue: null,
};

//possibly add in an proprty called like NotesLength that is in charge of tracking the note length

const myReducer = (state = initalState, action) =>{

  const newState = {...state}

  if(action.type === 'addNote'){
    //copy the vaue in note to the front of the array
    newState.folder.Notes = [action.val, ...newState.folder.Notes]
    newState.noteLength = newState.folder.Notes.length;
  }else if(action.type === 'selectItem'){
    //set the selected item id to the pressed value
    newState.selectedItemId = action.val;
  }else if(action.type === 'updateNote'){
    //find the id and then reset the selectedItemId value
    for(let i = 0; i < newState.folder.Notes.length; i++){
      if(newState.folder.Notes[i].id === newState.selectedItemId){
        newState.folder.Notes[i].text = action.val;
      }
    }
    newState.selectedItemId = null;
  }
  else if(action.type === 'selectFolderValue'){
    newState.selcetedFolderValue = action.val;
  }
  //I need to create an statement that unselects the folder value and is called in the FolderScreen with a reducer method
  console.log(newState)
  return newState;
};

export default myReducer;
