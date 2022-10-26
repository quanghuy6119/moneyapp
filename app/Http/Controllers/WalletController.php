<?php

namespace App\Http\Controllers;

use App\Services\InterfaceService\WalletServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    protected WalletServiceInterface $walletService;
    public function __construct(WalletServiceInterface $walletService)
    {
        $this->walletService = $walletService;
    }

    /**
     * Show - display all wallet of user request
     * 
     * @return JsonResponse
     */
    public function show()
    {
        $wallet = $this->walletService->getAll();
        return $this->sendResponse($wallet);
    }

    /**
     * Create wallet
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $request->validate([
            'transactionId' => 'required',
            'name' => 'required',
            'budgetInit' => 'required',
            'budgetReal' => 'required',
        ]);

        $wallet = $this->walletService->create($request->all());

        $data = [
            $wallet,
            $request->walletParentName,
            $request->walletIconShow,
        ];

        return $this->sendResponse($data);
    }

    /**
     * Show - display all id wallet of user request
     * 
     * @return JsonResponse
     */
    public function idWallet()
    {
        $walletIds = $this->walletService->getIds();
        return $this->sendResponse($walletIds);
    }
}
