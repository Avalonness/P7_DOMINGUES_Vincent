# Projet 7 - BACKEND

## Qu'esy-ce que c'est ?
Voici la partie backend de l'application GROUPOMANIA qui utilise MySQL et Sequelize-CLI.

## Installation du back-end
Après avoir cloné le repository, installer les packages avec `npm install` puis taper `npm install express`.

## Lancer le back-end
Une fois terminé, vous pourrez lancer l'API en tapant `npm start` dans la console dans le dossier backend.

## Création de la base de données
Utiliser `npx sequelize db:migrate` pour générer les tables utiles au fonctionnement de l'application si c'est le premier lancement.
Vous pouvez générer un compte avec `npx sequelize db:seed:all`

## Ajouter un administrateur
Si vous voulez passer un compte administrateur, vous devez modifier manuellement le levelAccount dans la table Users, le passer à `1`.
