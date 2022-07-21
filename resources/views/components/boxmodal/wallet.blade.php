<div class="box-modal-wallet inactive">
    <div class="item-wallet container-fluid">
        <div class="wallet-header">
            <div class="wallet-title">Add a Wallet
                <img src="{{ asset('img/wallet-svgrepo-com.svg') }}" height="40px" width="60px"
                    style="padding-bottom: 10px">
            </div>
        </div>
        <div class="wallet-exit"><i class="fas fa-times-circle"></i></div>
    </div>
    <form class="form-wallet">
        @csrf
        <div class="row row-add-wallet">
            <div class="col-3 mb-3 ">
                <button class="wallet-form-input wallet-icon">
                    <img src="{{ asset('img/wallet-svgrepo-com.svg') }}" height="40px" width="60px"
                        style="padding-bottom: 10px" class="wallet-icon-img">
                    <i class="fas fa-arrow-alt-circle-down" style="height: 15px"></i>
                </button>
                <input type="hidden" class="wallet-icon-input" name="transactionId" value="1">
                <input type="hidden" class="wallet-icon-show" name="walletIconShow" value="{{ asset('img/wallet-svgrepo-com.svg') }}">
            </div>

            <div class="col-9 mb-3">
                <label for="wallet-name-input" class="wallet-name-label">Wallet Name</label>
                <input type="text" id="wallet-name-input" class="wallet-form-input wallet-name" name="name"
                    placeholder="Your Wallet Name" required>
            </div>

            <div class="col-6 mb-3">
                <label for="wallet-budget-input" class="wallet-budget-label">Init Budget</label>
                <input type="number" id="wallet-budget-input" class="wallet-form-input wallet-budget money"
                    name="budgetInit" placeholder="Your Init Budget" required>
                <input type="hidden" class="wallet-budget-real" name="budgetReal" value="0">
            </div>

            <div class="col-6 mb-3">
                <div class="wallet-form-input wallet-currency">
                    Việt Nam Đồng <img src='{{ asset('img/vietnam-svgrepo-com.svg') }}' height="40px" width="60px">
                </div>
            </div>
            <div class="col-6 mb-3">
                <label class="wallet-budget-label">Wallet origin</label>
                <button class="wallet-form-input wallet-parent">
                    <img src="{{ asset('img/wallet-svgrepo-com.svg') }}" height="40px" width="60px"
                        style="padding-bottom: 10px" class="wallet-parent-img">
                    <span class="wallet-parent-name"> Origin Wallet</span>
                    <input type="hidden" class="wallet-parent-id" name="walletParentId">
                    <input type="hidden" class="wallet-parent-name-input" name="walletParentName" value="Origin Wallet">
                </button>
            </div>
            <div class="col-6 mb-3">
                <input type="submit" class="btn btn-primary btn-form-wallet">
            </div>
        </div>
    </form>

    <div class="box-modal-wallet-icon inactive">
        <div class="wallet-header">
            <div class="wallet-title">Icon Basic
                <img src="{{ asset('img/black-cat-svgrepo-com.svg') }}" height="40px" width="60px"
                    style="padding-bottom: 10px">
            </div>
        </div>
        <div class="wallet-icon-exit"><i class="fas fa-times-circle"></i></div>
        <div class="row row-wallet" style="width:100%;margin-left:12px">
        </div>
    </div>

    <div class="box-modal-wallet-parent inactive">
        <div class="wallet-header">
            <div class="wallet-title">Your Wallet
                <img src="{{ asset('img/wallet1-svgrepo-com.svg') }}" height="40px" width="60px"
                    style="padding-bottom: 10px">
            </div>
        </div>
        <div class="wallet-parent-exit"><i class="fas fa-times-circle"></i></div>
        <div class="row row-wallet-parent" style="width:100%;margin-left:12px">
        </div>
    </div>
</div>
