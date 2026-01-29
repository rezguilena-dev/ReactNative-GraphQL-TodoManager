import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal,Alert } from 'react-native';
import { TokenContext, UsernameContext} from '../context/context';
import API_URL from "../js/apiUrl.js"
import {deleteUser} from '../js/delete.js';


export default function DeleteScreen() {
    //Recupération des contextes à utiliser 
    const [token, setToken] = useContext(TokenContext);
    const [username, setUsername] = useContext(UsernameContext);
    //Décide de l'affichage du message de confirmation
    const [showConfirmation, setShowConfirmation] = useState(false); 
    const [loading, setLoading] = useState(false);

    //Fonction permmettant la suppression de l'utilisateur aprés confirmation
    const handleConfirmDelete = () => {
        setLoading(true);

        deleteUser(username, token)
        .then(() => {
            setToken(null);
            setUsername(null);
            setShowConfirmation(false);
           
        })
        .catch(error => {
            alert("Erreur", "Impossible de supprimer le compte.");
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <View style={styles.container}>


            <Modal
                visible={showConfirmation}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.warningIcon}>
                            <Text style={styles.warningIconText}>⚠️</Text>
                        </View>
                        
                        <Text style={styles.modalTitle}>Suppression du compte</Text>
                        
                        <Text style={styles.modalMessage}>
                            Êtes-vous <Text style={styles.dangerText}>absolument sûr</Text> de vouloir supprimer votre compte <Text style={styles.usernameText}>{username}</Text> ?
                        </Text>
                        
                        <Text style={styles.warningText}>
                            ⚠️ Cette action est irréversible et supprimera :
                        </Text>
                        <Text style={styles.warningList}>
                            • Toutes vos listes de tâches{"\n"}
                            • Toutes vos tâches{"\n"}
                            • Votre compte définitivement
                        </Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setShowConfirmation(false)}
                                disabled={loading}
                            >
                                <Text style={styles.cancelButtonText}>Annuler</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={handleConfirmDelete}
                                disabled={loading}
                            >
                                <Text style={styles.confirmButtonText}>
                                    {loading ? "Suppression..." : "Supprimer mon compte"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Contenu principal */}
            <View style={styles.content}>
                <Text style={styles.title}>Administration du compte</Text>
                
                <View style={styles.userInfo}>
                    <Text style={styles.userInfoText}>Connecté en tant que :</Text>
                    <Text style={styles.username}>{username}</Text>
                </View>

                <View style={styles.warningCard}>
                    <Text style={styles.warningCardTitle}>Zone dangereuse</Text>
                    <Text style={styles.warningCardText}>
                        Les actions ci-dessous sont définitives. Une fois effectuées, elles ne pourront pas être annulées.
                    </Text>
                </View>
                
                <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => setShowConfirmation(true)}
                >
                    <Text style={styles.deleteButtonText}>Supprimer mon compte</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    userInfo: {
        backgroundColor: '#f0f8ff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    userInfoText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A90E2',
    },
    warningCard: {
        backgroundColor: '#fff3cd',
        borderColor: '#ffeaa7',
        borderWidth: 1,
        padding: 15,
        borderRadius: 10,
        marginBottom: 25,
    },
    warningCardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#856404',
        marginBottom: 5,
    },
    warningCardText: {
        fontSize: 14,
        color: '#856404',
        lineHeight: 20,
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#dc3545',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        width: '100%',
        maxWidth: 350,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    warningIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff3cd',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    warningIconText: {
        fontSize: 30,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#dc3545',
        textAlign: 'center',
    },
    modalMessage: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 15,
        lineHeight: 22,
    },
    dangerText: {
        color: '#dc3545',
        fontWeight: 'bold',
    },
    usernameText: {
        color: '#4A90E2',
        fontWeight: 'bold',
    },
    warningText: {
        fontSize: 14,
        color: '#856404',
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    },
    warningList: {
        fontSize: 14,
        color: '#856404',
        lineHeight: 20,
        marginBottom: 25,
        textAlign: 'left',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 10,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: '#6c757d',
    },
    confirmButton: {
        backgroundColor: '#dc3545',
  
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },
    confirmButtonText: {
        color: 'white',
        textAlign : 'center',
        fontSize: 16,
    },
});