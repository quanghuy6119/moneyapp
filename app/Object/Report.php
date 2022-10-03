<?php

namespace App\Object;

class Report
{

    private $date;
    private $money = 0;

    public function __construct($date, $money, $type)
    {
        $this->setDate($date);
        $this->setMoney($money, $type);
    }

    /**
     * Get the value of date
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set the value of date
     *
     * @return  self
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get the value of money
     */
    public function getMoney()
    {
        return $this->money;
    }

    /**
     * Set the value of money
     *
     * @return  self
     */
    public function setMoney($money, $type)
    {
        if ($type == 1 || $type == 3) {
            $this->money -= $money;
        } else if ($type == 2 || $type == 4) {
            $this->money += $money;
        }

        return $this;
    }
}
