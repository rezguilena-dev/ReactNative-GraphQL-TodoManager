import React, { useContext, useEffect, useState } from "react";
import {View,Text,StyleSheet, TouchableOpacity,FlatList,TextInput,Alert} from 'react-native';
import { TokenContext, UsernameContext } from '../context/context';
import { createTodoList, getTodoLists, deleteTodoList } from '../js/todoList.js';
export default function TodoListsScreen({ navigation }){
    const [token ]=useContext(TokenContext);
    const [username] = useContext(UsernameContext);
    const [newTodoList,setNewTodoList]=useState('');
    const [lists,setLists]=useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
      handleGet();
    },[]);
    const handleCreateTodoList =() =>{
        if(!newTodoList.trim()){
            alert("Erreur,Veuillez entrer un nom pour votre nouvelle liste");
            return;
        }
        setLoading(true);
        createTodoList(username,newTodoList,token)
        .then (newList =>{
            setLists([...lists,newList]);
            setNewTodoList('');
        })
        .catch(error => {
                alert("Erreur", error.message);
        })
        .finally(() => {
                setLoading(false);
        });

        
    }
   const handleDelete =(id)=>{
      deleteTodoList(id,token)
      .then(()=>{
        setLists(lists.filter(list=>list.id !== id));

      })
      .catch(error => {
            Alert.alert("Erreur", error.message);
      });

   }

    const handleGet=()=>{
      setLoading(true);
      getTodoLists(username,token)
      .then(lists=>{
          setLists(lists);
      })
      .catch(error => {
        Alert.alert("Erreur", "Impossible de charger les listes");
      })
      .finally(()=>{
        setLoading(false);
      });

    }



    const renderList = ({item}) => (
  <TouchableOpacity  
    style={styles.listItem}
    onPress={() => navigation.navigate('TodoItems', {  
      listId: item.id,
      listTitle: item.title
    })}
  >
    <Text style={styles.listTitle}> {item.title} </Text>
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handleDelete(item.id)}
    >
      <Text style={styles.deleteText}>🗑️</Text>
    </TouchableOpacity>
  </TouchableOpacity>  
)




    return (
        <View style = {styles.container}>
            <Text style={styles.text}> TodoList de {username} 📝</Text>

         {/*ajouter une todolist */}
        <View style= {styles.inputContainer}>
          <TextInput style={styles.input} placeholder ="new To do List" value={newTodoList} onChangeText ={setNewTodoList} />
          <TouchableOpacity
              style={[styles.addButton , loading &&  styles.Loadingbutton]}
              onPress={handleCreateTodoList}
              disabled={loading}
          >
              <Text style ={styles.addButtonText}> + </Text>
          </TouchableOpacity>
        </View>


        <FlatList
          data={lists}
          renderItem={renderList}
          keyExtractor={item=>item.id}
          style ={styles.list}
          ListEmptyComponent={
            <Text style ={styles.emptyList} >Aucune liste pour l'instant</Text>
          }
        />
        </View>


    );
}
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#f8f9fa'
  },
  text: {
    fontWeight: 'bold',      
    fontStyle: 'italic',     
    fontSize: 22,            
    color: '#333',
    textAlign: 'center',
    marginBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15
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
  addButtonText: { 
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  Loadingbutton: { 
    backgroundColor: '#ccc'
  },
  loadButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center'
  },
  loadButtonText: { 
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  list: {
    flex: 1,
    width: '100%'
  },
  listItem: {
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
  listTitle: {
    fontSize: 18,
    flex: 1
  },
  deleteButton: {
    padding: 8
  },
  deleteText: {
    fontSize: 18
  },
  emptyList: { 
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20
  }
});
