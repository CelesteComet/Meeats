import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body } from 'native-base';

const styles = {
  'thumbnail': {
    width: 80,
    height: 80,
    borderRadius: 0
  },
  'circles': {
    width: 80,
    height: 80,
    borderRadius: 28,
  },
  smallFont: {
    fontSize: 11
  }
}

class SearchListItem extends Component {

  render() {
    const {name, image_url, review_count, rating, price, location: { address1, city } } = this.props.data;
    return (
      <ListItem>
        { !!image_url && <Image style={styles['circles']} source={{uri: image_url}} /> }
        <Body>
          { name && <Text>{name}</Text> }
          { review_count && <Text>{review_count} Reviews</Text> }
          { !!address1 && !!city &&  <Text style={ styles.smallFont } numberOfLines={1} >{`${address1}, ${city}`}</Text> }
        </Body>
      </ListItem>
    );
  }
}

export default SearchListItem;