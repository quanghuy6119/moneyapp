<?php

namespace App\Services\InterfaceService;

use App\Models\Transaction;

interface TransactionCategoryServiceInterface
{
    /**
     * Create a new record
     *
     * @param array $attributes
     * @param $path
     * @return Transaction
     */
    public function create(array $attributes, $path);

    /**
     * Get all transaction category
     * 
     * @return Collection
     */
    public function getAll();

    /**
     * Get id transaction category
     * 
     * @return Collection
     */
    public function getIds();

    /**
     * Get transaction category by id
     * 
     * @return Transaction
     */
    public function get($transactionCategoryId);
}
