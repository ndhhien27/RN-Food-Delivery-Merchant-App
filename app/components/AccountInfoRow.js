import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { theme } from '../constants/theme';

export default function AccountInfoRow(props) {
  const { iconName, style, value } = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: theme.color.gray,
        paddingVertical: 8,
      }}
    >
      <Icon
        type="material-community"
        name={iconName}
        size={28}
        containerStyle={{ paddingRight: 8 }}
      />
      <Text style={style} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}
