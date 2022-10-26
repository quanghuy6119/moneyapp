<?php

namespace App\Http\Controllers;

use App\Services\InterfaceService\TransactionCategoryServiceInterface;
use Illuminate\Http\Request;

class TransactionCategoryController extends Controller
{
    protected TransactionCategoryServiceInterface $transactionCategoryService;
    public function __construct(TransactionCategoryServiceInterface $transactionCategoryService)
    {
        $this->transactionCategoryService = $transactionCategoryService;
    }

    /**
     * Create Transaction Category and save file
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
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
            $attributes = $request->all();
            $this->transactionCategoryService->create($attributes, $path);

            $data = [
                'path' => $path->getPathname(),
                'title' => $request->title
            ];
        }
        return $this->sendResponse($data);
    }

    /**
     * Show - display all transaction category of user request
     * 
     * @return JsonResponse
     */
    public function show()
    {
        $transIcon = $this->transactionCategoryService->getAll();
        return $this->sendResponse($transIcon);
    }


    /**
     * Show - display all id transaction category of user request
     * 
     * @return JsonResponse
     */
    public function idCategory()
    {
        $ids = $this->transactionCategoryService->getIds();
        return $this->sendResponse($ids);
    }
}
