<?php

use App\Http\Controllers\AuthenticatedController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });


Route::prefix('/moneyApp')->group(function () {
    Route::get('/', [AuthenticatedController::class,'index'])->middleware('auth');
    
    Route::get('/login', function () {
        return view('login');
    })->name('login');

    Route::post('/login', [AuthenticatedController::class,'login']);

    Route::get('/register', function () {
        return view('register');
    });

    Route::post('/register', [AuthenticatedController::class,'register']);

    Route::get('/logout', [AuthenticatedController::class,'logout']);
});

Route::get('/walletDetails/{walletID}', [TransactionController::class, 'showWalletDetails']);
