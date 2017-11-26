import React, { Component } from 'react';
import { StyleSheet, Text, TabBarIOS, View, FlatList, TextInput } from 'react-native';
import { Spinner, Header, Item, Input, Icon, Button, Container } from 'native-base';
import axios from 'axios'
import SearchListItem from './SearchListItem';
import SearchBar from './SearchBar';

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white' 
  }  
});

class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.keyExtractor = this.keyExtractor.bind(this);
    this.setSearchText = this.setSearchText.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/yelp/all')
      .then((res) => {
        this.setState({
          list: res.data.businesses,
          searchText: null
        });
      })
  }

  keyExtractor(item, index) {
    return item.id;
  }

  sendSearchQuery(position, searchText) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    axios.get(`http://localhost:3000/yelp/search/${latitude}/${longitude}/${searchText}`)
      .then((res) => {
        this.setState({
          list: res.data.businesses,
          searchText: null,
          fetching: false
        });
      })
  }

  setSearchText(event) {
    if(this.state.position) {
      let searchText = event.nativeEvent.text;
      if(searchText !== '') {
        this.setState({
          searchText,
          list: null,
          fetching: true
        })
        this.sendSearchQuery(this.state.position, searchText)
      } else {
        this.setState({
          list: null
        })
      }
    }
  }

  setLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        position
      })
    });
  }

  render() {
    return (
      <Container>
        <SearchBar setLocation={this.setLocation} setSearchText={this.setSearchText} />
        {this.state.fetching && 
          <Spinner color='blue' style={{
            flex: 1,
            justifyContent: 'center',
          }}/>
        }
        {this.state.list &&
          <FlatList 
            style={ styles.pageContainer }
            data={ this.state.list }
            renderItem={ ({item}) => <SearchListItem data={ item }/> }
            keyExtractor={this.keyExtractor}>
          </FlatList>
        }
      </Container>
    );
  }
}

export default SearchList;