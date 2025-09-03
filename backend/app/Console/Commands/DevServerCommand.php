<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class DevServerCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:dev {--port=8000 : Port untuk Laravel server} {--npm-only : Hanya jalankan npm dev} {--laravel-only : Hanya jalankan Laravel server}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Jalankan Laravel server dan npm dev secara bersamaan untuk development';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $port = $this->option('port');
        $npmOnly = $this->option('npm-only');
        $laravelOnly = $this->option('laravel-only');

        $this->info('🚀 Memulai development server...');
        $this->newLine();

        // Jika hanya npm
        if ($npmOnly) {
            $this->info('📦 Menjalankan npm dev...');
            $this->runNpmDev();
            return Command::SUCCESS;
        }

        // Jika hanya Laravel
        if ($laravelOnly) {
            $this->info('🔧 Menjalankan Laravel server...');
            $this->runLaravelServer($port);
            return Command::SUCCESS;
        }

        // Jalankan keduanya secara bersamaan
        $this->info('🔧 Menjalankan Laravel server pada port ' . $port . '...');
        $this->info('📦 Menjalankan npm dev untuk hot reload...');
        $this->newLine();
        
        $this->line('📋 Server Information:');
        $this->line('   🌐 Laravel: http://localhost:' . $port);
        $this->line('   ⚡ Vite HMR: http://localhost:5173');
        $this->line('   📁 Working Directory: ' . getcwd());
        $this->newLine();
        
        $this->comment('💡 Tips:');
        $this->comment('   - Gunakan Ctrl+C untuk menghentikan server');
        $this->comment('   - Akses aplikasi di http://localhost:' . $port);
        $this->comment('   - Hot reload akan aktif otomatis');
        $this->newLine();

        // Jalankan kedua process secara parallel
        $this->runBothServers($port);

        return Command::SUCCESS;
    }

    /**
     * Run Laravel server only
     */
    private function runLaravelServer($port)
    {
        $this->line('🌐 Laravel server: http://localhost:' . $port);
        $this->newLine();
        
        $process = new Process(['php', 'artisan', 'serve', '--port=' . $port]);
        $process->setTimeout(null);
        $process->run(function ($type, $buffer) {
            echo $buffer;
        });
    }

    /**
     * Run npm dev only
     */
    private function runNpmDev()
    {
        $this->line('⚡ Vite dev server: http://localhost:5173');
        $this->newLine();
        
        $process = new Process(['npm', 'run', 'dev']);
        $process->setTimeout(null);
        $process->run(function ($type, $buffer) {
            echo $buffer;
        });
    }

    /**
     * Run both Laravel server and npm dev
     */
    private function runBothServers($port)
    {
        // Process untuk Laravel server
        $laravelProcess = new Process(['php', 'artisan', 'serve', '--port=' . $port]);
        $laravelProcess->setTimeout(null);
        
        // Process untuk npm dev
        $npmProcess = new Process(['npm', 'run', 'dev']);
        $npmProcess->setTimeout(null);
        
        // Start Laravel server
        $laravelProcess->start();
        $this->info('✅ Laravel server dimulai...');
        
        // Start npm dev
        $npmProcess->start();
        $this->info('✅ NPM dev server dimulai...');
        
        $this->newLine();
        $this->info('🎉 Development server siap! Tekan Ctrl+C untuk menghentikan.');
        $this->newLine();
        
        // Handle output dari kedua process
        while ($laravelProcess->isRunning() || $npmProcess->isRunning()) {
            // Output dari Laravel
            if ($laravelProcess->isRunning()) {
                $output = $laravelProcess->getIncrementalOutput();
                if (!empty($output)) {
                    $this->line('[Laravel] ' . trim($output));
                }
                
                $errorOutput = $laravelProcess->getIncrementalErrorOutput();
                if (!empty($errorOutput)) {
                    $this->error('[Laravel Error] ' . trim($errorOutput));
                }
            }
            
            // Output dari NPM
            if ($npmProcess->isRunning()) {
                $output = $npmProcess->getIncrementalOutput();
                if (!empty($output)) {
                    $this->line('[NPM] ' . trim($output));
                }
                
                $errorOutput = $npmProcess->getIncrementalErrorOutput();
                if (!empty($errorOutput)) {
                    $this->error('[NPM Error] ' . trim($errorOutput));
                }
            }
            
            usleep(100000); // Sleep 100ms
        }
        
        // Cleanup
        if ($laravelProcess->isRunning()) {
            $laravelProcess->stop();
        }
        
        if ($npmProcess->isRunning()) {
            $npmProcess->stop();
        }
        
        $this->info('🛑 Development server dihentikan.');
    }
}