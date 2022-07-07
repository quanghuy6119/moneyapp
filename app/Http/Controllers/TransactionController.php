<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function upCategoryTrans(Request $request){
        $request->validate([
            'file' => 'required',
            'title' => ['required','file'],
        ]);

        if ($request->hasFile('file')) {
            // Nếu có thì thục hiện lưu trữ file vào public/img
            $file = $request->File('file');
            $path = $file->storeAs('img', $file->getClientOriginalName());

            dd($path);
            //Lưu link symbol vào database
            Transaction::create([
                'name' => $request->title,
                'symbol' => $path,
            ]);
        }

        // return response()->json()

    }
}
