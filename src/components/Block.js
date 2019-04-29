import React from 'react'
import {
    View,
    Dimensions
} from 'react-native'
import {
    ScaledSheet
} from 'react-native-size-matters'


const Block = (props) => {
    return (
        <View style={[styles.container, props.style]}>
            {props.children}
        </View>
    )
}

const styles = ScaledSheet.create({
  container : {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#FFF3F7'
  }
})

export {Block}