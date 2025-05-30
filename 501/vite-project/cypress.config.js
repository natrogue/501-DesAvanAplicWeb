// cypress.config.js (¡Ahora en JavaScript, pero con sintaxis ES Modules!)

import { defineConfig } from "cypress"; // ¡Usamos 'import' de nuevo!

export default defineConfig({ // ¡Usamos 'export default' de nuevo!
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // *** IMPORTANTE: AJUSTA ESTA URL ***
    // Asegúrate de que esta URL sea la que tu `npm run dev` te da (ej. http://localhost:5173).
    baseUrl: 'http://localhost:5173', // <--- ¡CAMBIA ESTA URL a la de tu aplicación!
  },
});