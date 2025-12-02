<script setup lang="ts">
// Type pour une sneaker dans la wishlist
type WishlistItem = {
  id: string
  name: string
  brand: string
  price: number
  rating: number
  createdAt: string
}

// On récupère la liste des sneakers depuis l'API
// useFetch fait automatiquement la requête GET vers /api/wishlist
// pending = true quand ça charge, error = erreur s'il y en a, data = les données
const { data, pending, error, refresh } = await useFetch<WishlistItem[]>(
  "/api/wishlist",
  { key: "wishlist" }
)

// Fonction pour ajouter une nouvelle sneaker
// On envoie les données en POST à l'API puis on rafraîchit la liste
async function createItem(payload: Omit<WishlistItem, "id" | "createdAt">) {
  await $fetch("/api/wishlist", { method: "POST", body: payload })
  await refresh() // On recharge la liste pour voir la nouvelle sneaker
}

// Fonction pour modifier une sneaker existante
// On envoie les nouvelles données en PUT avec l'ID de la sneaker
async function updateItem(id: string, payload: Omit<WishlistItem, "id" | "createdAt">) {
  await $fetch(`/api/wishlist/${id}`, { method: "PUT", body: payload })
  await refresh() // On recharge pour voir les modifications
}

// Fonction pour supprimer une sneaker
// On envoie une requête DELETE avec l'ID
async function deleteItem(id: string) {
  await $fetch(`/api/wishlist/${id}`, { method: "DELETE" })
  await refresh() // On recharge pour voir que la sneaker a disparu
}

// On définit le titre de la page (ça apparaît dans l'onglet du navigateur)
useHead({
  title: "Mes snickers"
})
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Section Hero avec le titre et les badges tech -->
      <header class="mb-12 text-center">
        <!-- Icône dans un badge avec gradient et ombre -->
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-6 shadow-lg shadow-indigo-500/25">
          <span class="text-3xl">👟</span>
        </div>
        <!-- Titre principal, responsive (plus gros sur desktop) -->
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Sneaker Wishlist
        </h1>
        <p class="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
          Une mini app Nuxt full-stack pour lister les paires que je veux acheter.
        </p>
        <!-- Badges avec les technos utilisées, chaque badge a sa couleur -->
        <div class="flex flex-wrap items-center justify-center gap-2">
          <span class="px-3 py-1.5 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
            Nuxt 3
          </span>
          <span class="px-3 py-1.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 border border-purple-200">
            TypeScript
          </span>
          <span class="px-3 py-1.5 text-xs font-semibold rounded-full bg-pink-100 text-pink-700 border border-pink-200">
            TailwindCSS
          </span>
          <span class="px-3 py-1.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
            MongoDB
          </span>
        </div>
      </header>

      <!-- Formulaire pour ajouter une sneaker -->
      <div class="mb-12">
        <SneakerForm @create="createItem" />
      </div>

      <!-- Section avec la liste des sneakers -->
      <section>
        <!-- État de chargement : on affiche un spinner -->
        <div v-if="pending" class="text-center py-16">
          <div class="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p class="mt-4 text-gray-600">Chargement…</p>
        </div>
        <!-- État d'erreur : on affiche un message d'erreur -->
        <div v-else-if="error" class="text-center py-16">
          <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
            <span class="text-xl">⚠️</span>
          </div>
          <p class="text-red-600 font-medium">Erreur lors du chargement.</p>
        </div>
        <!-- Liste des sneakers en grille responsive -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SneakerCard
            v-for="item in data || []"
            :key="item.id"
            :item="item"
            @update="updateItem"
            @delete="deleteItem"
          />
        </div>
        <!-- Message si la liste est vide -->
        <div v-if="(data || []).length === 0 && !pending" class="text-center py-16">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
            <span class="text-3xl">👟</span>
          </div>
          <p class="text-gray-500 text-lg font-medium">
            Aucune paire pour l'instant
          </p>
          <p class="text-gray-400 text-sm mt-2">
            Ajoute ta première sneaker ci-dessus
          </p>
        </div>
      </section>
    </div>
  </main>
</template>
