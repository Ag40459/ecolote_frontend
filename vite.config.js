import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/ecolote-frontend/", // ATENÇÃO: Mude "/ecolote-frontend/" para "/NOME_DO_SEU_REPOSITORIO_NO_GITHUB/" para o deploy no GitHub Pages funcionar corretamente.
});

