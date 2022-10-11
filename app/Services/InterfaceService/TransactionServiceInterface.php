<?php

namespace App\Services\InterfaceService;

interface TransactionServiceInterface
{
    /**
     * Create a new record
     *
     * @param array $attributes
     */
    public function create(array $attributes);
    
    /**
     * Show - display all transaction details
     *
     * @param $walletID
     * @param $page
     */
    public function showWalletDetails($walletID,  $page);
}
