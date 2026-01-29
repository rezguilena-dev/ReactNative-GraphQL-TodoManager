import React, { useContext, useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import {View,Text,StyleSheet, TouchableOpacity,Platform,FlatList,TextInput,Alert ,Image} from 'react-native';
import { TokenContext, UsernameContext } from '../context/context';
import API_URL from "../js/apiUrl.js"
import { createTodo, getTodos, updateTodo, deleteTodo } from '../js/todo.js';
import { Switch } from 'react-native';

// cloud Name : dadzosigp


const uploadToCloudinary = async (imageAsset) => {
  if (!imageAsset) return null;

  const PRESET = 'w8eoufxu';  
  const CLOUD_NAME = 'dadzosigp'; 

  let fileToSend;
  if (Platform.OS === 'web') {
      if (!imageAsset.base64) {
          console.log("Erreur: Pas de base64 généré");
          return null;
      }
      fileToSend = `data:image/jpeg;base64,${imageAsset.base64}`;
  } else {
      let filename = imageAsset.uri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image/jpeg`;
      fileToSend = { uri: imageAsset.uri, name: filename, type: type };
  }

  const data = new FormData();


  data.append('upload_preset', PRESET);
  data.append('cloud_name', CLOUD_NAME);
  

  data.append('file', fileToSend);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: data,
    });

    const json = await response.json();
    
    if (json.error) {
        
        console.log("Erreur Cloudinary détaillée:", json.error);
        alert("Erreur Cloudinary: " + json.error.message);
        return null;
    }

    return json.secure_url;
  } catch (error) {
    console.log("Erreur technique:", error);
    alert("Erreur technique: " + error.message);
    return null;
  }
};

//******* FONCTION DU COMPOSANT ********/

export default function TodoItemsScreen({ route, navigation }){
    const { listId, listTitle } = route.params;
    const [token ]=useContext(TokenContext);
    const [todos,setTodos]=useState([]);
    const [newTodo,setNewTodo]=useState('');
    const[loading ,setLoading]=useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, 
            quality: 0.5,  
            base64: true,
        });

        if (!result.canceled) {
      setSelectedImage(result.assets[0]);        }
    };
    const progressBar =()=>{
      const total = todos.length ;
      const completed = todos.filter(todo =>todo.done).length;
      const progress = total >0?(completed /total) *100 :0;
      return {total,completed,progress};
    }
     const { total, completed, progress } = progressBar();



    useEffect(()=>{
          loadTodos();
    },[]);

    const handleToggleTodo = (id,newValue)=>{
        updateTodo(id,newValue,token)
        .then(updatedTodo =>
            setTodos(todos.map (todo=>
                todo.id === id ? updatedTodo : todo
            ))
            
        )
        .catch(error => alert("Erreur", error.message));
    }
    //Charger la liste 
    const loadTodos =()=>{
        setLoading(true);
        getTodos(listId,token)
        .then(todos=>{
            setTodos(todos);
        })
        .catch(error => {
                alert("Erreur", "Impossible de charger les todos");
        })
        .finally(() => {
            setLoading(false);
        });
    }
    //Création d'un todo
    const handleCreateTodo = async () => { 
        if(!newTodo.trim()){
            Alert.alert("Erreur", "Veuillez saisir un nom pour votre tâche");
            return;
        }
        setLoading(true);

        let contentToSend = newTodo; 

        // 1. Si une image est sélectionnée, on l'envoie sur Cloudinary
        if (selectedImage) {
            const url = await uploadToCloudinary(selectedImage);
            if (url) {
                // 2. On ajoute l'URL à la fin du texte avec '###'
                contentToSend = contentToSend + "###" + url;
            } else {
                Alert.alert("Erreur", "L'image n'a pas pu être envoyée");
                setLoading(false);
                return;
            }
        }

        createTodo(contentToSend, listId, token)
        .then(newTodoItem => {
            setTodos([...todos, newTodoItem]);
            setNewTodo('');        
            setSelectedImage(null); 
        })
        .catch(error => {
            Alert.alert("Erreur", error.message);
        })
        .finally(() => {
            setLoading(false);
        });
    }
    const handleDeleteTodo =(id) =>{
        deleteTodo(id,token)
        .then(()=>{
            setTodos(todos.filter(todo=>todo.id !== id));
        })
        .catch(error => {
            alert("Erreur", error.message);
        });
    }


    const renderTodo = ({item}) => {
        const parts = item.content.split("###");
        const textPart = parts[0];
        const imagePart = parts.length > 1 ? parts[1] : null;

        return (
          <View style={styles.todoItem}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                {imagePart && (
                    <Image 
                        source={{ uri: imagePart }} 
                        style={{ width: 50, height: 50, marginRight: 10, borderRadius: 5 }} 
                    />
                )}

                <Text style={[styles.todoText, item.done && styles.todoDone]}> 
                    {textPart} 
                </Text>
                
            </View>

            <Switch 
                value={item.done} 
                onValueChange={(newVal) => handleToggleTodo(item.id, newVal)} 
            />
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteTodo(item.id)}
            >
                <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        );
    }


    return(

        <View style ={styles.container}>
        
            <Text style={styles.title} >{listTitle}</Text>
            <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                    <Text style={styles.progressText}>
                        {completed}/{total} tâches complétées
                    </Text>
                    <Text style={styles.progressPercentage}>
                        {Math.round(progress)}%
                    </Text>
                </View>
                
                <View style={styles.progressBarBackground}>
                    <View 
                        style={[
                            styles.progressBarFill,
                            { width: `${progress}%` }
                        ]} 
                    />
                </View>
            </View>          


            <View style ={styles.inputContainer}>
            <TouchableOpacity onPress={pickImage} style={{justifyContent:'center', marginRight:10}}>
                    <Text style={{fontSize: 24}}>📷</Text>
                </TouchableOpacity> 
                <TextInput style={styles.input} placeholder="new todo" value={newTodo} onChangeText={setNewTodo} />
                <TouchableOpacity 
                    style={[styles.addButton, loading && styles.buttonDisabled]}
                    onPress={handleCreateTodo}
                    disabled={loading}
                >
                    <Text style={styles.addButtonText}> + </Text>
                </TouchableOpacity>
            </View>
            {selectedImage && (
                <View style={{alignItems:'center', marginBottom:10}}>
                    <Image source={{ uri: selectedImage }} style={{ width: 50, height: 50, borderRadius: 5 }} />
                    <Text style={{fontSize:10, color:'green'}}>Image prête !</Text>
                </View>
            )}
            <FlatList
                data={todos}
                renderItem={renderTodo}
                keyExtractor={item => item.id}
                style={styles.list}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Aucune tâche pour le moment</Text>
                }
            />
        </View>
        
    )


}
const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20,
        backgroundColor: '#f8f9fa'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20
    },
    input: {
        flex: 1,
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: 'white',
        marginRight: 10,
        fontSize: 16
    },
    addButton: {
        width: 50,
        height: 50,
        backgroundColor: '#0b417cff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    buttonDisabled: {
        backgroundColor: '#ccc'
    },
    addButtonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    list: {
        flex: 1
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderColor: '#ddd',
        borderWidth: 1
    },
    todoText: {
        fontSize: 16,
        flex: 1
    },
    todoDone: {
        textDecorationLine: 'line-through',
        color: '#888'
    },
    deleteButton: {
        padding: 8,
        marginLeft: 10
    },
    deleteText: {
        fontSize: 18
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
        marginTop: 20
    },
    progressContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    progressText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    progressPercentage: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: 'bold',
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#007AFF',
        borderRadius: 4,
    },
});