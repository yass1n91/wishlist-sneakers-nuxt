# Sneaker Wishlist 🎯

Une application full-stack simple pour gérer sa wishlist de sneakers. Construite avec Nuxt 3, TypeScript, TailwindCSS et MongoDB.

## 🎨 Fonctionnalités

- ✅ **Ajouter une sneaker** : nom, marque, prix et note (1-5 étoiles)
- ✅ **Voir la liste** : affichage en cards avec design moderne
- ✅ **Modifier** : édition inline directement sur la card
- ✅ **Supprimer** : suppression avec confirmation

## 🛠️ Stack technique

- **Nuxt 3** : Framework Vue.js avec SSR et routing automatique
- **TypeScript** : Typage statique pour éviter les erreurs
- **TailwindCSS** : Framework CSS utilitaire pour le design
- **MongoDB** : Base de données NoSQL pour stocker les sneakers

## 📋 Prérequis

- Node.js 18+ installé
- MongoDB (local ou MongoDB Atlas - gratuit)
- npm

## 🚀 Installation et lancement

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer MongoDB

Créez un fichier `.env` à la racine du projet :

```env
NUXT_MONGODB_URI="mongodb+srv://USER:PASSWORD@clus.vcol1yp.mongodb.net/?appName=Clus"
```

**Pour MongoDB Atlas (recommandé)** :
1. Créez un compte gratuit sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créez un cluster gratuit
3. Créez un utilisateur dans "Database Access"
4. Autorisez votre IP dans "Network Access" (ou 0.0.0.0/0 pour le dev)
5. Récupérez l'URI de connexion dans "Database" > "Connect"
6. Remplacez USER, PASSWORD et cluster dans l'URI


### 3. Lancer en développement

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🏗️ Build pour la production

### Build du projet

```bash
npm run build
```

Cette commande génère les fichiers optimisés dans le dossier `.output/`.

### Prévisualiser le build

```bash
npm run preview
```

Permet de tester le build de production localement avant de déployer.

### Déploiement

Le dossier `.output/` contient tout ce qu'il faut pour déployer. Vous pouvez :

- **Déployer sur Vercel/Netlify** : connectez votre repo GitHub, ils détectent automatiquement Nuxt
- **Déployer sur un serveur Node.js** : utilisez `node .output/server/index.mjs`
- **Générer un site statique** : utilisez `npm run generate` (si pas de SSR nécessaire)

## 📁 Structure du projet

```
projetnuxt/
├── app/
│   ├── pages/
│   │   └── index.vue          # Page principale (tout en un)
│   ├── components/
│   │   ├── SneakerCard.vue    # Card avec édition inline
│   │   ├── SneakerForm.vue    # Formulaire d'ajout
│   │   └── RatingStars.vue    # Composant étoiles
│   └── app.vue                 # Point d'entrée
├── server/
│   ├── api/
│   │   ├── wishlist.ts        # GET et POST
│   │   └── wishlist/[id].ts   # PUT et DELETE
│   └── utils/
│       └── mongo.ts            # Connexion MongoDB
├── nuxt.config.ts             # Configuration Nuxt
├── .env                       # Variables d'environnement (à créer)
└── README.md
```

## 🔧 Comment ça fonctionne

### Architecture

1. **Frontend (Vue)** : 
   - La page `index.vue` affiche le formulaire et la liste
   - Utilise `useFetch` pour charger les données depuis l'API
   - Utilise `$fetch` pour les opérations POST/PUT/DELETE

2. **Backend (Nuxt Server)** :
   - Les routes dans `server/api/` sont automatiquement exposées
   - `GET /api/wishlist` retourne toutes les sneakers
   - `POST /api/wishlist` ajoute une sneaker
   - `PUT /api/wishlist/:id` modifie une sneaker
   - `DELETE /api/wishlist/:id` supprime une sneaker

3. **Base de données (MongoDB)** :
   - Collection `wishlist` avec les documents sneakers
   - Structure : `{ _id, name, brand, price, rating, createdAt }`
   - Connexion mise en cache pour éviter de reconnecter à chaque requête

### Flux de données

```
Frontend (Vue) → API Nuxt (/api/wishlist) → MongoDB
```

Quand l'utilisateur ajoute/modifie/supprime une sneaker :
1. Le frontend envoie une requête HTTP à l'API Nuxt
2. L'API traite la requête et modifie MongoDB
3. Le frontend rafraîchit la liste avec `refresh()`

## 📝 Scripts disponibles

```bash
npm run dev      # Développement (hot reload)
npm run build    # Build pour la production
npm run preview  # Prévisualiser le build
npm run generate # Générer un site statique (si pas de SSR)
```

## 🐛 Dépannage

### Erreur de connexion MongoDB

- Vérifiez que le fichier `.env` existe et contient `NUXT_MONGODB_URI`
- Pour Atlas : vérifiez que votre IP est autorisée dans "Network Access"
- Pour local : vérifiez que MongoDB est démarré

### Erreur de modules

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Ressources

- [Documentation Nuxt 3](https://nuxt.com/docs)
- [Documentation MongoDB](https://www.mongodb.com/docs/)
- [Documentation TailwindCSS](https://tailwindcss.com/docs)

---

**Note** : Ce projet est à des fins pédagogiques et de portfolio. Code simple et commenté pour faciliter l'apprentissage.
