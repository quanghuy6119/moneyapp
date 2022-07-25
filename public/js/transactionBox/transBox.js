$(document).ready(function() {

    /// mở details wallet
    $('.add-wallet-details').click(function() {
        $('.layout-modal').removeClass('inactive');
        $('.box-modal-transaction').removeClass('inactive');
        activePayment();
    });

    /// tắt details wallet
    $('.wallet-modal-details-exit').click(function() {
        $('.box-modal-transaction').addClass('inactive');
        $('.layout-modal').addClass('inactive');
        resetBoxDetail();
    });

    // box payment
    $('.nav-item-payment').click(function() {
        $('.layout-modal').removeClass('inactive');
        $('.box-modal-transaction').removeClass('inactive');
        activePayment();
    });

    // box income
    $('.nav-item-income').click(function() {
        $('.layout-modal').removeClass('inactive');
        $('.box-modal-transaction').removeClass('inactive');
        activeIncome();
    });

    // box transfer
    $('.nav-item-transfer').click(function() {
        $('.layout-modal').removeClass('inactive');
        $('.box-modal-transaction').removeClass('inactive');
        activeTransfer();
    });


    ////// thẻ  details wallet
    var checkWalletDetails = 0;
    $('.wallet-details-origin').click(async function(e) {
        e.preventDefault();
        if (checkWalletDetails == 0) {
            checkWalletDetails = 1;
            $('#load').toggleClass("inactive");
            await getWallet();
            checkWalletDetails = 0;
        }
    });

    ////// thẻ  details wallet transfer
    var checkWalletTransfer = 0;
    $('.wallet-details-transfer').click(async function(e) {
        e.preventDefault();
        if (checkWalletTransfer == 0) {
            checkWalletTransfer = 1;
            $('#load').toggleClass("inactive");
            await getWalletTransfer();
            checkWalletTransfer = 0;
        }
    });

    /// tắt details wallet 
    $('.wallet-details-exit').click(function() {
        $('.badge-wallet').remove();
        $('.wallet-details-script').remove();
        $('.box-modal-wallet-details').addClass('inactive');
    });

    ////// thẻ modal details icon
    var checkIconDetails = 0;
    $('.wallet-details-transaction').click(async function(e) {
        e.preventDefault();
        if (checkIconDetails == 0) {
            checkIconDetails = 1;
            $('#load').toggleClass("inactive");
            await getCategory();
            checkIconDetails = 0;
        }
    });

    /// tắt details icon
    $('.icon-details-exit').click(function() {
        $('.badge-wallet').remove();
        $('.icon-details-script').remove();
        $('.box-modal-icon-details').addClass('inactive');
    });

    //đổi ví
    $('.swap-wallet').click(function() {
        swapWallet();
    });

    //submit details
    $('.btn-wallet-details').click(function(e) {
        e.preventDefault();
        if (isNumeric() == true) {
            if (isMoneyLargerAmountOrigin() == false) {
                createWalletDetails();
            }
        };
    });

    //reset input money
    $('.wallet-details-input-money').focus(function() {
        resetInputMoney();
    });
});


const getWallet = async() => {
    await $.ajax({
        type: "GET",
        url: "/api/moneyApp/wallet",
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        success: function(response) {
            let result = JSON.parse(response);
            let idTransfer = $('.wallet-details-transfer-id').val();

            if (result.length != 0) {
                for (let i = 0; i < result.length; i++) {
                    if (result[i].id != idTransfer) {
                        $('.row-wallet-details').append(
                            `
                            <div class="badge badge-wallet badge-wallet-details${result[i].id} bg-danger col-3 mx-3 my-3">
                                <img src="${window.location.origin}/${result[i].symbol}" class="icon-transaction badge-wallet-details-img${result[i].id}"> 
                                <span class="badge-wallet-details-name${result[i].id}">${result[i].name}</span>
                                <input type="hidden" class="badge-wallet-details-id${result[i].id}" value="${result[i].id}">
                                <input type="hidden" class="badge-wallet-details-budget${result[i].id}" value="${result[i].budget_real}">
                             </div>
                        `);
                    }
                };
            };

            $('.row-wallet-details').append(`<script src="${window.location.origin}/js/transactionBox/transWallet.js" class="wallet-details-script"></script>`);
        },
        error: function(e) {
            console.log(e);
        }
    });
    // hiển thị layout modal
    await $('#load').toggleClass("inactive");
    await $('.box-modal-wallet-details').removeClass('inactive');
};


const getWalletTransfer = async() => {
    await $.ajax({
        type: "GET",
        url: "/api/moneyApp/wallet",
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        success: function(response) {
            let result = JSON.parse(response);
            let idOrigin = $('.wallet-details-origin-id').val();
            if (result.length != 0) {
                for (let i = 0; i < result.length; i++) {
                    if (result[i].id != idOrigin) {
                        $('.row-wallet-details').append(
                            `
                                <div class="badge badge-wallet badge-wallet-details${result[i].id} bg-danger col-3 mx-3 my-3">
                                    <img src="${window.location.origin}/${result[i].symbol}" class="icon-transaction badge-wallet-details-img${result[i].id}"> 
                                    <span class="badge-wallet-details-name${result[i].id}">${result[i].name}</span>
                                    <input type="hidden" class="badge-wallet-details-id${result[i].id}" value="${result[i].id}">
                                    <input type="hidden" class="badge-wallet-details-budget${result[i].id}" value="${result[i].budget_real}">
                                 </div>
                            `);
                    }
                };
            };
            $('.row-wallet-details').append(`<script src="${window.location.origin}/js/transactionBox/transTransfer.js" class="wallet-details-script"></script>`);
        },
        error: function(e) {
            console.log(e);
        }
    });
    // hiển thị layout modal
    await $('#load').toggleClass("inactive");
    await $('.box-modal-wallet-details').removeClass('inactive');
};


const getCategory = async() => {
    await $.ajax({
        type: "GET",
        url: "/api/moneyApp/category",
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        success: function(response) {
            let result = JSON.parse(response);
            for (let i = 0; i < result.length; i++) {
                $('.row-icon-details').append(
                    `
                        <div class="badge badge-wallet badge-icon-details${result[i].id} bg-danger col-3 mx-3 my-3">
                             <img src="${window.location.origin}/${result[i].symbol}" class="icon-transaction badge-icon-details-img${result[i].id}">  
                             <span class="badge-icon-details-name${result[i].id}">${result[i].name}</span>  
                             <input type="hidden" class="badge-icon-details-id${result[i].id}" value="${result[i].id}">
                         </div>
                    `)
            };
            $('.row-wallet-details').append(`<script src="${window.location.origin}/js/transactionBox/transIcon.js" class="icon-details-script"></script>`);
        },
        error: function(e) {
            console.log(e);
        }
    });
    // hiển thị layout modal
    await $('#load').toggleClass("inactive");
    await $('.box-modal-icon-details').removeClass('inactive');
};

function activePayment() {

    //active
    $('.nav-item-payment').addClass('active');
    $('.nav-item-transfer').removeClass('active');
    $('.nav-item-income').removeClass('active');
    //transfer type
    $('.typeTrans-details').val(1);

    //color type
    $('.wallet-form-input').removeClass('transfer-color');
    $('.wallet-form-input').removeClass('income-color');
    $('.input-group-text-details').removeClass('transfer-color');
    $('.input-group-text-details').removeClass('income-color');
    $('.wallet-form-input').addClass('payment-color');
    $('.input-group-text-details').addClass('payment-color');

    // button swap
    $('.wallet-details-transfer').addClass('inactive');
    $('.swap-wallet').addClass('inactive');
    $('.wallet-details-transaction').removeClass('inactive');

    resetInputMoney();
}

function activeIncome() {
    //active
    $('.nav-item-payment').removeClass('active');
    $('.nav-item-transfer').removeClass('active');
    $('.nav-item-income').addClass('active');
    //transfer type
    $('.typeTrans-details').val(2);

    //color type
    $('.wallet-form-input').removeClass('transfer-color');
    $('.wallet-form-input').removeClass('payment-color');
    $('.input-group-text-details').removeClass('transfer-color');
    $('.input-group-text-details').removeClass('payment-color');
    $('.wallet-form-input').addClass('income-color');
    $('.input-group-text-details').addClass('income-color');

    // button swap
    $('.wallet-details-transfer').addClass('inactive');
    $('.swap-wallet').addClass('inactive');
    $('.wallet-details-transaction').removeClass('inactive');

    resetInputMoney();
}

function activeTransfer() {
    //active
    $('.nav-item-payment').removeClass('active');
    $('.nav-item-income').removeClass('active');
    $('.nav-item-transfer').addClass('active');
    //transfer type
    $('.typeTrans-details').val(3);

    //color type
    $('.wallet-form-input').removeClass('income-color');
    $('.wallet-form-input').removeClass('payment-color');
    $('.input-group-text-details').removeClass('income-color');
    $('.input-group-text-details').removeClass('payment-color');
    $('.wallet-form-input').addClass('transfer-color');
    $('.input-group-text-details').addClass('transfer-color');

    // button swap
    $('.wallet-details-transaction').addClass('inactive');
    $('.wallet-details-transfer').removeClass('inactive');
    $('.swap-wallet').removeClass('inactive');

    resetInputMoney();
}

function swapWallet() {
    let a = $('.wallet-details-origin-img').attr('src');
    let b = $('.wallet-details-origin-name').text();
    let c = $('.wallet-details-origin-id').val();
    let d = $('.wallet-details-origin-budget').val();

    let e = $('.wallet-details-transfer-img').attr('src');
    let g = $('.wallet-details-transfer-name').text();
    let v = $('.wallet-details-transfer-id').val();
    let n = $('.wallet-details-transfer-budget').val();

    $('.wallet-details-origin-img').attr('src', e);
    $('.wallet-details-transfer-img').attr('src', a);

    $('.wallet-details-origin-name').text(g);
    $('.wallet-details-transfer-name').text(b);

    $('.wallet-details-transfer-id').val(c);
    $('.wallet-details-origin-id').val(v);

    $('.wallet-details-origin-budget').val(n);
    $('.wallet-details-transfer-budget').val(d);

    if ($('.wallet-details-origin-budget').val() != '') {
        $('.wallet-details-budget-real').text(formatCash($('.wallet-details-origin-budget').val()));
    } else {
        $('.wallet-details-budget-real').text('');
    }
}

function formatCash(str) {
    if (str == '') {
        return '';
    } else {
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }
}

function isMoneyLargerAmountOrigin() {
    if ($('.typeTrans-details').val() == 1 || $('.typeTrans-details').val() == 3) {
        let moneyIn = $('input[name="amount"]').val();
        let moneyWallet = $('.wallet-details-origin-budget').val();
        const regex = /,/g;
        moneyIn = moneyIn.replace(regex, '');
        moneyWallet = moneyWallet.replace(regex, '');
        moneyIn = parseInt(moneyIn, 10);
        moneyWallet = parseInt(moneyWallet, 10);

        if (moneyIn > moneyWallet) {
            $('.wallet-details-input-money').addClass('error-color');
            $('.wallet-details-input-money').val('');
            $('.wallet-details-input-money').attr('placeholder', 'Số dư không khả dụng');
            return true;
        }
    }
    return false;
};

function resetInputMoney() {
    $('.wallet-details-input-money').removeClass('error-color');
    $('.wallet-details-input-money').attr('placeholder', 'Nhập Số tiền');
}

function isNumeric() {
    let number = $('.wallet-details-input-money').val();
    let init = number.length;
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?]+/
    const regex2 = /[a-zA-Z]+/;
    number = number.replace(regex, '');
    number = number.replace(regex2, '');

    if (number.length != init) {
        $('.wallet-details-input-money').addClass('error-color');
        $('.wallet-details-input-money').val('');
        $('.wallet-details-input-money').attr('placeholder', 'Hãy nhập đúng định dạng tiền');
        return false;
    }
    return true;
}

function createWalletDetails() {
    var formData = new FormData($('.form-transaction')[0]);
    //Post to server
    $.ajax({
        type: "POST",
        url: "/api/moneyApp/walletDetails",
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: formData,
        success: function(response) {
            let result = JSON.parse(response);
            // console.log(result);
            //error
            if (result.error != null) {
                alert(`Thất bại , ${result.error}`);
            }

            let a;
            // if (window.location.hash == '#transaction' && a = ) {

            // }

            resetBoxDetail();
        },
        error: function(e) {
            // console.log(e);
            alert("Thất bại ,vui lòng nhập đầy đủ và đúng yêu cầu");
        }
    });
}

function resetBoxDetail() {
    originButton()
    $('.wallet-details-input-money').val('');
    $('.wallet-details-budget-real').text('');
    $('input[name="description"]').val('');
    $('input[name="daySpending"]').val('');
    $('.wallet-form-input').removeClass('payment-color');
    $('.wallet-form-input').removeClass('income-color');
    $('.wallet-form-input').removeClass('transfer-color');
}

function originButton() {
    $('.wallet-details-origin').html(
        `
    <img src="${window.location.origin}/img/wallet-svgrepo-com.svg" height="40px" width="60px"
        style="padding-bottom: 10px" class="wallet-details-origin-img">
    <span class="wallet-details-origin-name">Chọn Ví</span>
    <i class="fas fa-arrow-alt-circle-down" style="height: 15px; margin-left:5px"></i>
    <input type="hidden" name="walletID" class="wallet-details-origin-id">
    <input type="hidden" class="wallet-details-origin-budget">
    `
    );

    $('.wallet-details-transaction').html(
        `
    <img src="${window.location.origin}/img/wallet-svgrepo-com.svg" height="40px" width="60px"
        style="padding-bottom: 10px" class="wallet-icon-details-img">
    <span class="wallet-details-icon-name">Chọn Icon</span>
    <i class="fas fa-arrow-alt-circle-down" style="height: 15px; margin-left:5px"></i>
    <input type="hidden" name="transactionID" class="wallet-icon-details-id">
    `
    );

    $('.wallet-details-transfer').html(
        `
    <img src="${window.location.origin}/img/wallet-svgrepo-com.svg" height="40px" width="60px"
        style="padding-bottom: 10px" class="wallet-details-transfer-img">
    <span class="wallet-details-transfer-name">Chọn Ví</span>
    <i class="fas fa-arrow-alt-circle-down" style="height: 15px; margin-left:5px"></i>
    <input type="hidden" name="walletTransferID" class="wallet-details-transfer-id">
    <input type="hidden" class="wallet-details-transfer-budget">
    `
    );
}