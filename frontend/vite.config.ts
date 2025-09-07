import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// the manifest file
const manifest:any ={
  registerType: "prompt",
  manifest: {
    name: "StreamTube",
    short_name: "StreamTube",
    description: "An application for videos streaming and sharing.",
    icons: [
      
      {
        src: "/logo.png",
        sizes: "135x135",
        type: "image/png",
        purpose:'icon',
      },
      
      {
        src: '/logo.png',
        sizes:'85x85',
        type:'image/png',
        purpose:'apple touch icon',
      },
      {
        src: '/logo.png',
        sizes:'65x5',
        type:'image/png',
        purpose:'maskable',
      },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),VitePWA(manifest)],
})
