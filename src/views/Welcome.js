import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation
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
import firebase from 'react-native-firebase'

class Welcome extends Component {
  constructor(props) {
    super(props)

    this.state = {
      login: {},
      signup: {},
      showLogin: false,
      showSignup: false,
    }
  }

  componentDidMount() {
   
    const user = firebase.auth().currentUser
    if (!user) {
      return
    }

    Actions.inventoryList({ user })
  }


  render() {
    const { header } = styles
    return (
      <Block style={{justifyContent: 'space-between'}}>
        <Text style={header}>Catalogue Your Furniture</Text>

        <View>
          <TouchableOpacity onPress={() => Actions.signup()} style={styles.btn}>
            <Text style={styles.btnText}>Login/Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.inventoryList()} style={styles.btn}>
            <Text style={styles.btnText}>Start</Text>
          </TouchableOpacity>
        </View>
      </Block>
    )
  }
}

const styles = ScaledSheet.create({
  header: {
    marginTop: '20%',
    marginBottom: '30@ms',
    marginLeft: '5@ms',
    fontSize: '25@ms',
    textAlign: 'center'
  },
  btn: {
    margin: '5@ms',
    marginTop: '0@ms',
    backgroundColor: '#5533A1',
    padding: '4@ms',
    paddingTop: '8@ms',
    paddingBottom: '8@ms',
    borderRadius: '5@ms',
  },
  btnText: {
    alignSelf: 'center',
    fontSize: '27@ms',
    fontFamily: 'Roboto-Bold',
    color: '#fff'
  },
  formView: {
    margin: '20@ms'
  }
})

export default Welcome
