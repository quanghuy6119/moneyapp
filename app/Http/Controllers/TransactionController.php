<?php

namespace App\Http\Controllers;

use App\Action\ActionTransaction;
use App\Models\Wallet;
use App\Models\WalletDetail;
use App\Services\InterfaceService\TransactionCategoryServiceInterface;
use App\Services\InterfaceService\TransactionServiceInterface;
use App\Services\InterfaceService\WalletServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    protected TransactionServiceInterface $transactionService;
    protected WalletServiceInterface $walletService;
    protected TransactionCategoryServiceInterface $transactionCategoryService;
    public function __construct(
        TransactionServiceInterface $transactionService,
        WalletServiceInterface $walletService,
        TransactionCategoryServiceInterface $transactionCategoryService
    ) {
        $this->transactionCategoryService = $transactionCategoryService;
        $this->transactionService = $transactionService;
        $this->walletService = $walletService;
    }

    /**
     * Show all id of wallet detail
     * @param $walletId
     * 
     * @return JsonResponse
     */
    public function idWalletDetails($walletId)
    {
        $data = $this->transactionService->getIds($walletId);
        return $this->sendResponse($data);
    }

    /**
     * Show wallet detail
     * @param $walletId
     * @param $page
     * 
     * @return JsonResponse
     */
    public function index($walletID, $page)
    {
        $data = $this->transactionService->showWalletDetails($walletID, $page);
        return $this->sendResponse($data);
    }

    /**
     * Create wallet detail
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        // validate wallet 
        $walletOrigin = $this->walletService->get($request->walletID);
        if (!$walletOrigin) return $this->sendResponse(['error' => 'Không phải ví của bạn']);

        // get information trans wallet details
        $typeTrans = $request->typeTrans;
        $budgetReal = $walletOrigin->budget_real; // get budget real
        $budgetAmount = str_replace(',', '', $request->amount); // format money

        // create wallet detail with type trans
        if ($typeTrans == ActionTransaction::PAYMENT ||  $typeTrans == ActionTransaction::INCOME) {
            // validate 
            $request->validate([
                'walletID' => 'required',
                'transactionID' => 'required',
                'amount' => 'required',
                'daySpending' => 'required',
                'description' => 'required',
                'typeTrans' => 'required',
            ]);

            // begin trans
            DB::beginTransaction();

            // validate money and update money
            if ($typeTrans == ActionTransaction::PAYMENT) {
                // check money equal then budget
                if ($budgetReal < $budgetAmount)
                    return $this->sendResponse(['error' => 'Không phải ví của bạn']);
                // update budget
                $money = $budgetReal - $budgetAmount;
                $walletOrigin->update(['budget_real' => $money]);
            } else if ($typeTrans == ActionTransaction::INCOME) {
                // update budget
                $money = $budgetReal + $budgetAmount;
                $walletOrigin->update(['budget_real' => $money]);
            }

            // create wallet
            $attributes = $request->all();
            $attributes['amount'] = $budgetAmount;
            $walletDetails = $this->transactionService->create($attributes);
            DB::commit();
            // set information of wallet details
            $symbol = $this->transactionCategoryService->get($request->transactionID);
            $walletDetails['budget_total'] = $money;
            $walletDetails['symbol'] = $symbol->symbol;
            $walletDetails['name'] = $symbol->name;

            // response
            return $this->sendResponse([$walletDetails]);

        } else if ($typeTrans == ActionTransaction::TRANSFER) {
            // validate wallet transfer
            $walletTransfer = $this->walletService->get($request->walletTransferID);;
            if ($walletTransfer == null)  return $this->sendResponse(['error' => 'Không phải ví của bạn']);

            // validate input
            $request->validate([
                'walletID' => 'required',
                'walletTransferID' => 'required', // icon transfer sẽ để vị trí số 1 
                'amount' => 'required',
                'daySpending' => 'required',
                'description' => 'required',
                'typeTrans' => 'required',
            ]);

            // format budget wallet
            $budgetAmount = str_replace(',', '', $request->amount);

            // calculator budget now
            $budgetWalletTransfer = $walletTransfer->budget_real;
            $moneyOrigin = $budgetReal - $budgetAmount;
            $moneyTransfer = $budgetWalletTransfer +  $budgetAmount;

            if ($moneyOrigin < 0) return $this->sendResponse(['error' => 'Số dư không khả dụng']);

            DB::beginTransaction();

            // update budget
            $walletOrigin->update([
                'budget_real' => $moneyOrigin,
            ]);

            $walletTransfer->update([
                'budget_real' =>  $moneyTransfer,
            ]);

            // set description of wallet details
            $description0 = '[Chuyển Khoản Ví ' . $walletTransfer->name . '] ';
            $description1 = '[Nhận Từ Ví ' . $walletOrigin->name . '] ';

            // create transfer wallet details 
            $attributes = array(
                'walletID' => $request->walletID,
                'transactionID' => 1,
                'amount' => $budgetAmount,
                'daySpending' => $request->daySpending,
                'description' => $description0 . $request->description,
                'typeTrans' => $request->typeTrans,
                'noted' => $request->noted
            );
            $transferWalletDetails = $this->transactionService->create($attributes);

            // create receiving wallet details 
            $attributes = array(
                'walletID' =>  $request->walletTransferID,
                'transactionID' => 1,
                'amount' => $budgetAmount,
                'daySpending' => $request->daySpending,
                'description' => $description1 . $request->description,
                'typeTrans' => 4,
                'noted' => $request->noted
            );
            $receivingWalletDetails = $this->transactionService->create($attributes);

            // update wallet details transfer id
            $transferWalletDetails->update(['transfer_id' => $receivingWalletDetails->id]);
            $receivingWalletDetails->update(['transfer_id' => $transferWalletDetails->id]);
            DB::commit();
            // get symbol transfer default
            $symbol = $this->transactionCategoryService->get(1);
            // set information of wallet 0
            $transferWalletDetails['budget_total'] = $moneyOrigin;
            $transferWalletDetails['symbol'] = $symbol->symbol;
            $transferWalletDetails['name'] = $symbol->name;
            // set information of wallet 1
            $receivingWalletDetails['budget_total'] = $moneyTransfer;
            $receivingWalletDetails['symbol'] = $symbol->symbol;
            $receivingWalletDetails['name'] = $symbol->name;
            // response
            return $this->sendResponse([$transferWalletDetails, $receivingWalletDetails]);
        }
    }

    /**
     * Delete wallet detail
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function delete($id)
    {
        // get wallet detail
        $walletDetails = $this->transactionService->get($id);
        // get wallet
        $wallet = $walletDetails->wallet;
        // get money spending
        $moneySpending = $walletDetails->amount;
        // get budget
        $budgetReal = $wallet->budget_real;

        // delete with type trans and update budget
        if ($walletDetails->type_trans == 1) {
            $total = $moneySpending + $budgetReal;
        } else if ($walletDetails->type_trans == 2) {
            $total = $budgetReal - $moneySpending;
        } else {
            $walletDetailsTransfer = $this->transactionService->get($walletDetails->transfer_id);
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
}
