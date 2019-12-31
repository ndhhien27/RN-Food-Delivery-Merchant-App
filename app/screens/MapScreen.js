/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, {
  Polyline,
  Marker,
  Callout,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import { decode } from '@mapbox/polyline';
import { Icon, Button } from 'react-native-elements';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  View,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useSelector } from 'react-redux';
import { theme } from '../constants/theme';
import MapAPI from '../services/MapService';
import { navigate } from '../services/NavigationService';

const MapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#ebe3cd',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#523735',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f1e6',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#c9b2a6',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#dcd2be',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ae9e90',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#93817c',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#a5b076',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#447530',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f1e6',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#fdfcf8',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f8c967',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#e9bc62',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e98d58',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#db8555',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#806b63',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8f7d77',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#ebe3cd',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#b9d3c2',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#92998d',
      },
    ],
  },
];

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    // height: 400,
    // width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textInput: {
    padding: 0,
    height: 44,
    margin: 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  mapContainer: {
    position: 'absolute',
    // right: 10,
    // left: 10,
    paddingTop: 44,
    padding: 10,
    backgroundColor: 'transparent',
    zIndex: 1000,
    width: '100%',
    // height: 30
  },
  listView: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  textInputContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    // height: 56,
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
    zIndex: 10000,
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  direction: {
    zIndex: 10000,
    position: 'absolute',
    bottom: 80,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  directionInfoContainer: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: '#fff',
    bottom: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 16,
  },
  directionInfoText: {
    fontFamily: theme.text.fonts['sfpt-medium'],
    fontSize: theme.text.size.md,
  },
  backBtn: {
    zIndex: 10000,
    position: 'absolute',
    top: 20,
    left: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const LocationPickerScreen = props => {
  const currentLocation = useSelector(state => state.auth.currentLocation);
  const { navigation } = props;
  const { storeLat, storeLong, storeName } = navigation.state.params;
  const [error, setError] = useState('');
  const mapRef = useRef();
  const [directionData, setDirectionData] = useState({
    coords: null,
    distance: null,
    time: null,
    isDirection: false,
  });
  // const { formikProps, formikKey, latKey, longKey } = navigation.state.params;

  // useEffect(() => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       setLat(position.coords.latitude);
  //       setLong(position.coords.longitude);
  //     },
  //     error => setError(error.message),
  //     { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
  //   );

  //   // setAddressTextInput(inputLocationRef.current.getAddressText());
  //   // direction();
  // }, []);

  useEffect(() => {
    direction();
  }, []);

  // console.log(lat, long, storeLat, storeLong);
  const direction = () => {
    const originStr = `${currentLocation.lat},${currentLocation.long}`;
    const destStr = `${storeLat},${storeLong}`;
    MapAPI.directions(
      originStr,
      destStr,
      res => {
        const routes = res.data.routes[0];
        const points = decode(routes.overview_polyline.points);
        const coords = points.map(point => {
          return {
            latitude: point[0],
            longitude: point[1],
          };
        });
        const distanceTime = routes.legs[0];
        const distance = distanceTime.distance.text;
        const time = distanceTime.duration.text;
        setDirectionData({ coords, distance, time });
      },
      err => console.log(err),
    );
  };
  const goBackMyLocation = () => {
    mapRef.current.animateCamera(
      {
        center: {
          latitude: currentLocation.lat,
          longitude: currentLocation.long,
        },
        pitch: 2,
        heading: 20,
        altitude: 200,
        zoom: 17,
      },
      1000,
    );
  };

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    );
  };
  const [data, setData] = useState([
    { name: 'phuc', title: 'sss' },
    { name: 'phuc', title: 'sss' },
    { name: 'phuc', title: 'sss' },
    { name: 'phuc', title: 'sss' },
  ]);
  const [showCarousel, setShowCarousel] = useState(false);

  return (
    <>
      <MapView
        ref={mapRef}
        // onTouchStart={() => {
        //   inputLocationRef.current.triggerBlur();
        // }}
        style={styles.map}
        initialRegion={{
          latitude: storeLat,
          longitude: storeLat,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        region={{
          latitude: storeLat,
          longitude: storeLong,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        customMapStyle={MapStyle}
        showsMyLocationButton
        showsUserLocation
        provider={PROVIDER_GOOGLE}
      >
        {!!currentLocation.lat && !!currentLocation.long && (
          <>
            <Marker
              coordinate={{ latitude: storeLat, longitude: storeLong }}
              title={storeName}
              onPress={() => setShowCarousel(true)}
            />
          </>
        )}
        {directionData.isDirection && (
          <Polyline
            strokeWidth={8}
            strokeColor="#3490de"
            coordinates={directionData.coords}
          />
        )}
      </MapView>
      <Button
        buttonStyle={{
          backgroundColor: '#fff',
          width: 50,
          height: 50,
          borderRadius: 25,
        }}
        containerStyle={styles.direction}
        type="clear"
        icon={
          <Icon
            type="material-community"
            name="directions"
            size={30}
            color={theme.color.primary}
          />
        }
        onPress={() =>
          setDirectionData(prev => {
            return {
              ...prev,
              isDirection: true,
            };
          })
        }
      />
      <Button
        buttonStyle={{
          width: 50,
          height: 50,
          borderRadius: 25,
          padding: 0,
        }}
        containerStyle={styles.backBtn}
        type="clear"
        icon={
          <Icon
            type="material-community"
            name="arrow-left"
            size={30}
            color={theme.color.primary}
          />
        }
        onPress={() => navigation.goBack()}
      />

      {/* <View style={styles.myLocation}> */}
      <Button
        type="clear"
        icon={
          <Icon
            type="material-community"
            name="crosshairs-gps"
            size={30}
            color={theme.color.primary}
            onPress={goBackMyLocation}
            underlayColor="transparent"
          />
        }
        buttonStyle={{
          backgroundColor: '#fff',
          width: 50,
          height: 50,
          borderRadius: 25,
        }}
        containerStyle={styles.myLocation}
        // containerStyle={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
      />
      {/* </View> */}
      {directionData.isDirection && (
        <View style={styles.directionInfoContainer}>
          <Text style={styles.directionInfoText}>
            Distance: {directionData.distance}
          </Text>
          <Text style={styles.directionInfoText}>
            Time: {directionData.time}
          </Text>
        </View>
      )}
    </>
  );
};

export default LocationPickerScreen;
