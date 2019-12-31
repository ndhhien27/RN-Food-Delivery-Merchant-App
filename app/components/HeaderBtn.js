import React from 'react';
import { Button, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { theme } from '../constants/theme';

function HeaderBtn({ onPress, name = '', title = '' }) {
  return (
    <Button
      icon={
        name ? (
          <Icon
            type="material-community"
            name={name}
            color={theme.color.primary}
          />
        ) : null
      }
      buttonStyle={{ paddingRight: 16 }}
      titleStyle={{ color: theme.color.primary }}
      title={title}
      type="clear"
      onPress={onPress}
    />
  );
}

export default withNavigation(HeaderBtn);
