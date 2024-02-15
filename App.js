/* :::: APP :::: */
import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import Quotes from './components/Quotes';
import NewQuote from './components/NewQuote';
import Button from './components/Button';
import IconButton from './components/IconButton';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Alert } from 'react-native';


const database = SQLite.openDatabase('quotesDB');

/** Create DB Table for SQLite:
 * ID // Text // Author
 * 
 */

export default function App() {

  const [index, setIndex] = useState(0);
  const [showNewQuoteDialog, setNewQuoteDialog] = useState(false);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    /* initialize databas: */
    initDB()
    getQuotes();
  }, []);

  function initDB() {
    database.transaction((tx) => {
      'CREATE TABLE IF NOT EXISTS quotes ( id INTEGER PRIMARY KEY NOT NULL, text TEXT, author TEXT )'
    })
  }

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
    Alert.alert('Delete Quote ?', 'do you want to delete this quote?', [
      {
        text: 'cancel',
        style: 'cancel',
      },
      {
        text: 'delete',
        style: 'destructive',
        onPress: () => deleteQuote()
      },
    ]);
  }

  const deleteQuote = () => {
    const newQuotes = [...quotes];
    newQuotes.splice(index, 1);
    setIndex(0);
    setQuotes(newQuotes);
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
    //AsyncStorage.setItem('Quotes', JSON.stringify(newQoutes));
  }

  async function getQuotes() {
    //const quotesFromDB = await AsyncStorage.getItem('Quotes');
    database.transaction((tx) =>
      tx.executeSql('SELECT * FROM quotes', [], (_, result) => {
        console.log('SELECT: ', result.rows._array)
      }))
    let quotesFromDB = null;
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
      {quotes.length > 0 ?
        <View style={styles.pressableDeleteQuote}>
          <IconButton
            onPress={handleDeleteQuote}
            icon={<MaterialIcons
              name='delete'
              size={38}
              color='white' />}
          />
        </View>
        : null}
      <NewQuote
        show={showNewQuoteDialog}
        cancel={handleCancelNewQuote}
        onSubmit={handleSubmit}
      />
      <View style={styles.pressableWrap}>
        {quotes.length > 1 ?
          <>
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

          </>
          : null}
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
    top: 40,
    right: 30,
  },
  pressableDeleteQuote: {
    position: 'absolute',
    top: 40,
    left: 30,
  },
  noQuotesText: {
    color: 'white',
    fontSize: 26,
    fontStyle: 'italic',
  },
});
