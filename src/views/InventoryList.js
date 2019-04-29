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
    AddBtn,
    EmptyCard
} from '../components'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import {
  getInventoryLists
} from '../actions'


class InventoryList extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount() {
    // this.props.uuid
    this.props.getInventoryLists(1221)
  }

  onEdit = () => {
    this.setState({ editing: true })
  }

  renderList() {
    if (!this.props.inventoryLists) {
      return (
        <EmptyCard text="Add a List and start documenting your stuff."/>
      )
    }

    return (
      <View>
        <FlatList
          data={this.props.inventoryLists}
          renderItem={({item}) => (
              <Text>Item</Text>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    )
  }

  render() {
    const { header } = styles
    return (
      <Block>
        <NavBar 
          settings 
          optionPress={this.onEdit} 
          rightBtn="Edit"
          settingsPressed={() => Actions.settings()}
        />

        {this.renderList()}

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

const mapStateToProps = state => {
  const { inventoryLists } = state.inventory
  const { uuid } = state.auth

  return {
    inventoryLists,
    uuid
  }
}

export default connect(mapStateToProps, {getInventoryLists})(InventoryList)
