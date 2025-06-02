# Guide de démarrage de bodyMineSite

## Lancement du front-end
```bash
cd client
npm run dev
```

## Lancement du back-end
```bash
cd server
npm run dev
```

## Lancement de la base de données avec Docker

### Prérequis
- [Docker](https://www.docker.com/products/docker-desktop/) installé sur votre machine

### Instructions
1. À la racine du projet, lancez la commande suivante pour démarrer le conteneur MySQL:
   ```bash
   docker-compose up -d
   ```

2. Pour arrêter le conteneur:
   ```bash
   docker-compose down
   ```

### Informations de connexion à la base de données
- Host: localhost
- Port: 3306
- Database: bodyMine
- User: user
- Password: password

### Notes importantes
- Le fichier `BDD.sql` sera automatiquement chargé au démarrage du conteneur
- Les données sont persistantes grâce au volume Docker créé
- Le fichier `.env` du serveur est configuré pour se connecter à cette base de données
