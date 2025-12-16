import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";


export function Input ({value, onChangeText, label}){
    return(
        <View style={styles.container}>
            <Text style={styles.label}>
                {label}
                </Text>
                    <TextInput 
                    onChangeText={onChangeText}
                    value={value} 
                    style={styles.input} 
                    keyboardType="numeric"
                    placeholder="0.00" 
                    placeholderTextColor="#94a3b8"></TextInput>
        </View>

    )
}