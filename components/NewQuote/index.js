/* :::: NEW QUOTE :::: */
import { useState } from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform
}
    from 'react-native';


export default function NewQuote({ show, cancel, onSubmit }) {

    const [newQuote, setNewQuote] = useState('');
    const [newAuthor, setNewAuthor] = useState('');

    return (<Modal
        visible={show}
        onRequestClose={cancel}
        animationType='slide'
    >
        <KeyboardAvoidingView
            behaviour={Platform === 'ios' ? 'padding' : 'height'}
            style={styles.newQuoteWrap}
        >
            <TextInput
                placeholder='Quote: '
                style={[styles.input, styles.newQuote]}
                multiline={true}
                onChangeText={(text) => setNewQuote(text)}
            />
            <TextInput
                placeholder='Author: '
                style={styles.input}
                enterKeyHint='done'
                onChangeText={(text) => setNewAuthor(text)}
                onSubmitEditing={onSubmit(newQuote, newAuthor)}
            />
            <Pressable
                onPress={cancel}
            >
                <Text
                >cancel</Text>
            </Pressable>
        </KeyboardAvoidingView>
    </Modal >)
}


const styles = StyleSheet.create({

    newQuoteWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        padding: 8,
        fontSize: 22,
        margin: 10,
        width: '80%',
    },
    newQuote: {
        height: 240,
        verticalAlign: 'top',
    }

})
