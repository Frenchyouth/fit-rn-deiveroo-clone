import React, { useEffect, useLayoutEffect } from 'react';
import {View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/core';
import { Entypo } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { urlFor } from '../client';
import { ArrowLeftIcon, ChevronRightIcon, StarIcon,  } from 'react-native-heroicons/solid';
import { ArrowRightIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/outline';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { setRestaurant } from '../feautures/restaurantSlice';




function RestaurantScreen({navigation})
{
    const { 
        params: {
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
    }, 
} = useRoute();

const dispatch = useDispatch();

useLayoutEffect(() => {
    navigation.setOptions({
        headerShown: false
    })
},[]);

useEffect(() => {
dispatch(setRestaurant({
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
}))
}, [dispatch]);

 return (
     <>
     <BasketIcon/>
<ScrollView style={{flex: 1}}>
    <View style={{position: "relative"}}>
        <Image 
        style={{height: 220, width: "100%"}}
            source={{
                uri: urlFor(imgUrl).url()
               
            }}
        />
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", top: 50, left: 11, padding: 3, backgroundColor: "white", borderRadius: 20}}>
            <ArrowLeftIcon size={27} color="#00CCBB"  />
        </TouchableOpacity>
    </View>

    <View style={{backgroundColor: "white"}}>
            <View style={{padding: 4}}>
                <Text style={{fontSize: 24, fontWeight: "bold"}}>{title}</Text>
            </View>
            <View style={{flexDirection: "row", padding: 5}}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <StarIcon size={22} color="green" opacity={0.5} />
                    <Text style={{color: "grey"}}>
                    <Text style={{color: "lightgreen"}}>  {rating}</Text> ` {genre}
                    </Text>
                </View>

                <View style={{flexDirection: "row", alignItems: "center"}}>
               <Entypo name="location-pin" color="#00CCBB" size={25} />
               <Text style={{color: "grey"}}>Nearby ` {address}</Text>
                </View>
            </View>

            <Text style={{color: "grey", marginHorizontal: 15, marginVertical: 15}}>{short_description}</Text>

            <TouchableOpacity style={{borderTopColor: "lightgrey", borderTopWidth: 0.5, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{flexDirection: "row", padding: 18}}>
                <QuestionMarkCircleIcon color="grey" style={{marginLeft: 4}}/>
                <Text style={{fontWeight: "bold", fontSize: 18, marginLeft: 14}}>Have a food allergy?</Text>
                </View>
                <ChevronRightIcon color="#00CCBB" style={{marginRight: 14}}/>
            </TouchableOpacity>
    </View>

            <View style={{padding: 10}}>
                <Text style={{fontSize: 18, fontWeight: "bold"}}>Menu</Text>
            </View>

            {/* Dish rows */}
            {dishes.map((dish) =>(
                <DishRow
                key={dish._id}
                id={dish._id}
                name={dish.name}
                description={dish.short_description}
                price={dish.price}
                image={dish.image}
                />
            ))}
</ScrollView>
</>
);
}

const styles = StyleSheet.create({
    
})

export default RestaurantScreen;