<?php

namespace App\Services;

use App\Models\WalletDetail;
use App\Services\InterfaceService\TransactionServiceInterface;

class TransactionService implements TransactionServiceInterface
{
    /**
     * Show - display all transaction details
     *
     * @param $walletID
     * @param $page
     * 
     * @return array
     */
    public function showWalletDetails($walletID, $page)
    {
        $user_id = auth()->user()->id;
        // get wallet details
        $wallet = DB::table('wallet_details')
            ->select(
                'wallets.name',
                'wallets.budget_init',
                'wallets.budget_real',
                'wallet_details.*',
                'transactions.name',
                'transactions.symbol'
            )
            ->join('wallets', 'wallet_details.wallet_id', '=', 'wallets.id')
            ->join('transactions', 'wallet_details.transaction_id', '=', 'transactions.id')
            ->where('wallets.user_id', '=', $user_id)
            ->where('wallet_details.wallet_id', '=', $walletID)
            ->orderByDesc('wallet_details.day_spending')
            ->offset(0)
            ->limit($page * 10)
            ->get();
        // get total amount of wallet details
        $total = DB::table('wallet_details')
            ->join('wallets', 'wallet_details.wallet_id', '=', 'wallets.id')
            ->where('wallets.user_id', '=', $user_id)
            ->where('wallet_details.wallet_id', '=', $walletID)
            ->get()
            ->count();
        return [
            $wallet,
            $total
        ];
    }

    /**
     * Create a new record
     *
     * @param array $attributes
     */
    public function create(array $attributes)
    {
        $walletDetails = WalletDetail::create([
            'wallet_id' => $attributes['walletID'],
            'transaction_id' => $attributes['transactionID'],
            'amount' => $attributes['amount'],
            'day_spending' => $attributes['daySpending'],
            'description' => $attributes['description'],
            'type_trans' => $attributes['typeTrans'],
            'transfer_id' => null,
            'noted' => $attributes['noted'],
        ]);
        return $walletDetails;
    }
}
