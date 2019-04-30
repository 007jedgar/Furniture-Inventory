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
import { connect } from 'react-redux';
import { newItem, updateInput, clearInput } from '../actions';
var ImagePicker = require("react-native-image-picker");

class AddInventory extends Component {
  constructor(props) {
      super(props)

      this.state = {
        listImg: require('../assets/icons/camera.png'),
      }
  } 

  clearInput = () => {
    this.refs.childCard.clearText()
  }


  getInfo = () => {
    const { name, tags, imgUri, x, y, z } = this.props
    const itemInfo = {
      name: name.name, 
      tags: tags.tags, 
      imgUri: imgUri.imgUri, 
      x: x.x, 
      y: y.y, 
      z: z.z,
    }

    return itemInfo
  }

  onAddAnother = () => {
    const listInfo = this.props.currentList
    let info = this.getInfo()

    this.props.newItem(info, listInfo)
    this.clearInput()
  }

  onFinish = () => {
    const listInfo = this.props.currentList
    let info = this.getInfo()

    this.props.newItem(info, listInfo)
    this.clearInput()
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
          ref="childCard"
          {...this.props}
          x={this.props.x} 
          y={this.props.y} 
          z={this.props.z}
          imgUri={this.props.imgUri} 
          name={this.props.name} 
          tags={this.props.tags} 
          xTyped={(x) => this.props.updateInput({x})}
          yTyped={(y) => this.props.updateInput({y})}
          zTyped={(z) => this.props.updateInput({z})}
          nameTyped={(name) => this.props.updateInput({name})}
          tagsTyped={(tags) => this.props.updateInput({tags})}
          imgUri={(imgUri) => this.props.updateInput({imgUri})}
        />

        {/* <TouchableOpacity onPress={this.clearInput} style={btn}>
          <Text style={[btnText, {color: '#5E5999'}]}>Add Another Item</Text>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={this.onAddAnother} style={btn}>
          <Text style={[btnText, {color: '#5E5999'}]}>Add Another Item</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={this.onFinish} style={btn}>
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

const mapStateToProps = state => {
  const { 
    currentList,
    listImg,
    itemNums,
    name,
    tags,
    imgUri,
    x,
    y,
    z,
  } = state.inventory

  return {
    currentList,
    listImg,
    itemNums,
    name,
    tags,
    imgUri,
    x,
    y,
    z
  }
}

export default connect(mapStateToProps, {newItem, updateInput, clearInput})(AddInventory)
