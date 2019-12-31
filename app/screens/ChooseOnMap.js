/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { theme } from '../constants/theme';
import MapAPI from '../services/MapService';
import MapStyle from '../components/MapStyle';
import { image } from '../constants/images';

export default function ChooseOnMap(props) {
  const currentLocation = useSelector(
    state => state.userReducer.currentLocation,
  );
  const mapRef = useRef();
  const [lat, setLat] = useState(currentLocation.lat);
  const [long, setLong] = useState(currentLocation.long);
  const [error, setError] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [listLocation, setListLocation] = useState([]);
  const { hideModal, chooseLocation, hideParentModal } = props;
  // const addUserLocation = () => {
  //   formikProps.setFieldValue(formikKey, inputLocationRef.current.state.text);
  //   formikProps.setFieldValue(latKey, choosenGeometry.lat);
  //   formikProps.setFieldValue(longKey, choosenGeometry.long);
  //   console.log(inputLocationRef.current.state.text);
  //   console.log(choosenGeometry);
  // };
  useEffect(() => {
    setisLoading(true);
    MapAPI.geocodeReverse(
      currentLocation.lat,
      currentLocation.long,
      res => {
        setListLocation(res.data.results.slice(0, 4));
        setisLoading(false);
      },
      err => console.log(err),
    );
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ borderBottomWidth: 1, borderColor: theme.color.gray }}
        onPress={() => {
          chooseLocation(
            item.formatted_address,
            item.geometry.location.lat,
            item.geometry.location.lng,
          );
          hideModal();
          hideParentModal();
        }}
      >
        <Button
          disabled
          disabledTitleStyle={{ color: '#000' }}
          type="clear"
          buttonStyle={{ padding: 0 }}
          containerStyle={{ alignItems: 'flex-start' }}
          icon={
            <Icon
              type="material-community"
              name="map-marker-outline"
              size={16}
            />
          }
          title={item.formatted_address.split(',')[0]}
          titleStyle={{ color: '#000' }}
        />
        <Text style={{ paddingLeft: 16 }}>{item.formatted_address}</Text>
      </TouchableOpacity>
    );
  };

  console.log(isLoading);
  return (
    <View style={{ flex: 1 }}>
      <Button
        type="clear"
        icon={<Icon name="close" type="material-community" />}
        buttonStyle={{ padding: 0 }}
        onPress={hideModal}
        containerStyle={{
          position: 'absolute',
          zIndex: 1000,
          top: 16,
          left: 16,
        }}
      />
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
          region={{
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
          customMapStyle={MapStyle}
          showsMyLocationButton
        >
          {!!lat && !!long && (
            <>
              <Marker
                image={image.user}
                coordinate={{ latitude: lat, longitude: long }}
                title="My Location"
              />
            </>
          )}
        </MapView>
        {isLoading && (
          <ActivityIndicator
            size="large"
            color={theme.color.primary}
            style={{
              position: 'absolute',
              justifyContent: 'center',
              alignSelf: 'center',
              height: '100%',
            }}
          />
        )}
        <FlatList
          data={listLocation}
          keyExtractor={(item, index) => `item-${index}`}
          renderItem={renderItem}
          contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 22,
    height: 44,
    backgroundColor: theme.color.lightGray,
    fontFamily: theme.text.fonts['sfpt-medium'],
    fontSize: theme.text.size.md,
  },
  row: {
    height: Platform.OS === 'android' ? 60 : 40,
    padding: 4,
  },
  description: {
    fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: theme.text.size.md,
  },
  predefinedPlacesDescription: {
    fontFamily: theme.text.fonts['sfpt-medium'],
    fontSize: theme.text.size.md,
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    // zIndex: 1,
    flex: 1,
  },
  mapContainer: {
    position: 'absolute',
    // right: 10,
    // left: 10,
    // padding: 10,
    backgroundColor: 'transparent',
    zIndex: 1000,
    width: '100%',
    alignSelf: 'center',
    // height: 30
  },
  listView: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 16,
  },
  textInputContainer: {
    backgroundColor: 'transparent',
    // marginTop: 44,
    justifyContent: 'center',
    alignItems: 'center',
    // height: 70,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    // paddingVertical: 20,
    // // width: '80%',
    // marginTop: 44,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    // alignItems: 'center'
  },
  poweredContainer: {
    display: 'none',
  },
  rightBtn: {},
  btnContainer: {
    justifyContent: 'center',
    padding: 10,
    zIndex: 10000000,
  },
  myLocation: {
    width: 50,
    height: 50,
    zIndex: 10000,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.white,
    borderColor: theme.color.primary,
    borderWidth: 3,
  },
  chooseBtn: {
    width: '50%',
    alignSelf: 'center',
    top: '91.5%',
    zIndex: 1000000,
  },
  slide: {
    height: 200,
  },
});
