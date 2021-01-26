import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {connectSearchBox} from 'react-instantsearch-native';

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

const SearchBox = ({currentRefinement, refine}) => (
  <View style={styles.container}>
    <View style={styles.containerSearch}>
      <TouchableOpacity activeOpacity={0.5}>
        <Image
          source={require('../assets/search.png')}
          style={styles.searchIcon}
        />
      </TouchableOpacity>
      <TextInput
        onChangeText={(value) => refine(value)}
        value={currentRefinement}
        placeholder="Search your query by voice"
        style={styles.searchBarText}
      />
      <TouchableOpacity activeOpacity={0.5}>
        <Image
          source={require('../assets/voice.png')}
          style={styles.searchVoiceIcon}
        />
      </TouchableOpacity>
    </View>
  </View>
);

SearchBox.propTypes = {
  currentRefinement: PropTypes.string.isRequired,
  refine: PropTypes.func.isRequired,
};

export default connectSearchBox(SearchBox);
