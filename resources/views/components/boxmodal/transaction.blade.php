<div class="box-modal-transaction">
    <div class="container p-1">
        <div class="row">
            <div class="col-lg-12 mx-auto">
                    <!-- Credit card form tabs -->
                    <ul role="tablist" class="nav bg-light nav-pills rounded-pill nav-fill mb-3">
                        <li class="nav-item">
                            <a data-toggle="pill" href="#nav-tab-card" class="nav-link active rounded-pill">
                                <i class="fa fa-credit-card"></i>
                                Credit Card
                            </a>
                        </li>
                        <li class="nav-item">
                            <a data-toggle="pill" href="#nav-tab-paypal" class="nav-link rounded-pill">
                                <i class="fa fa-paypal"></i>
                                Paypal
                            </a>
                        </li>
                        <li class="nav-item">
                            <a data-toggle="pill" href="#nav-tab-bank" class="nav-link rounded-pill">
                                <i class="fa fa-university"></i>
                                Bank Transfer
                            </a>
                        </li>
                    </ul>
                    <!-- End -->


                    <!-- Credit card form content -->
                    <div class="tab-content">

                        <!-- credit card info-->
                        <div id="nav-tab-card" class="tab-pane fade show active">
                            <form role="form">
                                <div class="form-group form-group-check">
                                    <button class="wallet-form-input wallet-details-origin">
                                        <img src="{{ asset('img/wallet-svgrepo-com.svg') }}" height="40px" width="60px"
                                            style="padding-bottom: 10px" class="wallet-parent-img">
                                        <span class="wallet-parent-name"> Origin Wallet</span>
                                    </button>
                                    <button class="wallet-form-input wallet-details-transaction">
                                        <img src="{{ asset('img/wallet-svgrepo-com.svg') }}" height="40px" width="60px"
                                            style="padding-bottom: 10px" class="wallet-icon-img">
                                        <i class="fas fa-arrow-alt-circle-down" style="height: 15px"></i>
                                    </button>
                                </div>
                                <div class="form-group pt-1">
                                    <label for="username">Description</label>
                                    <input type="text" name="username" placeholder="Nhập mô tả" required class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="cardNumber">Số tiền</label>
                                    <div class="input-group">
                                        <input type="text" name="cardNumber" placeholder="Your card number"
                                            class="form-control" required>
                                        <div class="input-group-append">
                                            <span class="input-group-text text-muted">
                                                VND <img src='{{ asset('img/vietnam-svgrepo-com.svg') }}' height="40px" width="60px">
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group my-3">
                                    <div class="input-group">
                                        <input type="datetime-local" data-role="calendarpicker" name="cardNumber" placeholder="Your card number"
                                            class="form-control" required>
                                        </div>
                                    </div>
                                </div>
                                <button type="button"
                                    class="subscribe btn btn-primary btn-block rounded-pill shadow-sm"> Confirm
                                </button>
                            </form>
                        </div>
                        <!-- End -->

                        <!-- Paypal info -->
                        <div id="nav-tab-paypal" class="tab-pane fade">
                            <p>Paypal is easiest way to pay online</p>
                            <p>
                                <button type="button" class="btn btn-primary rounded-pill"><i
                                        class="fa fa-paypal mr-2"></i> Log into my Paypal</button>
                            </p>
                            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                        <!-- End -->

                        <!-- bank transfer info -->
                        <div id="nav-tab-bank" class="tab-pane fade">
                            <h6>Bank account details</h6>
                            <dl>
                                <dt>Bank</dt>
                                <dd> THE WORLD BANK</dd>
                            </dl>
                            <dl>
                                <dt>Account number</dt>
                                <dd>7775877975</dd>
                            </dl>
                            <dl>
                                <dt>IBAN</dt>
                                <dd>CZ7775877975656</dd>
                            </dl>
                            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                        <!-- End -->
                    </div>
                    <!-- End -->

                </div>
            </div>
    </div>
</div>
