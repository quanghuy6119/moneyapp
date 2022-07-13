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

    public function showWallet(){
        $wallet = DB::table('wallets')
            ->select('wallets.id','wallets.name','wallets.parent_id','transactions.symbol','wallets.budget_init','wallets.budget_real')
            ->join('transactions', 'wallets.transaction_id', '=', 'transactions.id')
            ->get();
        return response()->json($wallet);
    }

    public function createWallet(Request $request){
        $request->validate([
            'transactionId' => 'required',
            'name' => 'required',
            'budgetInit' => 'required',
            'budgetReal' => 'required',
        ]);

        $budgetInit = str_replace(',','',$request->budgetInit);

        if(isset($request->walletParentId)){
            $wallet = Wallet::create([
                'name' => $request->name,
                'parent_id' => $request->walletParentId,
                'budget_init' => $budgetInit,
                'budget_real' => $budgetInit,
                'transaction_id' => $request->transactionId,
            ]);
        }else{
            $wallet = Wallet::create([
                'name' => $request->name,
                'budget_init' => $budgetInit,
                'budget_real' => $budgetInit,
                'transaction_id' => $request->transactionId,
            ]);
        }

        return response()->json($wallet);
    }
}
