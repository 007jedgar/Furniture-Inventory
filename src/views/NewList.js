import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import {
    ScaledSheet, moderateScale, scale
} from 'react-native-size-matters'
import {
    Block, BackNavBar
} from '../components'
import {formStyle} from '../stylesheets';
import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view'
import {CachedImage} from 'react-native-cached-image'
import { Actions } from 'react-native-router-flux';
var ImagePicker = require("react-native-image-picker");

var t = require('tcomb-form-native');
var Form = t.form.Form;

var User = t.struct({
  name: t.String,
  description: t.maybe(t.String),
});

var options = {
  stylesheet: formStyle,
  fields: {
    name: {
      label: 'List Name',
      placeholder: 'Living Room',
    },
    description: {
      label: 'Description',
      placeholder: 'Possible items for living room',
      keyboardType: 'email-address',
    },
  }
};


class NewList extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      listImg: require('../assets/icons/camera.png'),
      value: {}
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
        });
      }
    })
  }

  onChange = (i) => {
    this.setState({ value: i })
  }

  onNext = () => {
    Actions.addInventory({ })
  }

  render() {
    const { formView, pic, nextbtn, nextBtnText } = styles
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
        <BackNavBar title="New List" 
          titleViewStyle={{marginLeft: scale(-60), marginBottom: moderateScale(5)}}
        />

        <KeyboardAwareScrollView  style={formView}>
          <TouchableOpacity onPress={this.onGetImg} style={{marginBottom: moderateScale(20)}}>
            <CachedImage source={this.state.listImg} style={[pic, addedStyle]} />
            <Text style={{textAlign: 'center'}}>Inventory List Photo (Optional)</Text>
          </TouchableOpacity>
          
          <Form
            ref="form"
            type={User}
            options={options}
            value={this.state.value}
            onChange={this.onChange}
          />
        </KeyboardAwareScrollView>

        <TouchableOpacity style={nextbtn} onPress={this.onNext}>
          <Text style={nextBtnText}>Next</Text>
        </TouchableOpacity>
      </Block>
    )
  }
}

const styles = ScaledSheet.create({
  formView: {
    margin: '10@ms',
    marginRight: '20@ms',
  },
  pic: {
    width: '100@ms',
    height: '100@ms',
    alignSelf: 'center',
  },
  nextbtn: {
    backgroundColor: '#6761A8',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '8%',
    justifyContent: 'center',
  },
  nextBtnText: {
    color: '#fff',
    fontSize: '26@ms',
    fontFamily: 'RobotoSlab-Regular',
    textAlign: 'center',
  },
})

export default NewList
