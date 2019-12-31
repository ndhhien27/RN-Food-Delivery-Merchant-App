import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import FieldWrapper from './FieldWrapper';
import { theme } from '../constants/theme';
import { setIsSelected } from '../utils/array';

export default function InputToggle({
  formikKey,
  formikProps,
  setDishTypeList,
}) {
  const [toggleInput, setToggleInput] = useState(false);
  return (
    <View style={{ marginBottom: 44 }}>
      <Button
        title="Add new dish type"
        titleStyle={{ paddingLeft: 16 }}
        type="clear"
        buttonStyle={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          paddingLeft: 16,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderColor: theme.color.gray,
        }}
        onPress={() => {
          setToggleInput(true);
          formikProps.setFieldValue(formikKey, '');
          setDishTypeList(prev => setIsSelected(prev));
        }}
        icon={
          <Icon
            type="material-community"
            name="plus-circle"
            color={theme.color.green}
          />
        }
      />
      {toggleInput && (
        <FieldWrapper formikKey={formikKey} formikProps={formikProps}>
          <Input
            autoFocus
            onChangeText={formikProps.handleChange(formikKey)}
            onBlur={formikProps.handleBlur(formikKey)}
            placeholder="New dish type"
            containerStyle={{
              backgroundColor: '#fff',
              paddingHorizontal: 0,
            }}
            inputContainerStyle={{
              borderBottomWidth: 1,
              borderColor: theme.color.gray,
              paddingLeft: 16,
            }}
            inputStyle={{ paddingLeft: 16 }}
            leftIcon={
              <Icon
                type="material-community"
                name="minus-circle"
                color={theme.color.red}
                onPress={() => setToggleInput(false)}
              />
            }
            leftIconContainerStyle={{ marginLeft: 0 }}
            clearButtonMode="while-editing"
          />
        </FieldWrapper>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
