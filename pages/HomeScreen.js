// Import React and Component
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
  Platform,
} from 'react-native';
const requestVoicePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the Voice recording');
    } else {
      console.log('Voice recording permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search: '',
      showRecordButton: false,
      text: '',
    };
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      requestVoicePermission;
      console.log('Permission :: ', this.state.showRecordButton);
    }
    this.fetchApiCall();
  }

  submitAndClear = () => {
    this.setState({
      text: '',
    });
  };

  fetchApiCall() {
    fetch(
      'https://eu-api.contentstack.com/v3/content_types?include_count=false',
      {
        method: 'GET',
        headers: {
          api_key: 'blt2859d03ab4b50744',
          access_token: 'cs19d22a50588d335f97ce8839',
        },
      },
    )
      .then((response) => response.json())
      .then((response) => {
        //console.log(response.content_types);
        this.setState({
          data: response.content_types,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <SafeAreaView style={stylesList.container}>
        <View style={stylesList.containerSearch}>
          <TouchableOpacity activeOpacity={0.5} onPress={this.submitAndClear}>
            <Image
              source={require('../assets/search.png')}
              style={stylesList.searchIcon}
            />
          </TouchableOpacity>
          <TextInput
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            clearButtonMode="always"
            placeholder="Search"
            style={stylesList.searchBarText}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={requestVoicePermission}>
            <Image
              source={require('../assets/voice.png')}
              style={stylesList.searchVoiceIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={stylesList.container}>
          <View style={stylesList.parentView}>
            <FlatList
              style={stylesList.flatList}
              data={this.state.data}
              renderItem={({item}) => (
                <View>
                  <Text style={stylesList.title}>{item.title}</Text>
                  <FlatList
                    data={item.schema}
                    renderItem={({item}) => (
                      <View>
                        <Text style={stylesList.listText}>
                          {item.display_name}
                        </Text>
                      </View>
                    )}
                    keyExtractor={(item, index) => item + index}
                  />
                </View>
              )}
              keyExtractor={(item, index) => item + index}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const stylesList = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listText: {
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: 15,
    color: 'navy',
  },
  subCardContainer: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'white',
  },
  subContainer: {
    flexDirection: 'row',
  },
  title: {
    marginTop: '10%',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  subTitle: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 55,
  },
  cardOne: {
    alignSelf: 'flex-start',
    width: 160,
    height: 100,
    margin: 10,
    backgroundColor: '#1793EB',
    borderRadius: 15,
  },
  cardTwo: {
    alignSelf: 'flex-start',
    width: 160,
    height: 100,
    margin: 10,
    backgroundColor: '#0EDB43',
    borderRadius: 15,
  },
  cardThree: {
    alignSelf: 'flex-start',
    width: 160,
    height: 100,
    margin: 10,
    backgroundColor: '#62F202',
    borderRadius: 15,
  },
  cardFour: {
    alignSelf: 'flex-start',
    width: 160,
    height: 100,
    margin: 10,
    backgroundColor: '#E8E002',
    borderRadius: 15,
  },
  cardContent: {
    flexDirection: 'row',
    marginLeft: 30,
    marginTop: 30,
  },
  taskTitle: {
    fontSize: 20,
    alignItems: 'flex-end',
    fontWeight: 'bold',
    marginTop: 30,
    color: 'black',
    marginLeft: 10,
  },
  containerTask: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  task: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 30,
    color: 'black',
    marginLeft: 30,
  },
  viewAll: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 30,
    color: '#1B94EB',
    marginRight: 30,
  },
  parentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  flatList: {
    width: '100%',
  },
  listItem: {
    flex: 1,
    marginRight: 30,
    marginLeft: 30,
    backgroundColor: 'white',
    padding: 10,
  },
  searchIcon: {
    height: 30,
    width: 30,
    margin: 5,
    backgroundColor: 'white',
  },
  searchVoiceIcon: {
    height: 30,
    width: 20,
    margin: 5,
    backgroundColor: 'white',
  },
  containerSearch: {
    flexDirection: 'row',
    width: '90%',
    padding: 10,
    backgroundColor: 'white',
    alignContent: 'center',
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF5722',
    borderRadius: 20,
  },
  searchBarText: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default HomeScreen;
