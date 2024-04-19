import React, { useState } from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import openAI from 'react-native-openai';  

const App = () => {
  const [result, setResult] = useState('');

  const openAI = new OpenAI({
    apiKey: 'key'
  });
  // Function to handle sending a message to OpenAI and receiving the response
  const sendMessage = async () => {
    try {
      const response = await openAI.chat.stream({
        messages: [{
          role: 'user',
          content: 'How do I star a repo?',
        }],
        model: 'gpt-3.5-turbo',
      });

      // Listen for messages
      response.addListener('onChatMessageReceived', (payload) => {
        setResult((message) => {
          const newMessage = payload.choices[0]?.delta.content;
          if (newMessage) {
            return message + '\n' + newMessage;
          }
          return message;
        });
      });
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>OpenAI Chat Response:</Text>
      <Text style={{ marginBottom: 20, padding: 10, borderWidth: 1, borderColor: '#ccc' }}>{result}</Text>
      <Button title="Send Message" onPress={sendMessage} />
    </SafeAreaView>
  );
};

export default App;
