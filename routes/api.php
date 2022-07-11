<?php

use App\Http\Controllers\transaction;
use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('/moneyApp')->group(function () {
    Route::get('/category', [TransactionController::class, 'showCategoryTrans']);
    Route::post('/category', [TransactionController::class, 'createCategoryTrans']);
    Route::get('/walletBox', [TransactionController::class, 'showWalletBox']);
    Route::post('/walletBox', [TransactionController::class, 'createWallet']);
});
