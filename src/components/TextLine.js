import React, { Component } from 'react';
import {
  View,
  TextInput,
} from 'react-native';
import {
  ScaledSheet,
} from 'react-native-size-matters';

class TextLine extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  sendData(text) {
    this.setState({ text });
    this.props.typed(text);
  }

  render() {
    const { inputStyle } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          style={[styles.input, inputStyle]}
          onChangeText={(text) => this.sendData(text)}
          value={this.props.input}
          placeholder={this.props.placeholder}
          autoCapitalize="sentences"
          keyboardType={this.props.keyboardType}
        />
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  input: {
    minWidth: '100%',
    minHeight: '30@ms',
    fontFamily: 'Roboto-Regular',
    fontSize: '23@ms',
  },
  container: {
    borderWidth: '2@ms',
    padding: '2@ms',
    borderRadius: '4@ms',
    borderColor: '#989898',
    justifyContent: 'center',
  },
});

export { TextLine };