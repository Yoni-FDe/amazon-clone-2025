import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//  https://vite.dev/config/
// export default defineConfig({
// //   base: "/Amazon-Clone-Y2024/",
//   plugins: [react()],
// });

export default defineConfig({
  server: {
    port: 3000, // Replace 3000 with your preferred port
  },
});
