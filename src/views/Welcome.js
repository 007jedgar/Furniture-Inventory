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
    Block
} from '../components'
import {
    Actions
} from 'react-native-router-flux'

class Welcome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    componentDidMount() {
        
    }

    render() {
        const { header, subheader } = styles
        return (
            <Block >
                <Text style={header}>Catalogue Your Furniture</Text>


                <TouchableOpacity onPress={() => Actions.inventoryList()} style={styles.btn}>
                    <Text style={styles.btnText}>Start</Text>
                </TouchableOpacity>
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
        textAlign: 'center'
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

export default Welcome
