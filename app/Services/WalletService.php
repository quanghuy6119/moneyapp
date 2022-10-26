<?php

namespace App\Services;

use App\Models\Wallet;
use App\Services\InterfaceService\WalletServiceInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class WalletService implements WalletServiceInterface
{

    /**
     * get wallet 
     * 
     * @return Collection
     */
    public function getAll()
    {
        $user_id = auth()->user()->id;
        $wallet = DB::table('wallets')
            ->select('wallets.*', 'transactions.symbol', 'W.name as parent_name')
            ->join('transactions', 'wallets.transaction_id', '=', 'transactions.id')
            ->leftJoin('wallets as W', 'wallets.parent_id', '=', 'W.id')
            ->where('wallets.user_id', '=', $user_id)
            ->get();
        return  $wallet;
    }

    /**
     * Create a new record
     *
     * @param array $attributes
     * @return Wallet
     */
    public function create(array $attributes)
    {
        $budgetInit = str_replace(',', '', $attributes['budgetInit']);
        $userId = auth()->user()->id;

        if (isset($attributes['walletParentId'])) {
            $wallet = Wallet::create([
                'name' => $attributes['name'],
                'user_id' => $userId,
                'parent_id' => $attributes['walletParentId'],
                'budget_init' => $budgetInit,
                'budget_real' => $budgetInit,
                'transaction_id' => $attributes['transactionId'],
            ]);
        } else {
            $wallet = Wallet::create([
                'name' => $attributes['name'],
                'user_id' => $userId,
                'budget_init' => $budgetInit,
                'budget_real' => $budgetInit,
                'transaction_id' => $attributes['transactionId'],
            ]);
        }
        return $wallet;
    }

    /**
     * Get id wallets 
     * 
     * @return Collection
     */
    public function getIds()
    {
        $userId = auth()->user()->id;
        $walletIds = DB::table('wallets')
            ->select('wallets.id')
            ->where('wallets.user_id', '=', $userId)
            ->get();
        return $walletIds;
    }

    /**
     * Get wallet by id
     * 
     * @return Wallet
     */
    public function get($walletID)
    {
        $userId = auth()->user()->id;
        $wallet =
            Wallet::where('id', '=', $walletID)
            ->where('user_id', '=', $userId)
            ->first();
        return $wallet;
    }
}
