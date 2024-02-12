/* :::: NEW QUOTE :::: */
import { Pressable, StyleSheet, Text, View } from "react-native";


export default function NewQuote({ show, cancel }) {

    if (!show) return null;

    return (<View style={styles.newQuote}>
        <Text >New Qoute</Text>
        <Pressable
            onPress={cancel}
        >
            <Text
            >cancel</Text>
        </Pressable>
    </View>)
}


const styles = StyleSheet.create({

    newQuote: {
        top: 80,
        position: 'absolute',
        border: '1px solid black',
        padding: 10,
    }

})
