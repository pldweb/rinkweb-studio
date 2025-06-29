import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Opsi optimizeDeps:
  // Ini digunakan untuk fase development (dev server) Vite,
  // untuk melakukan pre-bundling dependensi dan mempercepat cold start.
  // 'lucide-react' biasanya sudah ditangani dengan baik oleh Vite,
  // jadi tidak selalu perlu di-exclude kecuali ada masalah spesifik.
  // Jika Anda memang mengalami masalah dev server dengan lucide-react,
  // maka biarkan exclude. Jika tidak, Anda bisa menghapusnya.
  // prioritize common libs for pre-bundling, not necessarily exclude.
  // optimizeDeps: {
  //   exclude: ['lucide-react'], // Mungkin tidak perlu jika tidak ada masalah spesifik
  // },

  build: {
    // rollupOptions:
    // Digunakan untuk mengkonfigurasi Rollup, bundler yang digunakan Vite di balik layar.
    rollupOptions: {
      output: {
        // manualChunks:
        // Ini untuk membagi kode Anda menjadi "chunks" yang lebih kecil.
        // vendor: ['react', 'react-dom'] adalah praktik yang sangat baik.
        // Anda juga bisa menambahkan library besar lainnya di sini jika ada.
        manualChunks: {
          vendor: ['react', 'react-dom'],
          // Contoh: Jika Anda punya library besar lain seperti swiper
          // swiper: ['swiper', 'swiper/react'],
        },
        // hash di nama file untuk caching jangka panjang
        entryFileNames: `[name].[hash].js`,
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: `[name].[hash].[ext]`,
      },
    },

    // minify:
    // Vite secara default akan mem-minify kode saat build produksi.
    // 'terser' adalah default dan paling umum.
    // Anda tidak perlu secara eksplisit menuliskannya kecuali Anda ingin menggunakan 'esbuild'
    // yang lebih cepat tetapi mungkin tidak sekomprehensif terser dalam beberapa kasus.
    // Jika Anda ingin menggunakan terser, Anda sudah benar.
    // minify: 'terser', // Ini adalah default untuk build produksi, jadi tidak perlu ditulis eksplisit kecuali ingin memastikan

    // terserOptions:
    // Konfigurasi ini adalah bagian yang sangat baik untuk optimasi.
    // drop_console dan drop_debugger akan menghapus semua console.log dan debugger dari kode produksi.
    terserOptions: {
      compress: {
        drop_console: true, // Hapus console.log
        drop_debugger: true, // Hapus debugger
      },
      // Penting: tambahkan `format` untuk menjaga copyright atau lisensi
      format: {
        comments: false, // Hapus komentar
      },
    },

    // Source Maps:
    // Berguna untuk debugging setelah build. Di produksi, bisa dimatikan
    // untuk menghindari pengungkapan kode atau untuk sedikit mengurangi ukuran bundle.
    // Namun, untuk debugging error di produksi, sangat direkomendasikan untuk menyalakannya.
    sourcemap: false, // Set ke false untuk produksi, true untuk staging/debugging
  },
});