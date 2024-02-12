/* :::: QUOTES :::: */
import { StyleSheet, Text, View } from 'react-native';


export default function Quotes({ text, author }) {

    return (<View style={styles.quoteWrap}>
        <Text style={styles.quoteText}>{text}</Text>
        <Text style={styles.authorText}>&mdash; {author}</Text>
    </View>)

}

const styles = StyleSheet.create({
    quoteWrap: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
        gap: '1rem',
        width: '90%',
        paddingHorizontal: '4%',
        marginBottom: 45,
    },
    quoteText: {
        textAlign: 'justify',
        color: 'white',
        fontStyle: 'italic',
        fontSize: 32,
        letterSpacing: '2px',
        lineHeight: '2.4rem',
        fontWeight: '600',
        marginBottom: 6,
    },
    authorText: {
        textAlign: 'right',
        color: 'white',
        fontSize: 16,
        fontWeight: '400',

    }
});
