import React from 'react'
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native'
import { CachedImage } from 'react-native-cached-image'
import {
  ScaledSheet,
} from 'react-native-size-matters'
import {
  Actions
} from 'react-native-router-flux'

const InventoryListCard = (props) => {
  const { name, listImgURL, description } = props.inventory
  const { img, nameStyle, descriptionStyle, cardContainer, infoContainer } = styles

  return (
    <TouchableOpacity onPress={() => props.onSelect(props.inventory)}>

      <View style={cardContainer}>
        <View>
          <CachedImage style={img} source={{uri: listImgURL }}/>
        </View>

        <View style={infoContainer}>
          <Text style={nameStyle}>{name}</Text>
          <Text style={descriptionStyle}>{description}</Text>
        </View>
      </View>

    </TouchableOpacity>
  )
}

const styles = ScaledSheet.create({
  img: {
    width: '50@ms',
    height: '50@ms',
  },
  nameStyle: {
    fontSize: '24@ms',
    fontFamily: 'Roboto-Regular',
    color: '#2A2D34',
  },
  descriptionStyle: {
    fontSize: '22@ms',
    fontFamily: 'Roboto-Regular',
    color: '#2A2D34',
  },
  cardContainer: {
    flexDirection: 'row',
    margin: '6@ms',
    borderBottomWidth: '3@ms',
    borderColor: '#5E5999',
  },
  infoContainer: {
    marginLeft: '5@ms',
  },
  deleteImg: {
    width: '35@ms',
    height: '35@ms',    
  },  
  deleteContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '5@ms',
    marginLeft: '5@ms',
    marginRight: '5@ms',
  }
})

export { InventoryListCard }