import { Notifications } from "expo";
import React from "react";
// import { StatusBar } from "react-native";
import { StackNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import registerForPushNotificationsAsync from "../api/registerForPushNotificationsAsync";

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator
    }
  },
  {
    navigationOptions: () => ({
      // headerStyle: {
      // marginTop: -28
      // marginTop: StatusBar.currentHeight
      // },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#252525",
        fontSize: 18,
        alignSelf: "center",

        flex: 1,
        // margin: 0,
        // padding: 0,

        textAlign: "center"
      }
    })
  }
);

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };
}
