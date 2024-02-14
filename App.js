/* :::: APP :::: */
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Quotes from './components/Quotes';
import NewQuote from './components/NewQuote';
import Button from './components/Button';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
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


  useEffect(() => {
    getQuotes();
  }, []);

  const quote = quotes[index];

  const handleNextQuote = () => {
    setIndex((index) => (index + 1) % quotes.length);
  };

  const handlePreviousQuote = () => {
    setIndex((index) => (index - 1 + quotes.length) % quotes.length);
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
    /* :: show the new quote after submisson: */
    setIndex(newQuotes.length - 1);
    saveQuotes(newQuotes)
  }

  function saveQuotes(newQoutes) {
    AsyncStorage.setItem('Quotes', JSON.stringify(newQoutes));
  }

  async function getQuotes() {
    const quotesFromDB = await AsyncStorage.getItem('Quotes');
    if (quotesFromDB !== null) {
      const parsedQuotes = JSON.parse(quotesFromDB);
      setQuotes(parsedQuotes);
      console.log('Quotes: ', parsedQuotes)
    }

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
        <Button
          onPress={handleNextQuote}
          icon={<AntDesign
            name='banckward'
            size={24}
            color='white' />}
        />
        <Button
          onPress={handlePreviousQuote}
          icon={<AntDesign
            name='forward'
            size={24}
            color='white' />} />
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

  pressableNew: {
    position: 'absolute',
    top: 30,
    right: 30,
  }
});
