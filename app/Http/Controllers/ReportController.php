<?php

namespace App\Http\Controllers;

use App\Object\Report;
use App\Services\InterfaceService\TransactionServiceInterface;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    protected TransactionServiceInterface $transactionService;
    public function __construct(TransactionServiceInterface $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    /**
     * Show wallet detail with time to report
     * 
     * @return JsonResponse
     */
    public function searchByCalendar(Request $request, $id)
    {
        $time = $request->validate([
            'startDate' => 'required|date',
            'endDate' => 'required|date',
        ]);

        $startDate = Carbon::parse($time['startDate']);
        $endDate = Carbon::parse($time['endDate']);
        $data = $this->transactionService->getWalletDetailsByTime($id, $startDate, $endDate);
        return $this->sendResponse($data);
    }

    /**
     * Show wallet detail with month
     * 
     * @return JsonResponse
     */
    public function reportByMonth(Request $request)
    {
        $id = $request->id;
        $month = $request->month;
        $rs = $this->transactionService->getWalletDetailsByMonth($id, $month);

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
        $dataDate = $this->toArrayDateArray($data);
        $dataMoney = $this->toArrayMoneyArray($data);
        $data = [$dataDate, $dataMoney];
        return $this->sendResponse($data);
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

    /**
     * Show total amount wallet detail by transaction category name
     * 
     * @return JsonResponse
     */
    public function reportBudgetByMonth(Request $request)
    {
        $id = $request->id;
        $month = $request->month;
        $type = $request->type;
        if ($type == 1)
            $type1 = 3;
        else
            $type1 = 4;

        $type = [$type, $type1];
        // query
        $rs = $this->transactionService->getTotalAmountWithCategory($id, $month, $type);
        $arrayRs = $rs->all();
        $dataName = $this->toArrayNamePieChart($arrayRs);
        $dataMoney = $this->toArrayMoneyPieChart($arrayRs, $dataName);
        $totalType = $this->toTotalMoneyPieChart($arrayRs);
        $data = [$dataName, $dataMoney, $totalType];
        return $this->sendResponse($data);
    }

    private function toArrayNamePieChart($arrayObj)
    {
        $data = [];
        foreach ($arrayObj as $obj) {
            $data[] = $obj->name;
        }
        $data = array_unique($data);
        return array_values($data);
    }

    private function toArrayMoneyPieChart($arrayObj, $arrayName)
    {
        $data = [];
        foreach ($arrayName as $name) {
            $cost = 0;
            foreach ($arrayObj as $obj) {
                if ($obj->name == $name)
                    $cost += $obj->cost;
            }
            $data[] = $cost;
        }
        return $data;
    }

    private function toTotalMoneyPieChart($arrayObj)
    {
        $total = 0;
        foreach ($arrayObj as $obj) {
            $total += $obj->cost;
        }
        return $total;
    }
}
