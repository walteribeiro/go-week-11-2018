import React, { Component } from 'react'
import {
  AsyncStorage,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import { NavigationActions, StackActions } from 'react-navigation'

import Icon from 'react-native-vector-icons/FontAwesome'

export default class Login extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    username: ''
  }

  componentDidMount = async () => {
    const username = AsyncStorage.getItem('@GoTwitter:username')
    if (username) {
      this.navigateToTimeLine()
    }
  }

  handleInputChange = username => {
    this.setState({ username })
  }

  handleLogin = async () => {
    const { username } = this.state

    if (!username.length) return

    await AsyncStorage.setItem('@GoTwitter:username', username)

    this.navigateToTimeLine()
  }

  navigateToTimeLine = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Timeline' })]
    })

    this.props.navigation.dispatch(resetAction)
  }

  defineContainerView = () => {
    if (Platform.OS === 'ios') {
      return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {this.renderContent()}
        </KeyboardAvoidingView>
      )
    } else {
      return <View style={styles.container}>{this.renderContent()}</View>
    }
  }

  renderContent = () => (
    <View style={styles.content}>
      <View>
        <Icon name="twitter" size={64} color="#4BB0EE" />
      </View>
      <TextInput
        style={styles.input}
        value={this.state.username}
        onChangeText={this.handleInputChange}
        returnKeyType="send"
        onSubmitEditing={this.handleLogin}
        placeholder="Nome de usuário"
      />

      <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  )

  render() {
    return this.defineContainerView()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    height: 44,
    paddingHorizontal: 15,
    alignSelf: 'stretch',
    marginTop: 30
  },

  button: {
    height: 44,
    alignSelf: 'stretch',
    marginTop: 10,
    backgroundColor: '#4BB0EE',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
