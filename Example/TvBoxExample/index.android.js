/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import RNTvBox from 'react-native-tv-box'

export default class TvBoxExample extends Component {

  constructor() {
    super()

    this.state = {
      name: '',
      status: '',
      sending: false,
      error: null,
    }
  }

  componentWillMount() {
    RNTvBox.setPlatform('livebox', {ip: 'http://192.168.1.13:8080'}) // set platform
  }

  componentDidMount() {
    this.getName() // get box name
    this.getStatus() // get box status

    this.setState({sending: true})
    RNTvBox.set({key: 'power', mode: {mode: 0}}) // send power command
      .then(res => res.message === "ok" ? this.getStatus() : this.setState({error: 'An error occurred!'}))
      .catch(err => this.setState({error: err}))
  }

  getStatus() {
    RNTvBox.getStatus()
      .then(status => {
        this.setState({status: status})
      })
      .catch(err => console.error(err))
  }

  getName() {
    RNTvBox.getInfos()
      .then(infos => {
        this.setState({name: infos.friendlyName})
      })
      .catch(err => console.error(err))
  }

  render() {
    if (!this.state.error) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>
            Box Name: {this.state.name}
          </Text>
          <Text style={styles.status}>
            Status: {this.state.status}
          </Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.error}>
            {this.state.error}
          </Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  status: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  error: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'red',
  },
});

AppRegistry.registerComponent('TvBoxExample', () => TvBoxExample);
