import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

function CategoryCard({imgUrl, title})
{
 return (
     <TouchableOpacity>

<View style={{marginHorizontal: 3, padding: 3}}>
    <Image source={{uri: imgUrl}} style={{height: 100, width: 100, borderRadius: 5}} />
    <TouchableOpacity style={{position: "absolute", bottom: 5, alignSelf: "center"}}>
    <Text style={{ color: "white", fontWeight: "bold"}}>{title}</Text>
    </TouchableOpacity>
</View>
     </TouchableOpacity>
);
}

const styles = StyleSheet.create({
    
})

export default CategoryCard;