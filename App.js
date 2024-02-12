/* :::: APP :::: */
import Quotes from './components/Quotes';
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

  const quote = data[index];

  const handleNextQuote = () => {
    setIndex((index) => (index + 1) % data.length);
  };

  const handlePreviousQuote = () => {
    setIndex((index) => (index - 1 + data.length) % data.length);
  };


  return (
    <View style={styles.container}>
      <Quotes
        text={quote.text}
        author={quote.author} />

      <View style={styles.pressableWrap}>
        <Pressable
          style={styles.pressable}
          onPress={handleNextQuote}
        >
          <Text style={styles.pressText}>
            next</Text>
        </Pressable>
        <Pressable
          style={styles.pressable}
          onPress={handlePreviousQuote}
        >
          <Text style={styles.pressText}>
            previous</Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 25,
    backgroundColor: 'orange',
  },
  pressText: {
    color: 'white',
    fontSize: 18,
  }
});
