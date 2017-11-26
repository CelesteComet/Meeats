import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Linking, WebView, Platform, Text, ImageBackground, Image, AsyncStorage } from 'react-native';
import SafariView from 'react-native-safari-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import MainPage from './components/MainPage';
import StatusBar from './components/StatusBar';

export default class ButtonBasics extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: null
    }
    this.openURL = this.openURL.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.handleOpenURL = this.handleOpenURL.bind(this);
  }

  componentDidMount() {
    // Check to see if the user is saved in the async storage, if so, set state to user
    try {
      const value = AsyncStorage.getItem('@MySuperStore:user');
      if (value !== null){
        this.setState({
          user: value
        })
      }
    } catch (error) {
      // Error retrieving data
    }

    Linking.addEventListener('url', this.handleOpenURL);

    Linking.getInitialURL().then((url) => {
      if(url) {
        this.handleOpenURL({ url });
      }
    });
  }

  // Open URL in a browser
  openURL(url) {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  };

  handleOpenURL({ url }) {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    var userString = JSON.parse(decodeURI(user_string));
    // Save the user to async storage
    try {
      AsyncStorage.setItem('@MySuperStore:user', userString);
    } catch (error) {
      // Error saving data
    }

    this.setState({
      // Decode the user string and parse it into JSON
      user: userString
    });

    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  loginWithGoogle() {
    this.openURL('http://localhost:3000/auth/google'); 
  }



  render() {

    const googleLoginButton = (
      <View style={ styles.buttonContainer }>
        <Icon.Button size={40} name="google" backgroundColor="#cd5542" onPress={this.loginWithGoogle}>
          Login with Google 
        </Icon.Button>
      </View>
    );

    let { user } = this.state;

    if(user) {
      return (
        <View style={{flex: 1}}>
          <StatusBar />
          <MainPage user={ user } />
        </View>
      );
    }
    
    return (
      <View style={styles.container}>
        <StatusBar />
        <ImageBackground style={styles.backgroundImage} source={require('./splash.jpeg')}>
          <View style={ styles.container }>
            <Text style={ styles.heading }>Me-Eats</Text>
            {googleLoginButton}
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   backgroundColor: 'rgba(0,0,0,0.5)'
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center', // or 'stretch'
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  heading: {
    textAlign: 'center',
    fontSize: 70,
    color: 'white'
  }
})

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => ButtonBasics);