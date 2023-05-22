import React, { useEffect, useMemo, useState } from 'react';
import {View, StyleSheet, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import Currency from "react-currency-formatter"

import { urlFor } from '../client';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../feautures/basketSlice';
import { selectRestaurant } from '../feautures/restaurantSlice';

function BasketScreen({navigation})
{

    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const basketTotal = (useSelector(selectBasketTotal));
    const dispatch = useDispatch();
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

//useMemo or useEffect - if values dont change then it wont recompute
//this will help us to group our food items like a loop
    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});
        setGroupedItemsInBasket(groupedItems);
    }, [items])
//This here creates a variable called groupedItems and then we loop through our food items
//then we create an object called results, where by if the key exist? then we want to push the item to that key


 return (
     <SafeAreaView style={{flex: 1, backgroundColor: "white" }}>
    <View style={{flex: 1, backgroundColor: "#ecf3f9" }}>
        <View style={{padding: 12, backgroundColor: "white", paddingTop: 30, borderBottomWidth: 3,  borderBottomColor: "lightgrey",   }}>
            <View>
                <Text style={{textAlign: "center", fontSize: 18, fontWeight: "bold"}}>Basket</Text>
                <Text style={{textAlign:"center", color: "gray"}}>{restaurant.title}</Text>
            </View>

            <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={{ borderRadius: 20, position: "absolute", top: 23, right: 15}}>
            <XCircleIcon  height={50} width={50} color="#00CCBB"/>
            </TouchableOpacity>
        </View>

        <View style={{padding: 12, backgroundColor: "white", marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
            <Image 
            style={{height: 50, width: 50, borderRadius: 25, borderColor: "lightgreen", borderWidth: 0.7}}
            source={ require('../assets/profile.png')}/>
            <Text style={{marginLeft: 20}}>Deliver in 45-65 min</Text>
            </View>

            <Text style={{color: "#00BBCC", fontWeight: "600", fontSize: 15}}>Change</Text>
        </View>

        <ScrollView style={{marginTop: 20 }}>
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                <View key={key} style={{ flex: 1, backgroundColor: "white", flexDirection: "row", alignItems: "center", padding: 15, 
                 justifyContent: "space-between", borderBottomColor: "lightgray", borderBottomWidth: 0.4}}>
                   
                   <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Text style={{marginLeft: 10}}>{items.length} x</Text>
                    <Image 
                    style={{height: 60, width: 60, borderRadius: 30, marginHorizontal: 10, borderWidth: 0.2, borderColor: "#00CCBB"}}
                    source={{uri: urlFor(items[0]?.image).url()}}
                    />
                    <Text style={{color: "black"}}>{items[0]?.name}</Text>

                    </View> 
                    {/*  */}

                    <View style={{flexDirection: "row"}}>
                    <Text style={{color: "gray"}}>
                        <Currency quantity={items[0]?.price} currency="USD" />
                    </Text>

                    <TouchableOpacity onPress={ () => dispatch(removeFromBasket({id: key}) )}>
                        <Text style={{marginRight: 5, marginLeft: 15, color: "#00CCBB" }}>
                            Remove
                        </Text>
                    </TouchableOpacity>
                    </View>
                    {/*  */}
                </View>
            ))}
        </ScrollView>
        {/* SubTotal Card */}
        <View style={{padding: 15, backgroundColor: "white", marginTop: 8}}>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 15}}>
                <Text style={{color: "gray"}}>SubTotal: </Text>
                <Text style={{color: "gray"}}>
                    <Currency quantity={basketTotal} currency="USD" />
                </Text>
            </View>

                {/* Delivery fee */}
        <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 15}}>
            <Text style={{color: "gray"}}>Delivery Fee: </Text>
            <Text style={{color: "gray"}}>
                <Currency quantity={7.99} />
            </Text>
        </View>

        {/* BAsket Total */}

        <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 15}}>
            <Text style={{color: "black", fontWeight: "900"}}>Order Total: </Text>
            <Text>
                <Currency quantity={basketTotal + 7.99} />
            </Text>
        </View>

        {/* Place Order Button */}

        <TouchableOpacity
        onPress={() => navigation.navigate("OrderScreen")}
         style={{padding: 15, backgroundColor: "#00CCBB", borderRadius: 25}}>
            <Text style={{textAlign: "center", color: "white", fontWeight: "500", fontSize: 18}}>Place Order</Text>
        </TouchableOpacity>

        </View>
    </View>
     </SafeAreaView>
);
}

const styles = StyleSheet.create({
    
})

export default BasketScreen;