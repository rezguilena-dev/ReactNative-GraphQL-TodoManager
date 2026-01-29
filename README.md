# gestionnaire de tâche Mobile : Architecture & Synchronisation GraphQL
![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Status](https://img.shields.io/badge/Status-Finished-brightgreen?style=for-the-badge)

> **Projet : Programmation d’applications client (L3 Informatique)**
> *Université de Caen Normandie — 2025-2026*

Ce projet consiste en la réalisation d'un **gestionnaire de tâche Mobile** performant, conçu avec **React Native** et **Expo**. L'application repose sur une synchronisation asynchrone avec une API **GraphQL** distante pour assurer la persistance et la gestion sécurisée des données.

---

## Architecture et Paradigmes de Conception

L'application est structurée selon une approche **modulaire et orientée composants**.
### Concepts Techniques Implémentés
L'utilisation des **React Hooks** et des **Contextes** assure une gestion fluide de l'état global :

| Fonctionnalité | Rôle et Bénéfices |
| :--- | :--- |
| **GraphQL CRUD** | Interaction avec une API GraphQL(Neo4j) pour la création, la lecture, la mise à jour et la suppression de données . |
| **Hooks d'État** | Utilisation de `useState` et `useEffect` pour la réactivité de l'UI et le chargement asynchrone. |
| **Context API** | Gestion de l’état d’authentification pendant la navigation dans l’application.
| **Navigation** | Imbrication de `TabNavigator` et `StackNavigator` pour une expérience mobile intuitive. |
| **Sécurisation** | Authentification robuste (SignIn/SignUp) avec gestion des erreurs réseau et API. |
| **UX Avancée** | Barre de progression dynamique et administration complète du compte utilisateur. |

---

## Installation & Exécution

Le projet utilise **Expo** pour permettre un déploiement rapide sur Android, iOS et Web.

### 1. Installer les dépendances :
Le dossier `node_modules` est exclu volontairement pour la légèreté du dépôt.
```
npm install
```
### 2. Lancement du serveur :
```
npx expo start
```
 * **Web:**  Appuyez sur 'w' pour ouvrir dans votre navigateur
 * **Mobile:**  Scannez le QR Code avec l'application Expo Go.

### 3. Organisation et Arborescence : 
```
.
├── assets/            
├── context/            # gestion globale de l’état d’authentification (JWT & username
├── documentation/      # Contient le Rapport pdf 
├── js/                 # Définition des requêtes et mutations GraphQL
├── navigation/         # Logique de navigation (gestion de l'affichage avec/sans authentification)
├── screen/             # Contient les Composants de vue
├── App.js              # Point d'entrée 
├── package.json        # Manifeste du projet : gestion des dépendances 
└── .gitignore          

```

## Équipe de Développement
    Lena REZGUI
    Mohamed Yassine LAMAIRI

