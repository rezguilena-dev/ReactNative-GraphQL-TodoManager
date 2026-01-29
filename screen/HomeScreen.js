import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { UsernameContext } from '../context/context';



export default function HomeScreen() {
  const [username] = useContext(UsernameContext);

  return (
    <View style={styles.container}>
      <View style={styles.welcomeCard}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>👋</Text>
        </View>
        <Text style={styles.welcomeTitle}>Bienvenue</Text>
        
        <Text style={styles.username}>
          {username} !
        </Text>
        
        <View style={styles.decorationLine}></View>
        
        <Text style={styles.subtitle}>
          Heureux de vous voir
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: 20,
  },
  welcomeCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    width: '85%',
    maxWidth: 400,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 40,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: '#333',
    marginBottom: 5,
    letterSpacing: 1,
  },
  username: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 20,
    textAlign: 'center',
  },
  decorationLine: {
    width: 60,
    height: 4,
    backgroundColor: '#4A90E2',
    borderRadius: 2,
    marginBottom: 20,
    opacity: 0.7,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});