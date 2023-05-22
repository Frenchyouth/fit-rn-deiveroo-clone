import React, { useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Currency from 'react-currency-formatter';
import { urlFor } from '../client';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';

import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemWithId } from '../feautures/basketSlice';



function DishRow({id, name, description, price, image})
{

    const [isPressed, setIsPressed] = useState(false);
    //to display number of items from a dish
    const dispatch = useDispatch();
    //we use this fuction to call a action or function

    // const items = useSelector(selectBasketItems);
    const items = useSelector((state) => selectBasketItemWithId(state, id));
    //this is an helper function to keep track of our basket
    //callback function to get the previous state also.

    const addItemToBasket = () => {
        dispatch(addToBasket({id, name, description, price, image}));
        //these are the action and payload we want to keep track of
    }

    const removeItemFromBasket = () => {
        if(!items.length > 0) return;

        dispatch(removeFromBasket({id}));
    }

 return (
     <>

    
<TouchableOpacity onPress={() => setIsPressed(!isPressed)} style={{backgroundColor: "white", padding: 5, borderWidth: 0.3, borderColor: "lightgrey"}}>
    <View style={{flexDirection: "row", alignItems: "center"}}>
    <View style={{padding: 20, flex: 1}}>
        <Text style={{fontSize: 18, fontWeight: "bold"}}>{name}</Text>
        <Text style={{color: "grey"}}>{description}</Text>
        <Text style={{color: "grey", marginVertical: 10}}>USD <Currency quantity={price} currency="USD" /></Text>
    </View>

    <View style={{marginRight: 8}}>
        <Image
        source={{uri: urlFor(image).width(200).url()}}
        style={{height: 100, width: 100, borderRadius: 10}}
        />
    </View>
    </View>
    
</TouchableOpacity>

{isPressed && (
<View style={{backgroundColor: "white", padding: 4}}>
<View style={{flexDirection: "row", alignItems: "center", marginLeft: 20}}>
    <TouchableOpacity onPress={removeItemFromBasket}>
        <MinusCircleIcon size={40} color={items.length > 0 ? "#00CCBB" : "gray"} />
    </TouchableOpacity>

    <Text style={{marginHorizontal: 10}}>{items.length}</Text>

    <TouchableOpacity onPress={addItemToBasket}>
        <PlusCircleIcon size={40} color="#00CCBB"/>
    </TouchableOpacity>
</View>
</View>
)}
</>
);
}

const styles = StyleSheet.create({
    
})

export default DishRow;