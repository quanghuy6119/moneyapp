<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthenticatedController extends Controller
{
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

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string|',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($fields, $request->remember != null)) {
            $request->session()->regenerate();
            // $user = User::where('email', $fields['email'])->first();
            // $token = $user->createToken('myAppToken')->plainTextToken;
            return redirect('/moneyApp');
        } else {
            return response([
                'message' => 'Wrong',
            ], 401);
        }
    }

    public function logout(Request $request)
    {
        // $request->user()->tokens()->delete();
        // $request->user()->currentAccessToken()->delete();  

        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/moneyApp/login');
    }
}
