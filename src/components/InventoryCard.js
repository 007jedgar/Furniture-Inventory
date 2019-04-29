import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import {
    ScaledSheet,
    moderateScale
} from 'react-native-size-matters'
import { CachedImage } from 'react-native-cached-image'
var ImagePicker = require("react-native-image-picker");
import {
  splitForm
} from '../stylesheets'
import { DimensionLine } from './DimensionLine';
import { TextLine } from './TextLine'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


var t = require('tcomb-form-native');
var Form = t.form.Form;

var info = t.struct({
  title: t.String,
  tags: t.maybe(t.String),
});


var options = {
  stylesheet: splitForm,
  i18n: {
    optional: '',
  },
  fields: {
    title: {
      label: 'Title',
    },
    tags: {
      label: 'Tags',
    },
  }
};

class InventoryCard extends Component {
    constructor(props) {
      super(props)

      this.state = {
        listImg: require('../assets/icons/camera.png'),
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

  renderDimensions() {
    const { dimensionConatiner } = styles
    return  (
      <View>
        <View style={dimensionConatiner}>
          <DimensionLine 
            value={this.state.x}
            typed={(x) => this.setState({x})}
            placeholder=""
            title="X (width)"
          />
          <DimensionLine 
            value={this.state.x}
            typed={(x) => this.setState({x})}
            placeholder=""
            title="Y (height)"
          />
          <DimensionLine 
            value={this.state.x}
            typed={(x) => this.setState({x})}
            placeholder=""
            title="Z (depth)"
          />
        </View>
      </View>
    )
  }

  renderDeleteList() {
    if (this.props.isEditing) {
      return (
        <TouchableOpacity>
          <CachedImage 
            source={require('../assets/icons/delete.png')}
            style={styles.pic}
          />
        </TouchableOpacity>
      )
    }
  }

  render() {
    const { midContainer, pic, cardContainer } = styles
    let addedStyle =  { 
      width: moderateScale(200),
      height: moderateScale(200),
      alignSelf: 'center',
    }
    if (this.state.listImg == require('../assets/icons/camera.png')) {
      addedStyle = {}
    }

    return (
      <KeyboardAwareScrollView>
        <View style={cardContainer}>
          <View style={midContainer}>

            <View style={{alignSelf: 'center'}}>
              <TouchableOpacity onPress={this.onGetImg}>
                <CachedImage source={this.state.listImg} style={[pic, addedStyle]} />
              </TouchableOpacity>
            </View>

            <View>
              <View style={styles.titleContainer}>
                <TextLine 
                  placeholder="Item Name"
                  typed={(x) => this.setState({name: x})}  
                />
              </View>
              
              <View style={styles.titleContainer}> 
                <TextLine 
                  placeholder={`Tags: "Dresser, storage"`}
                  typed={(x) => this.setState({name: x})}
                />
              </View>
            </View>
          </View>
          
          {this.renderDimensions()}
        </View>  
      </KeyboardAwareScrollView>
    )
  }
}

const styles = ScaledSheet.create({
  pic: {
    width: '60@ms',
    height: '60@ms',
    marginBottom: '5@ms',
    alignSelf: 'center',
  },
  cardContainer: {
    margin: '10@ms',
  },
  midContainer: {
    // flexDirection: 'row'
  },
  dimensionConatiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '13@ms',
  },
  titles: {
    marginRight: moderateScale(2),
    fontSize: moderateScale(20),
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',

  },
  titleContainer: {
    margin: '5@ms',
    flexDirection: 'row'

  },
})

export {InventoryCard}