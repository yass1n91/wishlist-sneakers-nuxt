<script setup lang="ts">
// Type pour une sneaker (même structure que dans index.vue)
type WishlistItem = {
  id: string
  name: string
  brand: string
  price: number
  rating: number
  createdAt: string
}

// On reçoit la sneaker en props (les données de la sneaker à afficher)
const props = defineProps<{ item: WishlistItem }>()

// On peut émettre deux événements : update (pour modifier) et delete (pour supprimer)
const emit = defineEmits<{
  (e: "update", id: string, payload: Omit<WishlistItem, "id" | "createdAt">): void
  (e: "delete", id: string): void
}>()

// État pour savoir si on est en mode édition ou non
const isEditing = ref(false)

// Données temporaires pour l'édition (on copie les valeurs de la sneaker)
// reactive() permet de créer un objet réactif (les changements sont détectés automatiquement)
const draft = reactive({
  name: props.item.name,
  brand: props.item.brand,
  price: props.item.price,
  rating: props.item.rating,
})

// On surveille les changements de props.item pour mettre à jour draft si besoin
// Ça permet de réinitialiser le formulaire si les données changent depuis l'extérieur
watch(
  () => props.item,
  (v) => {
    draft.name = v.name
    draft.brand = v.brand
    draft.price = v.price
    draft.rating = v.rating
  }
)

// Fonction pour sauvegarder les modifications
// On vérifie que le nom n'est pas vide, puis on émet l'événement update
function save() {
  if (!draft.name.trim()) return // Si le nom est vide, on ne fait rien

  emit("update", props.item.id, {
    name: draft.name.trim(),
    brand: draft.brand.trim(),
    price: Number(draft.price) || 0, // On s'assure que le prix est un nombre
    rating: draft.rating,
  })

  isEditing.value = false // On sort du mode édition
}
</script>

<template>
  <!-- Card avec effet hover (elle se soulève légèrement au survol) -->
  <div class="group bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1">
    <div class="flex items-start justify-between gap-4 mb-4">
      <div class="flex-1 min-w-0">
        <!-- Mode affichage : on montre les infos de la sneaker -->
        <div v-if="!isEditing">
          <!-- Badge avec la marque (gradient indigo-purple) -->
          <div class="flex items-center gap-2 mb-2">
            <span v-if="item.brand" class="px-2.5 py-1 text-xs font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              {{ item.brand }}
            </span>
            <span v-else class="px-2.5 py-1 text-xs font-medium rounded-lg bg-gray-100 text-gray-500">
              Marque inconnue
            </span>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-1 leading-tight">{{ item.name }}</h3>
        </div>
        <!-- Mode édition : on affiche des inputs pour modifier -->
        <div v-else class="space-y-3">
          <input 
            v-model="draft.name" 
            class="w-full border-2 border-indigo-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            placeholder="Nom de la sneaker"
          />
          <input 
            v-model="draft.brand" 
            class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            placeholder="Marque"
          />
        </div>
      </div>
      <!-- Prix à droite, avec gradient sur le texte en mode affichage -->
      <div class="text-right flex-shrink-0">
        <div v-if="!isEditing" class="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {{ item.price }} €
        </div>
        <!-- Input pour le prix en mode édition -->
        <input
          v-else
          v-model.number="draft.price"
          type="number"
          min="0"
          class="w-28 border-2 border-indigo-200 rounded-xl px-3 py-2 text-right font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />
      </div>
    </div>

    <!-- Composant pour afficher/modifier les étoiles -->
    <div class="mb-4">
      <RatingStars v-model="draft.rating" :editable="isEditing" />
    </div>

    <!-- Boutons d'action en bas de la card -->
    <div class="flex items-center gap-2 pt-4 border-t border-gray-100">
      <!-- Bouton Modifier (visible seulement si pas en édition) -->
      <button
        v-if="!isEditing"
        class="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200"
        @click="isEditing = true"
      >
        Modifier
      </button>
      <!-- Bouton Enregistrer (visible seulement en mode édition) -->
      <button
        v-else
        class="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-500/25 transition-all duration-200"
        @click="save"
      >
        Enregistrer
      </button>
      <!-- Bouton Supprimer (toujours visible) -->
      <button
        class="px-4 py-2.5 text-sm font-semibold rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
        @click="$emit('delete', item.id)"
      >
        Supprimer
      </button>
    </div>
  </div>
</template>
