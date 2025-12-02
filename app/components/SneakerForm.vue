<script setup lang="ts">
// On émet un événement "create" quand l'utilisateur soumet le formulaire
// Le payload contient toutes les infos de la sneaker à créer
const emit = defineEmits<{
  (e: "create", payload: { name: string; brand: string; price: number; rating: number }): void
}>()

// Variables réactives pour les champs du formulaire
const name = ref("") // Nom de la sneaker (obligatoire)
const brand = ref("") // Marque (optionnel)
const price = ref<number | null>(null) // Prix (optionnel, peut être null)
const rating = ref(3) // Note par défaut à 3 étoiles

// Fonction appelée quand on soumet le formulaire
function submit() {
  // On vérifie que le nom n'est pas vide (trim() enlève les espaces)
  if (!name.value.trim()) return

  // On émet l'événement avec les données du formulaire
  emit("create", {
    name: name.value.trim(),
    brand: brand.value.trim(),
    price: price.value ?? 0, // Si price est null, on met 0
    rating: rating.value,
  })

  // On réinitialise le formulaire après la soumission
  name.value = ""
  brand.value = ""
  price.value = null
  rating.value = 3
}
</script>

<template>
  <!-- Formulaire avec fond blanc, ombre et coins arrondis -->
  <form @submit.prevent="submit" class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 space-y-6">
    <!-- En-tête du formulaire avec icône -->
    <div class="flex items-center gap-3 mb-2">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <span class="text-white text-lg">+</span>
      </div>
      <h2 class="text-xl font-bold text-gray-900">Ajouter une sneaker</h2>
    </div>

    <!-- Champ nom (obligatoire) -->
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-2">Nom *</label>
      <input
        v-model="name"
        class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
        placeholder="Air Max 90"
        required
      />
    </div>

    <!-- Champs marque et prix côte à côte sur desktop -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Marque</label>
        <input
          v-model="brand"
          class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
          placeholder="Nike"
        />
      </div>
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Prix (€)</label>
        <input
          v-model.number="price"
          type="number"
          min="0"
          step="0.01"
          class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
          placeholder="140"
        />
      </div>
    </div>

    <!-- Section avec les étoiles et le bouton d'ajout -->
    <div class="flex items-center justify-between pt-4 border-t border-gray-100">
      <!-- Composant pour sélectionner la note (1-5 étoiles) -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Envie (1–5)</label>
        <RatingStars v-model="rating" :editable="true" />
      </div>
      <!-- Bouton de soumission avec gradient et effet hover -->
      <button
        type="submit"
        class="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
      >
        Ajouter
      </button>
    </div>
  </form>
</template>
