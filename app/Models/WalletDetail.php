<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WalletDetail extends Model
{
    use HasFactory;
    protected $fillable = [
        'wallet_id','transaction_id', 'amount', 'description', 'day_spending','type_trans', 'noted', 'transfer_id',
    ];

    public function wallet()
    {
        return $this->belongsTo(Wallet::class);
    }
}
