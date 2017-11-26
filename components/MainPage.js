import React, { Component } from 'react';
import { StyleSheet, Text, TabBarIOS, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBar from './StatusBar';
// Pages
import SearchList from './SearchList';
import FriendsPage from './FriendsPage';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMenuItem: 'search' 
    };
    this.handleMenuSelection = this.handleMenuSelection.bind(this);
  }

  handleMenuSelection(menuString) {
    this.setState({
      selectedMenuItem: menuString
    })
  }


  render() {
    const styles = StyleSheet.create({
      navigator: {
        flex: 1,
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      tabContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      tabText: {
        color: 'white',
      },
      button: {
        marginTop: 20,
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 4,
      },
    });
    return (
      <TabBarIOS
        unselectedTintColor="black"
        tintColor="blue"
        barTintColor="white"
        translucent={true}>
          
        <Icon.TabBarItemIOS
          title="Search"
          iconName="ios-search"
          selectedIconName="ios-search"
          selected={this.state.selectedMenuItem === 'search'}
          onPress={this.handleMenuSelection.bind(null, 'search')}>
          <SearchList />
        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          title="Deals"
          iconName="ios-cash-outline"
          selectedIconName="ios-cash-outline"
          selected={this.state.selectedMenuItem === 'deals'}
          onPress={this.handleMenuSelection.bind(null, 'deals')}>
          <View><Text>DEALS</Text></View>
        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          title="Friends"
          iconName="ios-people"
          selectedIconName="ios-people"
          selected={this.state.selectedMenuItem === 'friends'}
          onPress={this.handleMenuSelection.bind(null, 'friends')}>
          <FriendsPage />
        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          title="Profile"
          iconName="ios-menu"
          selectedIconName="ios-menu"
          selected={this.state.selectedMenuItem === 'profile'}
          onPress={this.handleMenuSelection.bind(null, 'profile')}>
          <View><Text>PROFILE</Text></View>
        </Icon.TabBarItemIOS>

      </TabBarIOS>
    );
  }
}

export default MainPage;