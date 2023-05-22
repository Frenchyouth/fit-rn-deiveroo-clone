import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, ScrollView } from 'react-native';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantCard from './RestaurantCard';
import client from '../client';

function FeaturedRow({id, title, description})
{
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        client.fetch(
            `
            *[_type=="featured" && _id == $id] {
                ...,
                restaurants[]->{
                  ...,
                  dishes[] ->,
                  type-> {
                      name
                  }
                },
              }[0]
           
            `, {id})
            .then((data) => {
                setRestaurants(data?.restaurants);
                console.log("data log" + data)
            });
    },[])
 return (
<View>
    <View style={{marginTop: 4, flexDirection: "row", justifyContent: "space-between", padding: 5}}>
        <Text style={{fontWeight: "bold", fontSize: 18, marginLeft: 15}}>{title}</Text>
        <ArrowRightIcon color="#00CCBB"/>
    </View>

    <Text style={{color: "grey", padding: 4, marginLeft: 15}}>{description}</Text>

    <ScrollView
    horizontal={true}
    contentContainerStyle={{
        paddingHorizontal: 15,
        
    }}
    showsHorizontalScrollIndicator={false}
    style={{padding: 4}}
    >
        {/* Restaurant Cards */}

    {restaurants.map(restaurant => (
      
            <RestaurantCard 
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            address={restaurant.address}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
           />
    ))}

        {/* <RestaurantCard 
         id="12"
         imgUrl="https://links.papareact.com/gn7"
         title="Cooked"
         rating={4.5}
         genre="Jamaican"
         address="123 Main St"
         short_description="This is a lil discription"
         dishes={[]}
         long={0}
         lat={0}
        />
        <RestaurantCard 
         id="12"
         imgUrl="https://links.papareact.com/gn7"
         title="Cooked"
         rating={4.5}
         genre="Jamaican"
         address="123 Main St"
         short_description="This is a lil discription"
         dishes={[]}
         long={0}
         lat={0}
        />
        <RestaurantCard 
         id="12"
         imgUrl="https://links.papareact.com/gn7"
         title="Cooked"
         rating={4.5}
         genre="Jamaican"
         address="123 Main St"
         short_description="This is a lil discription"
         dishes={[]}
         long={0}
         lat={0}
        />
        <RestaurantCard 
         id="12"
         imgUrl="https://links.papareact.com/gn7"
         title="Cooked"
         rating={4.5}
         genre="Jamaican"
         address="123 Main St"
         short_description="This is a lil discription"
         dishes={[]}
         long={0}
         lat={0}
        />
        <RestaurantCard 
         id="12"
         imgUrl="https://links.papareact.com/gn7"
         title="Cooked"
         rating={4.5}
         genre="Jamaican"
         address="123 Main St"
         short_description="This is a lil discription"
         dishes={[]}
         long={0}
         lat={0}
        />
        <RestaurantCard 
         id="12"
         imgUrl="https://links.papareact.com/gn7"
         title="Cooked"
         rating={4.5}
         genre="Jamaican"
         address="123 Main St"
         short_description="This is a lil discription"
         dishes={[]}
         long={0}
         lat={0}
        /> */}
    </ScrollView>
</View>
);
}

const styles = StyleSheet.create({
    
})

export default FeaturedRow;