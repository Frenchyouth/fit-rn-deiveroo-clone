import React, { useLayoutEffect, useState } from 'react';
import {View, StyleSheet, FlatList, Text, Image, SafeAreaView, TextInput, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronDownIcon, SparklesIcon as SparklesIconOutline, UserIcon } from "react-native-heroicons/outline";
import {Ionicons, Feather} from '@expo/vector-icons';
import { useEffect } from 'react';



import client from '../client';

// import SanityClient from '@sanity/client';

import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
"https://5oaed1t2.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D%22featured%22%5D%20%7B%0A%20%20%20%20...%2C%0A%20%20%20%20restaurants%5B%5D-%3E%7B%0A%20%20%20%20%20%20...%2C%0A%20%20%20%20%20%20dishes%5B%5D%20-%3E%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%7D"
 let PROJECT_ID = "5oaed1t2";
 let DATASET = "production";
 let QUERY = encodeURIComponent('*[_type=="featured"] {...,restaurants[]->{...,dishes[] ->},}');
 let url = `https://5oaed1t2.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D%22featured%22%5D%20%7B%0A%20%20%20%20...%2C%0A%20%20%20%20%2F%2F%20restaurants%5B%5D-%3E%7B%0A%20%20%20%20%2F%2F%20%20%20...%2C%0A%20%20%20%20%2F%2F%20%20%20%2F%2F%20dishes%5B%5D%20-%3E%0A%20%20%20%20%2F%2F%20%20%20%20%20%7D%2C%0A%20%20%7D`;

let URL = `https://${PROJECT_ID}.api.sanity.studio/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

function HomeScreen({navigation})
{
const [featuredCategories, setFeaturedCategories] = useState([]);
const [featuredCategoriess, setFeaturedCategoriess] = useState("");


useLayoutEffect(() => {
    navigation.setOptions({
        headerShown: false,
    })
},[])

useEffect(() => {
    client.fetch(`*[_type=="featured"] {
        ...,
        restaurants[]->{
          ...,
          dishes[] ->
            },
      }`)
      .then((responseJson) => {
        console.log(responseJson)
        setFeaturedCategories(responseJson)
      })
      .catch((error) => {
                        console.error(error);
                      });
     
},[]);


console.log("/////+ feats" + featuredCategories)
// console.log("/////+ featss" + featuredCategoriess)
 return (
<SafeAreaView style={{backgroundColor: "white", paddingTop: Platform.OS === 'android' ? 40 : null}}>

    {/* header */}
    <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", padding: 1, marginBottom: 5, justifyContent: "space-between"}}>
        <View style={{flexDirection: "row"}}>
      <View style={{ marginLeft: 8 }}>
      <Image resizeMode="cover" source={ require('../assets/profile.png')}  style={{flex: 1,height: 50, width: 50, borderRadius: 25, borderWidth: 0.5, borderColor: "lightgreen"}}/>
      </View>
      <View style={{marginLeft: 7}}>
      <View style={{ marginVertical: 3}}>
      <Text style={{ color: "grey"}}>Deliver Now!</Text>
      </View>
      <View style={{flexDirection: "row"}}>
      <Text style={{ fontWeight: "bold", fontSize: 18}}>Current Location </Text>
      <ChevronDownIcon
      size={25} color="lightgreen" style={{alignContent: "center", alignItems: "center"}}/>
      </View>
      </View>

        </View>
      
      <UserIcon size={30} color="#00CCBB" style={{marginRight: 15}}/>
    </View>

    {/* search */}
    <View style={{flexDirection: "row", marginVertical: 10, alignItems: "center"}}>
        <View style={{flex: 1, flexDirection: "row", marginLeft: 10, padding: 7, backgroundColor: "#e4ebed"}}>
        <Ionicons name="search" size={24} color="grey" style={{margin: 3}}/>
        <TextInput placeholder="Restaurants and Cuisines" style={{flex: 1}}/>
        </View>
        <TouchableOpacity>
            
       <Feather name="sliders" size={20} color="#00CCBB" style={{marginHorizontal: 15}}/>
        </TouchableOpacity>
    </View>

    {/* body */}

{/* <View style={{backgroundColor: "blue", padding: 20}}>
<FlatList
        data={featuredCategories}
        renderItem={({item}) => <FeaturedRow 
        key={item._id}
        id={item.id}
        title={item.name}
        description={item.short_description}
        />}
        keyExtractor={item => item.id}
      />
</View> */}
    <ScrollView style={{backgroundColor: "#F4F5FA"}}>
        {/* Categories */}
        <Categories />

        {/* Features row */}

          {featuredCategories?.map(category => {
            return(
                
                <FeaturedRow 
                key={category._id}
                id={category._id}
                title={category.name}
                description={category.short_description}
                />
            );
        })} 
          {/* <FlatList
        showsVerticalScrollIndicator={false} 
        
          data={featuredCategories}
          keyExtractor={(item, index) => index.toString()}
          //ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({ item }) => (
            <View style={{marginTop: 100}}>
                <Text>{item.name}</Text>
            </View>

            )}
        /> */}

        {/* {featuredCategories?.map((category) => (
            <FeaturedRow 
            key={category._id}
            id={category.id}
            title={category.name}
            description={category.short_description}
            />
        ))} */}
{/* 
        <FeaturedRow 
        id="1"
        title="Featured"
        description="Paid placements from our partners"
        />

        <FeaturedRow 
        id="2"
        title="Tasty Discounts"
        description="Everyone's been enjoying these juicy discounts"
        />

        <FeaturedRow 
        id="3"
        title="Offers near you!"
        description="Why not support your local restaurant tonight!"
        /> */}
    </ScrollView>
</SafeAreaView>
);
}

const styles = StyleSheet.create({
    
})

export default HomeScreen;