import 'react-native-gesture-handler';

import * as React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from './pages/HomeScreen';
import SecondPage from './pages/SecondPage';
import ThirdPage from './pages/ThirdPage';
import AvailService from './pages/AvailService';

// Import Custom Sidebar
import CustomSidebarMenu from './CustomSidebarMenu';

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawerwer();
    props.navigationProps.toggleDrawer();
  };

  return (
    // Return main method.
    // for first page
    //from manoj
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};

function firstScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'AR', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

function secondScreenStack({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="SecondPage"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SecondPage"
        component={SecondPage}
        options={{
          title: 'Home', //Set Header Title
        }}
      />
      <Stack.Screen
        name="ThirdPage"
        component={ThirdPage}
        options={{
          title: 'Third Page', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

function availService({navigation}) {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="AvailService"
        component={AvailService}
        options={{
          title: 'Avail Service', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: {marginVertical: 5},
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}>
        <Drawer.Screen
          name="SecondPage"
          options={{drawerLabel: 'Home'}}
          component={secondScreenStack}
        />
        <Drawer.Screen
          name="HomeScreen"
          options={{drawerLabel: 'AR'}}
          component={firstScreenStack}
        />
        <Drawer.Screen
          name="AvailService"
          options={{drawerLabel: 'Avail Service'}}
          component={availService}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
