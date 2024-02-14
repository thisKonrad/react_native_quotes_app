/* :::: ICONBUTTON :::: */
import { StyleSheet, Pressable } from 'react-native';

export default function IconButton({ onPress, icon }) {

    return (<Pressable
        onPress={onPress}
        style={styles.pressableIconButton}
    >
        {icon}
    </Pressable>)
}


const styles = StyleSheet.create({

    pressable: {
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
        borderRadius: 50,
        width: 26,
        height: 26,
        backgroundColor: 'orange',
    },
    pressableText: {
        color: 'white',
        fontSize: 24,
    },

});


