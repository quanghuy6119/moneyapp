<?php

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

    Route::get('/walletDetails/note/{id}', [TransactionController::class, 'noteWalletDetail'])->where('id', '[0-9]+');
    Route::get('/idWalletDetails/{walletId}', [TransactionController::class, 'idWalletDetails']);
    Route::get('/walletDetails/{walletID}/{page}', [TransactionController::class, 'index']);
    Route::post('/walletDetails', [TransactionController::class, 'create']);
    Route::delete('/walletDetails/{id}', [TransactionController::class, 'deleteWalletDetails'])->where('id', '[0-9]+');

    Route::post('/note', [TransactionController::class, 'createNote']);
    Route::get('/note', [TransactionController::class, 'getNote']);
    Route::delete('/note/{id}', [TransactionController::class, 'deleteNote']);
    Route::delete('/walletDetails/note/{id}', [TransactionController::class, 'deleteNoteWalletDetail'])->where('id', '[0-9]+');
    Route::post('/searchByCalendar/{id}', [TransactionController::class, 'searchByCalendar']);
    Route::get('/report', [TransactionController::class, 'reportByMonth']);
    Route::get('/reportBudget', [TransactionController::class, 'reportBudgetByMonth']);
});

