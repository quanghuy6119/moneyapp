$(document).ready(function() {
    if (window.location.hash == '' || window.location.hash == '#wallet') {
        addWalletLayouts();
        getWallets('/wallet');
    }

    jQuery(window).on("hashchange", function() {
        var router = window.location.hash.trim();
        var url;
        if (router == '') {
            url = '/wallet';
        } else {
            url = '/' + router.slice(1, router.length);
        }

        if (url == '/wallet') {
            delTransactionLayouts();
            addWalletLayouts();
            getWallets(url);
        } else if (url == '/transaction') {
            delWalletLayouts();
            addTransactionLayouts();
            getWalletDetails();
        } else {
            delWalletLayouts();
            delTransactionLayouts();
        }
    });
});






//add row wallet
function addWalletLayouts() {
    $('.wallet-layouts').append(`    
    <div class="container h-100 container-wallet-layouts">
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-md-12 col-xl-12 row-layouts-wallet">   
            </div>
        </div>
    </div>`)
    $('.wallet-layouts').removeClass('inactive');
}

//add Transaction wallet
function addTransactionLayouts() {
    $('.transaction-layouts').append(`    
    <div class="container h-100 container-transaction-layouts">
        <div class="row d-flex justify-content-center">
            <div class="col-md-12 col-xl-10 mt-5 row-transactions-layouts">
            </div>
        </div>
    </div>`)
    $('.transaction-layouts').removeClass('inactive');
}

//del wallet layouts
function delWalletLayouts() {
    $('.container-wallet-layouts').remove();
    $('.wallet-layouts').addClass('inactive');
}


//del Transaction wallet
function delTransactionLayouts() {
    // function delTransactionLayouts() {
    $('.container-transaction-layouts').remove();
    $('.transaction-layouts').addClass('inactive');
}


// get wallet in database
async function getWallets(url) {
    $('#load').toggleClass("inactive");
    await $.ajax({
        type: "GET",
        url: "/api/moneyApp/wallet",
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        success: function(response) {
            let result = JSON.parse(response);
            //cần check xem có thay đổi nội dung hay không
            //khi thay đổi ở 1 máy khác thì máy hiện tại xử lí thế nào
            //làm sao để chèn vào đúng vị trí mà ko phải xóa tất cả
            if (result.length != $('.row-layouts-wallet figure').length) {

                for (let i = 0; i < result.length; i++) {
                    //wallet cha
                    if (result[i].parent_id == null) {
                        $('.row-layouts-wallet').append(`
                        <figure class="wallet-wallet">
                            <div class="img">
                                <h3>Ví ${result[i].name}</h3>
                                <img src="${window.location.origin}/${result[i].symbol}" alt="Portfolio Item">
                            </div>
                            <figcaption>
                                <h3>Loại: Ví gốc </h3>
                                <p>Số tiền ban đầu: <span class="money">${formatCash(result[i].budget_init)}</span>  <span> VND </span> <br>
                                    Số tiền hiện tại: <span class="money">${formatCash(result[i].budget_real)}</span> <span> VND </span></p>
                                <div class="btn btn-success btn-wallet-layouts btn-wallet-layouts${result[i].id}">Chọn ví</div>
                            </figcaption>
                    </figure>
                        `);
                    } else {
                        $('.row-layouts-wallet').append(`
                        <figure class="wallet-child">
                            <div class="img">
                                <h4>Ví ${result[i].name}</h4>
                                <img src="${window.location.origin}/${result[i].symbol}" alt="Portfolio Item">
                            </div>
                            <figcaption>
                                <h3>Loại: Ví con </h3>
                                <h3>Thuộc ví: Ví ${result[i].parent_name}</h3>
                                <p>Số tiền ban đầu: <span class="money">${formatCash(result[i].budget_init)}</span> <span> VND </span> <br>
                                    Số tiền hiện tại: <span class="money">${formatCash(result[i].budget_real)}</span> <span> VND </span></p>
                                <div class="btn btn-success btn-wallet-layouts btn-wallet-layouts${result[i].id}">Chọn ví</div>
                            </figcaption>
                        </figure>
                        `);
                    }
                }
                $('.row-layouts-wallet').append(`<script src="${window.location.origin}/js/walletLayouts/walletLayouts.js" class="wallet-layouts-script"></script>`);
            }
        },
        error: function(e) {
            console.log(e);
        }
    });
    await $('#load').toggleClass("inactive");
};


// add table display detail wallet
function addCardDetailWalletLayouts() {
    $('.row-transactions-layouts').append(`    
    <div class="card mask-custom">
        <div class="card-body p-4 text-white">
            <div class="text-center pt-3 pb-2">
                <h2 class="my-4">Wallet Transaction Details</h2>
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"  width="60">
            </div>

            <table class="table text-white mb-0">
                <thead>
                    <tr>
                        <th scope="col">Money Cash</th>
                        <th scope="col">Surplus</th>
                        <th scope="col">Description</th>
                        <th scope="col">Transaction</th>
                        <th scope="col">Day</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody class="transactions-wallet-details">
                </tbody>
            </table>
        </div>
    </div>
    `)
}

// get wallet detail 
function getWalletDetails(url) {
    addCardDetailWalletLayouts();
    $('.transactions-wallet-details').append(`
    <tr class="fw-normal">
        <td class="align-middle">
            <h6 class="mb-0">
                <span class="badge bg-danger money"> <i class="fas fa-dollar-sign"></i>100000000 </span>
            </h6>
        </td>
    
        <td class="align-middle">
            <h6 class="mb-0">
                <span class="badge bg-danger"> <i class="fas fa-dollar-sign"></i> 1.100.000</span>
            </h6>
        </td>
    
        <td class="align-middle">
            <span>Call Sam For payments</span>
        </td>
    
        <td class="align-middle">
            <h6 class="mb-0"><span class="badge bg-danger">Beverage 
            <img src="{{ asset('img/alcohol-beer-beverage-drink-mug-pub-svgrepo-com.svg') }}" class="icon-transaction"></span></h6>
        </td>
    
    <td class="align-middle">
        <h6 class="mb-0"><span class="badge bg-info">7/6/2022</span></h6>
    </td>
    
    <td class="align-middle">
        <a href="#!" data-mdb-toggle="tooltip" title="Done"><i
                class="fas fa-user-edit fa-lg text-success me-3"></i></a>
        <a href="#!" data-mdb-toggle="tooltip" title="Remove"><i
                class="fas fa-trash-alt fa-lg text-warning"></i></a>
    </td>
</tr>
    `)
}


//format currency vnd
function formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}