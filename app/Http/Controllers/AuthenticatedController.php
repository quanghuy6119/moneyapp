<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Support\Facades\Auth;

class AuthenticatedController extends Controller
{
    public function index()
    {
        $default_wallet_id = auth()->user()->wallet_default_id;
        $default_wallet = Wallet::where('id', $default_wallet_id);
        return view('app', ['default' => $default_wallet,]);
    }

    /**
     * Register
     * 
     * @return redirect
     */
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed',
        ]);

        User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
        ]);

        return view('login');
    }

    /**
     * Log in
     * 
     * @return redirect
     */
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string|',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($fields, $request->remember != null)) {
            $request->session()->regenerate();
            return redirect('/moneyApp');
        } else {
            return response([
                'message' => 'Wrong',
            ], 401);
        }
    }

    /**
     * Log out
     * 
     * @return redirect
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/moneyApp/login');
    }
}
