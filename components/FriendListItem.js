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

class FriendListItem extends Component {

  render() {
    const { fullName, email } = this.props.data;
    return (
      <ListItem>
        { /*!!image_url && <Image style={styles['circles']} source={{uri: image_url}} /> */}
        <Body>
          { fullName && <Text>{fullName}</Text> }
          { email && <Text>{email}</Text> }
        </Body>
      </ListItem>
    );
  }
}

export default FriendListItem;