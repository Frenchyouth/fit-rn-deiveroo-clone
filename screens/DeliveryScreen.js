import React from 'react';
import {View, StyleSheet, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import MapView, { Marker } from 'react-native-maps';

import { selectRestaurant } from '../feautures/restaurantSlice';
import { XMarkIcon } from 'react-native-heroicons/solid';

function DeliveryScreen(props)
{

    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant)
 return (
<View style={{flex: 1, backgroundColor: "#00CCBB"}}>
    <SafeAreaView style={{marginTop: 40, zIndex: 1}}>
        <View style={{flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, alignItems: "center"}}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <XMarkIcon color="white" size={30} />
            </TouchableOpacity>
            <Text style={{color: "white", fontWeight: "400", fontSize: 18}}>Order Help</Text>
        </View>

    {/* Delivery Time Estimate */}

    <View style={{backgroundColor: "white", padding: 10, marginHorizontal: 20, borderRadius: 5, zIndex: 1, top: 14}}>
        <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
        <View>
            <Text style={{color: "gray", marginTop: 10, marginBottom: 5}}>Estimated Arrival</Text>
            <Text style={{fontSize: 25, fontWeight: "800"}}>30-65 Minutes</Text>
        </View>
        <View>

        <Animatable.Image
    style={{height: 120, width: 230, borderRadius: 10, resizeMode: "contain",}}
    source={require("../assets/gifs.gif")}
    animation="slideInUp"
    iterationCount={1}
    />
        </View>

        </View>
    <Progress.Bar size={25} color="#00CCBB" indeterminate={true} />
    <Text style={{color: "gray", marginVertical: 10}}>Yaayy! Your order at {restaurant.title} is being prepared!</Text>
    </View>

{/* Map */}


    </SafeAreaView>
    <MapView
    
      initialRegion={{
        // latitude: restaurant.lat,
        latitude: 43.07510,
        longitude: -87.95671,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.0015,
      }}
      
      style={{flex: 1, zIndex: 0}}
    >
       <Marker
       coordinate={{
        latitude: 43.07510,
        longitude: -87.95671,
       }}
       title={restaurant.title}
       description={restaurant.short_description}
       identifier="origin"
       pinColor="#00CCBB"
       />
    </MapView>

    <SafeAreaView style={{backgroundColor: "white", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
       <View style={{flexDirection:"row", alignItems: "center"}}>
        <Image
        style={{height: 50, width: 50, borderRadius: 25, marginLeft: 20, marginTop: 10}}
            source={ require('../assets/profile.png')}
        />
        <View style={{marginLeft: 20}}>
            <Text style={{marginVertical: 5}}>Andre French</Text>
            <Text style={{color: "gray", fontSize: 14}}>Your Driver</Text>
        </View>
       </View>
        <Text style={{marginRight: 30, alignItems: "center", fontSize: 18, color: "#00CCBB"}}>Call</Text>

    </SafeAreaView>
</View>
);
}

const styles = StyleSheet.create({
    
})

export default DeliveryScreen;