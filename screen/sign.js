import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator,TouchableOpacity } from 'react-native';
import { TokenContext, UsernameContext } from '../context/context';
import {signUp,signIn} from '../js/sign.js';


export  function SignInScreen(){
  const [givenUsername ,setGivenUsername] = useState('');
  const [password ,setPassword] = useState('');
  const [loading ,setLoading] = useState(false);
  const [token,setToken]=useContext(TokenContext);
  const [username,setUsername]=useContext(UsernameContext);
  const [error,setError]=useState('');
  const handleSignIn = ()=>{
      if (!givenUsername || !password) {
          setError("Veuillez remplir tous les champs");
          return ;
      }
      setError('');
      setLoading(true);
      signIn(givenUsername,password)
      .then(token =>{
        setToken(token);
        setUsername(givenUsername);
      })
      .catch(
        error => alert("Erreur d'authentification" ,error.message)
      )
      .finally(()=>setLoading(false));

      
  };

  return (
    <View style ={styles.container}>
      <Text style={styles.title}> Sign In</Text>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
      <TextInput style={styles.input}  placeholder="Username" value={givenUsername} onChangeText={setGivenUsername} />
      <TextInput style={styles.input}  placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry  />
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleSignIn} 
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Signing In..." : "Sign In"}
        </Text>
      </TouchableOpacity>

    </View>
  );



}


export  function SignUpScreen(){
  const [givenUsername ,setGivenUsername] = useState('');
  const [password ,setPassword] = useState('');
  const [loading ,setLoading] = useState(false);
  const [token,setToken]=useContext(TokenContext);
  const [username,setUsername]=useContext(UsernameContext);
  const [error,setError]=useState('');

  const handleSignUp =()=>{
    if (!givenUsername || !password) {
    setError("Veuillez remplir tout les champs");
    return; 
  }
    setError('');
    setLoading(true);
    signUp(givenUsername,password)
    .then(token =>{
        setToken(token);
        setUsername(givenUsername)

    })
    .catch( error => alert("Echec de création",error.message))
    .finally(()=>setLoading(false));
  }
  return (
    <View style ={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
      <TextInput style={styles.input}  placeholder="Username" value={givenUsername} onChangeText={setGivenUsername} />
      <TextInput style={styles.input}  placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry  />
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleSignUp} 
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Signin Up..." : "Sign Up"}
        </Text>
      </TouchableOpacity>

    </View>
  );

}

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderColor: '#f44336',
    borderWidth: 1,
  },
  errorText: {
    color: '#d32f2f',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#f8f9fa'
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 30,
    color: '#333'
  },
  input: { 
    width: '100%', 
    height: 50, 
    borderColor: '#ddd', 
    borderWidth: 1, 
    marginBottom: 15, 
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: 'white',
    fontSize: 16
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10
  },
  buttonDisabled: {
    backgroundColor: '#cccccc'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  }
});



