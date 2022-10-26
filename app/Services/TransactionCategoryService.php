<?php

namespace App\Services;

use App\Models\Transaction;
use App\Services\InterfaceService\TransactionCategoryServiceInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class TransactionCategoryService implements TransactionCategoryServiceInterface
{

    /**
     * Get all transaction category
     * 
     * @return Collection
     */
    public function getAll()
    {
        $transIcon = Transaction::all();
        return $transIcon;
    }

    /**
     * Create a new record
     *
     * @param array $attributes
     * @param $path
     * @return Transaction
     * 
     */
    public function create(array $attributes, $path)
    {
        $transactionCategory = Transaction::create([
            'name' => $attributes['title'],
            'symbol' => $path->getPathname(),
        ]);
        return $transactionCategory;
    }

    /**
     * Get id transaction category
     * 
     * @return Collection
     */
    public function getIds()
    {
        $ids = DB::table('transactions')
            ->select('transactions.id')
            ->get();
        return $ids;
    }

    /**
     * Get transaction category by id
     * 
     * @return Transaction
     */
    public function get($transactionCategoryId)
    {
        $category = Transaction::where('id', '=', $transactionCategoryId)->first();
        return $category;
    }
}
