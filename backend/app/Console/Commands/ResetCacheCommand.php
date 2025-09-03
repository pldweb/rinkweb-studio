<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class ResetCacheCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:reset-cache {--optimize : Optimize caches after clearing}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset semua cache Laravel (view, route, config, application) dan regenerate key';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🔄 Memulai proses reset cache Laravel...');
        $this->newLine();

        // Clear application cache
        $this->info('🗑️  Clearing application cache...');
        Artisan::call('cache:clear');
        $this->line('   ✅ Application cache cleared');

        // Clear config cache
        $this->info('⚙️  Clearing config cache...');
        Artisan::call('config:clear');
        $this->line('   ✅ Config cache cleared');

        // Clear route cache
        $this->info('🛣️  Clearing route cache...');
        Artisan::call('route:clear');
        $this->line('   ✅ Route cache cleared');

        // Clear view cache
        $this->info('👁️  Clearing view cache...');
        Artisan::call('view:clear');
        $this->line('   ✅ View cache cleared');

        // Clear compiled services and packages
        $this->info('📦 Clearing compiled services...');
        Artisan::call('clear-compiled');
        $this->line('   ✅ Compiled services cleared');

        // Generate application key (jika belum ada)
        $this->info('🔑 Generating application key...');
        Artisan::call('key:generate');
        $this->line('   ✅ Application key generated');

        // Dump composer autoload
        $this->info('🎼 Dumping composer autoload...');
        $this->runComposerCommand('dump-autoload');
        $this->line('   ✅ Composer autoload dumped');

        // Optimize untuk production (jika flag --optimize digunakan)
        if ($this->option('optimize')) {
            $this->info('⚡ Optimizing application...');
            
            Artisan::call('config:cache');
            $this->line('   ✅ Config cached');
            
            Artisan::call('route:cache');
            $this->line('   ✅ Routes cached');
            
            Artisan::call('view:cache');
            $this->line('   ✅ Views cached');
        }

        $this->newLine();
        $this->info('✅ Reset cache selesai!');
        $this->newLine();
        
        $this->line('📋 Yang telah dilakukan:');
        $this->line('   - Cache aplikasi dibersihkan');
        $this->line('   - Cache konfigurasi dibersihkan');
        $this->line('   - Cache rute dibersihkan');
        $this->line('   - Cache tampilan dibersihkan');
        $this->line('   - Compiled services dibersihkan');
        $this->line('   - Application key di-generate');
        $this->line('   - Composer autoload di-dump');
        
        if ($this->option('optimize')) {
            $this->line('   - Cache dioptimasi ulang');
        }
        
        $this->newLine();
        $this->info('🚀 Aplikasi siap digunakan!');
        
        if (!$this->option('optimize')) {
            $this->comment('💡 Tip: Gunakan --optimize untuk mengoptimasi cache setelah pembersihan');
        }

        return Command::SUCCESS;
    }

    /**
     * Run composer command
     */
    private function runComposerCommand($command)
    {
        exec('composer ' . $command, $output, $returnCode);
        
        if ($returnCode === 0) {
            return true;
        }
        
        $this->error('Composer command failed');
        return false;
    }
}