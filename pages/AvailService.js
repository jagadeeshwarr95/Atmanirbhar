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
      isLoading: false,
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
      <ActivityIndicator
        color="#009688"
        size="large"
        style={styles.activityIndicatorStyle}
      />
    );
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <WebView
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
            //View to show while loading the webpage
            renderLoading={this.ActivityIndicatorElement}
            //Want to show the view or not
            startInLoadingState={true}
          />
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
    justifyContent: 'center',
  },
});
