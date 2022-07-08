<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

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
}
