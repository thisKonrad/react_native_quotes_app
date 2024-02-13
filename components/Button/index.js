/* :::: BUTTON :::: */
import { StyleSheet, Text, Pressable } from 'react-native';

export default function Button({ onPress, icon }) {


    return (<Pressable
        style={styles.pressable}
        onPress={onPress}
    >
        <Text style={styles.pressableText}>
            {icon}
        </Text>
    </Pressable>)
}


const styles = StyleSheet.create({

    pressable: {
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
        width: 100,
        height: 26,
        backgroundColor: 'orange',
    },
    pressableText: {
        color: 'white',
        fontSize: 18,
    },
});

