<?php

use App\Http\Controllers\NoteController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\TransactionCategoryController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\WalletController;
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
    Route::get('/category', [TransactionCategoryController::class, 'show']);
    Route::post('/category', [TransactionCategoryController::class, 'create']);
    Route::get('/idCategory', [TransactionCategoryController::class, 'idCategory']);

    Route::get('/wallet', [WalletController::class, 'show']);
    Route::post('/wallet', [WalletController::class, 'create']);
    Route::get('/idWallet', [WalletController::class, 'idWallet']);

    Route::post('/walletDetails', [TransactionController::class, 'create']);
    Route::get('/walletDetails/note/{id}', [NoteController::class, 'markedNoteTransaction'])->where('id', '[0-9]+');
    Route::delete('/walletDetails/note/{id}', [NoteController::class, 'deleteTransaction'])->where('id', '[0-9]+');
    Route::get('/idWalletDetails/{walletId}', [TransactionController::class, 'idWalletDetails']);
    Route::get('/walletDetails/{walletID}/{page}', [TransactionController::class, 'index']);
    Route::delete('/walletDetails/{id}', [TransactionController::class, 'delete'])->where('id', '[0-9]+');

    Route::post('/note', [NoteController::class, 'create']);
    Route::get('/note', [NoteController::class, 'show']);
    Route::delete('/note/{id}', [NoteController::class, 'delete']);

    Route::get('/report', [ReportController::class, 'reportByMonth']);
    Route::get('/reportBudget', [ReportController::class, 'reportBudgetByMonth']);
    Route::post('/searchByCalendar/{id}', [ReportController::class, 'searchByCalendar']);
});

