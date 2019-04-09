import React from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {NavigationEvents} from 'react-navigation';

const marginValue = Dimensions.get('screen').width / 20;
//this is for the header under the header row
const fontSizeHeader = Dimensions.get('screen').width / 10;
//this is for the header row
const fontSizeHeaderText = Dimensions.get('screen').height / 29;
//this is for the normal Text
const fontSizeText = Dimensions.get('screen').height / 35;
//height for each card
const selectionHeight = Dimensions.get('screen').height / 18;


class FolderScreen extends React.Component{

  //Im going to have to use a local state and a navaigator events to update the value in specific array.length

  static navigationOptions = {
    headerStyle:{
      borderBottomWidth: 0,
    },

    //add in right edit button later
  };
  //this is going to be the method that calls the set item click and also navigates to the home screen
  selectFolderValue = (item) =>{
    const { navigation: { navigate } } = this.props;
    //send the value that was selected to the reducer
    this.props.folderValue(item);
    //navigate to the home screen
    navigate('Home');
  };



  renderItem = (item, index) =>{
    return(
      <TouchableOpacity
        onPress={()=>this.selectFolderValue(item)}
      >
        <View key={index} style={styles.noteView}>
          <View style={{flex: 1}}>
            <Text style={styles.outerText}>{item}</Text>
          </View>
          <View style={styles.innerContent}>
            <Ionicons name={'ios-arrow-forward'} size={fontSizeText} color={'#DCDCDC'}/>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render(){

    return(

      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Text style={styles.header}>Folders</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.containerForTitle}>
            <Text style={styles.scrollViewHeaderText}>On My Device</Text>
          </View>
          <ScrollView>
            {(Object.keys(this.props.folder)).map(this.renderItem)}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    folder: state.folder,
  }
};


const mapDispatchToProps = (dispatch) =>{
  return{
    selectItem: (id) => dispatch({type: 'selectItem', val: id}),
    folderValue: (item) => dispatch({type: 'selectFolderValue', val: item}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FolderScreen);

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: marginValue
  },
  header:{
    fontWeight: 'bold',
    fontSize: fontSizeHeader
  },
  content:{
    marginTop: marginValue * 1.15,
    flex: 10,
  },
  bottomRow:{
    flex: .75,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  bottomRowText:{
    color: 'orange',
    fontSize: fontSizeHeaderText,
  },
  scrollViewHeaderText:{
    color: '#DCDCDC',
    fontSize: fontSizeText
  },
  containerForTitle:{
    paddingBottom: marginValue,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  noteView:{
    alignItems: 'center',
    justifyContent: 'space-between',
    height: selectionHeight,
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  outerText:{
    fontSize: fontSizeText,
  },
  innerContent:{
    flex: .15,
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
  }
});
