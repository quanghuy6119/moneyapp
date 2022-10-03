<?php

namespace App\Http\Controllers;

use App\Action\ActionTransaction;
use App\Models\NoteSocial;
use App\Models\Transaction;
use App\Models\Wallet;
use App\Models\WalletDetail;
use App\Object\Report;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function createCategoryTrans(Request $request)
    {
        $request->validate([
            'file' => ['required', 'file'],
            'title' => 'required',
        ]);

        if ($request->hasFile('file')) {
            // Nếu có thì lưu trữ file vào public/img
            $file = $request->File('file');
            // trả về 1 object file sử dụng các hàm get để lấy attribute
            $path = $file->move('img', $file->getClientOriginalName());
            // Lưu link symbol vào database
            Transaction::create([
                'name' => $request->title,
                'symbol' => $path->getPathname(),
            ]);

            $data = [
                'path' => $path->getPathname(),
                'title' => $request->title
            ];
        }
        return response()->json($data);
    }

    public function showCategoryTrans()
    {
        $transIcon = Transaction::all();
        return response()->json($transIcon);
    }

    public function showWallet()
    {
        $user_id = auth()->user()->id;
        $wallet = DB::table('wallets')
            ->select('wallets.*', 'transactions.symbol', 'W.name as parent_name')
            ->join('transactions', 'wallets.transaction_id', '=', 'transactions.id')
            ->leftJoin('wallets as W', 'wallets.parent_id', '=', 'W.id')
            ->where('wallets.user_id', '=', $user_id)
            ->get();
        return response()->json($wallet);
    }

    public function createWallet(Request $request)
    {
        $request->validate([
            'transactionId' => 'required',
            'name' => 'required',
            'budgetInit' => 'required',
            'budgetReal' => 'required',
        ]);

        $budgetInit = str_replace(',', '', $request->budgetInit);
        $user_id = auth()->user()->id;

        if (isset($request->walletParentId)) {
            $wallet = Wallet::create([
                'name' => $request->name,
                'user_id' => $user_id,
                'parent_id' => $request->walletParentId,
                'budget_init' => $budgetInit,
                'budget_real' => $budgetInit,
                'transaction_id' => $request->transactionId,
            ]);
        } else {
            $wallet = Wallet::create([
                'name' => $request->name,
                'user_id' => $user_id,
                'budget_init' => $budgetInit,
                'budget_real' => $budgetInit,
                'transaction_id' => $request->transactionId,
            ]);
        }

        $data = [
            $wallet,
            $request->walletParentName,
            $request->walletIconShow,
        ];

        return response()->json($data);
    }

    public function idWallet()
    {
        $user_id = auth()->user()->id;
        $wallet = DB::table('wallets')
            ->select('wallets.id')
            ->where('wallets.user_id', '=', $user_id)
            ->get();
        return response()->json($wallet);
    }

    public function idWalletDetails($walletId)
    {
        $walletDetails = DB::table('wallet_details')
            ->select('wallet_details.id')
            ->where('wallet_id', '=', $walletId)
            ->get();
        return response()->json($walletDetails);
    }

    public function idCategory()
    {
        $id = DB::table('transactions')
            ->select('transactions.id')
            ->get();
        return response()->json($id);
    }

    public function showWalletDetails($walletID, $page)
    {
        $user_id = auth()->user()->id;

        $wallet = DB::table('wallet_details')
            ->select('wallets.name', 'wallets.budget_init', 'wallets.budget_real', 'wallet_details.*', 'transactions.name', 'transactions.symbol')
            ->join('wallets', 'wallet_details.wallet_id', '=', 'wallets.id')
            ->join('transactions', 'wallet_details.transaction_id', '=', 'transactions.id')
            ->where('wallets.user_id', '=', $user_id) // wallets.id = id
            ->where('wallet_details.wallet_id', '=', $walletID)
            ->orderByDesc('wallet_details.day_spending')
            ->offset(0)
            ->limit($page * 10)
            ->get();
        $total = DB::table('wallet_details')
            ->join('wallets', 'wallet_details.wallet_id', '=', 'wallets.id')
            ->where('wallets.user_id', '=', $user_id) // wallets.id = id;
            ->where('wallet_details.wallet_id', '=', $walletID)
            ->get()
            ->count();
        return response()->json([$wallet, $total]);
    }

    public function createWalletDetails(Request $request)
    {
        $user_id = auth()->user()->id;
        $walletID = $request->walletID;
        $walletOrigin = Wallet::where('id', '=', $walletID)->where('user_id', '=', $user_id)->first();

        if ($walletOrigin == null) {
            return response()->json(['error' => 'Không phải ví của bạn']);
        }

        $typeTrans = $request->typeTrans;
        $budgetReal = $walletOrigin->budget_real;

        if ($typeTrans == ActionTransaction::PAYMENT ||  $typeTrans == ActionTransaction::INCOME) {
            $request->validate([
                'walletID' => 'required',
                'transactionID' => 'required',
                'amount' => 'required',
                'daySpending' => 'required',
                'description' => 'required',
                'typeTrans' => 'required',
            ]);

            $budgetAmount = str_replace(',', '', $request->amount);

            DB::beginTransaction();
            if ($typeTrans == ActionTransaction::PAYMENT) {
                if ($budgetReal < $budgetAmount) {
                    return response()->json(['error' => 'Số dư không khả dụng']);
                }
                $money = $budgetReal - $budgetAmount;

                $walletOrigin->update([
                    'budget_real' => $money,
                ]);
            } else if ($typeTrans == ActionTransaction::INCOME) {
                $money = $budgetReal + $budgetAmount;

                $walletOrigin->update([
                    'budget_real' => $money,
                ]);
            }

            $walletDetails = WalletDetail::create([
                'wallet_id' => $request->walletID,
                'transaction_id' => $request->transactionID,
                'amount' => $budgetAmount,
                'day_spending' => $request->daySpending,
                'description' => $request->description,
                'type_trans' => $request->typeTrans,
                'transfer_id' => null,
                'noted' => $request->noted,
            ]);
            DB::commit();
            $symbol = DB::table('transactions')->where('id', '=', $request->transactionID)->get();
            $walletDetails['budget_total'] = $money;
            $walletDetails['symbol'] = $symbol[0]->symbol;
            $walletDetails['name'] = $symbol[0]->name;
            return response()->json($walletDetails);
        } else if ($typeTrans == ActionTransaction::TRANSFER) {
            $walletTransfer = Wallet::where('id', '=', $request->walletTransferID)->where('user_id', '=', $user_id)->first();

            if ($walletTransfer == null) {
                return response()->json(['error' => 'Không phải ví của bạn']);
            }

            $request->validate([
                'walletID' => 'required',
                'walletTransferID' => 'required', // icon transfer sẽ để vị trí số 1 
                'amount' => 'required',
                'daySpending' => 'required',
                'description' => 'required',
                'typeTrans' => 'required',
            ]);

            $budgetAmount = str_replace(',', '', $request->amount);
            $budgetWalletTransfer = $walletTransfer->budget_real;

            $moneyOrigin = $budgetReal - $budgetAmount;
            $moneyTransfer = $budgetWalletTransfer +  $budgetAmount;

            if ($moneyOrigin < 0) {
                return response()->json(['error' => 'Số dư không khả dụng']);
            }

            DB::beginTransaction();

            $walletOrigin->update([
                'budget_real' => $moneyOrigin,
            ]);

            $walletTransfer->update([
                'budget_real' =>  $moneyTransfer,
            ]);

            $description0 = '[Chuyển Khoản Ví ' . $walletTransfer->name . '] ';
            $description1 = '[Nhận Từ Ví ' . $walletOrigin->name . '] ';
            $symbol = DB::table('transactions')->select('transactions.symbol')->where('id', '=', '1')->get();
            $wallet0 = WalletDetail::create([
                'wallet_id' => $request->walletID,
                'transaction_id' => 1,
                'amount' => $budgetAmount,
                'day_spending' => $request->daySpending,
                'description' => $description0 . $request->description,
                'type_trans' => $request->typeTrans,
                'transfer_id' => null,
                'noted' => $request->noted,
            ]);
            $wallet0['budget_total'] = $moneyOrigin;
            $wallet0['symbol'] = $symbol[0]->symbol;
            $wallet0['name'] = $symbol[0]->name;

            $wallet1 = WalletDetail::create([
                'wallet_id' =>  $request->walletTransferID,
                'transaction_id' => 1,
                'amount' => $budgetAmount,
                'day_spending' => $request->daySpending,
                'description' => $description1 . $request->description,
                'type_trans' => 4,
                'transfer_id' => null,
                'noted' => $request->noted,
            ]);
            $wallet1['budget_total'] = $moneyTransfer;
            $wallet1['symbol'] = $symbol[0]->symbol;
            $wallet1['name'] = $symbol[0]->name;

            // update wallet details transfer id
            $wallet0->update(['transfer_id' => $wallet1->id]);
            $wallet1->update(['transfer_id' => $wallet0->id]);
            DB::commit();

            return response()->json([
                $wallet0,
                $wallet1,
            ]);
        }
    }

    public function deleteWalletDetails($id)
    {
        $walletDetails = WalletDetail::where('id', $id)->get(); // collection
        $walletDetails = $walletDetails->all()[0];
        $moneySpending = $walletDetails->amount;

        $wallet = $walletDetails->wallet;
        $budgetReal = $wallet->budget_real;

        if ($walletDetails->type_trans == 1) {
            $total = $moneySpending + $budgetReal;
        } else if ($walletDetails->type_trans == 2) {
            $total = $budgetReal - $moneySpending;
        } else {
            $walletDetailsTransfer = WalletDetail::where('id', $walletDetails->transfer_id)->get();
            $walletDetailsTransfer = $walletDetailsTransfer->all()[0];
            $moneyTransfer =  $walletDetailsTransfer->amount;

            $walletTransfer  = $walletDetailsTransfer->wallet;
            $budgetTransferReal = $walletTransfer->budget_real;

            if ($walletDetails->type_trans == 3) {
                $total = $moneySpending + $budgetReal;
                $totalTransfer = $budgetTransferReal - $moneyTransfer;
            } else if ($walletDetails->type_trans == 4) {
                $total = $budgetReal - $moneySpending;
                $totalTransfer = $budgetTransferReal + $moneyTransfer;
            }
            $walletDetailsTransfer->update(['budget_real' => $totalTransfer]);
        }

        $wallet->update(['budget_real' => $total]);
        WalletDetail::destroy($id);
        return response()->json([
            $total,
        ]);
    }

    public function createNote(Request $request)
    {
        $user_id = auth()->user()->id;
        $note = NoteSocial::create([
            'title' => $request->title,
            'description' => $request->description,
            'user_id' => $user_id,
        ]);
        return response()->json([
            $note,
        ]);
    }

    public function getNote()
    {
        $user_id = auth()->user()->id;
        $wallet = DB::table('wallet_details')
            ->select('wallets.name', 'wallet_details.*', 'transactions.name as action', 'transactions.symbol')
            ->join('wallets', 'wallet_details.wallet_id', '=', 'wallets.id')
            ->join('transactions', 'wallet_details.transaction_id', '=', 'transactions.id')
            ->where('wallets.user_id', '=', $user_id) // wallets.id = id
            ->where('wallet_details.noted', '=', 1)
            ->get();
        $note = DB::table('note_socials')
            ->where('user_id', '=', $user_id)
            ->get();
        return response()->json([
            $wallet, $note
        ]);
    }

    public function deleteNote($id)
    {
        $user_id = auth()->user()->id;
        $note = NoteSocial::Where('id', '=', $id)->get()->all()[0];
        if ($note->user_id != $user_id)
            return response('invalid', 400);
        $note->delete($id);
        return response('oke', 200);
    }

    public function deleteNoteWalletDetail($id)
    {
        $user_id = auth()->user()->id;
        $note = WalletDetail::Where('id', '=', $id)->get()->all()[0];
        if ($note->user_id != $user_id)
            return response('invalid', 400);
        $note->update([
            'noted' => null,
        ]);
        return response('oke', 200);
    }

    public function noteWalletDetail($id)
    {
        $user_id = auth()->user()->id;
        $note = WalletDetail::Where('id', '=', $id)->get()->all()[0];
        if ($note->user_id != $user_id)
            return response('invalid', 400);
        $note->update([
            'noted' => 1,
        ]);
        return response('oke', 200);
    }

    public function searchByCalendar(Request $request, $id)
    {
        $user_id = auth()->user()->id;
        $time = $request->validate([
            'startDate' => 'required|date',
            'endDate' => 'required|date',
        ]);

        $startDate = Carbon::parse($time['startDate']);
        $endDate = Carbon::parse($time['endDate']);

        $rs = DB::table('wallet_details')
            ->select('wallet_details.*', 'transactions.name', 'transactions.symbol')
            ->join('transactions', 'wallet_details.transaction_id', '=', 'transactions.id')
            ->where('wallet_id', '=', $id)
            ->whereBetween('day_spending', [$startDate, $endDate])
            ->where('wallets.user_id', '=', $user_id) // wallets.id = id
            ->orderBy('day_spending', 'DESC')
            ->get();

        return response()->json([
            $rs
        ]);
    }

    public function reportByMonth(Request $request)
    {
        $user_id = auth()->user()->id;
        $id = $request->id;
        $month = $request->month;

        // query
        $rs = DB::table('wallet_details')
            ->select('wallet_details.*')
            ->join('wallets', 'wallet_details.wallet_id', '=', 'wallets.id')
            ->where('wallet_id', '=', $id)
            ->whereMonth('day_spending', '=', $month)
            ->where('wallets.user_id', '=', $user_id) // wallets.id = id
            ->orderBy('day_spending', 'ASC')
            ->get();

        // tinh toan tong so tien moi ngay
        $data = [];
        foreach ($rs as $day) {
            $date = Carbon::parse($day->day_spending)->day;
            $index = $this->searchDay($date, $data);
            if ($index === null) {
                $data[] = new Report($date, $day->amount, $day->type_trans);
            } else {
                $data[$index]->setMoney($day->amount, $day->type_trans);
            };
        }

        $dataDate = [];
        $dataMoney = [];
        $dataDate = $this->toArrayDateArray($data);
        $dataMoney = $this->toArrayMoneyArray($data);

        return response()->json([
            $dataDate,
            $dataMoney
        ]);
    }

    private function searchDay($day, array $data)
    {
        foreach ($data as $index => $dt) {
            if ($dt->getDate() == $day) {
                return $index;
            }
        }
        return null;
    }

    private function toArrayDateArray($arrayObj)
    {
        $data = [];
        foreach ($arrayObj as $obj) {
            $data[] = $obj->getDate();
        }
        return $data;
    }

    private function toArrayMoneyArray($arrayObj)
    {
        $data = [];
        foreach ($arrayObj as $obj) {
            $data[] = $obj->getMoney();
        }
        return $data;
    }
}
