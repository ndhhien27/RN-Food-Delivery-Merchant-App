import React from 'react';
import { Button, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

function HeaderBtn({ onPress }) {
  return (
    <Button
      icon={<Icon type="material-community" name="plus" />}
      type="clear"
      onPress={onPress}
    />
  );
}

export default withNavigation(HeaderBtn);
