/* :::: QUOTES :::: */
import { StyleSheet, Text } from 'react-native';


export default function Quotes({ text, author }) {

    return (<>
        <Text style={styles.quoteText}>{text}</Text>
        <Text>&mdash; {author}</Text>
    </>)

}

const styles = StyleSheet.create({
    quoteText: {
        color: 'white',
        fontWeight: '900',
    },
    authorText: {
        color: 'white',
        fontWeight: '600',
    }
});
