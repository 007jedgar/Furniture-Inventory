import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity,
} from 'react-native'
import {
  Block,
  BackNavBar
} from '../components'
import {
  scale,
  moderateScale,
  ScaledSheet
} from 'react-native-size-matters'

class Settings extends Component {

  logout = () => {
    // this.props.logout()
  }

  render() {
    return (
      <Block style={{justifyContent: 'space-between'}}>
        <BackNavBar 
          title="Settings" 
          titleViewStyle={{marginLeft: scale(-60), marginBottom: moderateScale(5)}}
        />

          <TouchableOpacity onPress={this.logout} style={styles.btn}>
            <Text style={styles.btnText}>Logout</Text>
          </TouchableOpacity>
      </Block>
    )
  }
}

const styles = ScaledSheet.create({
    btn: {
    margin: '5@ms',
    marginTop: '0@ms',
    backgroundColor: '#F35F55',
    padding: '4@ms',
    paddingTop: '8@ms',
    paddingBottom: '8@ms',
    borderRadius: '3@ms',
  },
  btnText: {
    alignSelf: 'center',
    fontSize: '27@ms',
    fontFamily: 'RobotoSlab-Regular',
    color: '#fff'
  },
})

export default Settings