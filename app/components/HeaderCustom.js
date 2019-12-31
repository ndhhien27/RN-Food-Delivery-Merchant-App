import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import HeaderBtn from './HeaderBtn';

function HeaderCustom({ leftTitle = '', formik, rightTitle = '' }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.content}>
        <HeaderBtn name="arrow-left" title={leftTitle} />
        <Text>Food name</Text>
        <HeaderBtn title={rightTitle} onPress={formik.handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 88,
    justifyContent: 'flex-end',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default withNavigation(HeaderCustom);
