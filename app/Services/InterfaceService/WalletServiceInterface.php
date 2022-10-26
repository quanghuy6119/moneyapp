<?php

namespace App\Services\InterfaceService;

use App\Models\Wallet;

interface WalletServiceInterface
{
    /**
     * Create a new record
     *
     * @param array $attributes
     * @return Wallet
     */
    public function create(array $attributes);

    /**
     * Get all wallet 
     * 
     * @return Collection
     */
    public function getAll();

    /**
     * Get ids of wallet 
     * 
     * @return Collection
     */
    public function getIds();

    /**
     * Get wallet by id
     * 
     * @return Wallet
     */
    public function get($walletID);
}
