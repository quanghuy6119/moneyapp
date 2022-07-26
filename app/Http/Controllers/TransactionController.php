<?php

namespace App\Http\Controllers;

use App\Action\ActionTransaction;
use App\Models\Transaction;
use App\Models\Wallet;
use App\Models\WalletDetail;
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

    public function idCategory()
    {
        $id = DB::table('transactions')
            ->select('transactions.id')
            ->get();
        return response()->json($id);
    }

    public function showWalletDetails($walletID)
    {
        $user_id = auth()->user()->id;
    
        $wallet = DB::table('wallet_details')
            ->select('wallets.name', 'wallets.budget_init', 'wallets.budget_real', 'wallet_details.*', 'transactions.name', 'transactions.symbol')
            ->join('wallets', 'wallet_details.wallet_id', '=', 'wallets.id')
            ->join('transactions', 'wallet_details.transaction_id', '=', 'transactions.id')
            ->where('wallets.user_id', '=', $user_id) // wallets.id = id
            ->where('wallet_details.wallet_id', '=', $walletID)
            ->orderByDesc('wallet_details.day_spending')
            ->get();
        return response()->json($wallet);
    }

    public function createWalletDetails(Request $request)
    {
        $user_id = auth()->user()->id;
        $walletID = $request->walletID;

        $walletOrigin = Wallet::where('id', '=', $walletID)->where('user_id', '=', $user_id)->first();

        if ($walletOrigin == null) {
            return response()->json(['error' => 'Không phải ví của bạn']);
        }

        $typeTrans = $request->typeTrans;
        $budgetReal = $walletOrigin->budget_real;

        if ($typeTrans == ActionTransaction::PAYMENT ||  $typeTrans == ActionTransaction::INCOME) {
            $request->validate([
                'walletID' => 'required',
                'transactionID' => 'required',
                'amount' => 'required',
                'daySpending' => 'required',
                'description' => 'required',
                'typeTrans' => 'required',
            ]);

            $budgetAmount = str_replace(',', '', $request->amount);

            DB::beginTransaction();
            if ($typeTrans == ActionTransaction::PAYMENT) {
                if ($budgetReal < $budgetAmount) {
                    return response()->json(['error' => 'Số dư không khả dụng']);
                }
                $money = $budgetReal - $budgetAmount;

                $walletOrigin->update([
                    'budget_real' => $money,
                ]);
            } else if ($typeTrans == ActionTransaction::INCOME) {
                $money = $budgetReal + $budgetAmount;

                $walletOrigin->update([
                    'budget_real' => $money,
                ]);
            }

            $walletDetails = WalletDetail::create([
                'wallet_id' => $request->walletID,
                'transaction_id' => $request->transactionID,
                'amount' => $budgetAmount,
                'day_spending' => $request->daySpending,
                'description' => $request->description,
                'type_trans' => $request->typeTrans,
                'noted' => $request->noted,
                'surplus' => $money,
            ]);
            DB::commit();

            return response()->json($walletDetails);

        } else if ($typeTrans == ActionTransaction::TRANSFER) {
            $walletTransfer = Wallet::where('id', '=', $request->walletTransferID)->where('user_id', '=', $user_id)->first();

            if ($walletTransfer == null) {
                return response()->json(['error' => 'Không phải ví của bạn']);
            }

            $request->validate([
                'walletID' => 'required',
                'walletTransferID' => 'required', // icon transfer sẽ để vị trí số 1 
                'amount' => 'required',
                'daySpending' => 'required',
                'description' => 'required',
                'typeTrans' => 'required',
            ]);

            $budgetAmount = str_replace(',', '', $request->amount);
            $budgetWalletTransfer = $walletTransfer->budget_real;

            $moneyOrigin = $budgetReal - $budgetAmount;
            $moneyTransfer = $budgetWalletTransfer +  $budgetAmount;

            if ($moneyOrigin < 0) {
                return response()->json(['error' => 'Số dư không khả dụng']);
            }

            DB::beginTransaction();

            $walletOrigin->update([
                'budget_real' => $moneyOrigin,
            ]);

            $walletTransfer->update([
                'budget_real' =>  $moneyTransfer,
            ]);

            $wallet0 = WalletDetail::create([
                'wallet_id' => $request->walletID,
                'transaction_id' => 1,
                'amount' => $budgetAmount,
                'day_spending' => $request->daySpending,
                'description' => $request->description,
                'type_trans' => $request->typeTrans,
                'noted' => $request->noted,
                'surplus' => $moneyOrigin,
            ]);

            $wallet1 = WalletDetail::create([
                'wallet_id' =>  $request->walletTransferID,
                'transaction_id' => 1,
                'amount' => $budgetAmount,
                'day_spending' => $request->daySpending,
                'description' => $request->description,
                'type_trans' => 4,
                'noted' => $request->noted,
                'surplus' => $moneyTransfer,
            ]);
            DB::commit();

            return response()->json([
                $wallet0,
                $wallet1,
            ]);
        }
    }
}
