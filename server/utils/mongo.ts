import { MongoClient } from "mongodb"

// Variable globale pour stocker le client MongoDB
// On le met en cache pour éviter de recréer la connexion à chaque requête
let client: MongoClient | null = null

// Fonction pour obtenir le client MongoDB (singleton pattern)
// Si le client existe déjà, on le retourne directement
// Sinon, on crée une nouvelle connexion
export async function getMongoClient() {
  // Si on a déjà un client, on le retourne (pas besoin de reconnecter)
  if (client) return client
  
  // On récupère la config Nuxt (les variables d'environnement)
  const config = useRuntimeConfig()
  const uri = config.mongodbUri
  
  // Validation : on vérifie que l'URI MongoDB est configurée
  if (!uri) {
    throw new Error("Missing NUXT_MONGODB_URI in runtimeConfig")
  }
  
  // On crée un nouveau client MongoDB avec l'URI
  client = new MongoClient(uri)
  
  // On se connecte à MongoDB
  await client.connect()
  
  // On retourne le client (qui sera réutilisé pour les prochaines requêtes)
  return client
}
