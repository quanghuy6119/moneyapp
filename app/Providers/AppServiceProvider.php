<?php

namespace App\Providers;

use App\Services\InterfaceService\NoteServiceInterface;
use App\Services\InterfaceService\TransactionCategoryServiceInterface;
use App\Services\InterfaceService\TransactionServiceInterface;
use App\Services\InterfaceService\WalletServiceInterface;
use App\Services\NoteService;
use App\Services\TransactionCategoryService;
use App\Services\TransactionService;
use App\Services\WalletService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(TransactionServiceInterface::class, TransactionService::class);
        $this->app->bind(WalletServiceInterface::class, WalletService::class);
        $this->app->bind(NoteServiceInterface::class, NoteService::class);
        $this->app->bind(TransactionCategoryServiceInterface::class, TransactionCategoryService::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
