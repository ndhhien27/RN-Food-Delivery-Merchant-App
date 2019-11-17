/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, FlatList, StyleSheet, View } from 'react-native';
import { ListItem, Overlay, Input, Button } from 'react-native-elements';
import { theme } from '../../constants/theme';

export default function MenuScreen(props) {
  const { navigation } = props;
  const [menuInfo, setMenuInfo] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const togleModal = () =>
    setIsVisible(prev => {
      return !prev;
    });
  useEffect(() => {
    fetchMenu();
    navigation.setParams({ addDishType: togleModal });
  }, []);
  const restaurantId = '5dce3591e3557d165a5c7a97';
  const fetchMenu = () => {
    axios({
      url: 'http://localhost:8080/graphql',
      method: 'post',
      data: {
        query: `
          query Menu($restaurantId: ID!) {
            menuByRestaurant(restaurantId: $restaurantId){
              _id
              name
              foods{
                _id
                name
                price{
                  value
                }
              }
            }
          }
        `,
        variables: {
          restaurantId,
        },
      },
    })
      .then(result => {
        setMenuInfo(result.data.data.menuByRestaurant);
      })
      .catch(err => console.log(err));
  };
  const renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.name}
        titleStyle={styles.itemTitle}
        bottomDivider
        chevron
        rightElement={
          <Text style={styles.price}>{`${item.foods.length} food`}</Text>
        }
        onPress={() => navigation.navigate('Foods', { foods: item.foods })}
        containerStyle={{ paddingLeft: 0 }}
      />
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={menuInfo}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingLeft: 16 }}
        ListHeaderComponent={<Text style={styles.title}>Menu</Text>}
        // alwaysBounceVertical={false}
      />
      <Overlay
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        animationType="slide"
        borderRadius={10}
        height={150}
        overlayStyle={{ padding: 0 }}
        overlayBackgroundColor={theme.color.grayLight}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderColor: theme.color.gray,
              backgroundColor: '#fff',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <Button type="clear" title="Cancel" />
            <Text>New dish type</Text>
            <Button type="clear" title="Done" />
          </View>
          <View>
            <Input
              autoFocus
              placeholder="Enter new dish type"
              containerStyle={{
                backgroundColor: '#fff',
                paddingHorizontal: 0,
              }}
              inputContainerStyle={{
                borderBottomColor: theme.color.gray,
                paddingLeft: 8,
              }}
            />
          </View>
        </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  itemTitle: {
    fontFamily: theme.text.fonts['sfpt-medium'],
    fontSize: theme.text.size.md,
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
    fontFamily: theme.text.fonts['sfpd-bold'],
    fontSize: theme.text.size['2xl'],
  },
});
