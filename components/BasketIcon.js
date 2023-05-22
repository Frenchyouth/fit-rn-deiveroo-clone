import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import Currency from "react-currency-formatter"
import { selectBasketItems, selectBasketTotal } from '../feautures/basketSlice';

function BasketIcon(props)
{
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);
    const navigation = useNavigation();

    if (items.length === 0 ) return null;
    //here we check if the basket is empty and if so we dont to show the basket

 return (
<View style={{ flex: 1, position: "absolute", zIndex: 1, width: 400, bottom: 30, alignSelf: "center" }}>
    <TouchableOpacity onPress={() => navigation.navigate("Basket")} style={{flex: 1, backgroundColor: "#00CCBB", padding: 25, flexDirection: "row", borderRadius: 10, alignItems: "center", justifyContent: "space-between", }}>
        <Text style={{ backgroundColor: "#01A296", color: "white", padding: 5, fontSize: 17, fontWeight: "bold", fontStyle: "italic", textAlign: "center"}}>{items.length} </Text>
        <Text style={{fontSize: 18, fontWeight: "900", color: "white"}}>View Basket</Text>
        <Text style={{color: "white", fontSize: 17, fontWeight: "bold"}}>
            <Currency quantity={basketTotal} currency="USD" />
        </Text>
    </TouchableOpacity>
</View>
);
}

const styles = StyleSheet.create({
    
})

export default BasketIcon;