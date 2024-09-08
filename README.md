# SimTracker ✈️

*SimTracker est une application qui vous permet d'avoir un suivi sur tout vos vols virtuel comme dans un veritable carnet de vol.*

## Getting Started / Démarrage

Follow these instructions to set up and run the application locally.  
Suivez ces instructions pour configurer et exécuter l'application en local.

### Prerequisites / Prérequis

- **Node.js** (version 20.13.1 ou supérieure)
- **PostgreSQL** (pour la base de données backend)
- **Compte Mailtrap** (pour les tests d'envoi d'emails)

### Installation

#### Backend Setup / Configuration du Backend

1. **Install dependencies / Installer les dépendances :**
   - Navigate to the backend directory and run the following command :  
   - Naviguez dans le répertoire du backend et exécutez la commande suivante :

   ```bash
   npm install
2. **Configure environment variables / Configurer les variables d'environnement :**

   - Create a ``.env.development`` file at the root of the `backend` directory. Make sure to set the following variables:
   - Créez un fichier ``.env.development`` à la racine du répertoire `backend`. Assurez-vous de définir les variables suivantes :
  
    ```env
    PG_URL=<Votre URL de connexion PostgreSQL>
    SESSION_SECRET=<Votre secret de session>
    PORT=<Port pour le serveur backend>
    REACT_URL=http://localhost:3000
    JWT_SECRET=<Votre secret JWT>
    MAILTRAP_USER=<Votre utilisateur Mailtrap>
    MAILTRAP_PASSWORD=<Votre mot de passe Mailtrap>
3. **Configure the database / Configurer la base de données**
- Create the database / Créer la base de données :

   - Run PostgreSQL and create a database for the project, for example, ``simtracker_db``.

   - Exécutez PostgreSQL et créez une base de données pour le projet, par exemple ``simtracker_db``.

   - You can use the following command in your PostgreSQL terminal:

   - Vous pouvez utiliser la commande suivante dans votre terminal PostgreSQL :

    ```sql
    CREATE DATABASE simtracker_db;
- Import the database schema / Importer le schéma de la base de données :

   - Navigate to the ``backend`` directory where the ``simtracker.sql`` file is located, and run the following command in your terminal to create the tables:

   - Naviguez vers le répertoire ``backend``, où se trouve le fichier ``simtracker.sql`` et exécutez la commande suivante dans le terminal pour créer les tables :

    ```bash
    psql -U <your_user> -d simtracker_db -f src/data/simtracker.sql
 - This will automatically create the necessary tables and structures for the project in your database.

 - Cela créera automatiquement les tables et structures nécessaires pour le projet dans votre base de données.

4. **Run the server / Lancer le serveur :**

   - Start the development server with the following command:
   - Démarrez le serveur de développement avec la commande suivante :
    ```bash
    npm run dev
- The backend server should now be running on the specified ``PORT``.

 - Le serveur backend devrait maintenant fonctionner sur le ``PORT`` spécifié.

#### Frontend Setup / Configuration du Frontend
1. **Install dependencies / Installer les dépendances :**

   - Navigate to the frontend directory and run the following command:
   - Naviguez dans le répertoire du frontend et exécutez la commande suivante :
    ```bash
    npm install
2. **Configure environment variables / Configurer les variables d'environnement :**

   - Create a ``.env.development`` file at the root of the `frontend` directory. Set the following variable:
   - Créez un fichier ``.env.development`` à la racine du répertoire `frontend`. Définissez la variable suivante :
    ```env
    REACT_APP_API_URL=http://localhost:<PORT backend>
3. **Run the frontend server / Lancer le serveur frontend :**

    - Start the frontend development server with the following command:
    - Démarrez le serveur de développement frontend avec la commande suivante :
    ```bash
    npm start
 - The frontend server should now be running and accessible via the default port (``3000``).
 - Le serveur frontend devrait maintenant fonctionner et être accessible via le port par défaut (``3000``).

#### Additional Notes / Notes supplémentaires
 - Ensure your PostgreSQL server is running and properly configured before starting the backend server.
  
     Assurez-vous que votre serveur PostgreSQL est en cours d'exécution et correctement configuré avant de démarrer le serveur backend.

 - You can adjust the ``PORT`` and other environment variables based on your development setup.

    Vous pouvez ajuster le ``PORT`` et les autres variables d'environnement en fonction de votre configuration de développement.

- Make sure the ``REACT_APP_API_URL`` in the frontend ``.env.development`` matches the running backend's URL.
 
     Assurez-vous que le REACT_APP_API_URL dans le fichier ``.env.development`` du frontend correspond à l'URL du backend en cours d'exécution.

 - To handle email sending in a development environment, Mailtrap credentials (``MAILTRAP_USER`` and ``MAILTRAP_PASSWORD``) are required. Ensure you have a valid Mailtrap account and the correct credentials in your .env file.

    Pour gérer l'envoi d'emails en environnement de développement, les identifiants Mailtrap (``MAILTRAP_USER`` et ``MAILTRAP_PASSWORD``) sont requis. Assurez-vous d'avoir un compte Mailtrap valide et les bons identifiants dans votre fichier ``.env.development``

