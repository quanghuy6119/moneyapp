<div class="box-modal-transaction inactive">
    <div class="wallet-modal-details-exit"><i class="fas fa-times-circle"></i></div>
    <div class="container p-1">
        <div class="row">
            <div class="col-lg-12 mx-auto">
                <!-- Credit card form tabs -->
                <ul role="tablist" class="nav bg-light nav-pills rounded-pill nav-fill mb-3" style="font-weight: bold">
                    <li class="nav-item">
                        <a data-toggle="pill" class="nav-link active rounded-pill nav-item-payment">
                            <img src="{{ asset('img/discount-svgrepo-com.svg') }}" height="20px" width="30px">
                            Payment
                        </a>
                    </li>
                    <li class="nav-item">
                        <a data-toggle="pill" class="nav-link rounded-pill nav-item-income">
                            <img src="{{ asset('/img/profits-svgrepo-com.svg') }}" height="20px" width="30px">
                            Income
                        </a>
                    </li>
                    <li class="nav-item">
                        <a data-toggle="pill" class="nav-link rounded-pill nav-item-transfer">
                            <img src="{{ asset('img/bank-svgrepo-com.svg') }}" height="20px" width="30px">
                            Wallet Transfer
                        </a>
                    </li>
                </ul>
                <!-- End -->


                <!-- Credit card form content -->
                <div class="tab-content">

                    <!-- credit card info-->
                    <div id="nav-tab-card" class="tab-pane fade show active">
                        <form role="form" class="form-transaction">
                            @csrf
                            <div class="form-group form-group-check my-3 mb-4">
                                <input type="hidden" name="typeTrans" class="typeTrans-details" value="">

                                <button class="wallet-form-input wallet-details-origin">
                                    <img src="{{ asset('img/wallet-svgrepo-com.svg') }}" height="40px" width="60px"
                                        style="padding-bottom: 10px" class="wallet-details-origin-img">
                                    <span class="wallet-details-origin-name">Chọn Ví</span>
                                    <i class="fas fa-arrow-alt-circle-down" style="height: 15px; margin-left:5px"></i>
                                    <input type="hidden" name="walletID" class="wallet-details-origin-id">
                                    <input type="hidden" class="wallet-details-origin-budget">
                                </button>


                                <button class="wallet-form-input wallet-details-transaction">
                                    <img src="{{ asset('img/wallet-svgrepo-com.svg') }}" height="40px" width="60px"
                                        style="padding-bottom: 10px" class="wallet-icon-details-img">
                                    <span class="wallet-details-icon-name">Chọn Icon</span>
                                    <i class="fas fa-arrow-alt-circle-down" style="height: 15px; margin-left:5px"></i>
                                    <input type="hidden" name="transactionID" class="wallet-icon-details-id">
                                </button>

                                <button class="wallet-form-input wallet-details-transfer">
                                    <img src="{{ asset('img/wallet-svgrepo-com.svg') }}" height="40px" width="60px"
                                        style="padding-bottom: 10px" class="wallet-details-transfer-img">
                                    <span class="wallet-details-transfer-name">Chọn Ví</span>
                                    <i class="fas fa-arrow-alt-circle-down" style="height: 15px; margin-left:5px"></i>
                                    <input type="hidden" name="walletTransferID" class="wallet-details-transfer-id">
                                    <input type="hidden" class="wallet-details-transfer-budget">
                                </button>

                                <div class="swap-wallet">
                                    <div class="swap-text">Ví Chuyển</div>
                                    <div class="button-swap"><img src="{{ asset('img/swap.png') }}"></div>
                                    <div class="swap-text">Ví Nhận</div>
                                </div>
                            </div>
                            <div class="form-group my-3">
                                <label for="username">Description</label>
                                <input type="text" name="description" placeholder="Nhập mô tả" required
                                    class="form-control">
                            </div>
                            <div class="form-group my-3">
                                <label>Amount of money</label>
                                <span style="margin-left:50%">Current money</span>
                                <div class="input-group">
                                    <input type="text" name="amount" placeholder="Nhập Số tiền"
                                        class="form-control wallet-details-input-money money-trans" required>
                                    <div class="input-group-append">
                                        <span class="input-group-text input-group-text-details">
                                            <span class="wallet-details-budget-real"></span> VND
                                            <img src='{{ asset('img/vietnam-svgrepo-com.svg') }}' height="40px"
                                                width="60px">
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group my-2">
                                <label>Time Spent</label>
                                <div class="input-group">
                                    <input type="dateTime-local" name="daySpending" class="form-control" required>
                                </div>
                            </div>
                            <div class="form-group my-2 text-center" style="font-size: 18px">
                                <label style="font-weight: bold">Noted The Transaction</label>
                                <input type="checkbox" name="noted" class="form-check-input" value="1">
                            </div>
                            <button type="submit" class="subscribe btn btn-primary btn-block rounded-pill shadow-sm btn-wallet-details"
                                style="margin-left: 45%"> Confirm
                            </button>
                        </form>
                    </div>

                </div>
            </div>
            <!-- modal-->
            <div class="box-modal-wallet-details inactive">
                <div class="wallet-header">
                    <div class="wallet-title">Your Wallet
                        <img src="{{ asset('img/wallet1-svgrepo-com.svg') }}" height="40px" width="60px"
                            style="padding-bottom: 10px">
                    </div>
                </div>
                <div class="wallet-details-exit"><i class="fas fa-times-circle"></i></div>
                <div class="row row-wallet-details" style="width:100%;margin-left:12px">
                </div>
            </div>
            <div class="box-modal-icon-details inactive">
                <div class="wallet-header">
                    <div class="wallet-title">Icon
                        <img src="{{ asset('img/black-cat-svgrepo-com.svg') }}" height="40px" width="60px"
                            style="padding-bottom: 10px">
                    </div>
                </div>
                <div class="icon-details-exit"><i class="fas fa-times-circle"></i></div>
                <div class="row row-icon-details" style="width:100%;margin-left:12px">
                </div>
            </div>
            <!-- modal-->
        </div>
    </div>
</div>
