import React from 'react';
import { StyleSheet, Text, View, Dimensions, KeyboardAvoidingView, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {NavigationEvents} from 'react-navigation';

//this is the font size for the header
const fontSizeHeader = Dimensions.get('screen').width / 10;

//this is the font size for the normal text
const fontSizeText = Dimensions.get('screen').height / 25;

//this is the font size for the header
const fontSizeHeaderText = Dimensions.get('screen').height / 29;

//this is the horizontal margin Value
const marginValue = Dimensions.get('screen').width / 20;
//this is the top margin value for the scroll
const marginTopForScroll = Dimensions.get('screen').height / 45;

//this is used to get the height of each note card
const noteHeight = Dimensions.get('screen').height / 10;

class Home extends React.Component{

//{id: '9', content: 'second', createTime: "03/09/19"},
  state = {
    notes: []
  };

  //this is the object for the naviagion bar
  static navigationOptions = ({ navigation, screenProps }) => ({

    headerStyle:{
      borderBottomWidth: 0,
    },
    headerBackTitle: 'Notes',
    headerLeft:(
      <TouchableOpacity
        onPress = { navigation.getParam('goToNext')}
      >
        <Ionicons name={'ios-arrow-back'} size={fontSizeHeaderText * 1.75} color={'orange'} style={{marginLeft: marginValue}}/>
      </TouchableOpacity>
    ),
  });

  componentDidMount(){
    this.props.navigation.setParams({goToNext: this.goToNext});
  }

  goToNext = () =>{
    this.props.navigation.goBack();
  };
  //this method is called right after returning from a navigation
  updateScrollView = () =>{
    this.setState({notes: this.props.Notes})
  }

  //this is the method that runs for the scroll
  renderItem = ({createDate, id, text}) =>(
    <TouchableOpacity
      onPress={() =>{
        this.props.selectItem(id)
        this.props.navigation.navigate('NoteInput')
      }}
    >
      <View key={id} style={styles.noteView}>
        <Text style={{fontSize: fontSizeText / 1.25, fontWeight: 'bold'}}>{text}</Text>
        <View style={{alignItems: 'center'}}>
          <Text style={{marginTop: marginValue}}>{createDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  renderAFolder(){
      const { selcetedFolderValue } = this.props;
      if(selcetedFolderValue === 'Notes'){
        return(
          <ScrollView>
            {this.props.Notes.map(this.renderItem)}
          </ScrollView>
        );
    }else{
      return(
        <ScrollView>
          {this.props.Deleted.map(this.renderItem)}
        </ScrollView>
      );
    }
  }

  renderAnAmount(){
    const { selcetedFolderValue } = this.props;
    if(selcetedFolderValue === 'Notes'){
      return(
          this.props.Notes.length
      );
  }else{
    return(
        this.props.Deleted.length
    );
  }
  }

  render(){
    //this is the thing for the navigator
    const { navigation: { navigate } } = this.props;

    return(
      <View style={styles.container}>
      <NavigationEvents onDidFocus={() => this.updateScrollView()} />
        <Text style={styles.headerText}>Notes</Text>
        <View style={styles.scrollCont}>
          {this.renderAFolder()}
        </View>
        <View style={styles.bar}>
          {/*This is the bar for the bottom row*/}
          <TouchableOpacity>
            <Ionicons name={'ios-trash'} size={fontSizeText * 1.5} color={'orange'}/>
          </TouchableOpacity>
          <Text style={{fontSize: fontSizeText/2}}>{this.renderAnAmount()} Notes </Text>
          <TouchableOpacity
            onPress={()=>navigate('NoteInput')}
          >
            <Ionicons name={'ios-create'} size={fontSizeText * 1.5} color={'orange'}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    Notes: state.folder.Notes,
    selcetedFolderValue: state.selcetedFolderValue,
    Deleted: state.folder.Deleted
  }
};


const mapDispatchToProps = (dispatch) =>{
  return{
    selectItem: (id) => dispatch({type: 'selectItem', val: id}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: marginValue,
  },
  headerText:{
    fontSize: fontSizeHeader,
    fontWeight: 'bold',
  },
  noteView:{
    marginTop: marginTopForScroll,
    height: noteHeight,
    flexDirection: 'column',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  scrollCont:{
    flex: 15,
  },
  bar:{
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});
