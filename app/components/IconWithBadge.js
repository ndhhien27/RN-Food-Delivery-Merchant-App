/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../constants/theme';

export default class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, color, size } = this.props;
    return (
      <View>
        <Icon name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              // /If you're using react-native < 0.57 overflow outside of the parent
              // will not work on Android, see https://git.io/fhLJ8
              position: 'absolute',
              right: -6,
              top: 0,
              backgroundColor: 'red',
              borderRadius: 9,
              width: 18,
              height: 18,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                fontFamily: theme.text.fonts['sfpt-bold'],
              }}
            >
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
