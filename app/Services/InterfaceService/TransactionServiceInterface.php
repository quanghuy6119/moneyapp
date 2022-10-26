<?php

namespace App\Services\InterfaceService;

interface TransactionServiceInterface
{
    /**
     * Create a new record
     *
     * @param array $attributes
     */
    public function create(array $attributes);

    /**
     * Get wallet details by id
     * 
     * @return WalletDetail
     */
    public function get($walletDetailId);

    /**
     * Get ids of wallet details
     * 
     * @param $walletId
     * @return Collection
     */
    public function getIds($walletId);

    /**
     * Show - display all transaction details
     *
     * @param $walletID
     * @param $page
     * @return array
     */
    public function showWalletDetails($walletID,  $page);

    /**
     * Show - display transaction details with time
     *
     * @param $id
     * @param $startDate
     * @param $endDate
     * @return Collection
     */
    public function getWalletDetailsByTime($id, $startDate, $endDate);

    /**
     * Show - display transaction details with month
     *
     * @param $id
     * @param $month
     * @return Collection
     */
    public function getWalletDetailsByMonth($id, $month);

    /**
     * Show total transaction details with category
     *
     * @param $id
     * @param $month
     * @param array $month
     * @return Collection
     */
    public function getTotalAmountWithCategory($id, $month, $type);
}
