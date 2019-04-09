import React from 'react';
import { StyleSheet, Text, View, Dimensions, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import createNoteObject from '../utils/createNoteObject';
import { connect } from 'react-redux';

//this value is used to determine marginHorizontal value based on screen size
const marginValue = Dimensions.get('screen').width / 20;
//this value is used to determine the size of text based on the screen size
const fontSize = Dimensions.get('screen').width / 30;
//this is the font size for the header
const fontSizeHeaderText = Dimensions.get('screen').height / 29;

class NoteInput extends React.Component{

    state = {
       localText: '',
       localTime: '',
     };


  static navigationOptions = ({ navigation, screenProps }) => ({
    headerStyle:{
      borderBottomWidth: 0,
    },
    headerLeft: (<TouchableOpacity style={{flexDirection:'row', alignItems: 'center'}}
                      onPress = {navigation.getParam('submitText')}
                    >
                      <Ionicons name={'ios-arrow-back'} size={fontSizeHeaderText * 1.75} color={'orange'} style={{marginLeft: marginValue}}/>
                      <Text style={{marginLeft: marginValue /2, color: 'orange', fontSize: fontSizeHeaderText}}>Notes</Text>
                   </TouchableOpacity>),
    headerRight: (
      <TouchableOpacity
        onPress = {() => {Keyboard.dismiss()}}
      >
        <Text style={{color: 'orange', fontSize: fontSizeHeaderText , marginRight: marginValue, alignItems: 'center'}}>Done</Text>
      </TouchableOpacity>
    ),
  });


  submitText = () =>{
    const { localText, localTime } = this.state;
    const { selectedItemId, addNote, updateNote } = this.props;
    //if no text has been entered then just leave without saving
    if(!localText){
      this.props.navigation.goBack();
      //have to specify return so that it doesn't keep running
      return;
    }
    //then a note hasn't been created yet
    if(selectedItemId === null){
      addNote(createNoteObject(localText, localTime));
    }else{
      //this is going to be the method for updating of the item
      updateNote(localText);
    }
    //go back to pervious page
    this.props.navigation.goBack();
  }

  componentDidMount(){
    //I need an if state if selectedItemId ==null then run this code and leave localText as null
    if(this.props.selectedItemId === null){
      let datePortion = new Date().toLocaleDateString();
      let timePortion =  new Date().toLocaleTimeString();
      let combo = datePortion + " at " + timePortion;
      this.setState({localTime: combo});
    }else{
      //else i need to go and get that material and set it
      const myNoteObject = this.findNote();
      //now set these values in the state variable
      this.setState({
        localText: myNoteObject.text,
        localTime: myNoteObject.createDate,
      });
    }

    this.props.navigation.setParams({submitText: this.submitText});
    this.props.navigation.setParams({dismissKeyboard: this.dismissKeyboard});

  }


  findNote = () => {
    for(let i =0; i < this.props.note.length; i++){
      if(this.props.note[i].id === this.props.selectedItemId){
        return this.props.note[i];
      }
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <KeyboardAvoidingView style={styles.innnerContainer}
            behavior="padding"
            keyboardVerticalOffset= {20}
            enabled>
            <Text>{this.state.localTime}</Text>
            <TextInput
              placeholder="Enter Note Here"
              onChangeText={(text)=>{this.setState({localText: text});}}
              value={this.state.localText}
              style={{fontSize: fontSize}}
              multiline={true}
            />
          </KeyboardAvoidingView>
        </View>
      );
    };
}


const mapStateToProps = (state) => {
  return{
    selectedItemId: state.selectedItemId,
    note: state.folder.Notes,
  }
};


const mapDispatchToProps = (dispatch) =>{
  return{
    addNote: (note) =>dispatch({type: 'addNote', val: note}),
    updateNote: (text) =>dispatch({type: 'updateNote', val: text}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteInput);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    flexDirection: 'column',
  },
  innnerContainer: {
    flex: 10,
    marginHorizontal: marginValue,
  },
});
