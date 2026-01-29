import { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TokenContext, UsernameContext } from './context/context'; 
import Navigation from './navigation/navigation';

  const phoneWidth = 375;
  const phoneHeight = 667;

export default function App() {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <UsernameContext.Provider value={[username, setUsername]}>
      <TokenContext.Provider value={[token, setToken]}>
        <View style={styles.container}>
        <View style={[styles.phoneContainer, { width: phoneWidth, height: phoneHeight }]}>
          <Navigation />
        </View>
        </View>
      </TokenContext.Provider>
    </UsernameContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    alignItems: 'center',       
    justifyContent: 'center',    
  },
  phoneContainer: {
    backgroundColor: '#fff',
    borderRadius: 20, 
    overflow: 'hidden', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
