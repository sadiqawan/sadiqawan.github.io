// import path from "path"
// import react from "@vitejs/plugin-react"
// import { defineConfig } from "vite"
// import { inspectAttr } from 'kimi-plugin-inspect-react'

// // https://vite.dev/config/
// export default defineConfig({
//   base: './sadiqawan.github.io',
//   plugins: [inspectAttr(), react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });


import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { inspectAttr } from "kimi-plugin-inspect-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/", // <-- corrected for username.github.io
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import { inspectAttr } from "kimi-plugin-inspect-react";
// import path from "path";

// // https://vite.dev/config/
// export default defineConfig({
//   base: "/sadiqawan.github.io", // <-- use '/' for username.github.io repos
//   plugins: [inspectAttr(), react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });