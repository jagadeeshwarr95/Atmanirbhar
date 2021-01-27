import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {connectSearchBox} from 'react-instantsearch-native';
import Voice from 'react-native-voice';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 48,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
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
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    alignContent: 'center',
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

const SearchBox = ({currentRefinement, refine}) => {
  const [results, setResults] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [updateRecordValue, setRecordValue] = useState(currentRefinement);

  useEffect(() => {
    //Setting callbacks for the process status
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      //destroy the process after switching the screen
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e) => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.log('onSpeechResults: ', e.value);
    setResults(e.value);
    {
      e.value.map((result, index) => {
        return setRecordValue(result);
      });
    }
  };

  const startRecognizing = async () => {
    setIsRecording(true);
    setRecordValue('');
    console.log('Recording is started', isRecording);
    //Starts listening for speech for a specific locale
    try {
      await Voice.start('en-US');
      setResults([]);
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    //Stops listening for speech
    setIsRecording(false);
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const resetSearch = async () => {
    //Stops listening for speech
    setRecordValue('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerSearch}>
        <TouchableHighlight activeOpacity={0.5} onPress={resetSearch}>
          <Image
            source={require('../assets/search.png')}
            style={styles.searchIcon}
          />
        </TouchableHighlight>
        <TextInput
          onChangeText={(value) => {
            refine(value);
            setRecordValue(value);
          }}
          onEndEditing={refine(updateRecordValue)}
          value={updateRecordValue}
          placeholder="Search your query by voice"
          style={styles.searchBarText}
        />
        <TouchableHighlight
          activeOpacity={0.5}
          onPress={isRecording ? stopRecognizing : startRecognizing}>
          <Image
            source={require('../assets/voice.png')}
            style={styles.searchVoiceIcon}
          />
        </TouchableHighlight>
        {/* <Text>Results</Text>
        <ScrollView style={{marginBottom: 42}}>
          {results.map((result, index) => {
            return <Text key={`result-${index}`}>{result}</Text>;
          })}
        </ScrollView> */}
      </View>
    </View>
  );
};

SearchBox.propTypes = {
  currentRefinement: PropTypes.string.isRequired,
  refine: PropTypes.func.isRequired,
};

export default connectSearchBox(SearchBox);
