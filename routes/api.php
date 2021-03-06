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


Route::prefix('/moneyApp')->middleware('auth:sanctum')->group(function () {
    Route::get('/category', [TransactionController::class, 'showCategoryTrans']);
    Route::post('/category', [TransactionController::class, 'createCategoryTrans']);
    Route::get('/idCategory', [TransactionController::class, 'idCategory']);

    Route::get('/wallet', [TransactionController::class, 'showWallet']);
    Route::post('/wallet', [TransactionController::class, 'createWallet']);
    Route::get('/idWallet', [TransactionController::class, 'idWallet']);

    Route::get('/walletDetails/{walletID}/{page}', [TransactionController::class, 'showWalletDetails']);
    Route::post('/walletDetails', [TransactionController::class, 'createWalletDetails']);
});

