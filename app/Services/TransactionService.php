<?php

namespace App\Services;

use App\Models\WalletDetail;
use App\Services\InterfaceService\TransactionServiceInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class TransactionService implements TransactionServiceInterface
{
    /**
     * Show - display all transaction details
     *
     * @param $walletID
     * @param $page
     * @return array
     */
    public function showWalletDetails($walletID, $page)
    {
        $userId = auth()->user()->id;
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
            ->where('wallets.user_id', '=', $userId)
            ->where('wallet_details.wallet_id', '=', $walletID)
            ->orderByDesc('wallet_details.day_spending')
            ->offset(0)
            ->limit($page * 10)
            ->get();
        // get total amount of wallet details
        $total = DB::table('wallet_details')
            ->join('wallets', 'wallet_details.wallet_id', '=', 'wallets.id')
            ->where('wallets.user_id', '=', $userId)
            ->where('wallet_details.wallet_id', '=', $walletID)
            ->get()
            ->count();
        return [
            $wallet,
            $total
        ];
    }

    /**
     * Get ids of wallet details
     * 
     * @param $walletId
     * @return Collection
     */
    public function getIds($walletId)
    {
        $idsWalletDetails = DB::table('wallet_details')
            ->select('wallet_details.id')
            ->where('wallet_id', '=', $walletId)
            ->get();
        return $idsWalletDetails;
    }

    /**
     * Create a new record
     *
     * @param array $attributes
     */
    public function create(array $attributes)
    {
        $noted = $attributes['noted'] ?? null;
        $walletDetails = WalletDetail::create([
            'wallet_id' => $attributes['walletID'],
            'transaction_id' => $attributes['transactionID'],
            'amount' => $attributes['amount'],
            'day_spending' => $attributes['daySpending'],
            'description' => $attributes['description'],
            'type_trans' => $attributes['typeTrans'],
            'transfer_id' => null,
            'noted' => $noted,
        ]);
        return $walletDetails;
    }

    /**
     * Show - display transaction details with time
     *
     * @param $id
     * @param $startDate
     * @param $endDate
     * @return Collection
     */
    public function getWalletDetailsByTime($id, $startDate, $endDate)
    {
        $userId = auth()->user()->id;
        $rs = DB::table('wallet_details')
            ->select('wallet_details.*', 'transactions.name', 'transactions.symbol')
            ->join('wallets', 'wallet_details.wallet_id', '=', 'wallets.id')
            ->join('transactions', 'wallet_details.transaction_id', '=', 'transactions.id')
            ->where('wallet_id', '=', $id)
            ->whereBetween('day_spending', [$startDate, $endDate])
            ->where('wallets.user_id', '=', $userId)
            ->orderBy('day_spending', 'DESC')
            ->get();
        return $rs;
    }

    /**
     * Show - display transaction details with month
     *
     * @param $id
     * @param $month
     * @return Collection
     */
    public function getWalletDetailsByMonth($id, $month)
    {
        $userId = auth()->user()->id;
        $rs = DB::table('wallet_details')
            ->select('wallet_details.*')
            ->join('wallets', 'wallet_details.wallet_id', '=', 'wallets.id')
            ->where('wallet_id', '=', $id)
            ->whereMonth('day_spending', '=', $month)
            ->where('wallets.user_id', '=', $userId)
            ->orderBy('day_spending', 'ASC')
            ->get();
        return $rs;
    }

    /**
     * Show total transaction details with category
     *
     * @param $id
     * @param $month
     * @param array $month
     * @return Collection
     */
    public function getTotalAmountWithCategory($id, $month, $type)
    {
        $userId = auth()->user()->id;
        $rs = DB::table('wallet_details')
            ->select(['transactions.name', DB::raw('SUM(wallet_details.amount) AS cost')])
            ->join('wallets', 'wallet_details.wallet_id', '=', 'wallets.id')
            ->join('transactions', 'wallet_details.transaction_id', '=', 'transactions.id')
            ->where('wallet_id', '=', $id)
            ->whereMonth('wallet_details.day_spending', '=', $month)
            ->where('wallets.user_id', '=', $userId)
            ->whereIn('wallet_details.type_trans', $type)
            ->groupBy(['transactions.name', 'wallet_details.amount'])
            ->get();
        return $rs;
    }

    /**
     * Get wallet details by id
     * 
     * @return WalletDetail
     */
    public function get($walletDetailId)
    {
        $walletDetail = WalletDetail::where('id', '=', $walletDetailId)->first();
        return $walletDetail;
    }
}
