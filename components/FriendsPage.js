import React, { Component } from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Spinner} from 'native-base';
import SearchBar from './SearchBar';
import FriendListItem from './FriendListItem';
import axios from 'axios';

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white' 
  }  
});

class FriendsPage extends Component {
  constructor(props) {
    super(props);
    this.setSearchText = this.setSearchText.bind(this);
    this.sendSearchQuery = this.sendSearchQuery.bind(this);
    this.state = {
      list: null
    }
  }

  sendSearchQuery(query) {
    axios.get(`http://localhost:3000/user/${query}`)
      .then((res) => {
        this.setState({
          list: res.data,
          searchText: null,
          fetching: false
        })
      })
  }

  setSearchText(event) {
    let searchText = event.nativeEvent.text;
    if(searchText !== '') {
      this.setState({
        searchText,
        list: null,
        fetching: true
      })
      this.sendSearchQuery(searchText)
    } else {
      this.setState({
        list: null
      })
    }
  }

  keyExtractor(item) {
    return item._id;
  }

  render() {
    return (
      <Container>
        <SearchBar setSearchText={ this.setSearchText } />
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
            renderItem={ ({item}) => <FriendListItem data={ item }/> }
            keyExtractor={this.keyExtractor}>
          </FlatList>
        }
      </Container>
    );
  }
}

export default FriendsPage;