import { getMongoClient } from "../utils/mongo"

// Route API pour gérer la wishlist (GET et POST)
// GET = récupérer toutes les sneakers
// POST = ajouter une nouvelle sneaker
export default defineEventHandler(async (event) => {
  // On récupère le client MongoDB (connexion réutilisée)
  const client = await getMongoClient()
  const db = client.db() // On prend la base de données par défaut (celle de l'URI)
  const col = db.collection("wishlist") // Collection "wishlist" dans MongoDB

  // Si c'est une requête GET, on retourne toutes les sneakers
  if (event.method === "GET") {
    // On récupère toutes les sneakers, triées par date (plus récentes en premier)
    const items = await col.find().sort({ createdAt: -1 }).toArray()
    
    // On transforme les données pour convertir l'_id MongoDB en string "id"
    return items.map((i: any) => ({
      id: i._id.toString(), // MongoDB utilise ObjectId, on le convertit en string
      name: i.name,
      brand: i.brand,
      price: i.price,
      rating: i.rating,
      createdAt: i.createdAt,
    }))
  }

  // Si c'est une requête POST, on ajoute une nouvelle sneaker
  if (event.method === "POST") {
    // On lit le body de la requête (les données envoyées depuis le frontend)
    const body = await readBody<{
      name?: string
      brand?: string
      price?: number
      rating?: number
    }>(event)

    // Validation : le nom est obligatoire
    if (!body?.name) {
      throw createError({ statusCode: 400, statusMessage: "name is required" })
    }

    // On crée le document à insérer dans MongoDB
    const doc = {
      name: body.name,
      brand: body.brand ?? "", // Si brand n'est pas fourni, on met une chaîne vide
      price: body.price ?? 0, // Si price n'est pas fourni, on met 0
      rating: body.rating ?? 3, // Si rating n'est pas fourni, on met 3 par défaut
      createdAt: new Date(), // Date de création
    }

    // On insère le document dans la collection
    const result = await col.insertOne(doc)
    
    // On retourne le document créé avec l'ID converti en string
    return { id: result.insertedId.toString(), ...doc }
  }

  // Si c'est une autre méthode HTTP, on retourne une erreur
  throw createError({ statusCode: 405, statusMessage: "Method not allowed" })
})
