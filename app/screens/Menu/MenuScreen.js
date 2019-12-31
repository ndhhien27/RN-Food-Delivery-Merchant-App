/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  RefreshControl,
} from 'react-native';
import { ListItem, Overlay } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { theme } from '../../constants/theme';
import NewDishTypeModal from './NewDishTypeModal';
import { currencyFormat } from '../../utils/string';
import { fetchingMenu } from '../../actions/restaurantActions';
import API from '../../services/api';

export default function MenuScreen(props) {
  const { navigation } = props;
  const [menuInfo, setMenuInfo] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const isLoading = useSelector(state => state.uiReducer.isLoading);
  const menu = useSelector(state => state.restaurantReducer.menu);
  const restId = useSelector(
    state => state.restaurantReducer.restaurantInfo._id,
  );
  const dispatch = useDispatch();
  const togleModal = () =>
    setIsVisible(prev => {
      return !prev;
    });
  const restaurantId = '5dce36b8e3557d165a5c7a98';
  useEffect(() => {
    dispatch(fetchingMenu(restId));
    // API.getMenu(
    //   restaurantId,
    //   res => setMenuInfo(prev => res.data.data.menuByRestaurant),
    //   err => console.log(err),
    // );
    navigation.setParams({ addDishType: togleModal });
  }, []);
  const renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.name}
        titleStyle={item.header ? styles.headerTitle : styles.itemTitle}
        bottomDivider
        rightElement={
          item.price ? (
            <Text style={styles.price}>
              {currencyFormat(item.price.toString())}đ
            </Text>
          ) : null
        }
        Component={TouchableOpacity}
        onPress={
          item.header
            ? () => {}
            : () =>
                navigation.navigate('FoodDetail', {
                  dishType: item.dishType,
                  foodName: item.name,
                  price: item.price,
                })
        }
        activeOpacity={item.header ? 1 : 0.3}
        containerStyle={
          item.header ? styles.headerContainer : styles.itemContainer
        }
      />
    );
  };
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const headerStyle = scrollY.interpolate({
    inputRange: [0, 32],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const renderItem2 = ({ item }) => {
    return (
      <ListItem
        title={item.name}
        titleStyle={styles.headerTitle}
        containerStyle={{ paddingLeft: 0, paddingVertical: 10 }}
        bottomDivider
        chevron
        badge={{
          value: item.foods.length,
          textStyle: { fontSize: 15 },
          badgeStyle: { backgroundColor: theme.color.primary, width: 30 },
        }}
        onPress={() =>
          navigation.navigate('FoodList', {
            foods: item.foods,
            dishType: item.name,
            dishTypeId: item._id,
          })
        }
      />
    );
  };
  useEffect(() => {
    navigation.setParams({ headerStyle });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={menu}
        keyExtractor={item => `${item._id}`}
        contentContainerStyle={{ paddingLeft: 16 }}
        renderItem={renderItem2}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => dispatch(fetchingMenu(restId))}
            colors={[theme.color.primary]}
            size={50}
          />
        }
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}
      />
      <Overlay
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        animationType="slide"
        height="90%"
        width="100%"
        overlayStyle={{ padding: 0, position: 'absolute', bottom: 0 }}
      >
        <NewDishTypeModal onPress={() => setIsVisible(false)} data={menuInfo} />
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  itemTitle: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.md,
  },
  headerTitle: {
    fontFamily: theme.text.fonts.sfpd,
    fontSize: theme.text.size.lg,
  },
  itemSubtitle: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.sm,
    color: theme.color.darkGray,
  },
  price: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.md,
    color: theme.color.primary,
  },
  title: {
    fontFamily: theme.text.fonts.sfpd,
    fontSize: theme.text.size['2xl'],
    paddingLeft: 16,
    marginBottom: 16,
  },
  headerContainer: {
    backgroundColor: theme.color.gray,
    paddingLeft: 16,
  },
  itemContainer: {
    backgroundColor: '#fff',
    paddingLeft: 16,
  },
});

MenuScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Menu',
  };
};
