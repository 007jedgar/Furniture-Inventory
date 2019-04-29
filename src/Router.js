import React, { Component } from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { Image } from 'react-native';
import Welcome from './views/Welcome';
import InventoryList from './views/InventoryList';
import NewList from './views/NewList';
import AddInventory from './views/AddInventory'
import Signup from './views/Signup'
import Settings from './views/Settings'

import {
  ScaledSheet,
} from 'react-native-size-matters'

class RouterComponent extends Component {
  render() {
    const tabIcons = ({ focused, title }) => {
      let image;
      switch(title) {
        case 'Book':
          image = ''
          break;
        case 'Lessons':
          image = ''
          break;
      }

      return ( <Image source={image} style={styles.image}/> )
    }

    return (
      <Router>
        <Stack key="root" hideNavBar initial>

          <Scene key="welcome" initial component={Welcome} hideNavBar />
          <Scene key="inventoryList" component={InventoryList} hideNavBar />
          <Scene key="newList" component={NewList} hideNavBar />
          <Scene key="addInventory"  component={AddInventory} hideNavBar />
          <Scene key="signup" component={Signup} hideNavBar />
          <Scene key="settings"  component={Settings} hideNavBar />

         </Stack>
      </Router>
    );
  }
};

const styles = ScaledSheet.create({
  tabs: {
    backgroundColor: '#FEF7F0',
    borderTopWidth: '2@ms',
    borderColor: '#FEF7F0',
  },
  item: {
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '27@ms',
    height: '27@ms',
    alignSelf: 'center',
  },
  label: {
    fontSize: '14@ms',
  },
})

export default RouterComponent;