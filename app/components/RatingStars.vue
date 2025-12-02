<script setup lang="ts">
// Props : modelValue = la note actuelle (1-5), editable = si on peut cliquer pour changer
const props = defineProps<{
  modelValue: number
  editable?: boolean
}>()

// On émet un événement quand la note change
const emit = defineEmits<{
  (e: "update:modelValue", v: number): void
}>()

// Tableau avec les 5 étoiles possibles
const stars = [1, 2, 3, 4, 5]

// Fonction pour changer la note (seulement si editable est true)
function setRating(v: number) {
  if (!props.editable) return // Si pas éditable, on ne fait rien
  emit("update:modelValue", v) // On émet la nouvelle valeur
}
</script>

<template>
  <div class="flex items-center gap-1">
    <!-- On affiche 5 boutons (un pour chaque étoile) -->
    <button
      v-for="s in stars"
      :key="s"
      type="button"
      class="text-2xl leading-none transition-transform duration-150"
      :class="[
        s <= modelValue 
          ? 'text-yellow-400 drop-shadow-sm' // Étoile remplie (jaune) si s <= note actuelle
          : 'text-gray-300', // Étoile vide (gris) sinon
        editable && 'hover:scale-110 cursor-pointer' // Effet hover seulement si éditable
      ]"
      @click="setRating(s)"
      :aria-label="`rating ${s}`"
    >
      ★
    </button>
  </div>
</template>
