import React from 'react';
import {StyleSheet, View, SafeAreaView, StatusBar} from 'react-native';
import algoliasearch from 'algoliasearch/reactnative';
import {InstantSearch} from 'react-instantsearch-native';
import SearchBox from '../src/SearchBox';
import InfiniteHits from '../src/InfiniteHits';

const searchClient = algoliasearch(
  'M1DXI0Z48A',
  'ca7dad8b9214bcd8bc4127d06b5f52d5',
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#252b33',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

class SecondPage extends React.Component {
  root = {
    Root: View,
    props: {
      style: {
        flex: 1,
      },
    },
  };

  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <InstantSearch
            searchClient={searchClient}
            indexName="atmanirbhar"
            root={this.root}>
            <SearchBox />
            <InfiniteHits />
          </InstantSearch>
        </View>
      </SafeAreaView>
    );
  }
}

export default SecondPage;
