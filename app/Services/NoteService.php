<?php

namespace App\Services;

use App\Models\NoteSocial;
use App\Models\WalletDetail;
use App\Services\InterfaceService\NoteServiceInterface;
use Illuminate\Support\Facades\DB;

class NoteService implements NoteServiceInterface
{

    /**
     * Create a new record
     *
     * @param array $attributes
     * @return NoteSocial
     */
    public function create(array $attributes)
    {
        $userId = auth()->user()->id;
        $note = NoteSocial::create([
            'title' => $attributes['title'],
            'description' => $attributes['description'],
            'user_id' => $userId,
        ]);
        return $note;
    }

    /**
     * Get all note social 
     * 
     * @return array
     */
    public function getAll()
    {
        $user_id = auth()->user()->id;
        $wallet = DB::table('wallet_details')
            ->select('wallets.name', 'wallet_details.*', 'transactions.name as action', 'transactions.symbol')
            ->join('wallets', 'wallet_details.wallet_id', '=', 'wallets.id')
            ->join('transactions', 'wallet_details.transaction_id', '=', 'transactions.id')
            ->where('wallets.user_id', '=', $user_id)
            ->where('wallet_details.noted', '=', 1)
            ->get();
        $note = DB::table('note_socials')
            ->where('user_id', '=', $user_id)
            ->get();
        return [
            $wallet, $note
        ];
    }

    /**
     * Marked Note Wallet Detail
     * 
     * @param [type] $id
     * @return boolean
     */
    public function markedNoteWalletDetail($id)
    {
        $userId = auth()->user()->id;
        $note =
            WalletDetail::where('id', '=', $id)->first();
        if ($note->wallet->user_id != $userId)
            return false;
        $note->update([
            'noted' => 1,
        ]);
        return true;
    }

    /**
     * Delete Note
     * 
     * @param [type] $id
     * @return boolean
     */
    public function deleteNote($id)
    {
        $user_id = auth()->user()->id;
        $note = NoteSocial::where('id', '=', $id)->first();
        if ($note->user_id != $user_id)
            return false;
        $note->delete($id);
        return true;
    }

    /**
     * Delete Note Wallet Detail
     * 
     * @param [type] $id
     * @return boolean
     */
    public function deleteNoteWalletDetail($id)
    {
        $user_id = auth()->user()->id;
        $note = WalletDetail::where('id', '=', $id)->first();
        if ($note->wallet->user_id != $user_id)
            return false;
        $note->update([
            'noted' => null,
        ]);
        return true;
    }
}
