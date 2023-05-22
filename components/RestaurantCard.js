import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
// import { LocationMarkerIcon } from 'react-native-heroicons/outline';
import { StarIcon } from 'react-native-heroicons/solid';
import { Entypo } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/core';
import { urlFor } from '../client';

function RestaurantCard({
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat,
})
{
    const navigation = useNavigation();
 return (
<TouchableOpacity
onPress={() => navigation.navigate('Restaurant', 
{
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat,
}
)}
style={{backgroundColor: "white", marginHorizontal: 5, shadowOffset: {width: 4, height: 4}, shadowColor: "#171717", shadowOpacity: 0.2, shadowRadius: 3, borderRadius: 5}}>
    <Image 
    source={{uri: urlFor(imgUrl).url()}}
    style={{height: 200, width: 250, borderRadius: 5}}
    />

    <View style={{paddingBottom: 4,}}>
        <Text style={{fontWeight: "bold", fontSize: 16, padding: 2}}>{title}</Text>
        <View style={{flexDirection: "row", alignItems: "center"}}>
            <StarIcon color="green" opacity={0.5} size={20} />
            <Text style={{color: "grey"}}>
                <Text style={{color: "lightgreen"}}>  {rating}  </Text> {genre}
                </Text>
        </View>

        <View style={{flexDirection: "row", alignItems: "center"}}>
            <Entypo name="location-pin" color="lightgreen" size={22}/>
            <Text style={{color: "grey"}}>Nearby - {address}</Text>
        </View>
    </View>
</TouchableOpacity>
);
}

const styles = StyleSheet.create({
    
})

export default RestaurantCard;