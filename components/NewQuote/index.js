/* :::: NEW QUOTE :::: */
import Button from '../Button';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
    Modal,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    View,
}
    from 'react-native';


export default function NewQuote({ show, cancel, onSubmit }) {

    const [newQuote, setNewQuote] = useState('');
    const [newAuthor, setNewAuthor] = useState('');

    const cancelNewQuote = () => {
        cancel()
        setNewQuote('')
        setNewAuthor('')
    }

    const saveNewQuote = () => {
        const newQuoteTrim = newQuote.trim()
        const newAuthorTrim = newAuthor.trim()
        if (newQuoteTrim.length < 8) {
            alert('Please Enter a valid Quote!')
            return
        }
        onSubmit(newQuoteTrim, newAuthorTrim);
        setNewQuote('');
        setNewAuthor('');
    }

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
                onSubmitEditing={() => saveNewQuote()}
            />
            <View style={styles.pressableWrap}>
                <Button
                    onPress={() => saveNewQuote()}
                    icon={<MaterialCommunityIcons name='checkbox-marked-circle' size={24} color='white' />} />
                <Button
                    onPress={cancelNewQuote}
                    icon={<MaterialIcons name='cancel' size={24} color='white' />} />
            </View>
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
    },
    pressableWrap: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 12,
        bottom: 240,
        width: 100,
    },


})
