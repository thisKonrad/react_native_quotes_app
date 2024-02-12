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
      <View styles={styles.pressableWrap}>
        <Pressable
          onPress={handleNextQuote}
        >
          <Text>next</Text>
        </Pressable>
        <Pressable
          onPress={handlePreviousQuote}
        >
          <Text>previous</Text>
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
    display: 'flex',
    justifyContent: 'center',
    gap: '1.4rem',
    bottom: 60,
  }
});
