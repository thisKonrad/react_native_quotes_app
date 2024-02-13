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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexShrink: 1,
        gap: 10,
        width: '96%',
        paddingHorizontal: '4%',
        marginBottom: 45,
    },
    quoteText: {
        textAlign: 'center',
        color: 'white',
        fontStyle: 'italic',
        fontSize: 32,
        letterSpacing: 2,
        lineHeight: 36,
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
