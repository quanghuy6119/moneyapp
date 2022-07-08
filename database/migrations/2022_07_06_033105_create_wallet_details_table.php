<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWalletDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wallet_details', function (Blueprint $table) {
            $table->id();
            $table->integer('wallet_id');
            $table->integer('parent_id');
            $table->integer('transaction_id');
            $table->double('amount');
            $table->string('description');
            $table->date('day_spending');
            $table->integer('type_trans');
            $table->foreign('wallet_id')->references('id')->on('wallets');
            $table->foreign('transaction_id')->references('id')->on('transactions');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('wallet_details');
    }
}
