/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import { signOut } from '../../actions/authActions';
import { theme } from '../../constants/theme';
import AccountInfoRow from '../../components/AccountInfoRow';
import { navigate } from '../../services/NavigationService';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });

export default ({ navigation }) => {
  // const [state, setState] = useState({
  //   latitude: null,
  //   longitude: null,
  //   error: null,
  // });
  const userInfo = useSelector(state => state.userReducer.userInfo);
  const restInfo = useSelector(state => state.restaurantReducer.restaurantInfo);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   Geolocation.getCurrentPosition(info => console.log(info));
  // }, []);

  // return (
  //   <View style={styles.container}>
  //     <MapView
  //       showsUserLocation
  //       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
  //       style={styles.map}
  //       initialRegion={{
  //         latitude: 16.0580226,
  //         longitude: 108.166019,
  //         latitudeDelta: 0.015,
  //         longitudeDelta: 0.0121,
  //       }}
  //     />
  //   </View>
  // );
  return (
    <View style={{ paddingHorizontal: 16, flex: 1 }}>
      <View style={styles.contentContainer}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.title}>My Info</Text>
          <AccountInfoRow
            iconName="account-outline"
            value={`${userInfo.lName} ${userInfo.fName}`}
            style={styles.name}
          />
          <AccountInfoRow
            iconName="email-outline"
            value={userInfo.email}
            style={styles.email}
          />
        </View>
        <View style={{ paddingTop: 16 }}>
          <Text style={styles.title}>Restaurant Info</Text>
          <AccountInfoRow
            iconName="home-outline"
            value={restInfo.name}
            style={styles.restName}
          />
          <AccountInfoRow
            iconName="map-marker-outline"
            value={restInfo.position.address}
            style={styles.address}
          />
        </View>
      </View>
      <View style={styles.btnGroup}>
        <Button
          containerStyle={{
            alignItems: 'flex-start',
            paddingVertical: 4,
          }}
          icon={
            <Icon
              type="material-community"
              name="comment-text-outline"
              color={theme.color.primary}
              containerStyle={{ marginRight: 8 }}
              size={28}
            />
          }
          title="Reviews"
          type="clear"
          titleStyle={{
            color: theme.color.primary,
            fontFamily: theme.text.fonts.sfpd,
            fontSize: theme.text.size.lg,
          }}
          onPress={() => navigate('Review', null)}
          buttonStyle={{
            padding: 0,
          }}
        />
        <Button
          containerStyle={{
            alignItems: 'flex-start',
            paddingVertical: 4,
          }}
          icon={
            <Icon
              type="material-community"
              name="logout-variant"
              color={theme.color.primary}
              containerStyle={{ marginRight: 8 }}
              size={28}
            />
          }
          title="Sign out"
          type="clear"
          titleStyle={{
            color: theme.color.primary,
            fontFamily: theme.text.fonts.sfpd,
            fontSize: theme.text.size.lg,
          }}
          onPress={() => dispatch(signOut())}
          buttonStyle={{
            padding: 0,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontFamily: theme.text.fonts.sfpd,
    fontSize: theme.text.size.lg,
  },
  email: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.lg,
  },
  title: {
    fontFamily: theme.text.fonts['sfpd-bold'],
    fontSize: theme.text.size.lg,
    color: theme.color.primary,
    textTransform: 'uppercase',
  },
  restName: {
    fontFamily: theme.text.fonts.sfpd,
    fontSize: theme.text.size.lg,
  },
  address: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.lg,
    flex: 1,
  },
  contentContainer: {
    paddingTop: 16,
  },
  btnGroup: {
    paddingTop: 16,
  },
});
