# 📌 API REST avec Express.js, SQLite et Keycloak

Ce projet est une API REST simple construite avec **Node.js**, **Express.js** et **SQLite3** pour gérer un registre de personnes.  
L'API est protégée avec **Keycloak** pour la gestion de l'authentification et de l'autorisation.

---

## 🚀 Fonctionnalités

- 📌 CRUD complet pour la gestion des personnes (Ajout, Lecture, Modification, Suppression).
- 🔐 Sécurisation avec **Keycloak** (OAuth 2.0).
- 🗄️ Stockage des données avec **SQLite3**.
- 📡 Testable avec **Postman** ou tout autre client HTTP.

---

## 📂 Structure du projet

📁 TP2_API │── 📄 index.js # Serveur principal Express │── 📄 database.js # Configuration SQLite │── 📄 keycloak-config.json # Fichier de configuration Keycloak │── 📄 package.json # Fichier de configuration du projet Node.js │── 📄 README.md # Documentation └── 📁 node_modules # Dépendances installées (après npm install)


## ⚙️ Installation & Démarrage

### 🔹 1. Prérequis
- **Node.js** (Téléchargement : [https://nodejs.org](https://nodejs.org))
- **SQLite3** (Intégré, aucune installation séparée requise)
- **Keycloak** (Démarré sur `http://localhost:8080`)

### 🔹 2. Installation des dépendances
npm install
🔹 3. Configuration de la base de données
Si la base SQLite a déjà été créée sans la colonne adresse, supprime le fichier existant :

rm maBaseDeDonnees.sqlite
Puis, assure-toi que database.js contient la bonne structure et sera bien recréé.

🔹 4. Lancer le serveur
t
node index.js
Le serveur tournera sur http://localhost:3000.

🔐 Configuration Keycloak
🛠️ 1. Démarrer Keycloak
📌 Avec Docker
Si Docker est installé :
docker run -p 8080:8080 --name keycloak -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:latest start-dev
📌 Sans Docker
Télécharger Keycloak depuis Keycloak.org
Extraire et naviguer dans le dossier bin
Démarrer Keycloak :
kc.bat start-dev  # (Windows)
./kc.sh start-dev  # (Linux / Mac)
🛠️ 2. Configuration de Keycloak
Aller sur http://localhost:8080/admin
Se connecter avec admin / admin
