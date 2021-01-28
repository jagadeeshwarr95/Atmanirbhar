import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Alert,
  StatusBar,
  Linking,
  TouchableHighlight,
  Image,
} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type ComponentState = {
  url: string,
  statusBarStyle: string,
};

export default class HomeScreen extends Component<ComponentState> {
  constructor(props) {
    super(props);

    this.state = {
      url: 'https://bhagwan.glitch.me',
      statusBarStyle: 'dark-content',
    };
  }

  sleep(timeout: number) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  }

  async openLink() {
    const {url, statusBarStyle} = this.state;
    try {
      if (await InAppBrowser.isAvailable()) {
        // A delay to change the StatusBar when the browser is opened
        const animated = true;
        const delay = animated && Platform.OS === 'ios' ? 400 : 0;
        setTimeout(() => StatusBar.setBarStyle('light-content'), delay);
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: true,
          animated,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'flipHorizontal',
          modalEnabled: true,
          enableBarCollapsing: true,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: false,
          forceCloseOnRedirection: false,
          toolbar: 'no',
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
          hasBackButton: true,
          browserPackage: null,
          showInRecents: false,
        });
        // A delay to show an alert when the browser is closed
        await this.sleep(800);
        //Alert.alert('Response', JSON.stringify(result));
      } else {
        Linking.openURL(url);
      }
    } catch (error) {
      console.error(error);
      Alert.alert(error.message);
    } finally {
      // Restore the previous StatusBar of the App
      StatusBar.setBarStyle(statusBarStyle);
    }
  }

  render() {
    const {statusBarStyle} = this.state;
    this.openLink();
    return (
      <View style={styles.container}>
        <StatusBar barStyle={statusBarStyle} />

        <View style={styles.openButton}>
          <TouchableHighlight
            activeOpacity={0.5}
            height="50"
            width="50"
            onPress={() => this.openLink()}>
            <Image
              source={require('../assets/ar.png')}
              style={styles.searchVoiceIcon}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 30,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  urlInput: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
  },
  openButton: {
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
    paddingBottom: Platform.OS === 'ios' ? 0 : 20,
  },
});
