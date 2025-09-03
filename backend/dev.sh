#!/bin/bash

# Development Server Script
# Script untuk menjalankan Laravel server dan npm dev secara bersamaan

echo "🚀 Memulai development server..."
echo ""

# Pindah ke direktori backend
cd "$(dirname "$0")"

echo "📁 Working directory: $(pwd)"
echo ""

# Cek apakah ada argument
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo "📋 Cara penggunaan:"
    echo "   ./dev.sh                 - Jalankan Laravel + NPM dev"
    echo "   ./dev.sh laravel         - Hanya Laravel server"
    echo "   ./dev.sh npm             - Hanya NPM dev"
    echo "   ./dev.sh --port 8080     - Laravel dengan port custom"
    echo ""
    exit 0
fi

# Default port
PORT=8000

# Parse arguments
if [ "$1" = "--port" ] && [ -n "$2" ]; then
    PORT=$2
    shift 2
fi

# Jika argument adalah laravel
if [ "$1" = "laravel" ]; then
    echo "🔧 Menjalankan Laravel server pada port $PORT..."
    echo "🌐 Akses: http://localhost:$PORT"
    echo ""
    php artisan serve --port=$PORT
    exit 0
fi

# Jika argument adalah npm
if [ "$1" = "npm" ]; then
    echo "📦 Menjalankan NPM dev server..."
    echo "⚡ Vite HMR: http://localhost:5173"
    echo ""
    npm run dev
    exit 0
fi

# Jalankan keduanya secara bersamaan
echo "🔧 Menjalankan Laravel server pada port $PORT..."
echo "📦 Menjalankan NPM dev untuk hot reload..."
echo ""
echo "📋 Server Information:"
echo "   🌐 Laravel: http://localhost:$PORT"
echo "   ⚡ Vite HMR: http://localhost:5173"
echo ""
echo "💡 Tips:"
echo "   - Gunakan Ctrl+C untuk menghentikan server"
echo "   - Akses aplikasi di http://localhost:$PORT"
echo "   - Hot reload akan aktif otomatis"
echo ""
echo "🎉 Development server siap!"
echo ""

# Function untuk cleanup saat script dihentikan
cleanup() {
    echo ""
    echo "🛑 Menghentikan development server..."
    kill $LARAVEL_PID 2>/dev/null
    kill $NPM_PID 2>/dev/null
    echo "✅ Development server dihentikan."
    exit 0
}

# Set trap untuk cleanup
trap cleanup SIGINT SIGTERM

# Jalankan Laravel server di background
php artisan serve --port=$PORT &
LARAVEL_PID=$!

# Tunggu sebentar untuk Laravel server start
sleep 2

# Jalankan NPM dev di background
npm run dev &
NPM_PID=$!

# Tunggu kedua process
wait