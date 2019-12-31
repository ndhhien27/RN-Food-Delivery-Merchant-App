/* eslint-disable no-shadow */
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
import { Icon, Button } from 'react-native-elements';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  View,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
// import Carousel from 'react-native-snap-carousel';
import { theme } from '../constants/theme';
import MapAPI from '../services/MapService';

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
    backgroundColor: '#fff',
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
    marginTop: 44,
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

const SelectPosition = props => {
  const { navigation } = props;
  const [lat, setLat] = useState(16.0216792);
  const [long, setLong] = useState(108.2257474);
  const [myLocation, setMyLocation] = useState({
    myLat: 0,
    myLong: 0,
  });
  const [searchLocation, setSearchLocation] = useState({
    searchLat: 0,
    searchLong: 0,
  });
  const [error, setError] = useState('');
  const [inputLocation, setInputLocation] = useState('');
  const inputLocationRef = useRef();
  const [addressTextInput, setAddressTextInput] = useState('');
  const mapRef = useRef();
  const [choosenGeometry, setChoosenGeometry] = useState();
  const { formikProps, formikKey, latKey, longKey } = navigation.state.params;

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setMyLocation({
          myLat: position.coords.latitude,
          myLong: position.coords.longitude,
        });
      },
      error => setError(error.message),
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
    );

    setAddressTextInput(inputLocationRef.current.getAddressText());
  }, []);

  const clearText = () => {
    // console.log(inputLocationRef.current)
    inputLocationRef.current.setAddressText('');
  };

  const goBackMyLocation = () => {
    mapRef.current.animateCamera(
      {
        center: {
          latitude: lat,
          longitude: long,
        },
        pitch: 2,
        heading: 20,
        altitude: 200,
        zoom: 17,
      },
      1000,
    );
  };

  const goToLocation = (latt, longg) => {
    mapRef.current.animateCamera(
      {
        center: {
          latitude: latt,
          longitude: longg,
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

  const goBack = () => {
    navigation.goBack();
  };
  console.log(searchLocation);
  const addUserLocation = () => {
    formikProps.setFieldValue(formikKey, inputLocationRef.current.state.text);
    formikProps.setFieldValue(latKey, choosenGeometry.lat);
    formikProps.setFieldValue(longKey, choosenGeometry.long);
    console.log(inputLocationRef.current.state.text);
    console.log(choosenGeometry);
  };

  return (
    <>
      <GooglePlacesAutocomplete
        ref={inputLocationRef}
        placeholder="Search"
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType="search" // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        // keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
        listViewDisplayed="false" // true/false/undefined
        fetchDetails
        // renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          // const { location } = details.geometry;
          MapAPI.geocoding(
            details.formatted_address,
            res => {
              const { lat, lng } = res.data.results[0].geometry.location;
              setSearchLocation(prev => {
                return {
                  searchLat: lat,
                  searchLong: lng,
                };
              });
              setChoosenGeometry({
                lat,
                long: lng,
              });
              goToLocation(lat, lng);
              console.log(res.data.results[0].geometry.location);
            },
            err => console.log(err),
          );
          console.log(details);
          // // setLat(location.lat);
          // // setLong(location.lng);
        }}
        getDefaultValue={() => ''}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyDbGSMJEdxu7ajQyHA5F1b0mOalhnHxzTQ',
          language: 'vi', // language of the results
          // types: '(cities)' // default: 'geocode'
        }}
        styles={{
          container: styles.mapContainer,
          listView: styles.listView,
          textInputContainer: styles.textInputContainer,
          poweredContainer: styles.poweredContainer,
          textInput: styles.textInput,
        }}
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={
          {
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }
        }
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          type: 'cafe',
        }}
        GooglePlacesDetailsQuery={{
          // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
          fields: 'formatted_address',
        }}
        filterReverseGeocodingByTypes={[
          'locality',
          'administrative_area_level_3',
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        // predefinedPlaces={[homePlace, workPlace]}
        // renderRightButton={() => {
        //   const textRef = inputLocationRef.current;
        //   if (!textRef || textRef.getAddressText() !== '') {
        //     return (
        //       <View style={styles.btnContainer}>
        //         <Icon type="material" name="close" onPress={clearText} />
        //       </View>
        //     );
        //   }
        // }}
        renderLeftButton={() => (
          <Button
            icon={<Icon type="material-community" name="arrow-left" />}
            type="clear"
            onPress={() => navigation.goBack(null)}
          />
        )}
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />

      <MapView
        ref={mapRef}
        // onTouchStart={() => {
        //   inputLocationRef.current.triggerBlur();
        // }}
        style={styles.map}
        initialRegion={{
          latitude: myLocation.myLat,
          longitude: myLocation.myLong,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        region={{
          latitude: myLocation.myLat,
          longitude: myLocation.myLong,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        customMapStyle={MapStyle}
        showsMyLocationButton
        showsUserLocation
        provider={PROVIDER_GOOGLE}
      >
        {!!searchLocation.searchLat && !!searchLocation.searchLong && (
          <>
            <Marker
              coordinate={{
                latitude: searchLocation.searchLat,
                longitude: searchLocation.searchLong,
              }}
              title="Your Location"
              onPress={() => setShowCarousel(true)}
            />
          </>
        )}
      </MapView>
      <View style={styles.chooseBtn}>
        <Button
          title="Choose this location"
          onPress={addUserLocation}
          type="solid"
        />
      </View>
      <View style={styles.myLocation}>
        <Icon
          type="font-awesome"
          name="location-arrow"
          size={30}
          color={theme.color.primary}
          onPress={goBackMyLocation}
        />
      </View>
      {/* {showCarousel && (
        <Carousel
          // ref={carouselRef}
          sliderWidth={screenWidth}
          itemWidth={screenWidth - 100}
          data={data}
          renderItem={_renderItem}
          hasParallaxImages
          // slideStyle={{ marginLeft: -10, marginRight: 10 }}
          containerCustomStyle={{
            zIndex: 1000,
            // backgroundColor: 'red',
            position: 'absolute',
            bottom: 80,
          }}
          slideStyle={{
            backgroundColor: theme.color.white,
          }}
          style={{
            backfaceVisibility: 'visible',
          }}
          sliderHeight={300}
        />
      )} */}
    </>
  );
};

export default SelectPosition;
