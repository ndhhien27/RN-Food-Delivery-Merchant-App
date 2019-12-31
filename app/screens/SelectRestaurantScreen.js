/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, ListItem, Overlay } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingUserInfo } from '../actions/userActions';
import { theme } from '../constants/theme';
import NewRestScreen from './NewRestScreen';

export default function SelectRestaurantScreen(props) {
  const { navigation } = props;
  const userInfo = useSelector(state => state.userReducer.userInfo);
  const isLoading = useSelector(state => state.uiReducer.isLoading);
  const merchantId = useSelector(state => state.auth.merchantId);
  const dispatch = useDispatch();
  const callFetchingUserInfo = () => dispatch(fetchingUserInfo(merchantId));
  // const getStorage = async () => {
  //   const data = await AsyncStorage.getItem('persist:auth');
  //   const parseData = JSON.parse(data);
  //   console.log(parseData.authToken);
  // };
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    callFetchingUserInfo();
    // getStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My Restaurant</Text>
      </View>
      {userInfo.createdRestaurants && (
        <FlatList
          data={userInfo.createdRestaurants}
          keyExtractor={item => `${item._id}`}
          alwaysBounceVertical={false}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              subtitle={item.position.address}
              titleStyle={styles.itemTitleStyle}
              subtitleStyle={styles.itemSubtitleStyle}
              bottomDivider
              onPress={() =>
                navigation.navigate('OrderScreen', { restId: item._id })
              }
            />
          )}
          ListFooterComponent={
            <Button
              title="New restaurant"
              type="clear"
              onPress={() => setIsVisible(true)}
            />
          }
        />
      )}
      <Button
        title="Sign out"
        titleStyle={{ fontSize: theme.text.size.lg }}
        type="clear"
        containerStyle={{ paddingBottom: 44 }}
        onPress={() => navigation.navigate('Auth')}
      />
      <Overlay
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        animationType="slide"
        height="80%"
        width="100%"
        overlayStyle={{ padding: 0, position: 'absolute', bottom: 0 }}
      >
        <NewRestScreen onPress={() => setIsVisible(false)} />
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 88 : 56,
    flex: 1,
  },
  title: {
    fontFamily: theme.text.fonts['sfpd-bold'],
    fontSize: theme.text.size['2xl'],
  },
  itemTitleStyle: {
    fontFamily: theme.text.fonts['sfpd-bold'],
    fontSize: theme.text.size.xl,
  },
  itemSubtitleStyle: {
    fontFamily: theme.text.fonts['sfpd-bold'],
    fontSize: theme.text.size.lg,
    color: theme.color.darkGray,
  },
  titleContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
});
