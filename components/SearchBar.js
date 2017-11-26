import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Header, Item, Input, Icon, Button } from 'native-base';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white' 
  }  
});

const SearchBar = (props) => {
  return (
    <Header searchBar rounded>
      <Item>
        <Icon name="ios-search" />
        <Input placeholder="Search" onFocus={props.setLocation ? props.setLocation : null} onChange={props.setSearchText} />
        <Icon name="ios-people" />
      </Item>
      <Button transparent>
        <Text>Search</Text>
      </Button>
    </Header>
  );
}

SearchBar.propTypes = {
  'setLocation': PropTypes.func,
  'setSearchText': PropTypes.func.isRequired
};

export default SearchBar;