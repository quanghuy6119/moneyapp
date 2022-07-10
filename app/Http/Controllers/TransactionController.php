<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function upCategoryTrans(Request $request)
    {
        $request->validate([
            'file' => ['required', 'file'],
            'title' => 'required',
        ]);

        if ($request->hasFile('file')) {
            // Nếu có thì thục hiện lưu trữ file vào public/img
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

    public function showWalletBox(){
        $wallet = DB::table('wallets')
            ->select('wallets.id','wallets.name','wallets.parent_id','transactions.symbol')
            ->join('transactions', 'wallets.transaction_id', '=', 'transactions.id')
            ->get();
        return response()->json($wallet);
    }
}
