/* :::: APP :::: */
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Quotes from './components/Quotes';
import NewQuote from './components/NewQuote';
import Button from './components/Button';
import IconButton from './components/IconButton';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Modal } from 'react-native';


export default function App() {

  const [index, setIndex] = useState(0);
  const [showNewQuoteDialog, setNewQuoteDialog] = useState(false);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    getQuotes();
  }, []);


  const handleNextQuote = () => {
    setIndex((index) => (index + 1) % quotes.length);
  };

  const handlePreviousQuote = () => {
    setIndex((index) => (index - 1 + quotes.length) % quotes.length);
  };

  const handleInputShow = () => {
    setNewQuoteDialog(true);
  }

  /* :::: delete :::: */
  const handleDeleteQuote = () => {
    /*  Alert.alert('delete quote?', 'are you sure?', [
       { text: 'm', style: 'cancel' },
       { text: 'delete', style: 'destructive', onPress: deleteQuote() }
     ]); */
    <Modal></Modal>
  }

  const deleteQuote = () => {
    const newQuotes = [...quotes];
    newQuotes.splice(index, 1)
    setQuotes(newQuotes);
    setIndex(0);
    /* :: save again in async storage :: */
    saveQuotes(newQuotes);
  }

  const handleCancelNewQuote = () => {
    setNewQuoteDialog(false);
  }


  /* :::: submit :::: */
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


  /* when all quotes are deleted */
  let content = <Text style={styles.noQuotesText}>write a quote</Text>;
  /* ::: else:*/
  if (quotes.length > 0) {
    let quote = quotes[index];
    content = <Quotes
      text={quote.text}
      author={quote.author} />
  }


  return (
    <View style={styles.container}>
      {content}
      <View style={styles.pressableNewQuote}>
        <IconButton
          onPress={handleInputShow}
          icon={<MaterialIcons
            name='add-box'
            size={38}
            color='white' />}
        />
      </View>
      <View style={styles.pressableDeleteQuote}>
        <IconButton
          onPress={handleDeleteQuote}
          icon={<MaterialIcons
            name='delete'
            size={38}
            color='white' />}
        />
      </View>
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

  pressableNewQuote: {
    position: 'absolute',
    top: 30,
    right: 30,
  },
  pressableDeleteQuote: {
    position: 'absolute',
    top: 30,
    left: 30,
  },
  noQuotesText: {
    color: 'white',
    fontSize: 26,
    fontStyle: 'italic',
  },
});
