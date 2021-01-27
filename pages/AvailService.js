import React from 'react';
import {
  BackHandler,
  Platform,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
export default class AvailService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  webView = {
    canGoBack: false,
    ref: null,
  };

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.onAndroidBackPress,
      );
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }

  ActivityIndicatorElement = () => {
    return (
      <View style={styles.activityIndicatorStyle}>
        <ActivityIndicator color="#009688" size="large" />
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <WebView
            style={{flex: 1}}
            //Loading URL
            source={{
              uri:
                'https://sourajit-new-work-based-account.github.io/DemoProductList/',
            }}
            ref={(webView) => {
              this.webView.ref = webView;
            }}
            onNavigationStateChange={(navState) => {
              this.webView.canGoBack = navState.canGoBack;
            }}
            //Enable Javascript support
            javaScriptEnabled={true}
            //For the Cache
            domStorageEnabled={true}
            onLoadStart={() => this.setState({visible: true})}
            onLoad={() => this.setState({visible: false})}
          />
          {this.state.visible ? <this.ActivityIndicatorElement /> : null}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  activityIndicatorStyle: {
    flex: 1,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
