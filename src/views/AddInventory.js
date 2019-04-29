import React, { Component } from 'react'
import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native'
import {
  ScaledSheet,
  moderateScale,
  scale,
} from 'react-native-size-matters'
import {
  Block,
  BackNavBar,
  InventoryCard,
} from '../components'
var ImagePicker = require("react-native-image-picker");

class AddInventory extends Component {
  constructor(props) {
      super(props)

      this.state = {
        listImg: require('../assets/icons/camera.png'),
        itemNums: 0,
      }
  }

  renderTotalItems() {
    const { itemText, itemContainer } = styles 
    if (this.state.itemNums) {
      return (
        <View style={itemContainer}>
          <Text style={itemText}>{this.state.itemNums} items in list</Text>
        </View>
      )
    }
  }

  onGetImg = () => {
    ImagePicker.showImagePicker((response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
         // or const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          listImg: source,
        })
      }
    })
  }

  render() {
    const { btn, btnText } = styles
    let addedStyle =  { borderWidth: moderateScale(2), 
      borderColor: '#6761A8', 
      marginBottom: moderateScale(5),
      padding: moderateScale(2),
      alignSelf: 'center',
     }
    if (this.state.listImg == require('../assets/icons/camera.png')) {
      addedStyle = {}
    }

    return (
      <Block >
        <BackNavBar 
          title="Add Item" 
          titleViewStyle={{marginLeft: scale(-60), marginBottom: moderateScale(5)}}
        />

        {this.renderTotalItems()}

        <InventoryCard 

        />

        <TouchableOpacity style={btn}>
          <Text style={[btnText, {color: '#5E5999'}]}>Add Another Item</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={btn}>
          <Text style={[btnText, {color: '#2A2D34'}]}>Finish List</Text>
        </TouchableOpacity>

      </Block>
    )
  }
}

const styles = ScaledSheet.create({
  btn: {
    height: '60@ms',
  },
  btnText: {
    fontFamily: 'Raleway-Regular',
    fontSize: '25@ms',
    textAlign: 'center',
  },
  itemText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: '24@ms',
  },
  itemContainer: {
    height: '40@ms',
    backgroundColor: '#6761A8',
    justifyContent: 'center',
  }
})

export default AddInventory
