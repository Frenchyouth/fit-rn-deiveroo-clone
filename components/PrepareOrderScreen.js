import React, { useEffect } from 'react';
import {View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';

function PrepareOrderScreen(props)
{

    const navigation = useNavigation();

    useEffect(() =>{
        setTimeout(() => {
            navigation.navigate("Delivery");
        }, 4000);
    },[]);
 return (
<SafeAreaView style={{flex: 1, backgroundColor: "#00CCBB", justifyContent: "center", alignItems: "center"}}>
  
    <Animatable.Image
    style={{height: 300, width: 390, borderRadius: 10}}
    source={require("../assets/DIL.gif")}
    animation="slideInUp"
    iterationCount={1}
    />
   
   <Animatable.Text
    animation="slideInUp"
    iterationCount={1}
    style={{marginTop: 60, color: "white", fontSize: 18, fontWeight: "600"}}
    
    >
    Waiting for the Restaurant to accept your order!
    </Animatable.Text>

 <Progress.Circle borderWidth={2} indeterminate={true} size={70} color="white" 
 style={{marginTop: 40}}
 />
</SafeAreaView>
);
}

const styles = StyleSheet.create({
    
})
export default PrepareOrderScreen;