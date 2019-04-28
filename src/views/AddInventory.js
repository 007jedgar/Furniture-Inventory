import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import {
    ScaledSheet
} from 'react-native-size-matters'
import {
    Block,
    BackNavBar
} from '../components'



class AddInventory extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <Block >
                <BackNavBar />

                    
            </Block>
        )
    }
}

const styles = ScaledSheet.create({

})

export default AddInventory
