import {Text, View } from  "react-native";
import { useSearchParams } from "expo-router";

export default function Product(){
    const { id } = useSearchParams();
    
    return(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

        <Text style={{ fontSize: 44, fontWeight: "700"}}>
            Produto: { id }
        </Text>

        </View>
    )
}
