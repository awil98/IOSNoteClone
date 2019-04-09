import { createStackNavigator, createAppContainer } from 'react-navigation';

import NoteInput from './NoteInput';
import Home from './Home';
import FolderScreen from './FolderScreen'

const AppStack = createAppContainer(
  createStackNavigator({
    Home:{
      screen: Home
    },
    NoteInput:{
      screen: NoteInput
    },
    FolderScreen:{
      screen: FolderScreen
    }
  },
  {
    initialRouteName: 'FolderScreen'
  },
)
);

export default AppStack;
