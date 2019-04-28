import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList
} from 'react-native'
import {
    ScaledSheet
} from 'react-native-size-matters'
import {
    Block,
    NavBar,
    AddBtn
} from '../components'
import { Actions } from 'react-native-router-flux';


class InventoryList extends Component {

    renderList() {
        return (
            <View>
                <FlatList/>
            </View>
        )
    }

    render() {
        const { header } = styles
        return (
            <Block>
                <NavBar />
                <Text style={header}>Hello</Text>

                <AddBtn onPressed={() => Actions.newList()}/>
            </Block>
        )
    }
}

const styles = ScaledSheet.create({
    header: {
        marginTop: '24@ms',
        marginBottom: '30@ms',
        marginLeft: '5@ms',
        fontSize: '25@ms',
        textAlign: 'center',
    },
    btn: {
        alignSelf: 'center',
        margin: '5@ms',
        backgroundColor: '#5533A1',
        padding: '4@ms',
        borderRadius: '5@ms',
        width: '120@ms',
    },
    btnText: {
        alignSelf: 'center',
        fontSize: '22@ms',
        color: '#fff'
    },
})

export default InventoryList
