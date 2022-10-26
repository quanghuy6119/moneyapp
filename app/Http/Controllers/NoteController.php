<?php

namespace App\Http\Controllers;

use App\Services\InterfaceService\NoteServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    protected NoteServiceInterface $noteService;
    public function __construct(NoteServiceInterface $noteService)
    {
        $this->noteService = $noteService;
    }

    /**
     * Show - display all note of user request
     * 
     * @return JsonResponse
     */
    public function show()
    {
        $data = $this->noteService->getAll();
        return $this->sendResponse($data);
    }

    /**
     * Marked Note Transaction
     * 
     * @return JsonResponse
     */
    public function markedNoteTransaction($id)
    {
        $data = $this->noteService->markedNoteWalletDetail($id);
        if (!$data)
            return $this->sendResponse('invalid', 400);
        else
            return $this->sendResponse('success', 200);
    }

    /**
     * Create note
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $attributes = $request->all();
        $data = $this->noteService->create($attributes);
        return $this->sendResponse($data);
    }

    /**
     * Delete note
     * 
     * @return JsonResponse
     */
    public function delete($id)
    {
        $data = $this->noteService->deleteNote($id);
        if (!$data)
            return $this->sendResponse('invalid', 400);
        else
            return $this->sendResponse('success', 200);
    }

    /**
     * Delete note wallet detail 
     * 
     * @return JsonResponse
     */
    public function deleteTransaction($id)
    {
        $data = $this->noteService->deleteNoteWalletDetail($id);
        if (!$data)
            return $this->sendResponse('invalid', 400);
        else
            return $this->sendResponse('success', 200);
    }
}
