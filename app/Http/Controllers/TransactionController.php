<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function createCategoryTrans(Request $request)
    {
        $request->validate([
            'file' => ['required', 'file'],
            'title' => 'required',
        ]);

        if ($request->hasFile('file')) {
            // Nếu có thì lưu trữ file vào public/img
            $file = $request->File('file');
            // trả về 1 object file sử dụng các hàm get để lấy attribute
            $path = $file->move('img', $file->getClientOriginalName());
            // Lưu link symbol vào database
            Transaction::create([
                'name' => $request->title,
                'symbol' => $path->getPathname(),
            ]);

            $data = [
                'path' => $path->getPathname(),
                'title' => $request->title
            ];
        }
        return response()->json($data);
    }

    public function showCategoryTrans()
    {
        $transIcon = Transaction::all();
        return response()->json($transIcon);
    }

    public function showWallet()
    {
        $user_id = auth()->user()->id;
        $wallet = DB::table('wallets')
            ->select('wallets.*', 'transactions.symbol', 'W.name as parent_name')
            ->join('transactions', 'wallets.transaction_id', '=', 'transactions.id')
            ->leftJoin('wallets as W', 'wallets.parent_id', '=', 'W.id')
            ->where('wallets.user_id', '=', $user_id)
            ->get();
        return response()->json($wallet);
    }

    public function createWallet(Request $request)
    {
        $request->validate([
            'transactionId' => 'required',
            'name' => 'required',
            'budgetInit' => 'required',
            'budgetReal' => 'required',
        ]);

        $budgetInit = str_replace(',', '', $request->budgetInit);
        $user_id = auth()->user()->id;

        if (isset($request->walletParentId)) {
            $wallet = Wallet::create([
                'name' => $request->name,
                'user_id' => $user_id,
                'parent_id' => $request->walletParentId,
                'budget_init' => $budgetInit,
                'budget_real' => $budgetInit,
                'transaction_id' => $request->transactionId,
            ]);
        } else {
            $wallet = Wallet::create([
                'name' => $request->name,
                'user_id' => $user_id,
                'budget_init' => $budgetInit,
                'budget_real' => $budgetInit,
                'transaction_id' => $request->transactionId,
            ]);
        }

        $data = [
            $wallet,
            $request->walletParentName,
            $request->walletIconShow,
        ];

        return response()->json($data);
    }

    public function idWallet()
    {
        $user_id = auth()->user()->id;
        $wallet = DB::table('wallets')
            ->select('wallets.id')
            ->where('wallets.user_id', '=', $user_id)
            ->get();
        return response()->json($wallet);
    }

    public function showWalletDetails($walletID)
    {
        $user_id = auth()->user()->id;

        $wallet = DB::table('wallet_details')
            ->select('wallets.name','wallets.budget_init','wallets.budget_real','wallets_details.*','transactions.name','transactions.symbol')
            ->join('wallets', 'wallet_details.wallet_id', '=', 'wallets.id')
            ->join('transactions', 'wallet_details.transaction_id', '=', 'transactions.id')
            ->where('wallets.user_id', '=', $user_id) // wallets.id = id
            ->where('wallet_details.wallet_id', '=', $walletID) 
            ->orderByDesc('wallet_details.day_spending')
            ->get();
        return response()->json($wallet);
    }
}

