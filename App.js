/* :::: APP :::: */
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';


const data = [
  { text: "Ambition is a dream with an V8 engine", author: "Elvis Presley" },
  { text: "Erzähle mir nicht wie meine Chancen stehen", author: "Han Solo" },
  { text: "Hendrix tat genau was ich wollte, ich konnte es nur nicht", author: "Jeff Beck" },
];


export default function App() {

  const [index, setIndex] = useState(0);

  const quote = data[index];


  return (
    <View style={styles.container}>
      <Text style={styles.text}>{quote.text}</Text>
      <Text>&mdash; {quote.author}</Text>
      <Button
        title="next"
        onPress={() => setIndex(index + 1) % data.length}
      />
      <Button
        title="prev"
        onPress={() => setIndex(index - 1) % data.length}
      />
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
  text: {
    color: 'white',
    fontWeight: 'bold',
  }
});
