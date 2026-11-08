import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [react()],
  // Đổi thành '/<tên-repo>/' nếu deploy lên GitHub Pages
  base: './',
});
