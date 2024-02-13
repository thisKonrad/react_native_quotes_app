/* :::: APP :::: */
import Quotes from './components/Quotes';
import NewQuote from './components/NewQuote';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Pressable } from 'react-native';


const data = [
  { text: "Ambition is a dream with an V8 engine", author: "Elvis Presley" },
  { text: "Erzähle mir nicht wie meine Chancen stehen", author: "Han Solo" },
  { text: "Hendrix tat genau was ich wollte, ich konnte es nur nicht", author: "Jeff Beck" },
];


export default function App() {

  const [index, setIndex] = useState(0);
  const [showNewQuoteDialog, setNewQuoteDialog] = useState(false);
  const [quotes, setQuotes] = useState(data);

  const quote = quotes[index];

  const handleNextQuote = () => {
    setIndex((index) => (index + 1) % quotes.length);
  };

  const handlePreviousQuote = () => {
    setIndex((index) => (index - 1 + data.length) % quotes.length);
  };

  const handleInputShow = () => {
    setNewQuoteDialog(true);
  }
  const handleCancelNewQuote = () => {
    setNewQuoteDialog(false);
  }

  const handleSubmit = (content, name) => {
    setNewQuoteDialog(false)
    const newQuotes = [...quotes, { text: content, author: name },];
    setQuotes(newQuotes);
    console.log('Quotes: ', quotes)
  }

  return (
    <View style={styles.container}>
      <Quotes
        text={quote.text}
        author={quote.author} />

      <Pressable
        onPress={handleInputShow}
        style={styles.pressableNew}
      >
        <MaterialIcons
          name='add-box'
          size={38}
          color='white' />
      </Pressable>

      <NewQuote
        show={showNewQuoteDialog}
        cancel={handleCancelNewQuote}
        onSubmit={handleSubmit}
      />

      <View style={styles.pressableWrap}>
        <Pressable
          style={styles.pressable}
          onPress={handlePreviousQuote}
        >
          <Text style={styles.pressText}>
            <AntDesign
              name='banckward'
              size={24}
              color='white' />
          </Text>
        </Pressable>
        <Pressable
          style={styles.pressable}
          onPress={handleNextQuote}
        >
          <Text style={styles.pressText}>
            <AntDesign
              name='forward'
              size={24}
              color='white' />
          </Text>
        </Pressable>
      </View>
      <StatusBar style='auto' />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'monospace'
  },

  pressableWrap: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    bottom: 50,
    width: 100,
  },
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
  pressText: {
    color: 'white',
    fontSize: 18,
  },
  pressableNew: {
    position: 'absolute',
    top: 30,
    right: 30,
  }
});
