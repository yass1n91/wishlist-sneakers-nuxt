export default defineNuxtConfig({
  // Module TailwindCSS pour le styling
  modules: ["@nuxtjs/tailwindcss"],
  
  // Configuration runtime : variables accessibles côté serveur
  runtimeConfig: {
    // URI MongoDB depuis la variable d'environnement .env
    // Côté serveur uniquement (pas exposé au client)
    mongodbUri: ''
  },
  
  // TypeScript strict pour plus de sécurité de types
  typescript: { strict: true },
})
