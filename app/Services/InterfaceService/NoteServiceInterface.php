<?php

namespace App\Services\InterfaceService;

use App\Models\NoteSocial;

interface NoteServiceInterface
{
    /**
     * Create a new record
     *
     * @param array $attributes
     * @return NoteSocial
     */
    public function create(array $attributes);

    /**
     * Get all note social 
     * 
     * @return Collection
     */
    public function getAll();

    /**
     * Marked Note Wallet Detail
     * 
     * @param [type] $id
     * @return boolean
     */
    public function markedNoteWalletDetail($id);

    /**
     * Delete Note
     * 
     * @param [type] $id
     * @return boolean
     */
    public function deleteNote($id);

    /**
     * Delete Note Wallet Detail
     * 
     * @param [type] $id
     * @return boolean
     */
    public function deleteNoteWalletDetail($id);
}
