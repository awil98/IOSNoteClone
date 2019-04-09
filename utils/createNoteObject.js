import uuidv4 from 'uuid/v4';

export default function createNoteObject(content, createDate){
  return{
    id: createId(),
    text: content,
    createDate: createDate,
  };
}

 function createId(){
  return uuidv4();
}
