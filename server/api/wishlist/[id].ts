import { ObjectId } from "mongodb"
import { getMongoClient } from "../../utils/mongo"

// Route API pour modifier ou supprimer une sneaker spécifique
// PUT /api/wishlist/:id = modifier
// DELETE /api/wishlist/:id = supprimer
export default defineEventHandler(async (event) => {
  // On récupère l'ID depuis les paramètres de la route
  const id = event.context.params?.id

  // Validation : on vérifie que l'ID existe et qu'il est valide (format ObjectId MongoDB)
  if (!id || !ObjectId.isValid(id)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid id" })
  }

  // On récupère le client MongoDB
  const client = await getMongoClient()
  const db = client.db()
  const col = db.collection("wishlist")
  
  // On convertit l'ID string en ObjectId pour MongoDB
  const _id = new ObjectId(id)

  // Si c'est une requête PUT, on modifie la sneaker
  if (event.method === "PUT") {
    // On lit les nouvelles données depuis le body
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

    // On met à jour le document dans MongoDB avec $set
    // $set permet de mettre à jour seulement les champs spécifiés
    await col.updateOne(
      { _id }, // On cherche le document avec cet _id
      {
        $set: {
          name: body.name,
          brand: body.brand ?? "",
          price: body.price ?? 0,
          rating: body.rating ?? 3,
        },
      }
    )

    return { ok: true } // On retourne un succès
  }

  // Si c'est une requête DELETE, on supprime la sneaker
  if (event.method === "DELETE") {
    // On supprime le document avec cet _id
    await col.deleteOne({ _id })
    return { ok: true }
  }

  // Si c'est une autre méthode HTTP, erreur
  throw createError({ statusCode: 405, statusMessage: "Method not allowed" })
})
