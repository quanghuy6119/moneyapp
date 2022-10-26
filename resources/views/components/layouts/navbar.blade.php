<div class="navbar-dashboard">
    <div class="navbar-container">
        <div>
            <div class="menu-toggle"><i class="fas fa-bars"></i></div>
            <div class="total">
                <div class="total-img">
                    <img src="{{ asset('img/money-bag-svgrepo-com.svg') }}">
                </div>
                <div class="total-wallet">
                    <div class="total-down"> 
                        <span class="total-down-name" style="margin-right: 5px">Wallet</span><i class="fas fa-caret-down"></i>
                    </div>
                    <div class="total-budget"></div>
                    <input type="hidden" class="default-wallet">
                </div>
            </div>
            <div class="add-wallet btn btn-info"><i class="fas fa-cart-arrow-down"></i> Add Wallet
            </div>
        </div>
        <ul class="list-group list-group-horizontal">
            <li class="list-group-item search-calendar"><i class="fas fa-calendar"></i>
                <div>Day</div>
            </li>
            <li class="list-group-item list-group-item-category"><i class="fas fa-cat"></i>
                <div>Category</div>
            </li>
            <li class="list-group-item"><button type="button" class="btn btn-success add-wallet-details">Add
                    transation</button>
            </li>
        </ul>
    </div>
</div>
