/* :::: NEW QUOTE :::: */
import Button from '../Button';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
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
                onSubmitEditing={() => onSubmit(newQuote, newAuthor)}
            />
            <Button
                onPress={() => onSubmit(newQuote, newAuthor)}
                icon={<MaterialCommunityIcons name='checkbox-marked-circle' size={24} color='white' />} />
            <Button
                onPress={cancel}
                icon={<MaterialIcons name='cancel' size={24} color='white' />} />
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
